<template>
  <div class="page">
    <div class="field">
      <span v-if="!isEditMode">
        <h1>{{Recipe.name}}</h1>
      </span>
      <span v-if="isEditMode">
        <h1>
          <div class="name">
            <input
              v-model="Recipe.name"
              type="text"
              placeholder="Recipe Name">
          </div>
        </h1>
      </span>
    </div>
    <button
      @click="toggleEditMode"
    >
    <span v-if="isEditMode">View</span>
    <span v-if="!isEditMode">Edit</span>
    </button>
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
          v-for='(row, index) in Recipe.ingredients'
          :key='index'
        >
          <div>
            - {{`${row.quantity} ${row.template.unit}`}} {{row.template.name}}
            <!-- - {{`${row.quantity} ${row.unit} ${row.name}`}} -->
            <button
              v-if="isEditMode"
              @click="deleteIngredient(row)"
            >X</button>
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
          v-for='(row, index) in Recipe.steps'
          :key='index'
        >
          <div>
            - {{row}}
            <button
              v-if="isEditMode"
              @click="deleteStep(row)"
            >X</button>
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
import { GET_RECIPE_QUERY, ALL_PRODUCTTEMPLATES_QUERY, CREATE_PRODUCT_MUTATION, MY_RECIPES_QUERY, UPDATE_RECIPE_MUTATION, DELETE_PRODUCT_MUTATION } from '../../../constants/graphql'
import gql from 'graphql-tag'
import { apolloClient } from '../../../apollo-client'
import vSelect from 'vue-select'

export default {
  name: 'RecipePage',
  components: {
    vSelect, SelectProduct, ProductList
  },
  // beforeCreate () {
  //   // this.recipe = JSON.parse(localStorage.getItem('recipe'))
  //   this.id = this.$route.params.id
  //   console.log('User', this.user, this.id)
  //   console.log('Recipe', this.recipe)
  // },
  data () {
    return {
      // name: this.recipe.name,
      // ingredients: this.recipe.ingredients,
      query: [],
      // steps: this.recipe.steps || [],
      newStep: '',
      isEditMode: false,
      selected: '',
      quantity: null,
      Recipe: {
      },
      userId: this.$store.state.auth.userId
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
    allRecipes: {
      query: MY_RECIPES_QUERY,
      variables () {
        return {
          ownedById: this.$store.state.auth.userId
        }
      }
    },
    Recipe: {
      query: GET_RECIPE_QUERY,
      variables () {
        return {
          id: this.$route.params.id
        }
      },
      result ({ data }) {
        console.log('Recipes data', data)
        // Sets variable query to the gql data for a more modular UI template
        this.Recipe = JSON.parse(JSON.stringify(data.Recipe))
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
      apolloClient.writeData({ data: { isEditMode: !this.isEditMode } })
    },
    add () {
      this.Recipe.steps.push(this.newStep)
      this.newStep = ''
    },
    addIngredient () {
      console.log('Enter', this.selected)
      let newIngredient = JSON.parse(JSON.stringify(this.selected))
      newIngredient['quantity'] = parseFloat(this.quantity) || ''
      newIngredient['template'] = {
        unit: this.selected.unit || '',
        name: this.selected.name || ''
      }
      this.Recipe.ingredients.push(newIngredient)
      console.log('New Ingredients', this.Recipe.ingredients)
    },
    save () {
      let recipe = {
        id: this.$route.params.id,
        name: this.Recipe.name,
        steps: this.Recipe.steps,
        ingredients: this.Recipe.ingredients

      }
      console.log('Updated Recipe', recipe)
      this.$apollo.mutate({
        mutation: UPDATE_RECIPE_MUTATION,
        variables: {
          id: recipe.id,
          name: recipe.name,
          steps: recipe.steps
        },
        update: (cache, { data: { updateRecipe } }) => {
          // Pull data from the stored query
          console.log('Test, test, test', cache)
          const data = cache.readQuery({
            query: MY_RECIPES_QUERY,
            variables: {
              ownedById: this.userId
            }
          })
          console.log('Data in store', data)
          // Delete the current person and replace it with a copay
          let index = data.allRecipes.findIndex(x => x.id === this.$route.params.id)
          if (index !== -1) {
            data.allRecipes[index] = updateRecipe
          }
          console.log('Data', data)
          // We update the cache
          cache.writeQuery({
            query: MY_RECIPES_QUERY,
            variables: {
              ownedById: this.userId
            },
            data: data
          })
        }
      }).catch((error) => {
        console.error(error)
      }).then((result) => {
        // Clone product from ingredients list
        // Attach Product to Recipe
        // console.log('Ingredients after recipe creation', this.ingredients)
        this.Recipe.ingredients.forEach((row) => {
          if (row.__typename === 'ProductTemplate') {
            this.$apollo.mutate({
              mutation: CREATE_PRODUCT_MUTATION,
              variables: {
                templateId: row.id,
                recipeId: this.$route.params.id,
                quantity: row.quantity
              }
            }).catch((error) => {
              console.error(error)
            })
          }
        })
      })
      apolloClient.writeData({ data: { isEditMode: false } })
    },
    deleteIngredient (row) {
      let index = this.Recipe.ingredients.indexOf(row)
      this.Recipe.ingredients.splice(index, 1)
      this.$apollo.mutate({
        mutation: DELETE_PRODUCT_MUTATION,
        variables: {
          id: row.id
        }
      }).catch((error) => {
        console.error(error)
      })
      console.log('Updated ingredients', index, this.ingredients)
    },
    deleteStep (row) {
      let index = this.Recipe.steps.indexOf(row)
      this.Recipe.steps.splice(index, 1)
      console.log('Updated steps', index, this.steps)
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
