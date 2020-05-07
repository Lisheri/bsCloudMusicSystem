import Vue from 'vue'

import App from './App.vue'
import router from './router'

import '@/style/index.scss'
import '@/utils/rem'
import '@/utils/axios'
import store from './store/index'
import global from './utils/global'
import 'bootstrap'
import $ from 'jquery'

import axios from 'axios'
Vue.use(axios)

Vue.config.productionTip = false
Vue.use(global)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
