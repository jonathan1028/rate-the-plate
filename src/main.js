import Vue from 'vue'
import Vuex from 'vuex'
import apolloProvider from './apollo-provider'
import App from './App'
import router from './router'
import { GC_USER_ID } from './constants/settings'
import store from './store/index'
import moment from 'moment'

let userId = localStorage.getItem(GC_USER_ID)

Vue.use(Vuex)

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})
Vue.filter('relativeTime', function (value) {
  if (value) {
    return moment(String(value)).startOf('day').fromNow()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  router,
  store,
  data: {
    userId
  },
  render: h => h(App)
})
