<template>
  <div>
    <div class="box">
      <h1>{{this.user.name}}</h1>
      <div class="field">
        <label for="">Name:</label>
        <div>{{this.user.name}}</div>
      </div>
      <!-- <div class="field">
        <label for="">Email:</label>
        <div>{{this.user.email}}</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReadUser',
  beforeCreate () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.id = this.$route.params.id
  }
}
</script>
