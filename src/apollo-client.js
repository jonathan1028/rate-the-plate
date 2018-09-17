import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
// import ApolloClient from 'apollo-boost'
import { withClientState } from 'apollo-link-state'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { GC_AUTH_TOKEN } from './constants/settings'
import { WebSocketLink } from 'apollo-link-ws'
// import { ApolloLink, concat, split } from 'apollo-link'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import gql from 'graphql-tag'

// Create an http link:
const httpLink = new HttpLink({
  // You should use an absolute URL here
  // uri: 'http://localhost:4000/graphql'
  uri: 'https://api.graph.cool/simple/v1/cjgn20e3o4i1w0105pjn3t5p6'
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  // uri: `ws://localhost:5000/`,
  uri: 'wss://subscriptions.graph.cool/v1/cjeq87ww03gm801881tjhtlyu',
  options: {
    reconnect: true,
    // carry login state (should use secure websockets (wss) when using this)
    connectionParams: {
      authToken: localStorage.getItem(GC_AUTH_TOKEN)
    }
  }
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem(GC_AUTH_TOKEN) || null
    }
  })
  return forward(operation)
})

export const cache = new InMemoryCache(window.__APOLLO_STATE)
// let nextId = 0

const resolvers = {
  Mutation: {
    updateHello (_, { message }, { cache }) {
      const data = {
        hello: {
          __typename: 'Hello',
          msg: message
        }
      }

      return cache.writeData({ data })
    },
    addIngredient (_, { ingredient }, { cache }) {
      const query = gql`
        query {
          ingredients @client 
        }
      `
      const ingredients = cache.readQuery({ query }).ingredients.slice(0)
      // const newIngredient = {
      //   id,
      //   name,
      //   __typename: 'ProductTemplate'
      // }
      ingredients.push(ingredient)
      cache.writeQuery({
        query: query,
        data: {ingredients: ingredients}
      })
      return null
    }
  },
  sampleAddIngredient (_, { id, name }, { cache }) {
    const query = gql`
      query {
        ingredients @client 
      }
    `
    const ingredients = cache.readQuery({ query }).ingredients.slice(0)
    const newIngredient = {
      id,
      name,
      __typename: 'ProductTemplate'
    }
    ingredients.push(newIngredient)
    cache.writeQuery({
      query: query,
      data: {ingredients: ingredients}
    })
    return null
  }
}

const stateLink = withClientState({
  cache,
  resolvers,
  defaults: {
    isEditMode: false,
    showCreateRecipeModal: false,
    ingredients: [],
    hello: {
      __typename: 'Hello',
      msg: 'world'
    }
  }
})

// const defaultState = { isEditMode: false }

// Create the apollo client
export const apolloClient = new ApolloClient({
  // authMiddleware adds authentication tokens
  link: ApolloLink.from([stateLink, authMiddleware, link]),
  cache: cache,
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)

export default apolloClient
