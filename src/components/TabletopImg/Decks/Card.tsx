import React, {FC, useEffect, useRef, useState} from 'react'
import {styled} from '@linaria/react'

import {BattleCard, TechCard} from '../../../types/models'
import {bgCardImagePositionByColor, bgImageByColor, FactionColor, raceByColor} from '../models'
import {blockShadow} from '../styling/shared'
import palette from '../styling/palette'
import {getUnitImage} from '../../UnitImage'
import Icon from '../../Icon'
import {ATTRIBUTES} from '../../../models/attributes'
import {logoMap} from '../../../data/race'
import TechDescription from './TechDescription'

const Container = styled.div<{color: FactionColor}>`
  width: 500px;
  height: 700px;
  background-image: ${(p) => `url("${bgImageByColor[p.color]}")`};
  background-position: ${(p) => bgCardImagePositionByColor[p.color]};
`
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
`
const Content = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  top: 30px;
  left: 30px;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
`
const TopLine = styled.div`
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
`
const ValueBase = styled.div<{isAttack?: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: #031e3a;
  color: ${(p) => (p.isAttack ? palette.attack : palette.health)};
  ${blockShadow};
`
const Value = styled(ValueBase)`
  font-size: 50px;
  width: 90px;
  height: 100%;
`
const SmallValue = styled(ValueBase)`
  font-size: 30px;
  width: 60px;
  height: 50px;
`
const Divider = styled.div`
  flex: 1;
`
const UnitsBlock = styled.div`
  margin: 6px;
  border: 4px solid #0a62bf;
  background: rgba(46, 111, 223, 0.25);
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const Unit = styled.div<{isSmall?: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;

  img {
    height: ${(p) => (p.isSmall ? 80 : 120)}px;
  }
  span {
    font-size: ${(p) => (p.isSmall ? 20 : 30)}px;
    font-weight: bold;
    text-align: center;
  }
`
const Text = styled.div<{fontSizeDivider: number}>`
  text-align: center;
  font-size: ${(p) => 36 / p.fontSizeDivider}px;
  font-weight: bold;
  padding: 10px;
`
const AttributeIconWrapper = styled.div`
  svg {
    height: 140px;
    width: 140px;
  }
`
const AssistFlag = styled.span`
  display: inline-block;
  font-weight: bold;
  font-size: 40px;
  width: 140px;
  text-align: center;
  background: linear-gradient(90deg, #b46d3e, rgb(223, 175, 48), #b46d3e);
  margin: 0 10px;
  border-color: #a7a704;
  border-style: solid;
  border-width: 1px 0;
  box-shadow: 0 0 8px 1px black;
`
const Title = styled.h2`
  font-size: 40px;
  color: #031e3a;
  text-align: center;
  margin: 10px 0;
`
const Description = styled.div`
  flex: 1;
`
const Price = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 60px;
  font-weight: bold;
  span {
    margin: 0 20px;
  }
  & > *:first-child {
    color: ${palette.mineral};
  }
  & > *:last-child {
    color: ${palette.gas};
  }
`

interface Props {
  card?: BattleCard
  tech?: TechCard
  color: FactionColor
}
const Card: FC<Props> = ({card, tech, color}) => {
  const race = raceByColor[color]
  const attack = (card || tech)?.attack
  const health = (card || tech)?.health
  const smAttack = (card || tech)?.smAttack
  const smHealth = (card || tech)?.smHealth
  const units = (card || tech)?.units
  const contentRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(1)
  useEffect(() => {
    if (contentRef.current && !!tech) {
      if (contentRef.current.offsetHeight > 294) setFontSize(1.5)
    }
  }, [contentRef.current])
  return (
    <Container color={color}>
      <Overlay>
        <Content>
          <TopLine>
            <Value isAttack>{attack}</Value>
            <SmallValue isAttack>{smAttack}</SmallValue>
            {card?.assist || tech?.assistCard ? <AssistFlag>+</AssistFlag> : <Divider />}
            <SmallValue>{smHealth}</SmallValue>
            <Value>{health}</Value>
          </TopLine>
          <UnitsBlock>
            {units?.map((u) => (
              <Unit key={`card-deck-${u.name}`} isSmall={units?.length > 3}>
                <img src={getUnitImage(u.name)} alt="unit" />
                <span>{u.name}</span>
              </Unit>
            ))}
            {!!card?.attribute && (
              <AttributeIconWrapper>
                <Icon attribute={ATTRIBUTES[card.attribute]} />
              </AttributeIconWrapper>
            )}
            {!card?.attribute && !units?.length && <img src={logoMap[race]} alt="race logo" />}
          </UnitsBlock>
          <Description ref={contentRef}>
            {!!tech?.name && <Title>{tech.name}</Title>}
            {card?.text && <Text fontSizeDivider={fontSize}>{card?.text}</Text>}
            {tech?.description && (
              <Text fontSizeDivider={fontSize}>
                <TechDescription text={tech.description} />
              </Text>
            )}
            {!!tech?.cardBonus && <Text fontSizeDivider={fontSize}>Gets {tech.cardBonus}</Text>}
          </Description>
          {!!tech && (
            <Price>
              <span>{tech.minerals}</span>
              {tech.quantity > 1 && '..'}
              <span>{tech.gas}</span>
            </Price>
          )}
        </Content>
      </Overlay>
    </Container>
  )
}

export default Card
