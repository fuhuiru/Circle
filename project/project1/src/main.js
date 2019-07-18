import "./css/global.css"
import "bootstrap/dist/css/bootstrap.min.css"
// import 'fontawesome/fontawesome-free/css/fontawesome.min.css'

import Vue from 'vue'
import App from './App.vue'
import Home from './page/home'
import Signup from './page/signup'
import Login from './page/login'
import Setting from './page/setting'
import SettingMe from './page/settingme'
import SettingSecurity from './page/settingsecurity'
import Thread from './page/thread'





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
  },
  {
    path:'/setting',
    component:Setting,
    children:[
      {
        path:'me',
        component:SettingMe,
      },
      {
        path:'security',
        component:SettingSecurity,
      }
    ]
  },
  {
    path:'/thread/:id',
    component:Thread,
  }
]
new Vue({
  router: new Router({
    routes:RouterConfig
  }),
  render: h => h(App),
}).$mount('#app')
