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
            <router-link to="/admin">Admin Panel</router-link>
            <div>|</div>
            <router-link to="/newusers">New User Accounts</router-link>
          </div>
        </div>
        <!-- Login buttons   -->
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
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserConsoleHeader',
  computed: mapGetters(['authenticated']),
  methods: mapActions(['login', 'logout'])
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
