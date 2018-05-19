// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)
import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'Access-Control-Allow-Origin:*'
Vue.config.productionTip = false
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: c => c(App),
  router
})
