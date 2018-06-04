<template>
  <table>
    <thead>
      <tr>
        <th
          v-for='(item, index) in columns'
          :key='index'
          :index="index"
          >
          {{ item.title | capitalize }}
          <!-- @click="sortBy(item.dbField)"
          :class="{ active: sortKey == item.dbField }" -->
          <!-- <span class="arrow" :class="sortOrders[item.dbField] > 0 ? 'asc' : 'dsc'">
          </span> -->
        </th>
        <th>
          Links
        </th>
      </tr>

    </thead>
    <tbody>
      <tr
        v-for='(row, rowIndex) in clonedData'
        :key='rowIndex'
        :index="rowIndex"
      >
        <!-- @click="setSelection(allExpenses[rowIndex].id, $event)" -->
        <td v-for='(col, key, index) in columns'
          :key='index'
          :index="index"
        >
        <!-- @click="setTarget(rowIndex, col.dbField)" -->
          <!-- <div>{{ row[col.dbField] }}</div> -->
        <!-- @click="viewPerson(row)" -->
          <input
            v-model="clonedData[rowIndex][col.dbField]"
            type="text"
            name="cell"
            @change="update(clonedData[rowIndex][col.dbField], col.dbField, clonedData[rowIndex])"
          >
          <!-- <div v-if="isOwner(col.dbField)">
            {{getName(row[col.dbField])}}
          </div>
          <div v-else>
            {{row[col.dbField]}}
          </div> -->
        </td>
        <!-- <td>
          <button
            @click="updatePerson(row)"
          >Edit</button>
          <button
            @click="deletePerson(row)"
          >Delete</button>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>

<script>
// import { ALL_EXPENSES_QUERY, ALL_PEOPLE_QUERY, DELETE_PERSON_MUTATION } from '../../constants/graphql'
import { ALL_EXPENSES_QUERY, UPDATE_EXPENSE_MUTATION } from '../../../constants/graphql'

