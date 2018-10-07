<template>
  <div class="page">
    <h1>Restaurants</h1>
    <div>
      <restaurant-create></restaurant-create>
      <form class="search">
        <input name="query" v-model="searchQuery" placeholder="Search">
      </form>
      <restaurants-table
        :data="query"
        :columns="columns"
        :filter-key="searchQuery"
        >
      </restaurants-table>
    </div>
  </div>
</template>

<script>
import RestaurantsTable from '../components/RestaurantsTable'
import RestaurantCreate from '../components/RestaurantCreate'
import { ALL_RESTAURANTS_QUERY } from '../../../constants/graphql'
export default {
  name: 'RestaurantsPage',
  components: {
    RestaurantsTable, RestaurantCreate
  },
  data () {
    return {
      query: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'name', title: 'name'},
        {dbField: 'foodTypeTags', title: 'Food Type'},
        {dbField: 'location.city', title: 'city'}
      ]
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allRestaurants: {
      query: ALL_RESTAURANTS_QUERY,
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = data.allRestaurants
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
