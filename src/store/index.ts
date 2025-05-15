import { createStore, type ActionTree, type MutationTree } from 'vuex'
import { useStore as baseStore } from 'vuex'
import { library } from '@/store/modules/library'

export interface RootStateType {
  isLoading: boolean
}

export const state: RootStateType = {
  isLoading: false,
}

export const mutations: MutationTree<RootStateType> = {
  TOGGLE_LOADING(state) {
    state.isLoading = !state.isLoading
    return state
  },
}

export const actions: ActionTree<RootStateType, RootStateType> = {
  toggleLoading(context) {
    context.commit('TOGGLE_LOADING')
  },
}
export const useStore = baseStore<RootStateType & { library: typeof library["state"] }>
export const storePlugin = createStore({ state, actions, mutations, modules: { library } })
