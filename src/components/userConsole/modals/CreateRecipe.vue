<template>
  <div class="modal _box-shadow1">
    <div class="modal-header">
      <h2>Create Recipe</h2>
    </div>
    <div class="modal-body">
      <div class="modal-field">
        <div class="modal-label">Recipe Name:</div>
        <div class="modal-input">
          <input
            v-model="name"
            type="text"
            placeholder="">
        </div>
      </div>
    </div>
    <div>
      <div>Ingredients</div>
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
            <!-- {{row.name}} -->
            {{`${row.quantity} ${row.unit}`}} {{row.name}}
            <!-- - {{`${row.quantity} ${row.unit} ${row.name}`}} -->
            <button
              @click="deleteIngredient(row)"
            >X</button>
          </div>
        </div>
      </ul>
    </div>
    <div>
      <div>Steps</div>
        <input
          v-model="newStep"
          type="text"
          placeholder="">
        <button
          @click="add()"
          >
          + Add
        </button>
      <ul>
        <div
          v-for='(row, index) in steps'
          :key='index'
        >
          <div>
            - {{row}}
            <button
              @click="deleteStep(row)"
            >X</button>
          </div>
        </div>
      </ul>
    </div>
    <div class="modal-footer">
      <button class="_button1"
        @click="submit()"
      >
        Submit
      </button>
      <button
        class="_button3"
        @click="cancel()"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { MY_RECIPES_QUERY, CREATE_RECIPE_MUTATION, CREATE_PRODUCT_MUTATION, ALL_PRODUCTTEMPLATES_QUERY } from '../../../constants/graphql'
// import { GET_USER_QUERY } from '../../../constants/graphql/users'
import { apolloClient } from '../../../apollo-client'
import AddIngredient from '../modules/AddIngredient'
import ProductList from '../modules/ProductList'
import vSelect from 'vue-select'
// import gql from 'graphql-tag'

export default {
  name: 'CreateRecipeModal',
  components: {
    AddIngredient, ProductList, vSelect
  },
  data () {
    return {
      name: '',
      newStep: '',
      selected: '',
      quantity: null,
      query: [{label: 'Cookies', value: 'Cookies'}, {label: 'Broccoli', value: 'Broccoli'}],
      ingredients: [],
      steps: [],
      userId: this.$store.state.auth.userId
      // ingredients: [{name: 'Bananas', quantity: 1, unit: 'lb'}, {name: 'Cookies', quantity: 3, unit: 'lb'}],
      // currentUserId: this.$store.state.auth.user.id
    }
  },
  apollo: {
    allProductTemplates: {
      query: ALL_PRODUCTTEMPLATES_QUERY,
      result ({ data }) {
        // Sets variable query to the gql data for a more modular UI template
        this.query = JSON.parse(JSON.stringify(data.allProductTemplates))
        // this.isEditMode = data.isEditMode
      }
    }
  },
  methods: {
    add () {
      this.steps.push(this.newStep)
      this.newStep = ''
      console.log('UserId', this.userId)
    },
    addIngredient () {
      this.selected['quantity'] = parseFloat(this.quantity)
      this.ingredients.push(this.selected)
    },
    cancel () {
      apolloClient.writeData({ data: { showCreateRecipeModal: false } })
      console.log('Ingredients2', this.ingredients)
    },
    submit () {
      console.log('UserId', this.userId)
      console.log('Modal Items', this.name, this.steps)
      this.$apollo.mutate({
        mutation: CREATE_RECIPE_MUTATION,
        variables: {
          ownedById: this.userId,
          name: this.name,
          steps: this.steps
        },
        update: (store, { data: { createRecipe } }) => {
          // Pull data from the stored query
          console.log('Store from CreateREcipe', store)
          const data = store.readQuery({
            query: MY_RECIPES_QUERY,
            variables: {
              ownedById: this.userId
            }
          })
          // We add the new data
          data.allRecipes.push(createRecipe)
          console.log('Test', data)
          // We update the cache
          store.writeQuery({
            query: MY_RECIPES_QUERY,
            variables: {
              ownedById: this.userId
            },
            data: data })
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
    },
    deleteIngredient (row) {
      let index = this.ingredients.indexOf(row)
      this.ingredients.splice(index, 1)
      console.log('Updated ingredients', index, this.ingredients)
    },
    deleteStep (row) {
      let index = this.steps.indexOf(row)
      this.steps.splice(index, 1)
      console.log('Updated ingredients', index, this.ingredients)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 24.25vw;
  top: 10vh;
  width: 45vw; /* Full width */
  height: auto; /* Full height */
  max-height: 70vh;
  margin-left: auto;
  margin-right: auto;
  padding: 5vh;
  overflow: auto; /* Enable scroll if needed */
  opacity: 1;
  background-color: #fefefe;
  animation-name: animatetop;
  animation-duration: 0.4s
  // overflow-y: scroll;
}
.modal-header {
  border-bottom: .15vh solid var(--theme-color1);
    // padding: 2px 16px;
    // background-color: #5cb85c;
    // color: white;
}
.modal-body {
  // padding: 3vh 2vh;
}
.modal-footer {
  margin-top: 5vh;
  display: flex;
  justify-content: space-around;
    // padding: 2px 16px;
    // background-color: #5cb85c;
    // color: white;
}
.modal-field {
  // border: 1px solid black;
  display: grid;
  grid-template-columns: 25% 75%;
  // width: 100%;
  margin-top: 2vh;
  margin-bottom: 3vh;

  .modal-label {
    display: flex;
    align-self: flex-end;
    // margin: 0px;
    // padding: 0px;
    // text-align: left;
  }
  .modal-input {
    input {
      // border: 1px solid black;
      width: 100%;
      height: 3vh;
    }
  }
  // border: 1px solid black;
}
/* Add Animation */
@keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 15vh; opacity: 1}
}
.modal-background {
  z-index: -1;
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // background-color: #888;
  // opacity: 0.5;
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
