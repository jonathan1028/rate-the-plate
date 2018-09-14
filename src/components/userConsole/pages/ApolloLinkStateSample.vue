<template>
  <div class="page">
    <h1>Recipes</h1>
    <button
      @click="create"
    >
      New Recipe
    </button>
    <div>{{isEditMode}}</div>
    <div>{{hello.msg}}</div>
    <div>
      <form class="search">
        <input name="query" v-model="searchQuery" placeholder="Search">
      </form>
      <base-table
        :data="query"
        :columns="columns"
        :filter-key="searchQuery">
      </base-table>
    </div>
  </div>
</template>

<script>
import BaseTable from '../modules/BaseTable'
import { ALL_RECIPES_QUERY } from '../../../constants/graphql'
import gql from 'graphql-tag'
import { apolloClient, cache } from '../../../apollo-client'
// import { cache } from '../../../apollo-client'

export default {
  name: 'RecipesPage',
  components: {
    BaseTable
  },
  data () {
    return {
      query: [],
      sortColumn: '',
      searchQuery: '',
      isEditMode: false,
      hello: '',
      columns: [
        {dbField: 'name', title: 'name'}
        // {dbField: 'category', title: 'category'},
        // {dbField: 'price', title: 'price'},
        // {dbField: 'unit', title: 'unit'},
        // {dbField: 'createdAt', title: 'createdAt'}
      ]
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allRecipes: {
      query: ALL_RECIPES_QUERY,
      // variables () {
      //   return {
      //     shoppingListId: this.$route.params.id
      //   }
      // },
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = data.allRecipes
        // this.isEditMode = data.isEditMode
      }
    },
    hello: gql`
      query {
        hello @client {
          msg
        }
      }
    `,
    isEditMode: gql`
      query {
        isEditMode @client
      }
    `
    // isEditMode: {
    //   query: ALL_RECIPES_QUERY,
    //   // variables () {
    //   //   return {
    //   //     shoppingListId: this.$route.params.id
    //   //   }
    //   // },
    //   result ({ data }) {
    //     // Sets variable query to the gql data for a more modular UI template
    //     console.log('Result', data)
    //     // this.query = data.allRecipes
    //   }
    // }
  },
  methods: {
    create () {
      // apolloClient.cache.data.data.ROOT_QUERY.isEditMode = !apolloClient.cache.data.data.ROOT_QUERY.isEditMode
      apolloClient.writeData({ data: { isEditMode: !this.isEditMode } })
      // console.log('Create', apolloClient.readData())
      // const recipes = apolloClient.readQuery({query: ALL_RECIPES_QUERY}).then((result) => console.log('Result', result))
      const data = cache.readQuery({ query: ALL_RECIPES_QUERY })
      console.log('Recipes', data)

      this.$apollo
        .mutate({
          mutation: gql`
            mutation($msg: String!) {
              updateHello(message: $msg) @client
            }
          `,
          variables: {
            msg: 'hello from link-state!'
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 3vh;
  background-color: white;
}
.search{
  width: 38%;
}
.adminPage {
  margin: 0vh 5vw;
}
</style>
