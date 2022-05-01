import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {TTech, Unit} from 'types/models'
import palette from '../styling/palette'
import UnitTitle from 'components/UnitTitle'
import Attributes from '../common/Attributes'
import {blockShadow} from '../styling/shared'
import Tech from './Tech'

const ImgWrapper = styled.div`
  float: left;
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
const Title = styled(UnitTitle)<{isUnit: boolean}>`
  position: absolute;
  width: ${(p) => (p.isUnit ? 130 : 160)}px;
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
  padding-left: 40px;
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
    color: ${palette.health};
    ${blockShadow}
    :first-child {
      color: ${palette.attack};
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
const Feature = styled.div<{isUnit: boolean}>`
  padding-top: ${(p) => (p.isUnit ? 0 : '24px')};
  margin: 8px;
`

interface Item extends Partial<Unit> {
  name: Unit['name']
  minerals: Unit['minerals']
  gas: Unit['gas']
  feature?: Unit['feature']
}
const isUnit = (item: Item): item is Unit => {
  return !!item.attributes
}
interface Props {
  item: Item
  techs: Array<TTech>
  img: string
}
export const PricedItem: FC<Props> = ({item, img, techs}) => (
  <UnitWrapper>
    <UnitTitleWrapper>
      <div>
        <Mineral>{item.minerals}</Mineral>
        <Gas>{item.gas}</Gas>
      </div>
      <UnitImg src={img} alt="init" />
      <Title isUnit={isUnit(item)}>{item.name}</Title>
    </UnitTitleWrapper>
    {isUnit(item) && (
      <>
        <AttributesWrapper>
          <Attributes unit={item} />
        </AttributesWrapper>
        {!!item.mutationFrom && (
          <div>
            Morphs from {item.mutationFrom.length === 1 ? '' : 'two of '}
            {item.mutationFrom.join(' or ')}
          </div>
        )}
        <CardsWrapper>
          {item.cards.map((card, ind) => (
            <div key={`${item.name}-card-${ind}`}>
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
      </>
    )}
    {!!item.feature && <Feature isUnit={isUnit(item)}>{item.feature}</Feature>}
    {[item.tech1, item.tech2, item.tech3, item.tech4].map((tech) => {
      if (!tech) return null
      const techData = techs.find((t) => t.name === tech)
      if (!techData) return null
      return (
        <div key={`${item.name}-tech-${techData.name}`}>
          <Tech tech={techData} />
        </div>
      )
    })}
  </UnitWrapper>
)

export default PricedItem
