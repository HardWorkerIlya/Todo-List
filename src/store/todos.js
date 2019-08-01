import moment from 'moment'
import { _get } from '@/utils/lodash'

const STORAGE_KEY = 'todo-list'

const state = {
  taskList: [],
  isLoading: false,
  isInputVisible: false
}

const actions = {
  getTasksByDate ({ commit }, { date }) {
    if (!date) return
    commit('SET_LOADING', true)

    let todos, storage

    try {
      storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')

      if (date.date === moment().format('YYYY-MM-DD'))
        todos = [..._get(storage, 'no_deadline', [])]

      todos = [..._get(storage, `${date.year}.${date.month}.${date.day}`, [])]

      commit('SET_TASK_LIST', todos)
    } catch (e) {
      throw (e)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const mutations = {
  SET_LOADING (state, action) {
    state.isLoading = action
  },
  SET_TASK_LIST (state, todos) {
    state.taskList = todos
  },
  SET_INPUT_VISIBILITY (state, bool) {
    state.isInputVisible = bool
  }
}

export default {
  state,
  actions,
  mutations,
  namespaced: true
}