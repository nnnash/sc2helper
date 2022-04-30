import React, {FC, useCallback, useRef} from 'react'
import {styled} from '@linaria/react'

import {EVENT_DECKS} from '../../../data/events'
import {download} from '../utils'
import EventCard from './EventCard'
import space from '../img/space.jpg'
import {EventCard as TEventCard} from '../../../types/raw'

const Container = styled.div`
  position: relative;
  width: 5000px;
  height: 4900px;
  background-image: url('${space}');
  background-size: cover;
`
const DeckContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const EventDeck: FC<{stage: TEventCard['stage']}> = ({stage}) => {
  const ref = useRef<HTMLDivElement>(null)
  const onClick = useCallback(() => {
    download(ref, `event-deck-${stage}`)
  }, [ref])
  return (
    <Container ref={ref} onClick={onClick}>
      <DeckContainer>
        {EVENT_DECKS[stage].map((eventCard, ind) => (
          <EventCard card={eventCard} key={`event-card-${stage}-${ind}`} />
        ))}
      </DeckContainer>
    </Container>
  )
}

const Events: FC = () => {
  return (
    <>
      {([1, 2, 3] as [1, 2, 3]).map((stage) => (
        <EventDeck key={`event-cards-${stage}`} stage={stage} />
      ))}
    </>
  )
}

export default Events
