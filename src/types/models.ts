import React from 'react'

export enum Attribute {
  light = 'light',
  bio = 'bio',
  armor = 'armor',
  mech = 'mech',
  massive = 'massive',
  psi = 'psi',
  heroic = 'heroic',
}

export enum UnitType {
  ground = 'ground',
  air = 'air',
  transform = 'transform',
  both = 'both',
}
export type BaseUnitType = UnitType.air | UnitType.ground

export enum UnitDescriptions {
  melee = 'melee',
  assist = 'assist',
}

export enum Bonus {
  support = 'support',
  range = 'range',
  speed = 'speed',
  cloak = 'cloak',
  splash = 'splash',
  linearSplash = 'linearSplash',
  detection = 'detection',
}

export interface BonusAttributeLimitation {
  type: Attribute | UnitType | UnitDescriptions
  isDefender?: boolean
  negative?: boolean
}
export interface CardBonusValue {
  type: Array<BonusAttributeLimitation>
  value: number
}

export interface OtherBonusValue {
  opponentType?: Array<BonusAttributeLimitation>
  bonusType: Bonus
}

export interface UnitCard {
  attack: number
  health: number
  attackBonus?: Array<CardBonusValue>
  healthBonus?: Array<CardBonusValue>
  otherBonus?: Array<OtherBonusValue>
}

export interface Unit {
  name: string
  type: UnitType
  minerals: number
  gas: number
  build: string
  attributes: Array<Attribute>
  description?: UnitDescriptions
  attackLimit?: BaseUnitType
  cards: Array<UnitCard>
  attackBonus?: Array<CardBonusValue>
  otherBonus?: Array<OtherBonusValue>
  tech1?: string
  tech2?: string
  tech3?: string
  tech4?: string
  feature?: string
  support2?: boolean
  mutationFrom?: Array<string>
  mutationPrerequisites?: string
  specialAttributes?: Array<string>
}

export interface AttributeInfo {
  id: Attribute | UnitType | UnitDescriptions | Bonus
  svg: React.ReactNode
  color: string
  tooltip: string
}

export enum Race {
  protoss = 'protoss',
  zerg = 'zerg',
  terran = 'terran',
}

export enum PriceItemType {
  unit = 'unit',
  tech = 'tech',
  building = 'building',
}

export interface PricedItem {
  name: string
  img: string
  minerals: number
  gas: number
  type: PriceItemType
}

export interface TBuilding {
  name: string
  abbr: string
  race: Race
  minerals: number
  gas: number
  img: string
  level: number
}

export interface TTech {
  name: string
  description: string
  race: Race
  units: Array<string>
  minerals: number
  gas: number
  assistCard: boolean
  cardValues?: Array<[number, number]>
  smallCardValues?: Array<[number, number]>
  cardBonus?: Bonus
}

export interface BattleCard {
  race: Race
  units?: Array<Unit>
  attack?: number
  health?: number
  text?: string
  smAttack?: number
  smHealth?: number
  assist?: boolean
  attribute?: Attribute
}

export interface TechCard {
  race: Race
  name: string
  description: string
  units: Array<Unit>
  minerals: number
  gas: number
  assistCard: boolean
  attack?: number
  health?: number
  smAttack?: number
  smHealth?: number
  cardBonus?: Bonus
  quantity: number
  img?: string
}
