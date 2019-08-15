import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
 
 //导入全局样式
  import './assets/css/base.less'
   
 //导入饿了么UI
 import ElementUI from 'element-ui';
 import 'element-ui/lib/theme-chalk/index.css';
 //use一下
 Vue.use(ElementUI);

 //导入路由对象
 import router from './routers/routers.js'

 //挂载路由
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
