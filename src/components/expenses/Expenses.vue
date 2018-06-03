<template>
  <div>
    <h1>User is Authenticated: {{this.$store.state.isAuthenticated}}</h1>
    <span v-if="this.$store.state.showCreateExpense">
      <create-expense :data="{columns, options}"></create-expense>
    </span>
    <div class="box effect6">
      <div class="box-content">
        <h1>Expenses</h1>
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
import NewExpensesTable from './NewExpensesTable'
import { ALL_EXPENSES_QUERY } from '../../constants/graphql'
import VueEditortable from 'vue-editortable'
// import { ALL_PEOPLE_QUERY, NEW_PEOPLE_SUBSCRIPTION } from '../constants/graphql'

export default {
  name: 'Expenses',
  components: {
    CreateExpense, ExpensesTable, VueEditortable, NewExpensesTable
  },
  props: ['auth', 'authenticated'],
  data () {
    return {
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
