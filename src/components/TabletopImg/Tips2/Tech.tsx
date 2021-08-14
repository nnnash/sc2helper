import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {TTech} from 'types/models'
import {BONUS} from 'models/attributes'
import {BONUS as bonusAbbr} from 'data/units'
import {ComplexIcon} from '../../Icon'
import palette from '../styling/palette'
import {blockShadow} from '../styling/shared'

const Container = styled.div`
  margin: 8px;
`
const Title = styled.span`
  color: #1a3e7d;
  font-weight: bold;
  margin-right: 8px;
`
const AssistFlag = styled.span`
  display: inline-block;
  font-weight: bold;
  width: 40px;
  text-align: center;
  background: linear-gradient(90deg, #b46d3e, rgb(223, 175, 48), #b46d3e);
  margin: 0 10px;
  border-color: #a7a704;
  border-style: solid;
  border-width: 1px 0;
  box-shadow: 0 0 8px 1px black;
`
const BonusIcon = styled.span`
  vertical-align: middle;
  > div {
    display: inline-block;
  }
`
const Resource = styled.span`
  font-weight: bold;
`
const Mineral = styled(Resource)`
  color: ${palette.mineral};
  margin-right: 4px;
`
const Gas = styled(Resource)`
  color: ${palette.gas};
  margin-right: 8px;
`
const Cards = styled.div`
  display: inline-flex;
  justify-content: space-around;
`
const Card = styled.div`
  display: flex;
  margin-right: 10px;
  margin-left: 30px;
  > * {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    height: 30px;
    width: 30px;
    background-color: #434343;
    color: #48de48;
    ${blockShadow}
    :first-child {
      color: red;
    }
  }
`

const enrichWithAttribute = (text: string) => {
  const re = /{.{1,2}}/g
  return {texts: re[Symbol.split](text), symbols: text.match(re)}
}
const iconProps = {
  customStyle: {minWidth: '20px', width: '20px'},
  size: 20,
  noPadding: true,
  noTooltip: true,
}
const Description: FC<{text: string}> = ({text}) => {
  const {symbols, texts} = enrichWithAttribute(text)
  return (
    <>
      {texts.map((word, ind) => {
        let bonus
        if (symbols?.[ind]) {
          const abbr = symbols[ind].match(/{(.*)}/)
          if (abbr?.[1]) {
            bonus = BONUS[bonusAbbr[abbr[1]]]
          }
        }
        return (
          <React.Fragment key={`${word}-${ind}`}>
            <span>{word}</span>
            {!!bonus && (
              <BonusIcon>
                <ComplexIcon mainIconAttribute={bonus} iconProps={iconProps} />
              </BonusIcon>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

interface Props {
  tech: TTech
}
const Tech: FC<Props> = ({tech}) => {
  enrichWithAttribute(tech.description)
  return (
    <Container>
      <Title>{tech.name}</Title>
      <Mineral>{tech.minerals}</Mineral>
      <Gas>{tech.gas}</Gas>
      {tech.assistCard && <AssistFlag>+</AssistFlag>}
      <Description text={tech.description} />
      {!!tech.cardValues && (
        <Cards>
          {tech.cardValues.map((val, ind) => (
            <>
              <Card key={`tech-cards-${ind}`}>
                <div>{val[0]}</div>
                <div>{val[1]}</div>
              </Card>
              {!!tech.cardBonus && <ComplexIcon mainIconAttribute={BONUS[tech.cardBonus]} iconProps={iconProps} />}
            </>
          ))}
        </Cards>
      )}
    </Container>
  )
}

export default Tech
