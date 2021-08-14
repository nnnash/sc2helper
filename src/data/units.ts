import {pick} from 'lodash'

import {RawUnit} from '../types/raw'
import {
  Attribute,
  Bonus,
  BonusAttributeLimitation,
  CardBonusValue,
  OtherBonusValue,
  Race,
  Unit,
  UnitCard,
  UnitDescriptions,
  UnitType,
} from '../types/models'
import data from './data.json'

const {protoss, terran, zerg} = data

const ATTR: {[key: string]: Attribute} = {
  l: Attribute.light,
  b: Attribute.bio,
  ms: Attribute.massive,
  m: Attribute.mech,
  a: Attribute.armor,
  p: Attribute.psi,
  h: Attribute.heroic,
}
const TYPE: {[key: string]: UnitType} = {
  gr: UnitType.ground,
  fl: UnitType.air,
}
const DESCRIPTION: {[key: string]: UnitDescriptions} = {
  mel: UnitDescriptions.melee,
  ass: UnitDescriptions.assist,
}
export const BONUS: {[key: string]: Bonus} = {
  sp: Bonus.speed,
  r: Bonus.range,
  c: Bonus.cloak,
  ls: Bonus.linearSplash,
  s: Bonus.splash,
}
const OTHER_ABBR: {[key: string]: string} = {
  df: 'defending',
}

const getAbbrValue = (val: string): BonusAttributeLimitation => {
  const negative = val[0] === '!'
  const abbr = negative ? val.slice(1) : val
  let isDefender
  if (OTHER_ABBR[abbr]) isDefender = true
  const value = ATTR[abbr] || TYPE[abbr] || DESCRIPTION[abbr] || BONUS[abbr] || OTHER_ABBR[abbr] || abbr
  return {
    type: value,
    isDefender,
    negative,
  }
}
const getAttributes = (attr: string) => attr.split(',').map((item) => ATTR[item])
const getBonusValue = (val: string): CardBonusValue => {
  const values = val.split(' ')
  return {
    value: parseInt(values[0]),
    type: values.slice(1).map(getAbbrValue),
  }
}
const getOtherBonusValue = (val: string): OtherBonusValue => {
  const values = val.split(' ')
  return {
    bonusType: BONUS[values[0]],
    opponentType: values.slice(1).map(getAbbrValue),
  }
}
const getBonuses = (bonusVal: string) => bonusVal.split(' / ').map(getBonusValue)
const getOtherBonuses = (bonusVal: string) => bonusVal.split(' / ').map(getOtherBonusValue)
const getCards = (unit: RawUnit) =>
  Array.from({length: 5}).reduce<Array<UnitCard>>((acc, _, ind) => {
    const cardNum = ind + 1
    if (!unit[`a${cardNum}` as keyof RawUnit]) return acc
    const attackBonus = unit[`ba${cardNum}` as keyof RawUnit] as string
    const healthBonus = unit[`bd${cardNum}` as keyof RawUnit] as string
    const otherBonus = unit[`bo${cardNum}` as keyof RawUnit] as string
    return [
      ...acc,
      {
        attack: unit[`a${cardNum}` as keyof RawUnit] as number,
        health: unit[`d${cardNum}` as keyof RawUnit] as number,
        attackBonus: (attackBonus && getBonuses(attackBonus)) as UnitCard['attackBonus'],
        healthBonus: (healthBonus && getBonuses(healthBonus)) as UnitCard['healthBonus'],
        otherBonus: (otherBonus && getOtherBonuses(otherBonus)) as UnitCard['otherBonus'],
      },
    ]
  }, [])

const getUnitType = ({name, build}: RawUnit): UnitType => {
  if (name === 'Colossus') return UnitType.both
  if (name === 'Viking') return UnitType.transform
  return ['c', 's'].includes(build[0]) ? UnitType.air : UnitType.ground
}
const mapRaw = (rawData: Array<RawUnit>) =>
  rawData.map(
    (item: RawUnit): Unit => ({
      name: item.name,
      type: getUnitType(item),
      description: !item.a1 ? UnitDescriptions.assist : item.melee ? UnitDescriptions.melee : undefined,
      attackLimit: item.attLimit ? (item.attLimit === 'a' ? UnitType.air : UnitType.ground) : undefined,
      minerals: item.m,
      gas: item.vg,
      build: item.build,
      attributes: getAttributes(item.attr),
      cards: getCards(item).filter(Boolean),
      attackBonus: (item.commBa && getBonuses(item.commBa)) as Unit['attackBonus'],
      otherBonus: (item.commBo && getOtherBonuses(item.commBo)) as Unit['otherBonus'],
      support2: !!item.support2,
      mutationPrerequisites: item.mutationprerequisites,
      specialAttributes: item.specialattributes ? item.specialattributes.split(',') : undefined,
      mutationFrom: item.mutationfrom?.split(','),
      ...pick(item, 'tech1', 'tech2', 'tech3', 'tech4', 'feature'),
    }),
  )

export const PROTOSS_DATA = mapRaw(protoss)
export const ZERG_DATA = mapRaw(zerg)
export const TERRAN_DATA = mapRaw(terran)

export const getDataByRace = (race: Race) => {
  switch (race) {
    case Race.zerg:
      return ZERG_DATA
    case Race.protoss:
      return PROTOSS_DATA
    default:
      return TERRAN_DATA
  }
}
