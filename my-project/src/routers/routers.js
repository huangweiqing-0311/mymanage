//整合路由模块
//导入 vue
import Vue from 'vue'

//导入 vue-router
import VueRouter from 'vue-router'
//use一下
Vue.use(VueRouter)

import {http} from '../api/http'

//导入组件
import login from '../views/login.vue'
import index from '../views/index.vue'
import users from '../views/users.vue'
import rights from '../views/rights.vue'
import roles from '../views/roles.vue'
import reports from '../views/reports.vue'

import goods from '../views/goods/goods.vue'
import add from '../views/goods/add.vue'
import categories from '../views/goods/categories.vue'
import goodsIndex from '../views/goods/index.vue'

//设置路由规则
const routes = [
  {path: '/login', component: login},
  {path: '', redirect: '/login'},
  {path: '/index', component: index,
   //设置路由元信息(登陆过就会有)
   meta: {needLogin: true},
   children: [
      {path: '/users', component: users, meta: {needLogin: true}, },
      {path: '/rights', component: rights, meta: {needLogin: true}, },
      {path: '/roles', component: roles, meta: {needLogin: true},  },
      {path: '/reports', component: reports},
      {path: '/goods', component: goods, meta: {needLogin: true},
       children: [
          {path: '', component: goodsIndex},
          {path: 'add', component: add},
        ]
      },
      {path: '/categories', component: categories, meta: {needLogin: true},},

   ]
  },
]

//创建路由对象
 const router = new VueRouter({
      routes
 })

  //导航守卫
  //to: 路由对象
  //from: 当前导航要离开的路由
  router.beforeEach((to, from, next) => {
       //window.console.log(to)
        //只有首页要导航守卫,判断路由元信息即可
        if(to.meta.needLogin){
            
         http.menus().then( res => {
              console.log(res)  
              if(res.data.meta.status == 400 && res.data.meta.msg == '无效token'){
                  //提示用户还没有登录
                  Vue.prototype.$message.warning('请先登录!!!')
                  //打回登录页
                  router.push('/login')
              } else{
                 //有登陆信息 放行
                 next()
              }
         })  
         
        } else{
           next()
        }
  })

//暴露路由对象
export default router
