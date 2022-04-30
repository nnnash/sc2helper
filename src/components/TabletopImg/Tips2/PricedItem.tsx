import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {TBuilding, TTech, Unit} from 'types/models'
import palette from '../styling/palette'
import {getUnitImage} from '../../UnitImage'
import UnitTitle from 'components/UnitTitle'
import Attributes from '../common/Attributes'
import {blockShadow} from '../styling/shared'
import {TECHS} from '../../../data/techs'
import Tech from './Tech'

const Container = styled.div`
  clear: left;
`
const ImgWrapper = styled.div`
  float: left;
`
const BuildImg = styled.img`
  width: 90px;
`
const Resource = styled.div`
  font-size: 20px;
  font-weight: bold;
`
const Mineral = styled(Resource)`
  color: ${palette.mineral};
`
const Gas = styled(Resource)`
  color: ${palette.gas};
`
const BuildPrice = styled.div`
  display: flex;
  justify-content: space-around;
`
const UnitWrapper = styled.div`
  :not(:first-child) {
    clear: left;
  }
`
const UnitTitleWrapper = styled(ImgWrapper)`
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 14px;
`
const Title = styled(UnitTitle)`
  position: absolute;
  width: 120px;
  max-width: unset;
  top: 0;
  left: 0;
  box-shadow: none;
  border: 1px solid white;
  padding: 2px 8px;
  text-align: left;
`
const UnitImg = styled.img`
  width: 80px;
`
const AttributesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 30px;
  > * {
    margin-left: 4px;
  }
`
const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 8px;
`
const Card = styled.div`
  display: flex;
  margin-right: 10px;
  > * {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    height: 30px;
    width: 30px;
    background-color: #031e3a;
    color: #48de48;
    ${blockShadow}
    :first-child {
      color: red;
    }
  }
`
const CardBonusesWrapper = styled.div`
  padding-bottom: 6px;
  font-size: 12px;
  font-weight: bold;
`
const CardBonus = styled.div<{color: string}>`
  color: ${(p) => p.color};
`

interface UnitProps {
  unit: Unit
  techs: Array<TTech>
}
export const PricedItem: FC<UnitProps> = ({unit, techs}) => (
  <UnitWrapper>
    <UnitTitleWrapper>
      <div>
        <Mineral>{unit.minerals}</Mineral>
        <Gas>{unit.gas}</Gas>
      </div>
      <UnitImg src={getUnitImage(unit.name)} alt="init" />
      <Title>{unit.name}</Title>
    </UnitTitleWrapper>
    <AttributesWrapper>
      <Attributes unit={unit} />
    </AttributesWrapper>
    {!!unit.mutationFrom && (
      <div>
        Morphs from {unit.mutationFrom.length === 1 ? '' : 'two of '}
        {unit.mutationFrom.join(' or ')}
      </div>
    )}
    <CardsWrapper>
      {unit.cards.map((card, ind) => (
        <div key={`${unit.name}-card-${ind}`}>
          <Card>
            <div>{card.attack}</div>
            <div>{card.health}</div>
          </Card>
          {!!(card.attackBonus?.[0] || card.healthBonus?.[0]) && (
            <CardBonusesWrapper>
              {card.attackBonus?.map((bonus) => (
                <CardBonus key={bonus.type[0].type} color="#8e2a2a">
                  {bonus.value} {bonus.type.map((b) => b.type).join(' ')}
                </CardBonus>
              ))}
              {card.healthBonus?.map((bonus) => (
                <CardBonus key={bonus.type[0].type} color="green">
                  {bonus.value} {bonus.type.map((b) => `${b.negative ? 'non ' : ''}${b.type}`).join(' ')}
                </CardBonus>
              ))}
            </CardBonusesWrapper>
          )}
        </div>
      ))}
    </CardsWrapper>
    {!!unit.feature && <div>{unit.feature}</div>}
    {[unit.tech1, unit.tech2, unit.tech3, unit.tech4].map((tech) => {
      if (!tech) return null
      const techData = techs.find((t) => t.name === tech)
      if (!techData) return null
      return (
        <div key={`${unit.name}-tech-${techData.name}`}>
          <Tech tech={techData} />
        </div>
      )
    })}
  </UnitWrapper>
)

interface Props {
  building: TBuilding
  units: Array<Unit>
  mutant?: Unit
}
const Building: FC<Props> = ({building, units, mutant}) => {
  const techs = TECHS[building.race]
  return (
    <Container>
      <ImgWrapper>
        <BuildImg src={building.img} alt="building" />
        {!!building.name && (
          <BuildPrice>
            <Mineral>{building.minerals}</Mineral>
            <Gas>{building.gas}</Gas>
          </BuildPrice>
        )}
      </ImgWrapper>
      <div>
        {[...units, ...(mutant ? [mutant] : [])].map((unit) => (
          <PricedItem key={`building-unit-${unit.name}`} unit={unit} techs={techs} />
        ))}
      </div>
    </Container>
  )
}

export default Building
