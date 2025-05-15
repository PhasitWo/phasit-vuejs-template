import { createStore, type ActionTree, type Module, type MutationTree } from 'vuex'
import api from '../axios'

interface Book {
  author_name: string[]
  cover_i: number
  first_publish_year: number
  title: string
}

interface BookList {
  numFound: number
  items: Book[]
}

interface LibraryStateType {
  bookList: BookList
  book: Book | null
}

interface Params {
  query?: string
  page?: number
  itemPerPage?: number
}

const state: LibraryStateType = {
  bookList: { numFound: 0, items: [] },
  book: null,
}

const mutations: MutationTree<LibraryStateType> = {
  SET_BOOK_LIST(state, payload) {
    state.bookList = payload
    return state
  },
}

const actions: ActionTree<LibraryStateType, any> = {
  async getBookList(context, params?: Params) {
    let requestURL = '/search.json?q=the+lord+of+the+rings&limit=10'
    if (params)
      requestURL = `/search.json?q=${params.query}&page=${params.page}&limit=${params.itemPerPage}`
    try {
      context.dispatch('toggleLoading')
      const resp = await api.get(requestURL)
      const bookList: BookList = { numFound: resp.data.numFound, items: resp.data.docs }
      bookList.items = bookList.items.filter((v) => v.cover_i !== undefined)
      context.commit('SET_BOOK_LIST', bookList)
    } catch (e) {
      alert(e)
    } finally {
      context.dispatch('toggleLoading')
    }
  },
  async getBook(context, id: string) {
    // TODO fetch
  },
}

export const library = { state, actions, mutations }
