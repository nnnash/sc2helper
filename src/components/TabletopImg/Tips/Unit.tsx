import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {Race, Unit} from '../../../types/models'
import UnitTitle from '../../UnitTitle'
import {getUnitImage} from '../../UnitImage'
import Attributes from '../common/Attributes'
import {blockShadow} from '../styling/shared'
import Tech from '../Tips2/Tech'
import {TECHS} from '../../../data/techs'

const Container = styled.div`
  background: rgba(255, 255, 255, 0.85);
  margin-bottom: 5px;
  display: flex;
  flex: 1;
`
const UnitBg = styled.div`
  padding-top: 10px;
  border: 2px solid #0a62bf;
  background: rgba(46, 111, 223, 0.25);
  margin: 2px;
  position: relative;
  width: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`
const Title = styled(UnitTitle)`
  position: absolute;
  width: 130px;
  max-width: unset;
  top: 0;
  left: 0;
  box-shadow: none;
  border: 1px solid white;
  padding: 2px 8px;
  text-align: left;
`
const Img = styled.img`
  height: 80px;
`
const Content = styled.div`
  font-size: 14px;
  flex: 1;
`
const AttributesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 40px;
  padding-top: 6px;
  > * {
    margin-left: 4px;
  }
`
const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 8px;
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
const Feature = styled.div`
  margin: 8px;
  font-size: 14px;
`

interface Props {
  unit: Unit
  race: Race
}
const UnitView: FC<Props> = ({unit, race}) => {
  const techs = TECHS[race]
  return (
    <Container>
      <UnitBg>
        <Title>{unit.name}</Title>
        <Img src={getUnitImage(unit.name)} alt="unit" />
      </UnitBg>
      <Content>
        <AttributesWrapper>
          <Attributes unit={unit} />
        </AttributesWrapper>
        {!!unit.cards.length && (
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
        )}
        {!!unit.feature && <Feature>{unit.feature}</Feature>}
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
      </Content>
    </Container>
  )
}

export default UnitView
