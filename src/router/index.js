
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import PublicHeader from '@/components/public/PublicHeader'
import Home from '@/components/public/Home'
import Callback from '@/components/public/Callback'
import SignUp from '@/components/public/SignUp'
import VolunteerPost from '@/components/public/VolunteerPost'

import UserConsoleHeader from '@/components/userConsole/UserConsoleHeader'
import Expenses from '../components/userConsole/expenses/Expenses'
import ReadExpense from '../components/userConsole/expenses/ReadExpense'
import UpdateExpense from '../components/userConsole/expenses/UpdateExpense'
import VendorsPage from '../components/userConsole/pages/VendorsPage'
import ShoppingListsPage from '../components/userConsole/pages/ShoppingListsPage'
import ProductsPage from '../components/userConsole/pages/ProductsPage'
import ReadShoppingListPage from '../components/userConsole/pages/ReadShoppingListPage'

import AdminConsoleHeader from '@/components/adminConsole/AdminConsoleHeader'
import Admin from '../components/adminConsole/Admin'
import UpdateUser from '../components/adminConsole/UpdateUser'
import ReadUser from '../components/adminConsole/ReadUser'
// import NewUsers from '../components/adminConsole/NewUsers'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // ======================================= Public Pages =============================================
    {
      path: '/',
      component: PublicHeader,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/',
          redirect: '/expenses'
        },
        {
          path: '/callback',
          name: 'Callback',
          component: Callback
        },
        {
          path: '/signup',
          name: 'SignUp',
          component: SignUp
        },
        {
          path: '/volunteerpost',
          name: 'VolunteerPost',
          component: VolunteerPost
        }
      ]
    },
    {
      path: '*',
      redirect: '/home'
    },
    // ======================================= User Console Pages =============================================

    {
      path: '/',
      component: UserConsoleHeader,
      children: [
        // ------------------------------------------ Expense ----------------------------------
        {
          path: '/expenses',
          component: Expenses,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/expense/:id',
          component: ReadExpense,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/expense/update/:id',
          component: UpdateExpense,
          name: 'updateExpense',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/vendors',
          component: VendorsPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/shoppinglists',
          component: ShoppingListsPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/shoppinglist/:id',
          component: ReadShoppingListPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/products',
          component: ProductsPage,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    // ======================================= Admin Console Pages =============================================
    {
      path: '/',
      component: AdminConsoleHeader,
      children: [
        // ------------------------------------------ Expense ----------------------------------
        {
          path: '/admin',
          component: Admin,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/user/update/:id',
          component: UpdateUser,
          name: 'UpdateUser',
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/user/:id',
          component: ReadUser,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})
// Need to add funcationality to default to a protected route if requiresAuth has not been set on a route
router.beforeEach((to, from, next) => {
  let currentUser = store.getters.authenticated
  if (store.getters.authenticated) {
    console.log('User is Authenticated')
  }
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('login')
  } else {
    next()
  }
})

export default router

//     // ------------------------------------------ Admin ----------------------------------
//     {
//       path: '/admin',
//       component: Admin
//     },
//     {
//       path: '/newusers',
//       component: NewUsers
//     },
//     {
//       path: '/user/:id',
//       component: ReadUser
//     },
//     {
//       path: '/user/update/:id',
//       component: UpdateUser,
//       name: 'updateUser'
//     }
//   ],
//   // set mode to ‘history’ to remove the hash from the URLs
//   mode: 'history'
// })
