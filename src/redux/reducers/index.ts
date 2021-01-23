import {createReducer} from 'typesafe-actions'

import {Unit} from '../../types/models'
import actions, {RootAction} from '../actions'

export interface GlobalState {
  attacker?: Unit
  defender?: Unit
}

const initialStore: GlobalState = {}

const reducer = createReducer<GlobalState, RootAction>(initialStore)
  .handleAction(actions.setAttacker, (state, {payload: attacker}): GlobalState => ({...state, attacker}))
  .handleAction(actions.setDefender, (state, {payload: defender}): GlobalState => ({...state, defender}))

export default reducer
