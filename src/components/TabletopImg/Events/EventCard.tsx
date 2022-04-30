import React, {FC} from 'react'
import {styled} from '@linaria/react'
import {EventCard as TEventCard} from '../../../types/raw'
import {ATTRIBUTES} from '../../../models/attributes'
import {ATTR as attrAbbr} from '../../../data/units'
import {ComplexIcon} from '../../Icon'

const Container = styled.div`
  width: 500px;
  height: 700px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  text-align: center;
`
const Title = styled.h1<{color: string}>`
  font-size: 40px;
  color: white;
  background: ${(p) => p.color};
  margin-top: 0;
  margin-bottom: 10px;
  padding: 0 30px;
  border-radius: 20px 20px 0 0;
  height: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px 30px;
  background: rgba(255, 255, 255, 0.85);
  flex-grow: 1;
  border-radius: 0 0 20px 20px;
  font-size: 28px;
  & * {
    margin: 0 0 10px;
  }
`
const Strategy = styled.h3`
  font-style: italic;
  font-weight: bold;
  font-size: 36px;
`
const PlaceInArea = styled.h4`
  font-weight: bold;
`
const DiscardAt = styled.div`
  font-style: italic;
`
const Or = styled.div`
  font-weight: bold;
  &:after {
    content: 'OR';
  }
`
const StageSize = 60
const Stage = styled.div<{color: string}>`
  position: absolute;
  bottom: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: ${StageSize}px;
  width: ${StageSize}px;
  color: white;
  background: ${(p) => p.color};
  font-weight: bold;
  font-size: 26px;
  font-family: Arial, sans-serif;
  border: 2px solid white;
`
const AttrIcon = styled.span`
  vertical-align: middle;
  > div {
    display: inline-block;
  }
  * {
    margin-bottom: 0;
  }
`

const COLORS = {
  1: '#532b5a',
  2: '#7b3019',
  3: '#275875',
}

const enrichWithAttribute = (text: string) => {
  const re = /{.{1,2}}/g
  return {texts: re[Symbol.split](text), symbols: text.match(re)}
}
const iconProps = {
  customStyle: {minWidth: '20', width: '20'},
  size: 40,
  noPadding: true,
  noTooltip: true,
}

const EventCard: FC<{card: TEventCard}> = ({card}) => {
  const {symbols, texts} = enrichWithAttribute(card.text)
  return (
    <Container>
      <Title color={COLORS[card.stage]}>{card.name}</Title>
      <Content>
        {!!card.strategy && <Strategy>Strategy</Strategy>}
        {!!(card.strategy || card.end || card.start || card.playarea) && (
          <PlaceInArea>Place it in your play area</PlaceInArea>
        )}
        {!!card.start && <DiscardAt>Discard at the start of {card.start}</DiscardAt>}
        {!!card.end && <DiscardAt>Discard at the end of {card.end}</DiscardAt>}
        <div>
          {texts.map((word, ind) => {
            let attr
            if (symbols?.[ind]) {
              const abbr = symbols[ind].match(/{(.*)}/)
              if (abbr?.[1]) {
                attr = ATTRIBUTES[attrAbbr[abbr[1]]]
              }
            }
            return (
              <React.Fragment key={`${word}-${ind}`}>
                <span>{word}</span>
                {!!attr && (
                  <AttrIcon>
                    <ComplexIcon mainIconAttribute={attr} iconProps={iconProps} />
                  </AttrIcon>
                )}
              </React.Fragment>
            )
          })}
        </div>
        {!!card.alternative && (
          <>
            <Or />
            {card.alternative}
          </>
        )}
        {!!(card.z && card.p && card.t) && (
          <>
            <div>{card.t}</div>
            <Or />
            <div>{card.z}</div>
            <Or />
            <div>{card.p}</div>
          </>
        )}
        {!!card.strategy && (
          <div>
            You must discard this card if you execute another <i>Strategy</i> Event card
          </div>
        )}
        <Stage color={COLORS[card.stage]}>{'|||'.slice(0, card.stage)}</Stage>
      </Content>
    </Container>
  )
}

export default EventCard
