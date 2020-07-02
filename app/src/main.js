import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

// 引入重置样式表

import './assets/css/reset.css'

// 引入iconfont
import './assets/img/iconfont/iconfont.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')