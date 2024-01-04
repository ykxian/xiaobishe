import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/globle.css'
import store from "@/store";
import request from "./utils/request";
import './utils/mixins'

import {
  loading,
  borderBox8,
  decoration3,
  decoration5,
  decoration10,
  activeRingChart,
} from '@jiaminghi/data-view'

Vue.use(loading)
Vue.use(borderBox8)
Vue.use(decoration3)
Vue.use(decoration5)
Vue.use(decoration10)
Vue.use(activeRingChart)

Vue.config.productionTip = false
Vue.use(ElementUI,{size:"small"})
Vue.prototype.request=request
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
