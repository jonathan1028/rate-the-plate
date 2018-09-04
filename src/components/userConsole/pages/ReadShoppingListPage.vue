<template>
  <div class="page">
    <div class="field">
      <h1>{{shoppingList.name}}</h1>
    </div>
    <!-- <div class="field">
      <label for="">Email:</label>
      <div></div>
    </div> -->
    <create-product></create-product>
    <product-list></product-list>
  </div>
</template>

<script>
import CreateProduct from '../modules/CreateProduct'
import ProductList from '../modules/ProductList'

export default {
  name: 'ReadShoppingListPage',
  beforeCreate () {
    this.shoppingList = JSON.parse(localStorage.getItem('shoppinglist'))
    this.id = this.$route.params.id
    console.log('User', this.user, this.id)
    console.log('List', this.shoppingList)
  },
  components: {
    CreateProduct, ProductList
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 3vh;
  background-color: white;
}
.field {
  display: flex;
  align-items: flex-end
}
</style>
