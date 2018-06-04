<template>
  <div>
    <!-- <commit-chart></commit-chart> -->
    <div class="chartBlock">
      <canvas id="myChart"></canvas>
    </div>
    <div class="box effect6">
      <div class="box-content">
        <h1>Users</h1>
        <div>
          <form class="search">
            <input name="query" v-model="searchQuery" placeholder="Search">
          </form>
          <user-table
            :data="allUsers"
            :columns="columns"
            :filter-key="searchQuery">
          </user-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import CommitChart from './CommitChart'
import UserTable from './UserTable'
import { ALL_USERS_QUERY } from '../../constants/graphql'
// import { ALL_PEOPLE_QUERY, NEW_PEOPLE_SUBSCRIPTION } from '../constants/graphql'

export default {
  name: 'NewUsers',
  components: {
    UserTable, CommitChart
  },
  data: function () {
    return {
      allUsers: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'id', title: 'id'},
        {dbField: 'name', title: 'name'},
        {dbField: 'email', title: 'email'},
        {dbField: 'createdAt', title: 'createdAt'},
        {dbField: 'updatedAt', title: 'updatedAt'}],
      ctx: null,
      chart: null
    }
  },
  methods: {
    getData: function () {
      return [12, 19, 3, 5, 2, 3]
    },
    drawChart: function () {
      // this.ctx.canvas.width = 400
      // this.ctx.canvas.height = 400
      if (this.chart) this.chart.destroy()
      this.chart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: null,
            data: this.getData(),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    }
  },
  mounted: function () {
    this.ctx = document.getElementById('myChart')
    // Sets the proportions of the chart within the div
    this.ctx.width = 400
    this.ctx.height = 400
    this.drawChart()
  },
  apollo: {
    // allUser here pulls the data from ALL_USERS_QUERY and assigns it to the data(){} object at the top of script
    allUsers: {
      query: ALL_USERS_QUERY
    }
  }
}
</script>

<style>
.chartBlock {
  width: 200px;
  height: 200px;
}
</style>
