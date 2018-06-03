<template>
  <div class="header">
    <div class="header-content">
        <div class="main-nav">
          <!-- Logo -->
          <div class="logo">Penny Pincher</div>
          <!-- Main navigation -->
          <div class="nav-buttons">
            <router-link to="/admin">About</router-link>
            <div>|</div>
            <router-link to="/newusers">Contact</router-link>
          </div>
        </div>
        <!-- Login buttons   -->
        <button
          id="qsLoginBtn"
          class="btn btn-primary btn-margin"
          v-if="!this.$store.state.isAuthenticated"
          @click="login()">
            Log In
        </button>

        <button
          id="qsLogoutBtn"
          class="btn btn-primary btn-margin"
          v-if="this.$store.state.isAuthenticated"
          @click="logout()">
            Log Out
        </button>
    </div>
    <router-view></router-view>
    <!-- <router-view
        :auth="auth"
        :authenticated="authenticated">
    </router-view> -->
  </div>
</template>

<script>
import AuthService from '../../auth/AuthService'

const auth = new AuthService()
const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'PublicHeader',
  computed: {
    // You first retrieve the userId from this.$root.$data.
    // If the userId is not available, the submit-button won’t be rendered anymore.
    // That way you make sure only authenticated users can create new links
    userId () {
      return this.$root.$data.userId
    }
  },
  data () {
    // Without this function the page will not render
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    // Sets the authInstance in the store so that it can be retrieved by Callback.vue
    this.$store.state.authInstance = auth
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  }
}
</script>

<style>
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
