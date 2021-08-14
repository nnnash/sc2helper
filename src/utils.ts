import {images} from './data/images'
import {Attribute, AttributeInfo, Unit as TUnit, UnitDescriptions, UnitType} from './types/models'
import {ATTACK_LIMIT, ATTRIBUTES, BONUS, UNIT_DESCRIPTION, UNIT_TYPE} from './models/attributes'

// eslint-disable-next-line
// @ts-ignore
export const getImgUrl = (img: string) => (img.match(/static/) ? img : images[img])

export const getIcons = (unit: TUnit, omitType = false) => [
  ...(omitType ? [] : [UNIT_TYPE[unit.type]]),
  ...unit.attributes.map((attr) => ATTRIBUTES[attr]),
  ...(unit.description ? [UNIT_DESCRIPTION[unit.description]] : []),
  ...(unit.attackLimit ? [ATTACK_LIMIT[unit.attackLimit]] : []),
  ...(unit.support2 ? [BONUS.support] : []),
]

export const getAttributeInfo = (name: Attribute | UnitType | UnitDescriptions): AttributeInfo =>
  UNIT_TYPE[name as UnitType] || ATTRIBUTES[name as Attribute] || UNIT_DESCRIPTION[name as UnitDescriptions]
