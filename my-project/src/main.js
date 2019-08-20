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

 //注册全局组件
  import bread from './components/bread.vue'
  //参数1: 组件名;  参数2: 组件对象 
  Vue.component('bread', bread)

  //导入日期格式化js文件
   import moment from 'moment'
  //设置全局过滤器
   Vue.filter('formTime', function(value, format) {
       return moment(value).format(format)
   })

 //导入路由对象
 import router from './routers/routers.js'

 //挂载路由
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
