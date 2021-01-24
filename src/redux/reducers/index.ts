import {createReducer} from 'typesafe-actions'

import {Unit} from '../../types/models'
import actions, {RootAction} from '../actions'

export interface GlobalState {
  attacker?: Unit
  defender?: Unit
  attackListOpen: boolean
  defendListOpen: boolean
}

const initialStore: GlobalState = {
  attackListOpen: true,
  defendListOpen: false,
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

export default reducer
