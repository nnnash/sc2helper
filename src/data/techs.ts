import {Race, TTech} from '../types/models'
import d from './data.json'
import {Raw} from '../types/raw'
import {RACE_ABBR} from './race'
import {BONUS, getDataByRace} from './units'

const getValues = (att?: string, def?: string) => {
  if (att === undefined || def === undefined) return undefined
  return String(att)
    .split(';')
    .map((val, ind) => [+val, +String(def).split(';')[ind]]) as [number, number][]
}

const getTechs = (race: Race) => {
  const data = d as Raw
  const units = getDataByRace(race)
  return data.techs.reduce<Array<TTech>>((acc, item) => {
    if (RACE_ABBR[item.race] !== race) return acc
    return [
      ...acc,
      {
        name: item.name,
        minerals: item.m,
        gas: item.vg,
        race: item.race as Race,
        units: units.filter((u) => [u.tech1, u.tech2, u.tech3, u.tech4].includes(item.name)).map((u) => u.name),
        description: item.description || '',
        assistCard: !!item.battle,
        cardBonus: item.bonus ? BONUS[item.bonus] : undefined,
        cardValues: getValues(item.att, item.def),
        smallCardValues: getValues(item.smatt, item.smdef),
      },
    ]
  }, [])
}

export const TECHS: Record<Race, Array<TTech>> = {
  [Race.protoss]: getTechs(Race.protoss),
  [Race.terran]: getTechs(Race.terran),
  [Race.zerg]: getTechs(Race.zerg),
}
