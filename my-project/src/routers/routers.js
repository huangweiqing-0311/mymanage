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
import users from '../views/users.vue'

//设置路由规则
const routes = [
  {path: '/login', component: login},
  {path: '', redirect: '/login'},
  {path: '/index', component: index,
   //设置路由元信息(登陆过就会有)
   meta: {needLogin: true},
   children: [
      {path: '/users', component: users},
        
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
             if(window.localStorage.getItem('token')){
                 next()
             }else{
                  //没有登录记录,回登录页
                  Vue.prototype.$message.error('你还没有登录,请先登录')
                  router.push('/login')
             }  
        } else{
           next()
        }
  })

//暴露路由对象
export default router
