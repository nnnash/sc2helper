import React from 'react'
// import {useSelector, shallowEqual} from 'react-redux'
import {styled} from '@linaria/react'

import {Unit, UnitCard} from '../types/models'
// import {GlobalState} from '../redux/reducers'

const Container = styled.div`
  padding: 10px;
`
const Title = styled.h3`
  text-align: center;
  margin: 4px;
`
const CardContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
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

interface CardProps {
  card: UnitCard
}
const Card = ({card}: CardProps) => {
  // const {attacker, defender} = useSelector((state: GlobalState) => ({...state}), shallowEqual)
  return (
    <CardContainer>
      <CardValue>{card.attack}</CardValue>
      <CardValue isDefend>{card.health}</CardValue>
      <div>
        {card.attackBonus?.map((bonus) => (
          <div key={bonus.type[0].type}>
            {bonus.value} {bonus.type.map((b) => b.type).join(' ')}
          </div>
        ))}
      </div>
    </CardContainer>
  )
}

interface UnitCardsProps {
  unit: Unit
}
const UnitCards = ({unit}: UnitCardsProps) => {
  return (
    <Container>
      <Title>Cards values</Title>
      {unit.cards.map((card, ind) => (
        <Card card={card} key={`${ind}-${card.attack}${card.health}`} />
      ))}
    </Container>
  )
}

export default UnitCards
