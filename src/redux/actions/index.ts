import {ActionType, createAction} from 'typesafe-actions'
import {PricedItem, PriceItemType, Race, Unit} from '../../types/models'

const actions = {
  addPurchase: createAction('ADD_PURCHASE')<PricedItem>(),
  resetPurchases: createAction('RESET_PURCHASES')<undefined>(),
  removePurchase: createAction('REMOVE_PURCHASE')<PricedItem['name']>(),
  setAttacker: createAction('SET_ATTACKER')<Unit>(),
  setDefender: createAction('SET_DEFENDER')<Unit>(),
  setFilter: createAction('SET_FILTER')<PriceItemType | null>(),
  setInitialMineral: createAction('SET_INITIAL_MINERAL')<number>(),
  setInitialGas: createAction('SET_INITIAL_GAS')<number>(),
  setMinerals: createAction('SET_MINERALS')<number>(),
  setGas: createAction('SET_GAS')<number>(),
  setOpenAttackList: createAction('SET_ATTACK_LIST_OPEN')<boolean>(),
  setOpenDefendList: createAction('SET_DEFEND_LIST_OPEN')<boolean>(),
  setRace: createAction('SET_RACE')<Race>(),
  setWorkerAmount: createAction('SET_WORKER_AMOUNT')<number>(),
  toggleAttackList: createAction('TOGGLE_ATTACK_LIST')<undefined>(),
  toggleDefendList: createAction('TOGGLE_DEFEND_LIST')<undefined>(),
  toggleLists: createAction('TOGGLE_LISTS')<undefined>(),
  togglePriceModal: createAction('TOGGLE_PRICE_MODAL')<boolean>(),
}

export type RootAction = ActionType<typeof actions>
export default actions
