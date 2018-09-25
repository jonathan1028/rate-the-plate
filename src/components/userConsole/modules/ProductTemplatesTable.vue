<template>
  <div class="component">
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
          v-for='(row, index) in filteredData'
          :key='index'
          :index="index"
        >
          <td v-for='(col, index) in columns'
            :key='index'
            :index="index"
            @click="view(row)"
          >
          <div v-if="col.dbField === 'createdAt'">
            <span>{{row[col.dbField] | formatDate}}</span>
          </div>
          <div v-else-if="col.dbField === 'updatedAt'">
            <span>{{row[col.dbField] | relativeTime}}</span>
          </div>
          <div v-else-if="col.dbField === 'ownedBy'">
            <span>{{ getName(row[col.dbField]) }}</span>
          </div>
          <div v-else>
            {{row[col.dbField]}}
          </div>
          </td>
          <td>
            <button
              @click="update(row)"
            >Edit</button>
            <button
              @click="deleteObject(row)"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { DELETE_PRODUCTTEMPLATE_MUTATION } from '../../../constants/graphql'
// import { GC_USER_ID } from '../../../constants/settings'
export default {
  name: 'ProductTemplatesTable',
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
    getName (owner) {
      return owner.firstName + ' ' + owner.lastName
    },
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
    view: function (obj) {
      // Creates a dynamic path and stores to localStorage regardless of what type of object is passed in
      let path = obj.__typename.toLowerCase() + '/' + obj.id
      localStorage.setItem(obj.__typename.toLowerCase(), JSON.stringify(obj))
      this.$router.push({path: path})
    },
    update (product) {
      localStorage.setItem('product', JSON.stringify(product))
      // console.log('test1', JSON.parse(localStorage.getItem('user')))
      this.$router.push({path: `/product/${product.id}`})
    },
    deleteObject (obj) {
      console.log('This Mutatation', this.deleteMutation, this.columns, this.mutation)
      if (!obj.products) {
        console.log('Template deleted')
        this.$apollo.mutate({
          mutation: DELETE_PRODUCTTEMPLATE_MUTATION,
          variables: {
            id: obj.id
          }
          // update: (store, { data: { deleteObject } }) => {
          //   // Read the data from our cache for this query.
          //   const data = store.readQuery({ query: ALL_USERS_QUERY })
          //   // Remove item from the list
          //   const index = data.allUsers.findIndex(x => x.id === obj.id)
          //   if (index !== -1) {
          //     data.allUsers.splice(index, 1)
          //   }
          //   // Take the modified data and write it back into the store.
          //   store.writeQuery({ query: ALL_USERS_QUERY, data })
          // }
        }).catch((error) => {
          console.error(error)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  background-color: var(--background-color3);
  color: white;
  text-align: left;
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
