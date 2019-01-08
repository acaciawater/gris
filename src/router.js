import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Survey from './views/Survey.vue'
import Results from './views/Results.vue'
import Export from './views/Export.vue'
import Feedback from './views/Feedback.vue'

Vue.use(Router)

export default new Router({
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
      component: Results
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
    }
  ]
})
