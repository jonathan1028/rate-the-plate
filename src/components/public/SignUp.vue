<template>
  <div>
    <h1>Sign Up</h1>
    <div>
    <form class="box">
      <h1>{{user}}</h1>
      <div class="field">
        <label>First Name</label>
        <input
          v-model="user"
          type="text"
        >
      </div>
      <button @click.prevent="submit()">Update</button>
    </form>
  </div>
  </div>
</template>

<script>
import { UPDATE_USER_MUTATION } from '../../constants/graphql'
import { mapActions } from 'vuex'

export default {
  name: 'SignUp',
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    ...mapActions(['handleAuthentication']),
    submit () {
      // Save the user input in case of an error
      const name = this.user.name

      this.$apollo.mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          id: this.user.id,
          name: name
        }
        // update: (store, { data: { createUser } }) => {
        //   // Get data from store
        //   const data = store.readQuery({ query: ALL_USERS_QUERY })
        //   // Delete the current person and replace it with a copay
        //   let index = data.allUsers.findIndex(x => x.id === this.user.id)
        //   if (index !== -1) {
        //     data.allUsers[index] = Object.assign({}, this.user)
        //   }
        //   // Update the store
        //   store.writeQuery({ query: ALL_USERS_QUERY, data: data })
        // }
      })
      this.$router.push({path: '/admin'})
    }
  }
}
</script>

<style>

</style>
