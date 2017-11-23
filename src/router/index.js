import Vue from 'vue'
import Router from 'vue-router'
import Scanitem from '@/components/Scanitem'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Listeqm from '@/components/Listeqm'
import AScanitem from '@/components/AScanitem'
import AListeqm from '@/components/AListeqm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/alisteqm',
      name: 'alisteqm',
      component: AListeqm
    },
    {
      path: '/ascanitem/:id',
      name: 'ascanitem',
      component: AScanitem
    },
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
