<template>
  <div>
    <form class="box">
      <h1>New Person</h1>
      <div class="field">
        <label>First Name</label>
        <input
          v-model="firstName"
          type="text"
        >
      </div>
      <div class="field">
        <label>Last Name</label>
        <input
          v-model="lastName"
          type="text"
        >
      </div>
      <div class="field">
        <label>Phone</label>
        <input
          v-model="phone1"
          type="text"
        >
      </div>
      <div class="field">
        <label>Email</label>
        <input
          v-model="email"
          type="text"
        >
      </div>
      <button @click.prevent="cancel()">Cancel</button>
      <button @click.prevent="create()">Submit</button>
    </form>
  </div>
</template>

<script>
// import { CREATE_PERSON_MUTATION } from '../constants/graphql'
import { CREATE_PERSON_MUTATION, ALL_PEOPLE_QUERY } from '../../constants/graphql'
import { GC_USER_ID } from '../../constants/settings'

export default {
  name: 'CreatePerson',
  data () {
    return {
      firstName: '',
      lastName: '',
      phone1: '',
      email: ''
    }
  },
  methods: {
    cancel () {
      this.$store.commit('toggleDisplay')
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
      const newDisplayName = this.firstName + ' ' + this.lastName
      const firstName = this.firstName
      const lastName = this.lastName
      const email = this.email
      const phone1 = this.phone1
      // Clears out data??
      this.firstName = ''
      this.lastName = ''
      this.phone1 = ''
      this.email = ''

      this.$apollo.mutate({
        mutation: CREATE_PERSON_MUTATION,
        variables: {
          // Sets variables in graphql.js
          displayName: newDisplayName,
          firstName: firstName,
          lastName: lastName,
          phone1: phone1,
          email: email,
          ownedById: currentUser
        },
        update: (store, { data: { createPerson } }) => {
          // Pull data from the stored query
          const data = store.readQuery({ query: ALL_PEOPLE_QUERY })
          // We add the new data
          data.allPersons.push(createPerson)
          // We update the cache
          store.writeQuery({ query: ALL_PEOPLE_QUERY, data: data })
        }
      }).catch((error) => {
        console.error(error)
      })
      this.$store.commit('toggleDisplay')
    }
  }
}
</script>
