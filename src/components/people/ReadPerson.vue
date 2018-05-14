<template>
  <div>
    <div class="box">
      <h1>{{this.person.displayName}}</h1>
      <div class="field">
        <label for="">First Name:</label>
        <div>{{this.person.firstName}}</div>
      </div>
      <div class="field">
        <label for="">Last Name:</label>
        <div>{{this.person.lastName}}</div>
      </div>
      <div class="field">
        <label for="">Phone:</label>
        <div>{{this.person.phone1}}</div>
      </div>
      <div class="field">
        <label for="">Email:</label>
        <div>{{this.person.email}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReadPerson',
  beforeCreate () {
    this.person = JSON.parse(localStorage.getItem('person'))
    this.id = this.$route.params.id
  }
}
</script>
