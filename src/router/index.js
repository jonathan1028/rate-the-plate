
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import PublicLayout from '@/components/public/PublicLayout'
import Home from '@/components/public/Home'
// import Callback from '@/components/public/Callback'
import SignUp from '@/components/public/SignUp'
import Login from '@/components/public/Login'

import UserConsoleHeader from '@/components/userConsole/UserConsoleHeader'
import Expenses from '../components/userConsole/expenses/Expenses'
import ReadExpense from '../components/userConsole/expenses/ReadExpense'
import UpdateExpense from '../components/userConsole/expenses/UpdateExpense'
import VendorsPage from '../components/userConsole/pages/VendorsPage'
import ShoppingListsPage from '../components/userConsole/pages/ShoppingListsPage'

// Products
import ProductTemplatesPage from '../components/userConsole/pages/ProductTemplatesPage'
import ProductTemplateUpdatePage from '../components/userConsole/pages/ProductTemplateUpdatePage'

import ReadShoppingListPage from '../components/userConsole/pages/ReadShoppingListPage'
import RecipesPage from '../components/userConsole/pages/RecipesPage'
import RecipePage from '../components/userConsole/pages/RecipePage'

import AdminConsoleHeader from '@/components/adminConsole/AdminConsoleHeader'
import Admin from '../components/adminConsole/Admin'
import UpdateUser from '../components/adminConsole/UpdateUser'
import ReadUser from '../components/adminConsole/ReadUser'
// import NewUsers from '../components/adminConsole/NewUsers'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    // ======================================= Public Pages =============================================
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: '/signup',
          name: 'SignUp',
          component: SignUp,
          meta: {
            requiresAuth: false
          }
        }
        // {
        //   path: '/callback',
        //   name: 'Callback',
        //   component: Callback
        // },
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
          component: ProductTemplatesPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/product/:id',
          component: ProductTemplateUpdatePage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/recipes',
          component: RecipesPage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/recipe/:id',
          component: RecipePage,
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
  if (store.getters.authenticated) {
    console.log('User is Authenticated from router')
  }

  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !store.getters.authenticated) {
    next('login')
  } else {
    next()
  }
})

export default router
