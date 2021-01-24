import {pick} from 'lodash'

import {Raw} from '../types/raw'
import {
  Attribute,
  Bonus,
  BonusAttributeLimitation,
  CardBonusValue,
  OtherBonusValue,
  Unit,
  UnitCard,
  UnitDescriptions,
  UnitType,
} from '../types/models'
import protossData from './protoss.json'
import zergData from './zerg.json'
import terranData from './terran.json'

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
const BONUS: {[key: string]: Bonus} = {
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
const getCards = (unit: Raw) =>
  Array.from({length: 5}).reduce<Array<UnitCard>>((acc, _, ind) => {
    const cardNum = ind + 1
    if (!unit[`a${cardNum}` as keyof Raw]) return acc
    const attackBonus = unit[`ba${cardNum}` as keyof Raw] as string
    const healthBonus = unit[`bd${cardNum}` as keyof Raw] as string
    const otherBonus = unit[`bo${cardNum}` as keyof Raw] as string
    return [
      ...acc,
      {
        attack: unit[`a${cardNum}` as keyof Raw] as number,
        health: unit[`d${cardNum}` as keyof Raw] as number,
        attackBonus: (attackBonus && getBonuses(attackBonus)) as UnitCard['attackBonus'],
        healthBonus: (healthBonus && getBonuses(healthBonus)) as UnitCard['healthBonus'],
        otherBonus: (otherBonus && getOtherBonuses(otherBonus)) as UnitCard['otherBonus'],
      },
    ]
  }, [])

const getUnitType = ({name, build}: Raw): UnitType => {
  if (name === 'Colossus') return UnitType.both
  if (name === 'Viking') return UnitType.transform
  return ['c', 's'].includes(build[0]) ? UnitType.air : UnitType.ground
}
const mapRaw = (rawData: Array<Raw>) =>
  rawData.map(
    (item: Raw): Unit => ({
      name: item.name,
      type: getUnitType(item),
      description: !item.a1 ? UnitDescriptions.assist : item.melee ? UnitDescriptions.melee : undefined,
      attackLimit: item.attLimit ? (item.attLimit === 'a' ? UnitType.air : UnitType.ground) : undefined,
      minerals: 3,
      gas: item.vg,
      build: item.build,
      attributes: getAttributes(item.attr),
      cards: getCards(item).filter(Boolean),
      attackBonus: (item.commBa && getBonuses(item.commBa)) as Unit['attackBonus'],
      otherBonus: (item.commBo && getOtherBonuses(item.commBo)) as Unit['otherBonus'],
      support2: !!item.support2,
      ...pick(item, 'tech1', 'tech2', 'tech3', 'tech4', 'img', 'feature'),
    }),
  )

export const PROTOSS_DATA = mapRaw(protossData)
export const ZERG_DATA = mapRaw(zergData)
export const TERRAN_DATA = mapRaw(terranData)
