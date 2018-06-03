<template>
  <div>
    <h4 v-if="authenticated">
        You are logged in!
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: ['auth', 'authenticated']
  // computed: {
  //   isAuthenticated () {
  //     if (localStorage.getItem('access_token')) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // }
}
</script>

<style>
  a {
    cursor: pointer;
  }
</style>
