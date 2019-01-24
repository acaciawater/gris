import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Survey from './views/Survey.vue'
import ResultsPage from './views/ResultsPage.vue'
import Export from './views/Export.vue'
import Feedback from './views/Feedback.vue'
import Login from './views/Login.vue'
import Save from './views/Save.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/survey',
      name: 'survey',
      component: Survey
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsPage
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback
    },
    {
      path: '/export',
      name: 'export',
      component: Export
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/save',
      name: 'save',
      component: Save
    }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['login', 'home']
  const authRequired = !publicPages.includes(to.name)
  // console.debug('path ', to)
  // console.debug('authRequired: ', authRequired)
  if (authRequired) {
    const token = sessionStorage.getItem('token')
    // TODO: verify token
    if (!token) {
      // console.debug('restricted: ' + to.fullPath)
      // console.debug('redirecting to /login?nextUrl=' + to.fullPath)
      return next({
        path: '/login',
        query: { next: to.fullPath }
      })
    }
  }
  next()
})

export default router
