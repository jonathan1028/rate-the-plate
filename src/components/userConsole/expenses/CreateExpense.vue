Scaffolding Notes
- replace OBJECTS w NEWOBJECTS
- replace OBJECT w NEWOBJECT
- replace Object w Object
- replace template input values
- replace data values
<template>
  <div>
    <form class="box">
      <h1>New Expense</h1>
      <div class="field">
        <label>Date</label>
        <datepicker placeholder="Select Date" v-model="date"></datepicker>
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="description"
          type="text"
        >
      </div>
      <div class="field">
        <label>Amount</label>
        <input
          v-model="amount"
          type="text"
        >
      </div>
      <button @click.prevent="cancel()">Cancel</button>
      <button @click.prevent="create()">Submit</button>
    </form>
  </div>
</template>

<script>
import { CREATE_EXPENSE_MUTATION, ALL_EXPENSES_QUERY } from '../../../constants/graphql'
import { GC_USER_ID } from '../../../constants/settings'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'CreateExpense',
  components: { Datepicker },
  data () {
    return {
      date: '',
      description: '',
      amount: 0
    }
  },
  methods: {
    cancel () {
      this.$store.commit('toggleCreateExpense')
    },
    create () {
      // Checks permissions
      const currentUser = localStorage.getItem(GC_USER_ID)
      if (!currentUser) {
        console.error('No user logged in')
        return
      }
      console.log('User', currentUser)

      // Assign data from form inputs
      const date = moment(this.date).toDate()
      const description = this.description
      const amount = parseFloat(this.amount)

      // Clears out data
      this.date = ''
      this.description = ''
      this.amount = ''

      this.$apollo.mutate({
        mutation: CREATE_EXPENSE_MUTATION,
        variables: {
          date,
          description: description,
          amount: amount
          // ownedById: currentUser
        },
        // CreateExpense must return the exact same shape of data that All_EXPENSES_QUERY diplays
        update: (store, { data: { createExpense } }) => {
          // Pull data from the stored query
          const data = store.readQuery({ query: ALL_EXPENSES_QUERY })
          // We add the new data
          data.allExpenses.push(createExpense)
          // We update the cache
          store.writeQuery({ query: ALL_EXPENSES_QUERY, data: data })
        }
      }).catch((error) => {
        console.error(error)
      })
      this.$store.commit('toggleCreateExpense')
    }
  }
}
</script>
