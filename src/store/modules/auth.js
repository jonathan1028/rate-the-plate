import Authenticator from '../../auth/Authenticator'
import router from '../../router/index'
import { GC_USER_ID } from '../../constants/settings'
import apolloClient from '../../apollo-client'
import { GET_USER_QUERY, CREATE_USER_MUTATION } from '../../constants/graphql'
const jwt = require('jsonwebtoken')

const auth = new Authenticator()

const state = {
  userId: '',
  authenticated: !!localStorage.getItem('access_token'),
  accessToken: localStorage.getItem('access_token'),
  idToken: localStorage.getItem('id_token'),
  expiresAt: localStorage.getItem('expires_at')
}

const getters = {
  authenticated (state) {
    return state.authenticated
  },
  userId (state) {
    return state.userId
  }
}

const mutations = {
  authenticated (state, authData) {
    state.authenticated = true
    state.accessToken = authData.accessToken
    state.idToken = authData.idToken
    state.expiresAt = authData.expiresIn * 1000 + new Date().getTime()

    localStorage.setItem('access_token', state.accessToken)
    localStorage.setItem('id_token', state.idToken)
    localStorage.setItem('expires_at', state.expiresAt)
    // Decodes entire idToken and pulls out the userId portion
    state.auth0UserId = jwt.decode(state.idToken).sub
    state.email = jwt.decode(state.idToken).email
    console.log('Email', state.email)
    console.log('idToken', jwt.decode(state.idToken))
    localStorage.setItem('auth0UserId', state.auth0UserId)
    console.log('auth0UserId', localStorage.getItem('auth0UserId'))
    // Checks to see if the auth0 user has been created in the GraphCool db yet
    // let created = false
  },

  userId (state, userId) {
    console.log('User ID set')
    state.userId = userId
  },

  logout (state) {
    state.authenticated = false
    state.accessToken = null
    state.idToken = false

    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('auth0UserId')
    localStorage.removeItem(GC_USER_ID)
    // navigate to the home route
    router.replace('home')
  }
}

const actions = {
  login () {
    auth.login()
  },

  logout ({ commit }) {
    commit('logout')
  },

  handleAuthentication ({ commit, dispatch }) {
    auth.handleAuthentication().then(authResult => {
      commit('authenticated', authResult)
      dispatch('setUser', authResult)
    }).catch(err => {
      console.log(err)
    })
  },

  setUser ({dispatch, commit}, authResult) {
    // let newUser = false
    console.log('setUser ran')
    apolloClient
      .query({
        query: GET_USER_QUERY,
        variables: {
          auth0UserId: localStorage.getItem('auth0UserId')
        }
      }).then(result => {
        console.log('Result', result)
        if (result.data.allUsers.length === 0) {
          console.log('UserId does not yet exist')
          return null
        } else {
          const userId = result.data.allUsers[0].id
          commit('userId', userId)
          console.log('UserId', userId)
          localStorage.setItem(GC_USER_ID, userId)
          console.log('Stringify', JSON.stringify(result.data.allUsers[0]))
          localStorage.setItem('user', JSON.stringify(result.data.allUsers[0]))
          console.log('Full User Object', JSON.parse(localStorage.getItem('user')))
          return userId
        }
      }).then(async userId => {
        if (userId === null) {
          const getUserId = new Promise((resolve, reject) => {
            resolve(dispatch('createUser', authResult))
          })
          let newUserId = await getUserId
          return newUserId
        } else {
          return userId
        }
      }).then(async result => {
        await result
        router.replace('expenses')
      })
  },
  // Creates user in graphCool
  createUser ({dispatch, commit, state}, authResult) {
    console.log('Create user run')
    apolloClient
      .mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
          idToken: authResult.idToken,
          name: '',
          email: state.email
        }
      }).then((result) => {
        // Collects the graphcool user id that corresponds to the auth0UserId
        console.log('Result2', result)
        const userId = result.data.createUser.id
        commit('userId', userId)
        console.log('User created!', userId)
        localStorage.setItem(GC_USER_ID, userId)
        localStorage.setItem('user', JSON.stringify(result.data.createUser))
        return userId
      }).catch((error) => {
        console.error(error)
      })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
