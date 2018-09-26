<template>
  <div class="modal _box-shadow1">
    <div class="modal-header">
      <h2>Create Shopping List</h2>
    </div>
    <div class="modal-body">
      <div class="modal-field">
        <div class="modal-label">Shopping List Name:</div>
        <div class="modal-input">
          <input
            v-model="name"
            type="text"
            placeholder="">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="_button1"
        @click="submit()"
      >
        Submit
      </button>
      <button
        class="_button3"
        @click="cancel()"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { MY_SHOPPINGLISTS_QUERY, CREATE_SHOPPINGLIST_MUTATION } from '../../../constants/graphql'
// import { GET_USER_QUERY } from '../../../constants/graphql/users'
import { apolloClient } from '../../../apollo-client'

export default {
  name: 'CreateShoppingListModal',
  data () {
    return {
      name: '',
      userId: this.$store.state.auth.userId
    }
  },
  apollo: {
    allShoppingLists: {
      query: MY_SHOPPINGLISTS_QUERY,
      variables () {
        return {
          ownedById: this.$store.state.auth.userId
        }
      }
    }
  },
  methods: {
    cancel () {
      apolloClient.writeData({ data: { showCreateShoppingListModal: false } })
    },
    submit () {
      this.$apollo.mutate({
        mutation: CREATE_SHOPPINGLIST_MUTATION,
        variables: {
          ownedById: this.userId,
          name: this.name
        },
        update: (store, { data: { createShoppingList } }) => {
          // Pull data from the stored query
          const data = store.readQuery({
            query: MY_SHOPPINGLISTS_QUERY,
            variables: {
              ownedById: this.userId
            }
          })
          // We add the new data
          data.allShoppingLists.push(createShoppingList)
          // We update the cache
          store.writeQuery({
            query: MY_SHOPPINGLISTS_QUERY,
            variables: {
              ownedById: this.userId
            },
            data: data })
        }
      }).catch((error) => {
        console.error(error)
      })
      apolloClient.writeData({ data: { showCreateShoppingListModal: false } })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 24.25vw;
  top: 10vh;
  width: 45vw; /* Full width */
  height: auto; /* Full height */
  max-height: 70vh;
  margin-left: auto;
  margin-right: auto;
  padding: 5vh;
  overflow: auto; /* Enable scroll if needed */
  opacity: 1;
  background-color: #fefefe;
  animation-name: animatetop;
  animation-duration: 0.4s
  // overflow-y: scroll;
}
.modal-header {
  border-bottom: .15vh solid var(--theme-color1);
    // padding: 2px 16px;
    // background-color: #5cb85c;
    // color: white;
}
.modal-body {
  // padding: 3vh 2vh;
}
.modal-footer {
  margin-top: 5vh;
  display: flex;
  justify-content: space-around;
    // padding: 2px 16px;
    // background-color: #5cb85c;
    // color: white;
}
.modal-field {
  // border: 1px solid black;
  display: grid;
  grid-template-columns: 25% 75%;
  // width: 100%;
  margin-top: 2vh;
  margin-bottom: 3vh;

  .modal-label {
    display: flex;
    align-self: flex-end;
    // margin: 0px;
    // padding: 0px;
    // text-align: left;
  }
  .modal-input {
    input {
      // border: 1px solid black;
      width: 100%;
      height: 3vh;
    }
  }
  // border: 1px solid black;
}
/* Add Animation */
@keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 15vh; opacity: 1}
}
.modal-background {
  z-index: -1;
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // background-color: #888;
  // opacity: 0.5;
}
.container {
  border: 1px solid lightgray;
  display: grid;
  width: 100%;
  margin: 0px;
  padding: 0px;
  grid-template-columns: 60% 15% 15% 10%;
  .unit {
    // width: 10%
    // border: 1px solid black;
    display: flex;
    align-items: center;
    margin-left: 1vw;
    font-size: 2vh;
  }
  .qty {
    // border: 1px solid black;
    input {
      padding-left: 0.5vw;
      height: 4vh;
      font-size: 2vh;
      width: 100%;
    }
  }
  .v-select {
    // border: 1px solid black;
    // height: 2.5vh;
    font-size: 2vh;
    // margin-left: 1vw;
  }
  button {
    font-size: 3vh;
  }
}
</style>
