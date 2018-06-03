<template>
  <div class="spinner">
    <img src="../assets/loading.svg" alt="loading"/>
  </div>
</template>

<script>
import router from './../router'
export default {
  name: 'Callback',
  // props: ['auth'],
  data () {
    // Pulls authInstance from the store and passes it to handleAuthentication() in AuthService.js
    const auth = this.$store.state.authInstance
    auth.handleAuthentication()
    if (auth.isAuthenticated) {
      console.log('Authentication is true')
      this.$store.state.isAuthenticated = true
      router.replace('expenses')
    }
    return {}
  }
}
</script>

<style>
  .spinner {
    position: absolute;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
