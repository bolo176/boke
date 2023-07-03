import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引用element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引用懒加载组件
import VueLazyLoad from 'vue-lazyload'
	Vue.use(VueLazyLoad,{
  		loading: require("@/assets/logo.png")
	})
Vue.use(ElementUI);

import cjyMagnify from 'vue-cjy-magnify'
Vue.component('cjy-magnify', cjyMagnify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
