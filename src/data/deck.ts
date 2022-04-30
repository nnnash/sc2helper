import {Attribute, BattleCard, Race, TechCard, Unit} from '../types/models'
import d from './data.json'
import {Raw} from '../types/raw'
import {getAbbrValue, getDataByRace} from './units'
import {TECHS} from './techs'

const mapNamesToUnits = (unitNames: Array<string>, units: Array<Unit>): Array<Unit> =>
  unitNames.map((name) => units.find((u) => u.name.toLowerCase() === name.toLowerCase())) as Unit[]

const getRaceDeck = (race: Race) => {
  const data = d as Raw
  const units = getDataByRace(race)
  const cards = data.cards.reduce<Array<BattleCard>>((acc, item) => {
    if (item.race !== race[0]) return acc
    const newCard: BattleCard = {
      ...item,
      race,
      smAttack: item.smattack,
      smHealth: item.smhealth,
      units: mapNamesToUnits(item.units?.split('\n') || [], units),
      attribute: item.attr ? (getAbbrValue(item.attr).type as Attribute) : undefined,
    }
    if (newCard.assist) acc.push(newCard)
    return [...acc, newCard]
  }, [])
  const raceTechs = TECHS[race].reduce<Array<TechCard>>((acc, item) => {
    if (item.cardValues) {
      item.cardValues.forEach((val, ind) => {
        acc.push({
          ...item,
          units: mapNamesToUnits(item.units, units),
          attack: val[0],
          health: val[1],
          smAttack: item.smallCardValues?.[ind][0],
          smHealth: item.smallCardValues?.[ind][1],
          quantity: item.cardValues?.length || 1,
        })
      })
    } else if (item.assistCard) {
      const newTechCard: TechCard = {
        ...item,
        units: mapNamesToUnits(item.units, units),
        quantity: 2,
      }
      acc.push(newTechCard)
      acc.push(newTechCard)
    } else {
      acc.push({
        ...item,
        units: mapNamesToUnits(item.units, units),
        quantity: 1,
      })
    }
    return acc
  }, [])
  return {raceTechs, cards}
}

export const RACE_DECKS = {
  [Race.protoss]: getRaceDeck(Race.protoss),
  [Race.terran]: getRaceDeck(Race.terran),
  [Race.zerg]: getRaceDeck(Race.zerg),
}
