<template>
  <div class="container">
    <div class="v-select">
      <v-select
        placeholder="Add Ingredient"
        v-model="selected"
        label="name"
        :options="query">
      </v-select>
    </div>
    <div class="qty">
      <input
        type="text"
        placeholder="Qty">
    </div>
    <div class="unit">
      {{selected.name}}
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
import { ALL_PRODUCTTEMPLATES_QUERY } from '../../../constants/graphql'
import vSelect from 'vue-select'
// import { apolloClient } from '../../../apollo-client'
import gql from 'graphql-tag'

export default {
  name: 'AddIngredient',
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
      ingredients: [],
      selected: ''
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
    ingredients: gql`
      query {
        ingredients @client
      }
    `
  },
  methods: {
    submit () {
      console.log('Ingredients3', this.ingredients)
      let newArray = this.ingredients.slice(0)
      // console.log('NewArray', newArray)
      newArray.push(this.selected)
      // // apolloClient.writeData({ data: { showCreateRecipeModal: false } })
      // let data = {ingredients: newArray}
      // apolloClient.writeData({ data })
      console.log('Ingredients', newArray)
      this.$apollo.mutate({
        mutation: gql`
          mutation($ingredient: JSON) {
            addIngredient(ingredient: $ingredient) @client
          }
        `,
        variables: {
          ingredient: this.selected
        }
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
