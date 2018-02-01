import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import LoginForm from '@/components/LoginForm'
import InspctBoard from '@/components/InspectBoard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginForm',
      component: LoginForm
    },
    {
      path: '/inspctBoard',
      name: 'InspctBoard',
      component: InspctBoard
    },


  ]
})
