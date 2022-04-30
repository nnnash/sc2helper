import {Race} from '../types/models'
import d from './data.json'
import {Raw} from '../types/raw'
import {getDataByRace} from './units'
import {TECHS} from './techs'

const getRaceTips = (race: Race) => {
  const data = d as Raw
  const units = getDataByRace(race)
  const baseUnits = units.filter((unit) => unit.build.length === 1)
  const baseImprovements = data.buildings.filter((build) => build.race === race[0] && build.baseimprovement)
  const raceTechs = TECHS[race].filter((tech) => !tech.units.length)
  return {baseUnits, baseImprovements, raceTechs}
}

export const RACE_TIPS = {
  [Race.protoss]: getRaceTips(Race.protoss),
  [Race.terran]: getRaceTips(Race.terran),
  [Race.zerg]: getRaceTips(Race.zerg),
}
