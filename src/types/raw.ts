import {Race} from './models'

export interface RawUnit {
  name: string
  m: number
  vg: number
  pr: number
  build: string
  attr: string
  a1?: number
  a2?: number
  a3?: number
  a4?: number
  a5?: number
  d1?: number
  d2?: number
  d3?: number
  d4?: number
  d5?: number
  c1?: string
  ba1?: string
  bd1?: string
  bo1?: string
  c2?: string
  ba2?: string
  bd2?: string
  bo2?: string
  c3?: string
  ba3?: string
  bd3?: string
  bo3?: string
  c4?: string
  ba4?: string
  bd4?: string
  bo4?: string
  c5?: string
  ba5?: string
  bd5?: string
  bo5?: string
  commBa?: string
  commBd?: string
  commBo?: string
  tech1?: string
  tech2?: string
  tech3?: string
  tech4?: string
  melee?: number
  attLimit?: string
  support2?: number
  feature?: string
  mutationfrom?: string
  mutationprerequisites?: string
  specialattributes?: string
}

export interface RawBuilding {
  race: string
  name: string
  m: number
  vg: number
  img: string
  baseimprovement?: string
}

export interface RawTech {
  race: string
  name: string
  m: number
  vg: number
  description?: string
  battle?: string
  att?: string
  def?: string
  bonus?: string
  smatt?: string
  smdef?: string
}

export interface AttributeDescription {
  name?: string
  descr?: string
  abbr?: string
}

export interface RawBattleCard {
  race: string
  units?: string
  attack?: number
  health?: number
  text?: string
  smattack?: number
  smhealth?: number
  assist?: boolean
  attr?: string
}

export interface EventCard {
  stage: 1 | 2 | 3
  name: string
  amount?: number
  text: string
  strategy?: boolean
  start?: string
  end?: string
  playarea?: boolean
  alternative?: string
  t?: string
  z?: string
  p?: string
}

export interface Raw extends Record<Race, Array<RawUnit>> {
  buildings: Array<RawBuilding>
  techs: Array<RawTech>
  attributes: Array<AttributeDescription>
  cards: Array<RawBattleCard>
  events: Array<EventCard>
}
