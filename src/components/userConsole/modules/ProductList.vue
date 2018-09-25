<template>
  <div class="page">
    <h1>Products</h1>
    <div>
      <form class="search">
        <input name="query" v-model="searchQuery" placeholder="Search">
      </form>
      <base-list
        :data="query"
        :columns="columns"
        :filter-key="searchQuery"
        :deleteMutation="deleteMutation"
        >
      </base-list>
    </div>
  </div>
</template>

<script>
import BaseList from '../modules/BaseList'
import { MY_PRODUCTS_QUERY, DELETE_PRODUCT_MUTATION } from '../../../constants/graphql'
export default {
  name: 'ProductList',
  components: {
    BaseList
  },
  data () {
    return {
      query: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'template', title: 'name'},
        {dbField: 'id', title: 'id'},
        {dbField: 'createdAt', title: 'createdAt'}
      ],
      deleteMutation: DELETE_PRODUCT_MUTATION
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allProducts: {
      query: MY_PRODUCTS_QUERY,
      variables () {
        return {
          listId: this.$route.params.id || null
        }
      },
      result ({ data }) {
        // Creates clone of data because Apollo data is read only
        this.query = JSON.parse(JSON.stringify(data.allProducts))
      }
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
