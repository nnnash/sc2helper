import {PricedItem, PriceItemType, Race} from '../types/models'
import d from './data.json'
import {Raw} from '../types/raw'

const RACE_ABBR: Record<string, Race> = {
  t: Race.terran,
  p: Race.protoss,
  z: Race.zerg,
}

const getPrices = (race: Race): Array<PricedItem> => {
  const data = d as Raw
  const units: Array<PricedItem> = data[race].map(({name, m, vg, img = ''}) => ({
    name,
    gas: vg,
    minerals: m,
    img,
    type: PriceItemType.unit,
  }))
  const buildings = data.buildings.reduce<Array<PricedItem>>((acc, item) => {
    if (RACE_ABBR[item.race] !== race) return acc
    return [...acc, {name: item.name, minerals: item.m, gas: item.vg, img: item.img, type: PriceItemType.building}]
  }, [])
  const techs = data.techs.reduce<Array<PricedItem>>((acc, item) => {
    if (RACE_ABBR[item.race] !== race) return acc
    return [...acc, {name: item.name, minerals: item.m, gas: item.vg, img: 'tech', type: PriceItemType.tech}]
  }, [])

  return [...units, ...buildings, ...techs]
}

export const PROTOSS_PRICES = getPrices(Race.protoss)
export const ZERG_PRICES = getPrices(Race.zerg)
export const TERRAN_PRICES = getPrices(Race.terran)
