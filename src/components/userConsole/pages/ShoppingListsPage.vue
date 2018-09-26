<template>
  <div class="page">
    <h1>Shopping Lists</h1>
    <div>
      <button
        @click="create">
        + New Shopping List
      </button>
      <form class="search">
        <input name="query" v-model="searchQuery" placeholder="Search">
      </form>
      <base-table
        :data="query"
        :columns="columns"
        :filter-key="searchQuery"
        :deleteMutation="deleteMutation"
        :gqlQuery="gqlQuery">
      </base-table>
    </div>
  </div>
</template>

<script>
import BaseTable from '../modules/BaseTable'
import { MY_SHOPPINGLISTS_QUERY, DELETE_SHOPPINGLIST_MUTATION } from '../../../constants/graphql'
import { apolloClient } from '../../../apollo-client'

export default {
  name: 'ShoppingListsPage',
  components: {
    BaseTable
  },
  data () {
    return {
      userId: this.$store.state.auth.userId,
      query: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'name', title: 'name'},
        {dbField: 'createdAt', title: 'createdAt'}
      ],
      deleteMutation: DELETE_SHOPPINGLIST_MUTATION,
      gqlQuery: MY_SHOPPINGLISTS_QUERY
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allShoppingLists: {
      query: MY_SHOPPINGLISTS_QUERY,
      variables () {
        return {
          ownedById: this.$store.state.auth.userId
        }
      },
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = data.allShoppingLists
      }
    }
  },
  methods: {
    create () {
      apolloClient.writeData({ data: { showCreateShoppingListModal: true } })
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
