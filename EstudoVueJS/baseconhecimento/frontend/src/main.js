import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'
import './config/msgs'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')