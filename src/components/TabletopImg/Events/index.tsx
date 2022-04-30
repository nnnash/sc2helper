import React, {FC, useCallback, useRef} from 'react'
import {styled} from '@linaria/react'

import {FactionColor, raceByColor} from '../models'
import {RACE_DECKS} from '../../../data/deck'
import Card from './Card'
import {download} from '../utils'

const Container = styled.div`
  position: relative;
  width: 5000px;
  height: 4900px;
`
const DeckContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface Props {
  color: FactionColor
}
const Decks: FC<Props> = ({color}) => {
  const ref = useRef<HTMLDivElement>(null)
  const onClick = useCallback(() => {
    download(ref, `deck-${color}`)
  }, [ref])
  const race = raceByColor[color]
  const {raceTechs, cards} = RACE_DECKS[race]
  return (
    <Container ref={ref} onClick={onClick}>
      <DeckContainer>
        {cards.map((c, ind) => (
          <Card color={color} card={c} key={`card-${color}-${ind}`} />
        ))}
        {raceTechs.map((rt, ind) => (
          <Card color={color} tech={rt} key={`tech-card-${color}-${ind}`} />
        ))}
      </DeckContainer>
    </Container>
  )
}

export default Decks
