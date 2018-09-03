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
// import { GC_USER_ID } from '../../../constants/settings'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'CreateExpense',
  components: { Datepicker },
  data () {
    return {
      userId: this.$store.state.auth.userId,
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
      console.log('UserId', this.userId)

      // Assign data from form inputs
      const description = this.description
      const amount = parseFloat(this.amount)

      this.$apollo.mutate({
        mutation: CREATE_EXPENSE_MUTATION,
        variables: {
          ownedById: this.userId,
          description: description,
          amount: amount,
          date: this.date
        },
        update: (store, { data: { createExpense } }) => {
          // Pull data from the stored query
          const data = store.readQuery({
            query: ALL_EXPENSES_QUERY,
            variables: { userId: this.userId }
          })
          // We add the new data
          data.allExpenses.push(createExpense)
          // We update the cache
          store.writeQuery({
            query: ALL_EXPENSES_QUERY,
            variables: { userId: this.userId },
            data: data
          })
        }
      }).catch((error) => {
        console.error(error)
      })
      this.$store.commit('toggleCreateExpense')
    }
  }
}
</script>
