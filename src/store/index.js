import Vue from 'vue'
import Vuex from 'vuex'

import todos from './todos'

Vue.use(Vuex)
const modules = {
  todos
}

const strict = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict
})
