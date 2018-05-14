<template>
  <div>
    <span v-if="this.$store.state.showCreateOpportunity">
      <create-opportunity></create-opportunity>
    </span>
    <div class="box effect6">
      <div class="box-content">
        <h1>Opportunities</h1>
        <button
          @click="openCreate()"
        >Add New</button>
        <div>
          <form class="search">
            <input name="query" v-model="searchQuery" placeholder="Search">
          </form>
          <opportunities-table
            :data="processData(allOpportunities)"
            :columns="columns"
            :filter-key="searchQuery">
          </opportunities-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OpportunitiesTable from './OpportunitiesTable'
import { ALL_OPPORTUNITIES_QUERY } from '../../constants/graphql'
import CreateOpportunity from './CreateOpportunity'

export default {
  name: 'Opportunities',
  components: {
    OpportunitiesTable, CreateOpportunity
  },
  data () {
    return {
      // showCreatePerson: this.$store.showCreatePerson,
      allOpportunities: [],
      sortColumn: '',
      searchQuery: '',
      columns: [
        {dbField: 'jobName', title: 'job Name'},
        {dbField: 'contacts', title: 'contact'},
        {dbField: 'stage', title: 'stage'},
        {dbField: 'status', title: 'status'},
        {dbField: 'amount', title: 'amount'},
        {dbField: 'source', title: 'source'},
        {dbField: 'estCloseDate', title: 'Est. Close Date'},
        {dbField: 'probability', title: 'probability'}
      ]
      // gridData: [
      //   { name: 'Chuck Norris', power: Infinity },
      //   { name: 'Bruce Lee', power: 9000 },
      //   { name: 'Jackie Chan', power: 7000 },
      //   { name: 'Jet Li', power: 8000 }
      // ]
    }
  },
  methods: {
    openCreate () {
      this.$store.commit('toggleCreateOpportunity')
    },
    processData (data) {
      console.log(data)
      return data
    }
  },
  apollo: {
    // allPerson here pulls the data from ALL_PEOPLE_QUERY and assigns it to the data(){} object at the top of script
    allOpportunities: {
      query: ALL_OPPORTUNITIES_QUERY
    }
  }
}
</script>

<style>
.search{
  width: 38%;
}
</style>
