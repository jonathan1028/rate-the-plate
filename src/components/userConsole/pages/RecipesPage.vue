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
      Select Shopping List to Add Recipes To:
      <div class="v-select">
        <v-select
          placeholder="Select"
          v-model="selected"
          label="name"
          :options="allShoppingLists">
        </v-select>
      </div>
      <recipes-table
        :data="query"
        :columns="columns"
        :filter-key="searchQuery"
        :shoppingList="selected"
        >
      </recipes-table>
    </div>
  </div>
</template>

<script>
import RecipesTable from '../modules/RecipesTable'
import { MY_RECIPES_QUERY, MY_SHOPPINGLISTS_QUERY } from '../../../constants/graphql'
import gql from 'graphql-tag'
import { apolloClient } from '../../../apollo-client'
// import { cache } from '../../../apollo-client'
import vSelect from 'vue-select'

export default {
  name: 'RecipesPage',
  components: {
    RecipesTable, vSelect
  },
  data () {
    return {
      query: [],
      allShoppingLists: [],
      selected: {},
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
    allShoppingLists: {
      query: MY_SHOPPINGLISTS_QUERY,
      variables () {
        return {
          ownedById: this.$store.state.auth.userId
        }
      },
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        console.log('Shopping Lists', data.allShoppingLists)
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
