import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import LoginForm from '@/components/LoginForm'
import PrettyJson from '@/components/PrettyJSon'
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
      path: '/pretty',
      name: 'PrettyJson',
      component: PrettyJson
    }
  ]
})
