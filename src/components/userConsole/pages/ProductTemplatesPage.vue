<template>
  <div class="page">
    <h1>Products</h1>
    <div>
      <create-product></create-product>
      <form class="search">
        <input name="query" v-model="searchQuery" placeholder="Search">
      </form>
      <product-templates-table
        :data="query"
        :columns="columns"
        :filter-key="searchQuery"
        >
      </product-templates-table>
    </div>
  </div>
</template>

<script>
import ProductTemplatesTable from '../modules/ProductTemplatesTable'
import CreateProduct from '../modules/CreateProduct'
import { ALL_PRODUCTTEMPLATES_QUERY } from '../../../constants/graphql'
export default {
  name: 'ProductTemplatesPage',
  components: {
    ProductTemplatesTable, CreateProduct
  },
  data () {
    return {
      query: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'name', title: 'name'},
        {dbField: 'category', title: 'category'},
        {dbField: 'price', title: 'price'},
        {dbField: 'unit', title: 'unit'},
        {dbField: 'createdAt', title: 'createdAt'}
      ]
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allProductTemplates: {
      query: ALL_PRODUCTTEMPLATES_QUERY,
      variables () {
        return {
          shoppingListId: this.$route.params.id
        }
      },
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = data.allProductTemplates
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
