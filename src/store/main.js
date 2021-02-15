import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tables: []
  },
  getters: {
    tables: state => state.tables
  },
  mutations: {
    saveTable(state, table) {
      state.tables.push(table)
    }
  }
})

export default store
