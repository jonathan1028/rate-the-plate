<template>
  <div>
    <form class="box">
      <h1>{{user.name}}</h1>
      <div class="field">
        <label>First Name</label>
        <input
          v-model="user.name"
          type="text"
        >
      </div>
      <button @click.prevent="submit()">Update</button>
    </form>
  </div>
</template>

<script>
import { ALL_USERS_QUERY, UPDATE_USER_MUTATION } from '../../constants/graphql'

export default {
  name: 'UpdateUser',
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    submit () {
      // Save the user input in case of an error
      const name = this.user.name

      this.$apollo.mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          id: this.user.id,
          name: name
        },
        update: (store, { data: { updateUser } }) => {
          // Get data from store
          const data = store.readQuery({ query: ALL_USERS_QUERY })
          // Delete the current person and replace it with a copay
          let index = data.allUsers.findIndex(x => x.id === this.user.id)
          if (index !== -1) {
            data.allUsers[index] = Object.assign({}, this.user)
          }
          // Update the store
          store.writeQuery({ query: ALL_USERS_QUERY, data: data })
        }
      })
      this.$router.push({path: '/admin'})
    }
  }
}
</script>
