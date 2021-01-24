import React from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {styled} from '@linaria/react'

import {Attribute, BaseUnitType, Unit, UnitCard, UnitDescriptions, UnitType} from '../types/models'
import {GlobalState} from '../redux/reducers'
import {AttDefValue, useAttDef} from '../context'
import {MOBILE_WIDTH} from '../constants'

const Container = styled.div`
  padding: 10px;
  @media (max-width: ${MOBILE_WIDTH}px) {
    padding: 0 10px 4px;
  }
`
const Title = styled.h3`
  text-align: center;
  margin: 4px;
`
const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`
const CardValueContainer = styled.div`
  display: flex;
`
const CardValue = styled.div<{isDefend?: boolean}>`
  width: 24px;
  height: 24px;
  margin-right: 4px;
  padding-top: 4px;
  background: #031e3a;
  color: ${(props) => (props.isDefend ? '#48de48' : 'red')};
  text-align: center;
  font-weight: bold;
`
const BonusesText = styled.div`
  font-size: 12px;
`

const getEnemyType = (unit: Unit, enemy: Unit): BaseUnitType => {
  if (enemy.type === UnitType.transform) {
    return [UnitType.transform, UnitType.both].includes(unit.type) ? UnitType.air : (unit.type as BaseUnitType)
  }
  if (enemy.type === UnitType.both) {
    if (unit.type === UnitType.transform) return UnitType.air
    if (unit.type === UnitType.both) return UnitType.ground
    return unit.attackLimit || unit.type
  }
  return enemy.type
}
const getAllEnemyFeatures = (enemy: Unit, unit: Unit): Array<UnitType | UnitDescriptions | Attribute> => [
  ...enemy.attributes,
  getEnemyType(unit, enemy),
  ...(enemy.description ? [enemy.description] : []),
]

interface CardProps {
  card: UnitCard
  unit: Unit
}
const Card = ({card, unit}: CardProps) => {
  const {attacker, defender} = useSelector((state: GlobalState) => ({...state}), shallowEqual)
  const isDefender = useAttDef() === AttDefValue.defend
  const enemy = isDefender ? attacker : defender
  const enemyType = enemy ? getEnemyType(unit, enemy) : undefined
  const enemyFeatures = enemy ? getAllEnemyFeatures(enemy, unit) : []
  const unitAttackBonuses = [...(unit.attackBonus || []), ...(card.attackBonus || [])].reduce<number>((acc, item) => {
    const isAppliedBonus = item.type.reduce<boolean>((res, type) => {
      let included = enemyFeatures.includes(type.type)
      if (type.negative) included = !included
      return res && included
    }, true)
    return isAppliedBonus ? acc + item.value : acc
  }, 0)
  const unitHealthBonus =
    card.healthBonus?.reduce<number>((acc, item) => {
      const isAppliedBonus = item.type.reduce<boolean>((res, type) => {
        if (type.isDefender && isDefender) return res && true
        let included = enemyFeatures.includes(type.type)
        if (type.negative) included = !included
        return res && included
      }, true)
      return isAppliedBonus ? acc + item.value : acc
    }, 0) || 0

  return (
    <CardContainer>
      <CardValueContainer>
        <CardValue>{card.attack}</CardValue>
        <CardValue isDefend>{card.health}</CardValue>
      </CardValueContainer>
      <BonusesText>
        {card.attackBonus?.map((bonus) => (
          <div key={bonus.type[0].type} style={{color: '#8e2a2a'}}>
            {bonus.value} {bonus.type.map((b) => b.type).join(' ')}
          </div>
        ))}
        {card.healthBonus?.map((bonus) => (
          <div key={bonus.type[0].type} style={{color: 'green'}}>
            {bonus.value} {bonus.type.map((b) => `${b.negative ? 'non ' : ''}${b.type}`).join(' ')}
          </div>
        ))}
      </BonusesText>
      {!!enemy && (
        <CardValueContainer>
          <CardValue>
            {!unit.attackLimit || unit.attackLimit === enemyType ? card.attack + unitAttackBonuses : 0}
          </CardValue>
          <CardValue isDefend>{card.health + unitHealthBonus}</CardValue>
        </CardValueContainer>
      )}
    </CardContainer>
  )
}

interface UnitCardsProps {
  unit: Unit
}
const UnitCards = ({unit}: UnitCardsProps) => {
  if (!unit.cards.length) return null
  return (
    <Container>
      <Title>Cards values</Title>
      {unit.cards.map((card, ind) => (
        <Card card={card} key={`${ind}-${card.attack}${card.health}`} unit={unit} />
      ))}
    </Container>
  )
}

export default UnitCards
