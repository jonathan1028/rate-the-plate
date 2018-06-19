<template>
  <div>
    <div class="box effect6">
      <div class="box-content">
        <h1>Users</h1>
        <div>
          <form class="search">
            <input name="query" v-model="searchQuery" placeholder="Search">
          </form>
          <user-table
            :data="processData(allUsers)"
            :columns="columns"
            :filter-key="searchQuery">
          </user-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserTable from './UserTable'
import { ALL_USERS_QUERY } from '../../constants/graphql'
// import { ALL_PEOPLE_QUERY, NEW_PEOPLE_SUBSCRIPTION } from '../constants/graphql'

export default {
  name: 'Admin',
  components: {
    UserTable
  },
  data () {
    return {
      allUsers: [
        {
          name: 'Test1'
        },
        {
          name: 'Test2'
        }
      ],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'id', title: 'id'},
        {dbField: 'name', title: 'name'},
        {dbField: 'email', title: 'email'},
        {dbField: 'createdAt', title: 'createdAt'},
        {dbField: 'updatedAt', title: 'updatedAt'}]
    }
  },
  methods: {
    processData (data) {
      return data
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allUsers: {
      query: ALL_USERS_QUERY
    }
  }
}
</script>

<style>
.search{
  width: 38%;
}
</style>
