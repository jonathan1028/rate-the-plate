import Vue from 'vue'
import Router from 'vue-router'

import AppLogin from '../components/app/AppLogin'
import People from '../components/people/People'
import ReadPerson from '../components/people/ReadPerson'
import UpdatePerson from '../components/people/UpdatePerson'
import Opportunities from '../components/opportunities/Opportunities'
import Admin from '../components/admin/Admin'
import UpdateUser from '../components/admin/UpdateUser'
import ReadUser from '../components/admin/ReadUser'
import NewUsers from '../components/admin/NewUsers'

import Expenses from '../components/expenses/Expenses'
import ReadExpense from '../components/expenses/ReadExpense'
import UpdateExpense from '../components/expenses/UpdateExpense'
// import { GC_USER_ID } from '../constants/settings'

// let userId = localStorage.getItem(GC_USER_ID)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // redirects to the first page of the route where new posts are displayed
      redirect: '/people'
    },
    {
      path: '/login',
      component: AppLogin
    },
    // ------------------------------------------ People ----------------------------------
    {
      path: '/people',
      component: People
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/person/:id',
      component: ReadPerson
    },
    {
      path: '/person/update/:id',
      component: UpdatePerson,
      name: 'updatePerson'
    },
    // ------------------------------------------ Expense ----------------------------------
    {
      path: '/expenses',
      component: Expenses
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/expense/:id',
      component: ReadExpense
    },
    {
      path: '/expense/update/:id',
      component: UpdateExpense,
      name: 'updateExpense'
    },
    // ------------------------------------------ Opportunities ----------------------------------
    {
      path: '/opportunities',
      component: Opportunities
    },
    // ------------------------------------------ Admin ----------------------------------
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/newusers',
      component: NewUsers
    },
    {
      path: '/user/:id',
      component: ReadUser
    },
    {
      path: '/user/update/:id',
      component: UpdateUser,
      name: 'updateUser'
    }
  ],
  // set mode to ‘history’ to remove the hash from the URLs
  mode: 'history'
})

// const router = new Router({
//   routes: [
//     {
//       path: '/people',
//       component: People,
//       meta: {
//         requiresAuth: true
//       }
//     }
//   ]
// })

// router.beforeEach((to, from, next) => {
//   const currentUser = userId
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   if (requiresAuth && !currentUser) {
//     next('/login')
//   } else if (requiresAuth && currentUser) {
//     next()
//   } else {
//     next()
//   }
// })
