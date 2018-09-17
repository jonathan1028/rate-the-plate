<template>
  <div class="page">
    <h1>Recipes</h1>
    <button
      @click="create"
    >
      New Recipe
    </button>
    <div>{{isEditMode}}</div>
    <div>
      <form class="search">
        <input name="query" v-model="searchQuery" placeholder="Search">
      </form>
      <recipes-table
        :data="query"
        :columns="columns"
        :filter-key="searchQuery">
      </recipes-table>
    </div>
  </div>
</template>

<script>
import RecipesTable from '../modules/RecipesTable'
import { ALL_RECIPES_QUERY } from '../../../constants/graphql'
import gql from 'graphql-tag'
import { apolloClient, cache } from '../../../apollo-client'
// import { cache } from '../../../apollo-client'

export default {
  name: 'RecipesPage',
  components: {
    RecipesTable
  },
  data () {
    return {
      query: [],
      sortColumn: '',
      searchQuery: '',
      isEditMode: false,
      hello: '',
      allRecipes: [],
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
    allRecipes: {
      query: ALL_RECIPES_QUERY,
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = data.allRecipes
        // this.isEditMode = data.isEditMode
      }
    },
    isEditMode: gql`
      query {
        isEditMode @client
      }
    `,
    showCreateRecipeModal: gql`
      query {
        showCreateRecipeModal @client
      }
    `
  },
  methods: {
    create () {
      // apolloClient.cache.data.data.ROOT_QUERY.isEditMode = !apolloClient.cache.data.data.ROOT_QUERY.isEditMode
      apolloClient.writeData({ data: { isEditMode: !this.isEditMode } })
      apolloClient.writeData({ data: { showCreateRecipeModal: true } })
      // console.log('Create', apolloClient.readData())
      // const recipes = apolloClient.readQuery({query: ALL_RECIPES_QUERY}).then((result) => console.log('Result', result))
      const data = cache.readQuery({ query: ALL_RECIPES_QUERY })
      console.log('Recipes', data)
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
