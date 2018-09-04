<template>
  <div class="component">
    <ul>
      <div
        v-for='(row, index) in filteredData'
        :key='index'
      >
        <div>
          <input
            v-model="row.inCart"
            @change="update(row)"
            class="checkbox"
            type="checkbox">
          {{row.name}}
          <button
            @click="deleteObject(row)"
          >X</button>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import { MY_PRODUCTS_QUERY, UPDATE_PRODUCT_MUTATION, DELETE_PRODUCT_MUTATION } from '../../../constants/graphql'
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
      sortOrders: sortOrders,
      inCart: false
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
    update (row) {
      console.log('In Cart', row.inCart, row.id)
      this.$apollo.mutate({
        mutation: UPDATE_PRODUCT_MUTATION,
        variables: {
          id: row.id,
          inCart: row.inCart
        },
        update: (store, { data: { updateProduct } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: MY_PRODUCTS_QUERY,
            variables: {
              shoppingListId: this.$route.params.id
            }
          })
          // // Remove item from the list
          let index = data.allProducts.findIndex(x => x.id === row.id)
          if (index !== -1) {
            data.allProducts[index]['inCart'] = row.inCart
          }
          // Take the modified data and write it back into the store.
          store.writeQuery({
            query: MY_PRODUCTS_QUERY,
            variables: {
              shoppingListId: this.$route.params.id
            },
            data
          })
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    deleteObject (obj) {
      this.$apollo.mutate({
        mutation: DELETE_PRODUCT_MUTATION,
        variables: {
          id: obj.id
        },
        update: (store, { data: { deleteProduct } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: MY_PRODUCTS_QUERY,
            variables: {
              shoppingListId: this.$route.params.id
            }
          })
          // // Remove item from the list
          const index = data.allProducts.findIndex(x => x.id === obj.id)
          if (index !== -1) {
            data.allProducts.splice(index, 1)
          }
          // Take the modified data and write it back into the store.
          store.writeQuery({
            query: MY_PRODUCTS_QUERY,
            variables: {
              shoppingListId: this.$route.params.id
            },
            data
          })
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  width: auto;
}
li {
  text-decoration-style: none;
}

</style>
