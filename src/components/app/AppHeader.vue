<template>
  <div class="header">
    <div class="header-content">
        <div class="main-nav">
          <!-- Logo -->
          <div class="logo">Agilent CRM</div>
          <!-- Main navigation -->
          <div class="nav-buttons">
            <!-- Logged in navigation -->
            <div class="authenticated-nav" v-if="userId">
              <router-link to="/expenses">Expenses</router-link>
              <div>|</div>
              <router-link to="/people">People</router-link>
              <div>|</div>
              <router-link to="/opportunities">Opportunities</router-link>
              <div>|</div>
            </div>
            <router-link to="/admin">Admin Panel</router-link>
            <div>|</div>
            <router-link to="/newusers">New User Accounts</router-link>
          </div>
        </div>
        <!-- Login buttons   -->
        <div class="login">
          <a>
            <div v-if="userId" @click="logout()">Logout</div>
            <router-link v-else to="/login">Login</router-link>
          </a>
        </div>
    </div>
  </div>
</template>

<script>
import { GC_USER_ID, GC_AUTH_TOKEN } from '../../constants/settings'

export default {
  name: 'AppHeader',
  computed: {
    // You first retrieve the userId from this.$root.$data.
    // If the userId is not available, the submit-button won’t be rendered anymore.
    // That way you make sure only authenticated users can create new links
    userId () {
      return this.$root.$data.userId
    }
  },
  methods: {
    logout () {
      localStorage.removeItem(GC_USER_ID)
      localStorage.removeItem(GC_AUTH_TOKEN)
      this.$root.$data.userId = localStorage.getItem(GC_USER_ID)
    }
  }
}
</script>

<style>
.header{
  position: fixed;
  width: 100%;
  height: 40px;
  background-color: white;
  top: 0;
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
