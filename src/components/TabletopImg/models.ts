import {Race} from 'types/models'

import terranBlue from './img/terranBlue.png'
import terranRed from './img/terranRed.png'
import zergGreen from './img/zergGreen.png'
import zergPurple from './img/zergPurple.png'
import protossOrange from './img/protossOrange.png'
import protossYellow from './img/protossYellow.png'

import gateway from 'img/gateway.png'
import robotics from 'img/robotics.png'
import stargate from 'img/stargate.png'
import spawningPool from 'img/spawningPool.png'
import infestationPit from 'img/infestationPit.png'
import spire from 'img/spire.png'
import barracks from 'img/barracks.png'
import factory from 'img/factory.png'
import starport from 'img/starport.png'

export enum FactionColor {
  blue = 'blue',
  red = 'red',
  yellow = 'yellow',
  orange = 'orange',
  green = 'green',
  purple = 'purple',
}
export interface Faction {
  race: Race
  color: FactionColor
}

export const raceByColor: Record<FactionColor, Race> = {
  [FactionColor.blue]: Race.terran,
  [FactionColor.red]: Race.terran,
  [FactionColor.green]: Race.zerg,
  [FactionColor.purple]: Race.zerg,
  [FactionColor.orange]: Race.protoss,
  [FactionColor.yellow]: Race.protoss,
}

export const bgImageByColor: Record<FactionColor, string> = {
  [FactionColor.blue]: terranBlue,
  [FactionColor.red]: terranRed,
  [FactionColor.green]: zergGreen,
  [FactionColor.purple]: zergPurple,
  [FactionColor.orange]: protossOrange,
  [FactionColor.yellow]: protossYellow,
}

export const bgBuildingImagePositionByColor: Record<FactionColor, string> = {
  [FactionColor.blue]: '-160px -370px',
  [FactionColor.red]: '-200px -410px',
  [FactionColor.green]: '-440px -350px',
  [FactionColor.purple]: '-280px -460px',
  [FactionColor.orange]: '-230px -320px',
  [FactionColor.yellow]: '-410px -510px',
}

export const buildingByRace: Record<Race, Array<string>> = {
  [Race.protoss]: [gateway, robotics, stargate],
  [Race.zerg]: [spawningPool, infestationPit, spire],
  [Race.terran]: [barracks, factory, starport],
}
