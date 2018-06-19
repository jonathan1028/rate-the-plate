<template>
  <div>
    <h1>User is Authenticated: {{authenticated}}</h1>
    <h1>User ID is: {{userId}}</h1>
    <span v-if="this.$store.state.showCreateExpense">
      <create-expense :data="{columns, options}"></create-expense>
    </span>
    <div class="box effect6">
      <div class="box-content">
        <h1>Expenses</h1>
        <button @click="test()">Test</button>
        <!-- <new-expenses-table></new-expenses-table> -->
        <button
          @click="openCreate()"
        >Add New</button>
        <div>
          <form class="search">
            <input name="query" v-model="searchQuery" placeholder="Search">
          </form>
          <expenses-table
            :filter-key="searchQuery">
          </expenses-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateExpense from './CreateExpense'
import ExpensesTable from './ExpensesTable'
import { ALL_EXPENSES_QUERY } from '../../../constants/graphql'
import { mapGetters } from 'vuex'
import decode from 'jwt-decode'
// import { GC_USER_ID } from '../../../constants/settings'

export default {
  name: 'Expenses',
  components: {
    CreateExpense, ExpensesTable
  },
  computed: {
    ...mapGetters(['authenticated', 'userId'])
    // userId () {
    //   return localStorage.getItem(GC_USER_ID)
    // }
  },
  data () {
    return {
      // userId: localStorage.getItem(GC_USER_ID),
      showCreateExpense: this.$store.showCreateExpense,
      allExpenses: [],
      sortColumn: '',
      searchQuery: '',
      // gridData: [
      //   { name: 'Chuck Norris', power: Infinity },
      //   { name: 'Bruce Lee', power: 9000 },
      //   { name: 'Jackie Chan', power: 7000 },
      //   { name: 'Jet Li', power: 8000 }
      // ]
      columns: [
        {
          title: 'Id',
          name: 'id',
          editable: false
        },
        {
          title: 'Firstname',
          name: 'firstname',
          editable: true
        },
        {
          title: 'Lastname',
          name: 'lastname',
          editable: true
        },
        {
          title: 'Email',
          name: 'email',
          editable: true
        }
      ],
      options: {
        showSearchFilter: true,
        requests: {
          allUrl: this.allExpenses
        }
      }
    }
  },
  methods: {
    openCreate () {
      this.$store.commit('toggleCreateExpense')
      if (this.authenticated) {
        console.log('User Authenticated')
      }
    },
    test () {
      const accessToken = localStorage.getItem('access_token')
      console.log('Test', accessToken)
      const idObject = decode(localStorage.getItem('id_token'))
      const idToken = localStorage.getItem('id_token')
      console.log('ID OBJECT', idObject)
      console.log('ID TOKEN', idToken)
    }
  },
  apollo: {
    // allObjects here pulls the data from ALL_OBJECTS_QUERY and assigns it to the data(){} object at the top of script
    allExpenses: {
      query: ALL_EXPENSES_QUERY
    }
  }
}
</script>

<style>
.search{
  width: 38%;
}
</style>
