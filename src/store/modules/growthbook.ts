import type { ActionTree, GetterTree, MutationTree } from 'vuex'

interface GBStateType {
  isRed: boolean
}

const state: GBStateType = {
  isRed: true,
}

const mutations: MutationTree<GBStateType> = {
  SET_IS_RED(state, payload) {
    state.isRed = payload
    return state
  },
}

const actions: ActionTree<GBStateType, any> = {
  setIsRed(context, status: boolean) {
    context.commit('SET_IS_RED', status)
  },
}

// not used
const getters: GetterTree<GBStateType, any> = {
  getIsRedFlag() {
    return state.isRed
  },
}

export const gb = { state, actions, mutations, getters }
