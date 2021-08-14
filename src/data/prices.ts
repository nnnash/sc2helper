import {PricedItem, PriceItemType, Race} from '../types/models'
import d from './data.json'
import {Raw} from '../types/raw'
import {getUnitImage} from '../components/UnitImage'
import {RACE_ABBR} from './race'

const getPrices = (race: Race): Array<PricedItem> => {
  const data = d as Raw
  const units: Array<PricedItem> = data[race].map(({name, m, vg}) => ({
    name,
    gas: vg,
    minerals: m,
    img: getUnitImage(name),
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
