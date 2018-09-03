import gql from 'graphql-tag'

// ----------------------------------------- Expenses ---------------------------------------------
export const ALL_EXPENSES_QUERY = gql`
  query AllExpensesQuery ($userId: ID!){
    allExpenses (filter: {ownedBy: {id: $userId}}){
      id
      date
      description
      amount
      ownedBy{
        id
      }
    }
  }
`

export const CREATE_EXPENSE_MUTATION = gql`
  mutation CreateExpenseMutation($ownedById: ID!, $date: DateTime, $amount: Float, $description: String) {
    createExpense(
      ownedById: $ownedById
      date: $date
      description: $description
      amount: $amount
    ) {
      id
      date
      description
      amount
      ownedBy {
        id
      }
    }
  }
`

export const UPDATE_EXPENSE_MUTATION = gql`
  mutation UpdateExpenseMutation($id: ID!, $amount: Float, $date: DateTime, $description: String) {
    updateExpense(
      id: $id,
      date: $date
      amount: $amount,
      description: $description
    ) {
      id
    }
  }
`
// ----------------------------------------- Vendors ---------------------------------------------
export const ALL_VENDORS_QUERY = gql`
  query AllVendorsQuery {
    allVendors {
      id
      name
      ownedBy{
        id
      }
    }
  }
`

export const CREATE_VENDOR_MUTATION = gql`
  mutation CreateVendorMutation($ownedById: ID, $name: String) {
    createVendor(
      name: $name
    ) {
      id
    }
  }
`

// ----------------------------------------- Queries ---------------------------------------------
export const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`

export const GET_USER_QUERY = gql`
  query GetUserQuery ($auth0UserId: String!){
    allUsers (filter: { auth0UserId: $auth0UserId }){
      id
      email
    }
  }
`

// ----------------------------------------- Mutations ---------------------------------------------

export const CREATE_USER_MUTATION = gql`
  mutation ($idToken: String!, $name: String!, $email: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, email: $email) {
      id
    }
  }
`

// Two mutations defined at once!
// the execution order is always from top to bottom.
// CreateUser mutation will be executed before the signinUser mutation.
// Bundling two mutations like this allows you to sign up and login in a single request!
// export const CREATE_USER_MUTATION = gql`
//   mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
//     createUser(
//       name: $name,
//       authProvider: {
//         email: {
//           email: $email,
//           password: $password
//         }
//       }
//     ) {
//       id
//     }

//     signinUser(email: {
//       email: $email,
//       password: $password
//     }) {
//       token
//       user {
//         id
//       }
//     }
//   }
// `

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: ID!,  $name: String) {
    updateUser(
      id: $id,
      name: $name,
    ) {
      id
      name
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: ID!) {
    deleteUser(
      id: $id,
    ) {
      id
    }
  }
`
// ----------------------------------------- Subscriptions ---------------------------------------------

export const NEW_PEOPLE_SUBSCRIPTION = gql`
  subscription {
    Person(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        createdAt
        displayName 
        firstName
        lastName
        phone1
        email
        ownedBy {
          id
        }
      }
    }
  }
`

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    Link(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    Vote(filter: { mutation_in: [CREATED] }) 
    {
      node {
        id
        link {
          id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
        user {
          id
        }
      }
    }
  }
`
