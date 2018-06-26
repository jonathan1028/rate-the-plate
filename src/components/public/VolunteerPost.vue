<template>
  <div>
    <h1>Volunteer Job</h1>
    <div>
    <form class="box">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li
            v-for="(error, index) in errors"
            :key="index"
            >{{ error }}</li>
        </ul>
      </p>
      <h1></h1>
      <div class="field">
        <label>Start Time</label>
        <datepicker placeholder="Select Date" v-model="startTime"></datepicker>
      </div>
      <div class="field">
        <label>EndTime</label>
        <datepicker placeholder="Select Date" v-model="startTime"></datepicker>
      </div>
      <div class="field">
        <label>Recurring</label>
        <p v-if="errors.length"></p>
        <select name="" id="" v-model="recurring">
          <option default="true" value="Weekly">Default</option>
          <option value="Weekly">Weekly</option>
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <div class="field">
        <label>Delivery Area</label>
        <p v-if="errors.length"></p>
        <input
          v-model="deliveryArea"
          type="text"
        >
      </div>
      <div class="field">
        <label>Volunteers Needed</label>
        <p v-if="errors.length"></p>
        <input
          v-model="volunteersNeeded"
          type="text"
        >
      </div>
      <!-- <div
        v-if="this.errors.length > 0"> -->
      <div>
        {{this.errors}}
      </div>
      <div class="field">
        {{this.errors.phoneNumber}}
        <p v-if="errors.length"></p>
        <label>Phone Number</label>
        <input
          v-model="phoneNumber"
          type="text"
        >
      </div>
      <button @click.prevent="submit()">Post</button>
    </form>
  </div>
  </div>
</template>

<script>
/* eslint-disable */
import { UPDATE_USER_MUTATION } from '../../constants/graphql'
import { mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'VolunteerPost',
  components: { Datepicker },
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      startTime: '',
      endTime: '',
      recurring: '',
      deliveryArea: '',
      volunteersNeeded: '',
      phoneNumber: '',
      errors: []
    }
  },
  methods: {
    ...mapActions(['handleAuthentication']),
    submit () {
      // Save the user input in case of an error
      const name = this.user.name
      const user = this.user
      const startTime = this.startTime
      const endTime = this.endTime
      const recurring = this.recurring
      const deliveryArea = this.deliveryArea
      const volunteersNeeded = this.volunteersNeeded
      const phoneNumber = this.phoneNumber

      // Validation

      const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
      // Matches the following phone number styles
      // 123-456-7890
      // (123) 456-7890
      // 123 456 7890
      // 123.456.7890
      // +91 (123) 456-7890
      console.log('Regex Test', regex.test(phoneNumber))
      if (regex.test(phoneNumber)) {
        return true
      } else {
        this.errors = []
        this.errors.push('Not a valid phone number.')
      }

      if (this.errors.length !== 0) {
        console.log('Errors', this.errors)
        return this.errors
      }

      this.$apollo.mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          id: this.user.id,
          name: name
        }
      })
      this.$router.push({path: '/admin'})
    }
  }
}
</script>

<style>

</style>
