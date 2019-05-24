import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'abstract',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:page',
      name: 'page',
      component: () => import( /* webpackChunkName: "page" */ './views/Page.vue')
    }
  ]
})

router.replace("/")

export default router
