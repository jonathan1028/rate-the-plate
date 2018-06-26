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
import { mapGetters } from 'vuex'
import decode from 'jwt-decode'

export default {
  name: 'Expenses',
  components: {
    CreateExpense, ExpensesTable
  },
  computed: {
    ...mapGetters(['authenticated', 'userId'])
  },
  data () {
    return {
      showCreateExpense: this.$store.showCreateExpense,
      allExpenses: [],
      sortColumn: '',
      searchQuery: '',
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
  }
}
</script>

<style>
.search{
  width: 38%;
}
</style>
