import {ActionType, createAction} from 'typesafe-actions'
import {Unit} from '../../types/models'

const actions = {
  setAttacker: createAction('SET_ATTACKER')<Unit>(),
  setDefender: createAction('SET_DEFENDER')<Unit>(),
}

export type RootAction = ActionType<typeof actions>
export default actions
