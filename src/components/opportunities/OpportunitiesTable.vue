<template>
  <table>
    <thead>
      <tr>
        <th
          v-for='(item, index) in columns'
          :key='index'
          :index="index"
          @click="sortBy(item.dbField)"
          :class="{ active: sortKey == item.dbField }">
          {{ item.title | capitalize }}
          <span class="arrow" :class="sortOrders[item.dbField] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
        <th>
          Links
        </th>
      </tr>

    </thead>
    <tbody>
      <tr
        v-for='(entry, index) in filteredData'
        :key='index'
        :index="index"
      >
        <td v-for='(col, index) in columns'
          :key='index'
          :index="index"
          @click="viewPerson(entry)"
        >
        <div v-if="isContacts(col.dbField)">
          {{getNames(entry[col.dbField])}}
        </div>
         <div v-else>
          {{entry[col.dbField]}}
        </div>
        </td>
        <td>
          <button
            @click="updatePerson(entry)"
          >Edit</button>
          <button
            @click="deletePerson(entry)"
          >Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ALL_PEOPLE_QUERY, DELETE_PERSON_MUTATION } from '../../constants/graphql'

export default {
  name: 'OpportunitiesTable',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    const fields = this.columns.map(x => x.dbField)
    fields.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    isContacts: function (field) {
      if (field === 'contacts') {
        return true
      } else {
        return false
      }
    },
    getNames: function (contacts) {
      if (contacts[0]) {
        // let names = ''
        // contacts.map(x => {
        //   names = names + x.displayName
        // })
        // return names
        console.log('Contacts', contacts)
        let name = contacts[0].displayName
        return name
      } else {
        return ''
      }
    },
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    viewPerson: function (person) {
      localStorage.setItem('person', JSON.stringify(person))
      this.$router.push({path: `/person/${person.id}`})
    },
    updatePerson (person) {
      localStorage.setItem('person', JSON.stringify(person))
      console.log('test1', JSON.parse(localStorage.getItem('person')))
      this.$router.push({path: `/person/update/${person.id}`})
    },
    deletePerson (person) {
      this.$apollo.mutate({
        mutation: DELETE_PERSON_MUTATION,
        variables: {
          id: person.id
        },
        update: (store, { data: { deletePerson } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: ALL_PEOPLE_QUERY })
          // Remove item from the list
          const index = data.allPersons.findIndex(x => x.id === person.id)
          if (index !== -1) {
            data.allPersons.splice(index, 1)
          }
          // Take the modified data and write it back into the store.
          store.writeQuery({ query: ALL_PEOPLE_QUERY, data })
        }
      }).catch((error) => {
        console.error(error)
      })
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
