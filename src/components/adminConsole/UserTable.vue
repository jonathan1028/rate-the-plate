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
          @click="viewUser(entry)"
        >
        <div v-if="isCreatedAt(col.dbField)">
          <span>{{entry[col.dbField] | formatDate}}</span>
        </div>
        <div v-else-if="isUpdatedAt(col.dbField)">
          <span>{{entry[col.dbField] | relativeTime}}</span>
        </div>
         <div v-else>
          {{entry[col.dbField]}}
        </div>
        </td>
        <td>
          <button
            @click="updateUser(entry)"
          >Edit</button>
          <button
            @click="deleteUser(entry)"
          >Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ALL_USERS_QUERY, DELETE_USER_MUTATION } from '../../constants/graphql'
import { GC_USER_ID } from '../../constants/settings'

export default {
  name: 'UserTable',
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
    isCreatedAt: function (field) {
      if (field === 'createdAt') {
        return true
      } else {
        return false
      }
    },
    isUpdatedAt: function (field) {
      if (field === 'updatedAt') {
        return true
      } else {
        return false
      }
    },
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    viewUser: function (user) {
      localStorage.setItem('user', JSON.stringify(user))
      this.$router.push({path: `/user/${user.id}`})
    },
    updateUser (user) {
      localStorage.setItem('user', JSON.stringify(user))
      console.log('test1', JSON.parse(localStorage.getItem('user')))
      this.$router.push({path: `/user/update/${user.id}`})
    },
    deleteUser (obj) {
      console.log('Object', obj)
      const currentUser = localStorage.getItem(GC_USER_ID)
      console.log('Object', currentUser)
      if (obj.id !== currentUser) {
        this.$apollo.mutate({
          mutation: DELETE_USER_MUTATION,
          variables: {
            id: obj.id
          },
          update: (store, { data: { deleteObject } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: ALL_USERS_QUERY })
            // Remove item from the list
            const index = data.allUsers.findIndex(x => x.id === obj.id)
            if (index !== -1) {
              data.allUsers.splice(index, 1)
            }
            // Take the modified data and write it back into the store.
            store.writeQuery({ query: ALL_USERS_QUERY, data })
          }
        }).catch((error) => {
          console.error(error)
        })
      }
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
