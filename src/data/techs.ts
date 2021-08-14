import {Race, TTech} from '../types/models'
import d from './data.json'
import {Raw} from '../types/raw'
import {RACE_ABBR} from './race'
import {BONUS, getDataByRace} from './units'

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
        cardValues:
          item.att && item.def
            ? [0, 1].map((ind) => [+item.att!.split(';')[ind], +item.def!.split(';')[ind]])
            : undefined,
      },
    ]
  }, [])
}

export const TECHS: Record<Race, Array<TTech>> = {
  [Race.protoss]: getTechs(Race.protoss),
  [Race.terran]: getTechs(Race.terran),
  [Race.zerg]: getTechs(Race.zerg),
}
