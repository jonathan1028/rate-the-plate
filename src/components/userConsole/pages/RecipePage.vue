<template>
  <div class="page">
    <div class="field">
      <h1>{{recipe.name}}</h1>
    </div>
    <button
      @click="toggleEditMode"
    >Edit</button>
    <div>{{isEditMode}}</div>
    <div>
      <div>Ingredients</div>
      <div
        class="container"
        v-if="isEditMode">
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
            v-model="quantity"
            type="text"
            placeholder="Qty">
        </div>
        <div class="unit">
          {{selected.unit}}
        </div>
        <button class="_button1"
          @click="addIngredient()"
        >
          +
        </button>
      </div>
      <ul>
        <div
          v-for='(row, index) in ingredients'
          :key='index'
        >
          <div>
            - {{`${row.quantity} ${row.template.unit}`}} {{row.template.name}}
            <!-- - {{`${row.quantity} ${row.unit} ${row.name}`}} -->
          </div>
        </div>
      </ul>
    </div>
    <div>
      <div>Steps</div>
      <div v-if="isEditMode">
        <input
          v-model="newStep"
          type="text"
          placeholder="">
        <button
          @click="add()"
          >
          + Add
        </button>
      </div>
      <ul>
        <div
          v-for='(row, index) in recipe.steps'
          :key='index'
        >
          <div>
            - {{row}}
            <!-- - {{`${row.quantity} ${row.unit} ${row.name}`}} -->
          </div>
        </div>
      </ul>
    </div>
    <button
      v-if="isEditMode"
      @click="save"
      >Save
    </button>

  </div>
</template>

<script>
import SelectProduct from '../modules/SelectProduct'
import ProductList from '../modules/ProductList'
import { ALL_PRODUCTTEMPLATES_QUERY } from '../../../constants/graphql'
import gql from 'graphql-tag'
import { apolloClient } from '../../../apollo-client'
import vSelect from 'vue-select'

export default {
  name: 'RecipePage',
  components: {
    vSelect, SelectProduct, ProductList
  },
  beforeCreate () {
    this.recipe = JSON.parse(localStorage.getItem('recipe'))
    this.id = this.$route.params.id
    console.log('User', this.user, this.id)
    console.log('Recipe', this.recipe)
  },
  data () {
    return {
      ingredients: this.recipe.ingredients,
      query: [],
      isEditMode: false,
      selected: '',
      quantity: null
      // unit: ''
    }
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allProductTemplates: {
      query: ALL_PRODUCTTEMPLATES_QUERY,
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = JSON.parse(JSON.stringify(data.allProductTemplates))
        // this.isEditMode = data.isEditMode
      }
    },
    isEditMode: gql`
      query {
        isEditMode @client
      }
    `
  },
  methods: {
    toggleEditMode () {
      apolloClient.writeData({ data: { isEditMode: true } })
    },
    save () {
      apolloClient.writeData({ data: { isEditMode: false } })
    },
    addIngredient () {
      console.log('Enter', this.selected)
      let newIngredient = JSON.parse(JSON.stringify(this.selected))
      newIngredient['quantity'] = parseFloat(this.quantity) || ''
      newIngredient['template'] = {
        unit: this.selected.unit || '',
        name: this.selected.name || ''
      }
      this.ingredients.push(newIngredient)
      console.log('New Ingredients', this.ingredients)
    },
    submit () {
      console.log('Modal Items', this.name, this.steps)
      this.$apollo.mutate({
        mutation: UPDATE_RECIPE_MUTATION,
        variables: {
          id: this.$route.params.id,
          name: this.name,
          steps: this.steps
        },
        update: (cache, { data: { createRecipe } }) => {
          // Pull data from the stored query
          const data = cache.readQuery({
            query: ALL_RECIPES_QUERY
          })
          // We add the new data
          data.allRecipes.push(createRecipe)
          console.log('Test', data)
          // We update the cache
          cache.writeQuery({
            query: ALL_RECIPES_QUERY,
            data: data
          })
        }
      }).catch((error) => {
        console.error(error)
      }).then((result) => {
        // Clone product from ingredients list
        // Attach Product to Recipe
        console.log('Ingredients after recipe creation', this.ingredients)
        this.ingredients.forEach((row) => {
          this.$apollo.mutate({
            mutation: CREATE_PRODUCT_MUTATION,
            variables: {
              templateId: row.id,
              recipeId: result.data.createRecipe.id,
              quantity: row.quantity
            }
          }).catch((error) => {
            console.error(error)
          })
        })
      })
      apolloClient.writeData({ data: { showCreateRecipeModal: false } })
    }
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
