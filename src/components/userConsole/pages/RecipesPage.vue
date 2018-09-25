<template>
  <div class="page">
    <h1>Recipes</h1>
    <button
      @click="create"
    >
      New Recipe
    </button>
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
import { MY_RECIPES_QUERY } from '../../../constants/graphql'
import gql from 'graphql-tag'
import { apolloClient } from '../../../apollo-client'
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
      query: MY_RECIPES_QUERY,
      variables () {
        return {
          ownedById: this.$store.state.auth.userId
        }
      },
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
      apolloClient.writeData({ data: { showCreateRecipeModal: true } })
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
