<template>
  <div>
    <form class="box">
      <h1>{{person.displayName}}</h1>
      <div class="field">
        <label>First Name</label>
        <input
          v-model="person.firstName"
          type="text"
        >
      </div>
      <div class="field">
        <label>Last Name</label>
        <input
          v-model="person.lastName"
          type="text"
        >
      </div>
      <div class="field">
        <label>Phone</label>
        <input
          v-model="person.phone1"
          type="text"
        >
      </div>
      <div class="field">
        <label>Email</label>
        <input
          v-model="person.email"
          type="text"
        >
      </div>
      <button @click.prevent="submit()">Update</button>
    </form>
  </div>
</template>

<script>
import { ALL_PEOPLE_QUERY, UPDATE_PERSON_MUTATION } from '../../constants/graphql'
// import { GC_USER_ID } from '../constants/settings'

export default {
  name: 'UpdateExpense',
  data () {
    return {
      person: JSON.parse(localStorage.getItem('person'))
    }
  },
  methods: {
    submit () {
      // Save the user input in case of an error
      const displayName = this.person.firstName + ' ' + this.person.lastName
      const firstName = this.person.firstName
      const lastName = this.person.lastName
      const phone1 = this.person.phone1
      const email = this.person.email
      // Clear it early to give the UI a snappy feel
      // this.displayName = ''
      // this.firstName = ''
      // this.lastName = ''
      // this.phone1 = ''
      // this.email = ''

      this.person.displayName = this.person.firstName + ' ' + this.person.lastName

      this.$apollo.mutate({
        mutation: UPDATE_PERSON_MUTATION,
        variables: {
          id: this.person.id,
          displayName: displayName,
          firstName: firstName,
          lastName: lastName,
          phone1: phone1,
          email: email
        },
        update: (store, { data: { updatePerson } }) => {
          // Get data from store
          const data = store.readQuery({ query: ALL_PEOPLE_QUERY })
          // Delete the current person and replace it with a copay
          let index = data.allPersons.findIndex(x => x.id === this.person.id)
          if (index !== -1) {
            data.allPersons[index] = Object.assign({}, this.person)
          }
          // Update the store
          store.writeQuery({ query: ALL_PEOPLE_QUERY, data: data })
        }
      })
      this.$router.push({path: '/people'})
    }
  }
}
</script>
