import Vue from 'vue'
import Router from 'vue-router'
import Scanitem from '@/components/Scanitem'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Listeqm from '@/components/Listeqm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/listeqm',
      name: 'listeqm',
      component: Listeqm
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/scanitem/:id',
      name: 'scanitem',
      component: Scanitem
    }
  ]
})
