<template>
  <div class="component">
    <div class="companyName">Good Citizen Network</div>
    <div class="inputs">
      <div class="field">
        <label for="">Email</label>
        <input
          v-model="email"
          type="text"
          placeholder="Email">
      </div>
      <div class="field">
        <label for="">First Name</label>
        <input
          v-model="firstName"
          type="text"
          placeholder="Good">
      </div>
      <div class="field">
        <label for="">Last Name</label>
        <input
          v-model="lastName"
          type="text"
          placeholder="Citizen">
      </div>
      <div class="field">
        <label for="">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Password">
      </div>
    </div>
    <div>
      <button
        @click="create"
        class="_button1"
      >
        Sign Up
      </button>
    </div>
    <div class="linkBlock">
      <router-link
        class="link"
        to="login"
      >
        Already have an account? Login
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['authenticated'])
  },
  methods: {
    create () {
      this.$store.dispatch('createUser',
        {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password
        }
      )
    },
    ...mapActions(['logout'])
  }
}
</script>

<style lang="scss" scoped>
.component {
  width: 25vw;
  background-color: var(--background-color2);
  // height: 40vh;
  margin: auto;
  margin-top: 15vh;
  padding: 2vh;
  //display: flex;
  // align-items: center;
  //justify-content: center;
  text-align: center;
}
.companyName {
  margin-top: 8vh;
  margin-bottom: 5vh;
  color: var(--font-color1);
  font-size: 4vh;
}
.inputs {
  // margin-top: 5vh;
}
.field {
  width: 100%;
  margin-bottom: 3vh;
  // display: flex;
  // justify-content: center;
  // border: 1px solid black;
}
label {
  color: var(--font-color3);
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
input {
  width: 100%;
  font-size: 2vh;
  // margin-top: 5vh;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: .25vh solid lightgray;
}
// button {
//   width: 100%;
//   margin-top: 5vh;
//   background-color: #efba34;
//   border-radius: 3vh;
// }
.linkBlock {
  margin-top: 3vh;
  .link {
    color: var(--text-color1);
  }
}
</style>
