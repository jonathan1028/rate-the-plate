<template>
  <div class="modal _box-shadow1">
    <h2>Add Product</h2>
    <div class="field">
      <label for="">Name:</label>
      <input
        v-model="Product.name"
        type="text"
        placeholder="">
      <label for="">Category:</label>
      <input
        v-model="Product.category"
        type="text"
        placeholder="">
      <label for="">Price:</label>
      <input
        v-model="Product.price"
        type="text"
        placeholder="">
      <label for="">Unit:</label>
      <input
        v-model="Product.unit"
        type="text"
        placeholder="">
      <button class="_button1"
        @click="submit()"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import { CREATE_PRODUCTTEMPLATE_MUTATION, ALL_PRODUCTTEMPLATES_QUERY } from '../../../constants/graphql'

export default {
  name: 'CreateProduct',
  data () {
    return {
      User: {},
      Product: {
        name: '',
        category: '',
        unit: '',
        price: null
      }
      // currentUserId: this.$store.state.auth.user.id
    }
  },
  methods: {
    submit () {
      // console.log('Shopping List Id', this.$route.params.id)
      let price = parseFloat(this.Product.price)
      this.$apollo.mutate({
        mutation: CREATE_PRODUCTTEMPLATE_MUTATION,
        variables: {
          name: this.Product.name,
          category: this.Product.category,
          unit: this.Product.unit,
          price: price,
          template: true
        },
        update: (store, { data: { createProductTemplate } }) => {
          // Pull data from the stored query
          console.log('Store from Products', store)
          const data = store.readQuery({
            query: ALL_PRODUCTTEMPLATES_QUERY
          })
          // We add the new data
          data.allProductTemplates.push(createProductTemplate)
          console.log('Test', data)
          // We update the cache
          store.writeQuery({
            query: ALL_PRODUCTTEMPLATES_QUERY,
            data: data
          })
          this.Product = {}
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
