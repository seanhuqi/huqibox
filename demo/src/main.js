import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入重置样式表
import './assets/css/reset.css'
// 引入字体图标文件
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false
// 引入bus
Vue.prototype.$bus = new Vue();

// 引入element和注册
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')