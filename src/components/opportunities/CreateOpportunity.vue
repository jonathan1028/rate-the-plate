<template>
  <div>
    <form class="box">
      <h1>New Opportunity</h1>
      <div class="field">
        <label>Job Name</label>
        <input
          v-model="jobName"
          type="text">
      </div>
      <div class="field">
        <label>Stage</label>
        <input
          v-model="stage"
          type="text">
      </div>
      <div class="field">
        <label>Status</label>
        <input
          v-model="status"
          type="text">
      </div>
      <div class="field">
        <label>Amount</label>
        <input
          v-model="amount"
          type="text">
      </div>
      <div class="field">
        <label>Source</label>
        <input
          v-model="source"
          type="text">
      </div>
      <div class="field">
        <label>Estimated Closing Date</label>
        <input
          v-model="estimatedCloseDate"
          type="text">
      </div>
      <div class="field">
        <label>Probability</label>
        <input
          v-model="probability"
          type="text">
      </div>
      <button @click.prevent="cancel()">Cancel</button>
      <button @click.prevent="create()">Submit</button>
    </form>
  </div>
</template>

<script>
// import { CREATE_PERSON_MUTATION } from '../constants/graphql'
import { CREATE_OPPORTUNITY_MUTATION, ALL_OPPORTUNITIES_QUERY } from '../../constants/graphql'
import { GC_USER_ID } from '../../constants/settings'

export default {
  name: 'CreateOpportunity',
  data () {
    return {
      jobName: '',
      stage: '',
      status: '',
      amount: 0,
      source: '',
      estimatedCloseDate: null,
      probability: ''
      // firstName: '',
      // lastName: '',
      // phone1: '',
      // email: ''
    }
  },
  methods: {
    cancel () {
      this.$store.commit('toggleCreateOpportunity')
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
      // const newDisplayName = this.firstName + ' ' + this.lastName
      // const firstName = this.firstName
      // const lastName = this.lastName
      // const email = this.email
      // const phone1 = this.phone1
      // // Clears out data??
      // this.firstName = ''
      // this.lastName = ''
      // this.phone1 = ''
      // this.email = ''

      this.$apollo.mutate({
        mutation: CREATE_OPPORTUNITY_MUTATION,
        variables: {
          // Sets variables in graphql.js
          // eslint-disable-next-line
          jobName: this.jobName,
          contacts: ['cjfa2o9tq6n290118sp0ym1n7'],
          ownedById: currentUser,
          stage: this.stage,
          status: this.status,
          amount: parseFloat(this.amount),
          source: this.source,
          estimatedCloseDate: this.estimatedCloseDate,
          probability: parseInt(this.probability)
        },
        update: (store, { data: { createOpportunity } }) => {
          // Pull data from the stored query
          const data = store.readQuery({ query: ALL_OPPORTUNITIES_QUERY })
          // We add the new data
          data.allOpportunities.push(createOpportunity)
          // We update the cache
          store.writeQuery({ query: ALL_OPPORTUNITIES_QUERY, data: data })
        }
      }).catch((error) => {
        console.error(error)
      })
      this.$store.commit('toggleCreateOpportunity')
    }
  }
}
</script>
