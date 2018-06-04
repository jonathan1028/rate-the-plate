
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import PublicHeader from '@/components/public/PublicHeader'
import Home from '@/components/public/Home'
import Callback from '@/components/public/Callback'

import UserConsoleHeader from '@/components/userConsole/UserConsoleHeader'
import Expenses from '../components/userConsole/expenses/Expenses'
import ReadExpense from '../components/userConsole/expenses/ReadExpense'
import UpdateExpense from '../components/userConsole/expenses/UpdateExpense'

import People from '../components/userConsole/people/People'
import ReadPerson from '../components/userConsole/people/ReadPerson'
import UpdatePerson from '../components/userConsole/people/UpdatePerson'

// import Admin from '../components/adminConsole/Admin'
// import UpdateUser from '../components/adminConsole/UpdateUser'
// import ReadUser from '../components/adminConsole/ReadUser'
// import NewUsers from '../components/adminConsole/NewUsers'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
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
          redirect: '/home'
        },
        {
          path: '/callback',
          name: 'Callback',
          component: Callback
        }
      ]
    },
    {
      path: '*',
      redirect: '/home'
    },
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
        //  ------------------------------------------ People ----------------------------------
        {
          path: '/people',
          component: People,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/person/:id',
          component: ReadPerson,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/person/update/:id',
          component: UpdatePerson,
          name: 'UpdatePerson',
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
