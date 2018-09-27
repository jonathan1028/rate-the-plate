<template>
  <div class="header">
    <div class="header-content">
        <div class="main-nav">
          <!-- Logo -->
          <div class="logo">Penny Pincher</div>
          <!-- Main navigation -->
          <div class="nav-buttons">
            <!-- Logged in navigation -->
            <!-- <div class="authenticated-nav" v-if="userId">
              <router-link to="/expenses">Expenses</router-link>
              <div>|</div>
              <router-link to="/people">People</router-link>
              <div>|</div>
              <router-link to="/opportunities">Opportunities</router-link>
              <div>|</div>
            </div> -->
            <router-link to="/expenses">Expenses</router-link>
            <div>|</div>
            <router-link to="/vendors">Vendors</router-link>
            <div>|</div>
            <router-link to="/products">Products</router-link>
            <div>|</div>
            <router-link to="/shoppinglists">Shopping Lists</router-link>
            <div>|</div>
            <router-link to="/recipes">Recipes</router-link>
            <!-- <div>|</div>
            <router-link to="/admin">Admin Panel</router-link>
            <div>|</div>
            <router-link to="/newusers">New User Accounts</router-link> -->
          </div>
        </div>
        <!-- Login buttons   -->
        <div>
          <div>
            {{user.email}}
          </div>
          <button
            v-if="!authenticated"
            @click="login()">
              Log In
          </button>

          <button
            v-if="authenticated"
            @click="logout()">
              Log Out
          </button>
        </div>
    </div>
    <div class="modalArea">
      <div v-if="showCreateRecipeModal">
        <create-recipe/>
      </div>
      <div v-if="showCreateShoppingListModal">
        <create-shopping-list/>
      </div>
      <div v-if="showDeleteRecipeModal">
        <delete-recipe/>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CreateRecipe from './modals/CreateRecipe'
import CreateShoppingList from './modals/CreateShoppingList'
import DeleteRecipe from './modals/DeleteRecipe'
import gql from 'graphql-tag'

export default {
  name: 'UserConsoleHeader',
  components: {
    CreateRecipe, CreateShoppingList, DeleteRecipe
  },
  data () {
    console.log('user', this.$store.state.auth.user)
    return {
      toggleCreateRecipeModal: false,
      toggleDeleteRecipeModal: false
    }
  },
  apollo: {
    showCreateRecipeModal: gql`
      query {
        showCreateRecipeModal @client
      }
    `,
    showCreateShoppingListModal: gql`
      query {
        showCreateShoppingListModal @client
      }
    `,
    showDeleteRecipeModal: gql`
      query {
        showDeleteRecipeModal @client
      }
    `
  },
  computed: mapGetters(['authenticated', 'user', 'userId']),
  methods: mapActions(['login', 'logout'])
}
</script>

<style scoped>
.header{
  /* position: fixed; */
  width: 100%;
  height: 40px;
  background-color: white;
  /* top: 0; */
  -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.header-content{
  max-width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo{
  margin-right: 1em;
}
.main-nav{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.nav-buttons{
  display: flex;
  justify-content:space-between;
  align-items: center;
  color: #3273dc;
  cursor: pointer;
  text-decoration: none;
}

.nav-buttons a{
  color: #3273dc;
  text-decoration: none;
}

.nav-buttons a:visited{
  color: #3273dc;
  text-decoration: none;
}

.nav-buttons a:hover{
  color: gray;
  text-decoration: none;
}

.authenticated-nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login a{
   color: #3273dc;
   text-decoration: none;
}

.login a:visited{
  color: #3273dc;
  text-decoration: none;
}

.login a:hover{
  color: gray;
}
</style>
