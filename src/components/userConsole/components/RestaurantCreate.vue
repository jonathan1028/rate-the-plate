<template>
  <div class="modal _box-shadow1">
    <h2>Add Restaurant</h2>
    <div class="field">
      <label for="">Name:</label>
      <input
        v-model="Restaurant.name"
        type="text"
        placeholder="">
      <label for="">Food Type:</label>
      <div class="v-select">
        <v-select
          multiple
          placeholder=""
          v-model="Restaurant.foodTypeTags"
          label="name"
          :options="tagOptions">
        </v-select>
      </div>
      <label for="">City:</label>
      <div class="v-select">
        <v-select
          placeholder=""
          v-model="Restaurant.location.city"
          label="name"
          :options="cityOptions">
        </v-select>
      </div>
      <button class="_button1"
        @click="submit()"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import { CREATE_RESTAURANT_MUTATION, ALL_RESTAURANTS_QUERY } from '../../../constants/graphql'
import vSelect from 'vue-select'

export default {
  name: 'RestaurantCreate',
  components: {
    vSelect
  },
  data () {
    return {
      User: {},
      cityOptions: ['Austin', 'Houston'],
      tagOptions: ['Italian', 'Mexican', 'Japanese'],
      Restaurant: {
        name: '',
        foodTypeTags: [],
        location: {
          city: ''
        }
      }
      // currentUserId: this.$store.state.auth.user.id
    }
  },
  methods: {
    submit () {
      // console.log('Shopping List Id', this.$route.params.id)
      // let price = parseFloat(this.Product.price)
      this.$apollo.mutate({
        mutation: CREATE_RESTAURANT_MUTATION,
        variables: {
          name: this.Restaurant.name,
          foodTypeTags: this.Restaurant.foodTypeTags,
          city: this.Restaurant.location.city
        },
        update: (store, { data: { createRestaurant } }) => {
          console.log('create', createRestaurant)
          // Pull data from the stored query
          const data = store.readQuery({
            query: ALL_RESTAURANTS_QUERY
          })
          // We add the new data
          data.allRestaurants.push(createRestaurant)

          // We update the cache
          store.writeQuery({
            query: ALL_RESTAURANTS_QUERY,
            data: data
          })
          this.Restaurant = {}
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-top: 2vh;
}
</style>