export default {
  name: 'ExpensesTable',
  // props: {
  //   filterKey: String
  //   // amount: 0,
  //   // date: '',
  //   // description: ''
  // },
  data: function () {
    return {
      allExpenses: [],
      clonedData: [],
      testData: [
        {date: '', amount: 5, description: 'test1'},
        {date: '', amount: 7, description: 'test2'}
      ],
      columns: [
        {dbField: 'date', title: 'date'},
        {dbField: 'amount', title: 'amount'},
        {dbField: 'description', title: 'description'}
      ]
      // sortOrders: {},
      // sortKey: '',
      // activeCell: {}
    }
  },
  computed: {
    // sortOrders: function () {
    //   this.fields.forEach(function (key) {
    //   this.sortOrders[key] = 1
    //   })
    //   return this.sortOrders
    // },
    // filteredData: function () {
    //   console.log('Expenses', this.allExpenses)
    //   var sortKey = this.sortKey
    //   var filterKey = this.filterKey && this.filterKey.toLowerCase()
    //   var order = this.sortOrders[sortKey] || 1
    //   var data = this.allExpenses
    //   if (filterKey) {
    //     data = data.filter(function (row) {
    //       return Object.keys(row).some(function (key) {
    //         return String(row[key]).toLowerCase().indexOf(filterKey) > -1
    //       })
    //     })
    //   }
    //   if (sortKey) {
    //     data = data.slice().sort(function (a, b) {
    //       a = a[sortKey]
    //       b = b[sortKey]
    //       return (a === b ? 0 : a > b ? 1 : -1) * order
    //     })
    //   }
    //   return data
    // }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  mounted () {
    // const expenses = []
    // let clonedData = []
    // this.bindedData = Object.assign({}, this.allExpenses)
    console.log('Expenses', this.allExpenses)
    this.$watch('allExpenses', function () {
      console.log(JSON.stringify(this.allExpenses))
      this.clonedData = JSON.parse(JSON.stringify(this.allExpenses))
      // this.clonedData = this.allExpenses.slice(0)
      console.log('Clone', this.clonedData)
      console.log('Test', this.testData)
    }, {deep: true})
    //   expenses = Object.assign({}, this.allExpenses)
    // apollo.watchQuery<any>({
    //   query: ALL_EXPENSES_QUERY,
    //   variables: {
    //     date: this.date,
    //     description: this.description,
    //     amount: this.amount
    //   }
    // }).subscribe((result) => Object.assign(this.bindedData.description, result.data.description))
  },
  methods: {
    // setSelection: function (id, event) {
    //   console.log('Set Selection', id)

    //   this.selectedRowArray = []
    //   this.selectedRowArray.push(id)
    //   console.log('Array', this.selectedRowArray)
    //   const vm = this
    //   const index = vm.selectedRowArray.indexOf(id)
    //   if (event.altKey) {
    //     if (index !== -1) {
    //       vm.selectedRowArray.splice(index, 1)
    //     } else if (index === -1) {
    //       vm.selectedRowArray.push(id)
    //     }
    //   } else if (!event.altKey) {
    //     vm.selectedRowArray = []
    //     vm.selectedRowArray.push(id)
    //   }
    // },
    // setTarget: function (rowIndex, key) {
    //   console.log('Set Target', rowIndex, key)
    //   this.activeCell = this.filteredData[rowIndex][key]
    //   console.log('Active Cell', this.activeCell)
    // },
    // isOwner: function (field) {
    //   if (field === 'ownedBy') {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    // getName: function (owner) {
    //   if (owner && owner.name) {
    //     return owner.name
    //   } else {
    //     return ''
    //   }
    // },
    // sortBy: function (key) {
    //   this.sortKey = key
    //   this.sortOrders[key] = this.sortOrders[key] * -1
    // },
    // viewPerson: function (person) {
    //   localStorage.setItem('person', JSON.stringify(person))
    //   this.$router.push({path: `/person/${person.id}`})
    // },
    update (value, field, expense) {
      console.log('Test')
      let amount = 0
      if (field === 'amount') {
        amount = parseFloat(value)
      }
      console.log('Amount', value)
      this.$apollo.mutate({
        mutation: UPDATE_EXPENSE_MUTATION,
        variables: {
          id: expense.id,
          amount: amount
        }
        // update: (store, { data: { updateExpense } }) => {
        //   // Get data from store
        //   const data = store.readQuery({ query: ALL_EXPENSES_QUERY })
        //   // Delete the current person and replace it with a copay
        //   let index = data.allPersons.findIndex(x => x.id === this.person.id)
        //   if (index !== -1) {
        //     data.allPersons[index] = Object.assign({}, this.person)
        //   }
        //   // Update the store
        //   store.writeQuery({ query: ALL_PEOPLE_QUERY, data: data })
        // }
      })
      // this.$router.push({path: '/people'})
      // console.log('Info', expense, field)
      // if (expense[field] === 'amount') { console.log('Amount') }
      // if (field === 'description') { console.log('Description') }
      // if (field === 'date') { console.log('Date') }
      // const displayName = this.person.firstName + ' ' + this.person.lastName
      // localStorage.setItem('person', JSON.stringify(person))
      // console.log('test1', JSON.parse(localStorage.getItem('person')))
      // this.$router.push({path: `/person/update/${person.id}`})
    }
    // deletePerson (person) {
    //   this.$apollo.mutate({
    //     mutation: DELETE_PERSON_MUTATION,
    //     variables: {
    //       id: person.id
    //     },
    //     update: (store, { data: { deletePerson } }) => {
    //       // Read the data from our cache for this query.
    //       const data = store.readQuery({ query: ALL_PEOPLE_QUERY })
    //       // Remove item from the list
    //       const index = data.allPersons.findIndex(x => x.id === person.id)
    //       if (index !== -1) {
    //         data.allPersons.splice(index, 1)
    //       }
    //       // Take the modified data and write it back into the store.
    //       store.writeQuery({ query: ALL_PEOPLE_QUERY, data })
    //     }
    //   }).catch((error) => {
    //     console.error(error)
    //   })
    // }
  },
  apollo: {
    // allObjects here pulls the data from ALL_OBJECTS_QUERY and assigns it to the data(){} object at the top of script
    allExpenses: {
      query: ALL_EXPENSES_QUERY
    }
  }
}
</script>

<style>
/* body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
} */

/* tr:nth-child(3) { border: solid thin; } */
table {
  /* border-collapse is needed to make the borders work properly on rows */
  margin-top: 1%;
  border-collapse: collapse;
  border-bottom: 2px solid lightgray;
  border-radius: 3px;
  background-color: white;
  width: 100%;
}

th {
  height: 40px;
  background-color: rgb(220,220,220);
}

/* thead > tr {
  -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
} */

tr {
  height: 40px;
  border-bottom: 1px solid lightgray;
}

tr:hover {
  background-color: rgb(245, 245, 245);
}

/* td {
  background-color: #f9f9f9;
} */

/* th, td {
  min-width: 120px;
  padding: 10px 20px;
} */

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

.effect7
{
  position:relative;
  -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}

.effect7:before, .effect7:after
{
  content:"";
  position:absolute;
  z-index:-1;
  -webkit-box-shadow:0 0 20px rgba(0,0,0,0.8);
  -moz-box-shadow:0 0 20px rgba(0,0,0,0.8);
  box-shadow:0 0 20px rgba(0,0,0,0.8);
  top:0;
  bottom:0;
  left:10px;
  right:10px;
  -moz-border-radius:100px / 10px;
  border-radius:100px / 10px;
}

.effect7:after
{
  right:10px;
  left:auto;
  -webkit-transform:skew(8deg) rotate(3deg);
  -moz-transform:skew(8deg) rotate(3deg);
  -ms-transform:skew(8deg) rotate(3deg);
  -o-transform:skew(8deg) rotate(3deg);
  transform:skew(8deg) rotate(3deg);
}
</style>
