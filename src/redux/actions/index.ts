import {ActionType, createAction} from 'typesafe-actions'
import {Unit} from '../../types/models'

const actions = {
  setAttacker: createAction('SET_ATTACKER')<Unit>(),
  setDefender: createAction('SET_DEFENDER')<Unit>(),
  setOpenAttackList: createAction('SET_ATTACK_LIST_OPEN')<boolean>(),
  setOpenDefendList: createAction('SET_DEFEND_LIST_OPEN')<boolean>(),
  toggleAttackList: createAction('TOGGLE_ATTACK_LIST')<undefined>(),
  toggleDefendList: createAction('TOGGLE_DEFEND_LIST')<undefined>(),
  toggleLists: createAction('TOGGLE_LISTS')<undefined>(),
}

export type RootAction = ActionType<typeof actions>
export default actions
