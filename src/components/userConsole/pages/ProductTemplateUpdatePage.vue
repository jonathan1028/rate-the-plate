<template>
  <div>
    <form class="box">
      <h1>{{product.name}}</h1>
      <div class="field">
        <label>Name</label>
        <input
          v-model="product.name"
          type="text"
        >
      </div>
      <div class="field">
        <label>Category</label>
        <input
          v-model="product.category"
          type="text"
        >
      </div>
      <div class="field">
        <label>Price</label>
        <input
          v-model="product.price"
          type="text"
        >
      </div>
      <div class="field">
        <label>Unit</label>
        <input
          v-model="product.unit"
          type="text"
        >
      </div>
      <button @click.prevent="submit()">Update</button>
    </form>
  </div>
</template>

<script>
import { UPDATE_PRODUCTTEMPLATE_MUTATION, ALL_PRODUCTTEMPLATES_QUERY } from '../../../constants/graphql'

export default {
  name: 'UpdateUser',
  data () {
    return {
      product: JSON.parse(localStorage.getItem('product'))
    }
  },
  methods: {
    submit () {
      // Save the user input in case of an error

      this.$apollo.mutate({
        mutation: UPDATE_PRODUCTTEMPLATE_MUTATION,
        variables: {
          id: this.product.id,
          name: this.product.name,
          category: this.product.category,
          unit: this.product.unit,
          price: this.product.price
        },
        update: (store, { data: { updateProductTemplate } }) => {
          // Get data from store
          const data = store.readQuery({ query: ALL_PRODUCTTEMPLATES_QUERY })
          // Delete the current person and replace it with a copay
          let index = data.allProductTemplates.findIndex(x => x.id === this.product.id)
          if (index !== -1) {
            data.allProductTemplates[index] = JSON.parse(JSON.stringify(this.product))
          }
          // Update the store
          store.writeQuery({ query: ALL_PRODUCTTEMPLATES_QUERY, data: data })
        }
      })
      this.$router.push({path: '/products'})
    }
  }
}
</script>
