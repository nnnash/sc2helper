import {Race, TBuilding} from '../types/models'
import d from './data.json'
import {Raw} from '../types/raw'
import {RACE_ABBR} from './race'
import {getImgUrl} from '../utils'

const getZergAbbr = (name: string) => {
  if (name.match(/1st/i)) return 'a'
  if (name.match(/2nd/i)) return 'b'
  return 'c'
}

const getBuildings = (race: Race): Array<TBuilding> => {
  const data = d as Raw
  return data.buildings.reduce<Array<TBuilding>>((acc, item) => {
    if (RACE_ABBR[item.race] !== race || !item.name.match(/level/i)) return acc
    return [
      ...acc,
      {
        name: item.name,
        race,
        gas: item.vg,
        minerals: item.m,
        img: getImgUrl(item.img),
        abbr: race === Race.zerg ? getZergAbbr(item.name) : item.name[0].toLowerCase(),
        level: +(item.name.match(/level* ([1-3]*)/)?.[1] || 0),
      },
    ]
  }, [])
}

export const BUILDING_LISTS = Object.values(Race).reduce<Record<Race, Array<TBuilding>>>(
  (acc, item) => ({
    ...acc,
    [item]: getBuildings(item),
  }),
  {} as Record<Race, Array<TBuilding>>,
)

export const BUILDING_SCALE = {
  6: 1.14,
  5: 1.15,
}
