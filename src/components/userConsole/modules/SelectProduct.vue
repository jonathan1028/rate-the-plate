<template>
  <div class="container">
    <div class="v-select">
      <v-select
        placeholder="Add Product"
        v-model="selected"
        label="name"
        :options="query">
      </v-select>
    </div>
    <div class="qty">
      <input
        v-model="quantity"
        type="text"
        placeholder="Qty">
    </div>
    <div class="unit">
      {{selected.unit}}
    </div>
    <!-- <label for="">Quantity:</label> -->
    <button class="_button1"
      @click="submit()"
    >
      +
    </button>
  </div>
</template>

<script>
import { CREATE_PRODUCT_MUTATION, ALL_PRODUCTTEMPLATES_QUERY, MY_PRODUCTS_QUERY } from '../../../constants/graphql'
import vSelect from 'vue-select'

export default {
  name: 'SelectProduct',
  components: {
    vSelect
  },
  data () {
    return {
      query: [{label: 'Cookies', value: 'Cookies'}, {label: 'Broccoli', value: 'Broccoli'}],
      User: {},
      name: '',
      category: '',
      unit: '',
      price: null,
      selected: '',
      quantity: ''

      // currentUserId: this.$store.state.auth.user.id
    }
  },
  apollo: {
    allProductTemplates: {
      query: ALL_PRODUCTTEMPLATES_QUERY,
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = data.allProductTemplates
        // this.isEditMode = data.isEditMode
      }
    },
    allProducts: {
      query: MY_PRODUCTS_QUERY,
      variables () {
        return {
          listId: this.$route.params.id
        }
      },
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        // this.query = data.allProductTemplates
        // this.isEditMode = data.isEditMode
      }
    }
  },
  methods: {
    submit () {
      console.log('Selected', this.selected)
      console.log('Shopping List Id', this.$route.params.id)
      let quantity = parseFloat(this.quantity)
      // let price = parseFloat(this.price)
      this.$apollo.mutate({
        mutation: CREATE_PRODUCT_MUTATION,
        variables: {
          templateId: this.selected.id,
          shoppingListId: this.$route.params.id,
          quantity: quantity
        },
        update: (store, { data: { createProduct } }) => {
          // Pull data from the stored query
          const data = store.readQuery({
            query: MY_PRODUCTS_QUERY,
            variables: {
              listId: this.$route.params.id
            }
          })
          // We add the new data
          data.allProducts.push(createProduct)
          console.log('Test', data)
          // We update the cache
          store.writeQuery({
            query: MY_PRODUCTS_QUERY,
            variables: {
              listId: this.$route.params.id
            },
            data: data
          })
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid lightgray;
  display: grid;
  width: 100%;
  margin: 0px;
  padding: 0px;
  grid-template-columns: 60% 15% 15% 10%;
  .unit {
    // width: 10%
    // border: 1px solid black;
    display: flex;
    align-items: center;
    margin-left: 1vw;
    font-size: 2vh;
  }
  .qty {
    // border: 1px solid black;
    input {
      padding-left: 0.5vw;
      height: 4vh;
      font-size: 2vh;
      width: 100%;
    }
  }
  .v-select {
    // border: 1px solid black;
    // height: 2.5vh;
    font-size: 2vh;
    // margin-left: 1vw;
  }
  button {
    font-size: 3vh;
  }
}
</style>
