import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authInstance: false,
    isAuthenticated: false,
    count: 0,
    person: {},
    showCreatePerson: false,
    showCreateOpportunity: false,
    showCreateExpense: false
  },
  mutations: {
    increment (state) {
      state.count++
    },
    toggleDisplay (state) {
      state.showCreatePerson = !state.showCreatePerson
    },
    toggleCreateOpportunity (state) {
      state.showCreateOpportunity = !state.showCreateOpportunity
    },
    toggleCreateExpense (state) {
      state.showCreateExpense = !state.showCreateExpense
    },
    toggleAuthentication (state) {
      state.isAuthenticated = !state.isAuthenticated
    }
  }
})

export default store
