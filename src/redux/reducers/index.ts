import {createReducer} from 'typesafe-actions'
import {omit} from 'lodash'

import {PricedItem, PriceItemType, Race, Unit} from '../../types/models'
import actions, {RootAction} from '../actions'

export interface GlobalState {
  attacker?: Unit
  defender?: Unit
  attackListOpen: boolean
  defendListOpen: boolean
  filter: PriceItemType | null
  race: Race
  initialMinerals: number
  initialGas: number
  minerals: number
  modalOpen: boolean
  gas: number
  workerAmount: number
  purchases: Record<string, PricedItem>
}

const initialStore: GlobalState = {
  attackListOpen: true,
  defendListOpen: false,
  race: Race.zerg,
  initialMinerals: 0,
  initialGas: 0,
  minerals: 6,
  gas: 3,
  workerAmount: 10,
  modalOpen: false,
  filter: null,
  purchases: {},
}

const reducer = createReducer<GlobalState, RootAction>(initialStore)
  .handleAction(actions.setAttacker, (state, {payload: attacker}): GlobalState => ({...state, attacker}))
  .handleAction(actions.setDefender, (state, {payload: defender}): GlobalState => ({...state, defender}))
  .handleAction(
    actions.setOpenAttackList,
    (state, {payload: attackListOpen}): GlobalState => ({
      ...state,
      attackListOpen,
      defendListOpen: attackListOpen ? false : state.defendListOpen,
    }),
  )
  .handleAction(actions.toggleAttackList, (state): GlobalState => ({...state, attackListOpen: !state.attackListOpen}))
  .handleAction(
    actions.setOpenDefendList,
    (state, {payload: defendListOpen}): GlobalState => ({
      ...state,
      defendListOpen,
      attackListOpen: defendListOpen ? false : state.attackListOpen,
    }),
  )
  .handleAction(actions.toggleDefendList, (state): GlobalState => ({...state, defendListOpen: !state.defendListOpen}))
  .handleAction(
    actions.toggleLists,
    (state): GlobalState => ({...state, defendListOpen: !state.defendListOpen, attackListOpen: !state.attackListOpen}),
  )
  .handleAction(actions.setRace, (state, {payload: race}) => ({...state, race, purchases: {}}))
  .handleAction(actions.setInitialGas, (state, {payload: initialGas}) => ({...state, initialGas}))
  .handleAction(actions.setInitialMineral, (state, {payload: initialMinerals}) => ({...state, initialMinerals}))
  .handleAction(actions.setMinerals, (state, {payload: minerals}) => ({...state, minerals}))
  .handleAction(actions.setGas, (state, {payload: gas}) => ({...state, gas}))
  .handleAction(actions.setWorkerAmount, (state, {payload: workerAmount}) => ({...state, workerAmount}))
  .handleAction(actions.togglePriceModal, (state, {payload: modalOpen}) => ({...state, modalOpen}))
  .handleAction(actions.setFilter, (state, {payload: filter}) => ({...state, filter}))
  .handleAction(actions.addPurchase, (state, {payload: item}) => ({
    ...state,
    purchases: {...state.purchases, [item.name]: item},
  }))
  .handleAction(actions.removePurchase, (state, {payload: itemName}) => ({
    ...state,
    purchases: omit(state.purchases, itemName),
  }))

export default reducer
