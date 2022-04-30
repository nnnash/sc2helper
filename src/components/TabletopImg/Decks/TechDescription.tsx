import React, {FC} from 'react'
import {styled} from '@linaria/react'

import {BONUS} from '../../../models/attributes'
import {BONUS as bonusAbbr} from '../../../data/units'
import {ComplexIcon} from '../../Icon'

const BonusIcon = styled.span`
  vertical-align: middle;
  > div {
    display: inline-block;
  }
`

const enrichWithAttribute = (text: string) => {
  const re = /{.{1,2}}/g
  return {texts: re[Symbol.split](text), symbols: text.match(re)}
}
const iconProps = {
  customStyle: {minWidth: '60px', width: '60px'},
  size: 60,
  noPadding: true,
  noTooltip: true,
}
const TechDescription: FC<{text: string}> = ({text}) => {
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

export default TechDescription
