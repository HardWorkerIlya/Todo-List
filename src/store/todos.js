import moment from 'moment'
import { _get } from '@/utils/lodash'

const STORAGE_KEY = 'todo-list'

const state = {
  taskList: [],
  isLoading: false,
  isInputVisible: false
}

const actions = {
  getTasksByDate ({ commit } ) {
    // if (!date) return
    commit('SET_LOADING', true)

    let todos, storage

    try {
      storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')

      // if (date.date === moment().format('YYYY-MM-DD'))
      //   todos = [..._get(storage, 'no_deadline', [])]
      todos = [..._get(storage, 'no_deadline', [])]

      // todos = [..._get(storage, `${date.year}.${date.month}.${date.day}`, [])]

      commit('SET_TASK_LIST', todos)
    } catch (e) {
      throw (e)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  addTaskByDate ({ commit, dispatch }, { task, date }) {
    commit('SET_LOADING', true)
    let currentDate = moment().format('YYYY-MM-DD')
    let due_date = !date ? currentDate : date.date

    let taskObject

    try {
      taskObject = {
        task,
        due_date,
        desc: '',
        tag: '',
        commpleted: false,
        visible: true,
        created_at: new Date(),
        updated_at: new Date()
      }
      commit('ADD_TASK', { task: taskObject, date: currentDate})
    } catch (e) {
      commit('SET_LOADING', false)
      throw (e)
    } finally {
      dispatch('getTasksByDate')
    }
  },
  updateTaskComplete ({ commit }, index) {
    commit('UPDATE_TASK_COMPLETE', index)
  }
}

const mutations = {
  ADD_TASK (state, { task }) {
    state.taskList.push(task)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ no_deadline: state.taskList }))
    state.isLoading = false
  },
  UPDATE_TASK_COMPLETE (state, index) {
    state.taskList[index].completed = !state.taskList[index].completed
    state.taskList[index].updated_at = new Date()
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ no_deadline: state.taskList }))
  },
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