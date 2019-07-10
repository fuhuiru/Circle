import "./css/global.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Vue from 'vue'
import App from './App.vue'
import Home from './page/home'
import Signup from './page/signup'
import Login from './page/login'



import Router from 'vue-router'

Vue.config.productionTip = false
Vue.use(Router);

let RouterConfig = [
  {
    path:'/',
    component:Home,
  },
  {
    path:'/signup',
    component:Signup,
  },
  {
    path:'/login',
    component:Login,
  }
]
new Vue({
  router: new Router({
    routes:RouterConfig
  }),
  render: h => h(App),
}).$mount('#app')
