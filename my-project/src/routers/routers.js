//整合路由模块
//导入 vue
import Vue from 'vue'

//导入 vue-router
import VueRouter from 'vue-router'
//use一下
Vue.use(VueRouter)

//导入组件
import login from '../views/login.vue'
import index from '../views/index.vue'

//设置路由规则
const routes = [
  {path: '/login', component: login},
  {path: '/index', component: index},
]

//创建路由对象
 const router = new VueRouter({
      routes
 })

//暴露路由对象
export default router
