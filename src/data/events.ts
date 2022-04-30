import d from './data.json'
import {EventCard, Raw} from '../types/raw'

const data = d as Raw

export const EVENT_DECKS = data.events.reduce<{1: Array<EventCard>; 2: Array<EventCard>; 3: Array<EventCard>}>(
  (acc, event) => {
    const addedItems = Array.from<EventCard>({length: event.amount ?? 1}).fill(event)
    acc[event.stage] = acc[event.stage].concat(addedItems)
    return acc
  },
  {
    1: [],
    2: [],
    3: [],
  },
)
