import { type ActionTree, type GetterTree, type Module, type MutationTree } from 'vuex'
import api from '../axios'
import { toRaw } from 'vue'

export interface Book {
  author_name: string[]
  cover_i?: number
  first_publish_year: number
  title: string
  key: string
}

interface BookList {
  numFound: number
  items: Book[]
}

interface LibraryStateType {
  bookList: BookList
  book: Book | null
  watchlist: Book[]
}

export interface SearchParams {
  query?: string
  itemPerPage: number
}

const state: LibraryStateType = {
  bookList: { numFound: 0, items: [] },
  book: null,
  watchlist: [],
}

const mutations: MutationTree<LibraryStateType> = {
  SET_BOOK_LIST(state, payload) {
    state.bookList = payload
    return state
  },
  SET_WATCHLIST(state, payload) {
    state.watchlist = payload
    return state
  },
}

const actions: ActionTree<LibraryStateType, any> = {
  async fetchBookList(context, params?: SearchParams) {
    let requestURL = '/search.json?title=the&limit=12&page=1'
    if (params) requestURL = `/search.json?title=${params.query}&page=1&limit=${params.itemPerPage}`
    try {
      const resp = await api.get(requestURL)
      const bookList: BookList = { numFound: resp.data.numFound, items: resp.data.docs }

      context.commit('SET_BOOK_LIST', bookList)
    } catch (e) {
      console.warn(e)
    }
  },
  async fetchWatchlist(context) {
    const raw = localStorage.getItem('watchlist')
    if (raw === null || raw === '') return
    const wtchls = JSON.parse(raw) as Book[]
    context.commit('SET_WATCHLIST', wtchls)
  },

  async addWatchlist(context, targetBook: Book) {
    // set state
    const newState = [...context.state.watchlist]
    newState.push(targetBook)
    // save to localstorage
    const converted = []
    for (let o of newState) {
      const obj = o as any
      if (obj.__v_isRef) converted.push(toRaw(obj._value))
      else converted.push(obj)
    }
    localStorage.setItem('watchlist', JSON.stringify(converted))
    await context.dispatch('fetchWatchlist')
  },
  async removeFromWatchlist(context, key: string) {
    // set state
    const newState = context.state.watchlist.filter((v) => v.key !== key)
    // save to localstorage
    const converted = []
    for (let o of newState) {
      const obj = o as any
      if (obj.__v_isRef) converted.push(toRaw(obj._value))
      else converted.push(obj)
    }
    localStorage.setItem('watchlist', JSON.stringify(converted))
    await context.dispatch('fetchWatchlist')
  },
}

const getters: GetterTree<LibraryStateType, any> = {
  getBookByIndex: (state) => (index: number) => {
    return state.bookList.items.find((_, i) => index === i)
  },
}

export const library = { state, actions, mutations, getters }
