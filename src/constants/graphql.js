import gql from 'graphql-tag'

// ----------------------------------------- Users ---------------------------------------------

export const GET_USER_QUERY = gql`
  query User ($id: ID, $email: String){
    User(id: $id, email: $email) {
      id
      email
    }
  }
`

// Two mutations defined at once!
// the execution order is always from top to bottom.
// CreateUser mutation will be executed before the signinUser mutation.
// Bundling two mutations like this allows you to sign up and login in a single request!
export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($firstName: String, $lastName: String, $email: String!, $password: String!) {
    createUser(
      firstName: $firstName,
      lastName: $lastName,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
      firstName
      lastName
      email
    }
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`

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

// ----------------------------------------- Shopping Lists ---------------------------------------------
export const ALL_SHOPPINGLISTS_QUERY = gql`
  query AllShoppingListsQuery {
    allShoppingLists {
      id
      name
    }
  }
`

export const MY_SHOPPINGLISTS_QUERY = gql`
  query AllShoppingListsQuery ($ownedById: ID!){
    allShoppingLists (filter: {ownedBy: {id: $ownedById}})
    {
      id
      name
      ownedBy {
        id
      }
      products {
        id
      }
    }
  }
`

export const GET_SHOPPINGLIST_QUERY = gql`
  query ShoppingList ($id: ID!){
    ShoppingList (id: $id){
      id
      name
      ownedBy {
        id
      }
      products {
        id
      }
    }
  }
`

export const CREATE_SHOPPINGLIST_MUTATION = gql`
  mutation CreateShoppingListMutation($ownedById: ID!, $name: String) {
    createShoppingList(
      ownedById: $ownedById
      name: $name
    ) {
      id
      name
      ownedBy {
        id
      }
      products {
        id
      }
    }
  }
`

export const DELETE_SHOPPINGLIST_MUTATION = gql`
  mutation DeleteShoppingListMutation($id: ID!) {
    deleteShoppingList(
      id: $id,
    ) {
      id
    }
  }
`
// ----------------------------------------- ProductTemplates ---------------------------------------------

export const ALL_PRODUCTTEMPLATES_QUERY = gql`
  query AllProductTemplatesQuery {
    allProductTemplates {
      id
      name
      category
      price
      unit
    }
  }
`

export const CREATE_PRODUCTTEMPLATE_MUTATION = gql`
  mutation CreateProductTemplateMutation($name: String, $category: String, $price: Float, 
  $unit: String) {
    createProductTemplate(
      name: $name
      category: $category
      price: $price
      unit: $unit
    ) {
      id
      name
      category
      price
      unit
    }
  }
`
export const UPDATE_PRODUCTTEMPLATE_MUTATION = gql`
  mutation UpdateProductTemplateMutation($id: ID!, $name: String, $category: String, $unit: String, $price: Float ) {
    updateProductTemplate(
      id: $id
      name: $name
      category: $category
      unit: $unit
      price: $price
    ) {
      id
    }
  }
`

export const DELETE_PRODUCTTEMPLATE_MUTATION = gql`
  mutation DeleteProductTemplateMutation($id: ID!) {
    deleteProductTemplate(
      id: $id,
    ) {
      id
    }
  }
`

// ----------------------------------------- Products ---------------------------------------------
export const ALL_PRODUCTS_QUERY = gql`
  query AllProductsQuery {
    allProducts {
      id
      inCart
      quantity
      template {
        id
        name
        unit
        category
        price
      }
    }
  }
`

export const MY_PRODUCTS_QUERY = gql`
  query AllProductsQuery ($listId: ID!){
    allProducts (filter: {
      OR: [{shoppingList: {id: $listId}}, {recipe: {id: $listId}}]
    }){
      id
      inCart
      quantity
      template {
        id
        name
        unit
        category
        price
      }
    }
  }
`

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProductMutation($templateId: ID!, $shoppingListId: ID, $recipeId: ID, $quantity: Float) {
    createProduct(
      templateId: $templateId
      shoppingListId: $shoppingListId
      recipeId: $recipeId
      quantity: $quantity
    ) {
      id
      quantity
      inCart
      template {
        id
        name
        unit
        category
        price
      }
    }
  }
`

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductMutation($id: ID!,  $inCart: Boolean) {
    updateProduct(
      id: $id,
      inCart: $inCart
    ) {
      id
      quantity
    }
  }
`

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: ID!) {
    deleteProduct(
      id: $id,
    ) {
      id
    }
  }
`

// ----------------------------------------- Recipes ---------------------------------------------
export const ALL_RECIPES_QUERY = gql`
  query AllRecipesQuery {
    allRecipes
    {
      id
      name
      steps
      notes
      rating
      ingredients {
        id
        quantity
        template {
          id
          name
          unit
          category
          price
        }
      }
      ownedBy{
        id
      }
    }
  }
`

export const MY_RECIPES_QUERY = gql`
  query AllRecipesQuery ($ownedById: ID!){
    allRecipes (filter: {ownedBy: {id: $ownedById}})
    {
      id
      name
      steps
      notes
      rating
      ingredients {
        id
        quantity
        template {
          id
          name
          unit
          category
          price
        }
      }
      ownedBy{
        id
      }
    }
  }
`

export const GET_RECIPE_QUERY = gql`
  query Recipe ($id: ID!){
    Recipe (id: $id){
      id
      name
      steps
      notes
      rating
      ingredients {
        id
        quantity
        template {
          id
          name
          unit
          category
          price
        }
      }
      ownedBy {
        id
      }
    }
  }
`

export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipeMutation($ownedById: ID!, $name: String, $steps: [String!]) {
    createRecipe(
      ownedById: $ownedById
      name: $name
      steps: $steps
    ) {
      id
      name
      steps
      notes
      rating
      ingredients {
        id
        quantity
        template {
          id
          name
          unit
          category
          price
        }
      }
      ownedBy {
        id
      }
    }
  }
`

export const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipeMutation($id: ID!, $name: String, $steps: [String!], $notes: String, $rating: Float) {
    updateRecipe(
      id: $id,
      name: $name
      steps: $steps
      notes: $notes
      rating: $rating
    ) {
      id
      name
      steps
      notes
      rating
      ingredients {
        id
        quantity
        template {
          id
          name
          unit
          category
          price
        }
      }
      ownedBy {
        id
      }
    }
  }
`

export const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipeMutation($id: ID!) {
    deleteRecipe(
      id: $id,
    ) {
      id
    }
  }
`

// export const MY_PRODUCTS_QUERY = gql`
//   query AllProductsQuery ($shoppingListId: ID!){
//     allProducts (filter: {shoppingList: {id: $shoppingListId}}){
//       id
//       name
//       inCart
//       category
//       price
//       unit
//     }
//   }
// `

// export const CREATE_PRODUCT_MUTATION = gql`
//   mutation CreateProductMutation($name: String, $shoppingListId: ID!, $category: String, $price: Float, $unit: String) {
//     createProduct(
//       name: $name
//       shoppingListId: $shoppingListId
//       category: $category
//       price: $price
//       unit: $unit
//     ) {
//       id
//       name
//     }
//   }
// `

// export const UPDATE_PRODUCT_MUTATION = gql`
//   mutation UpdateProductMutation($id: ID!,  $inCart: Boolean) {
//     updateProduct(
//       id: $id,
//       inCart: $inCart
//     ) {
//       id
//     }
//   }
// `

// export const DELETE_PRODUCT_MUTATION = gql`
//   mutation DeleteProductMutation($id: ID!) {
//     deleteProduct(
//       id: $id,
//     ) {
//       id
//     }
//   }
// `

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
