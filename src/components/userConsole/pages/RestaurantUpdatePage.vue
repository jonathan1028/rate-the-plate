<template>
  <div>
    <form class="box">
      <h1>{{Restaurant.name}}</h1>
      <div class="field">
        <label>Name</label>
        <input
          v-model="Restaurant.name"
          type="text"
        >
      </div>
      <label>Food Type</label>
      <div class="v-select">
        <v-select
          multiple
          placeholder=""
          v-model="Restaurant.foodTypeTags"
          label="name"
          :options="tagOptions">
        </v-select>
      </div>
      <label>City</label>
      <div class="v-select">
        <v-select
          placeholder=""
          v-model="Restaurant.location.city"
          label="name"
          :options="cityOptions">
        </v-select>
      </div>
      <button @click.prevent="submit()">Update</button>
    </form>
  </div>
</template>

<script>
import { UPDATE_RESTAURANT_MUTATION, ALL_RESTAURANTS_QUERY } from '../../../constants/graphql'
import vSelect from 'vue-select'

export default {
  name: 'UpdateUser',
  components: {
    vSelect
  },
  data () {
    return {
      cityOptions: ['Austin', 'Houston'],
      tagOptions: ['Italian', 'Mexican', 'Japanese'],
      Restaurant: JSON.parse(localStorage.getItem('restaurant'))
    }
  },
  methods: {
    submit () {
      // Save the user input in case of an error

      this.$apollo.mutate({
        mutation: UPDATE_RESTAURANT_MUTATION,
        variables: {
          id: this.Restaurant.id,
          name: this.Restaurant.name,
          foodTypTags: this.Restaurant.foodTypeTags,
          city: this.Restaurant.location.city
        },
        update: (store, { data: { updateRestaurant } }) => {
          // Get data from store
          const data = store.readQuery({ query: ALL_RESTAURANTS_QUERY })
          // Delete the current person and replace it with a copay
          let index = data.allRestaurants.findIndex(x => x.id === this.Restaurant.id)
          if (index !== -1) {
            data.allRestaurants[index] = JSON.parse(JSON.stringify(this.Restaurant))
          }
          // Update the store
          store.writeQuery({ query: ALL_RESTAURANTS_QUERY, data: data })
        }
      })
      this.$router.push({path: '/restaurants'})
    }
  }
}
</script>
