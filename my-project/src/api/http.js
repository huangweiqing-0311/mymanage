 //导入axios
 import axios from 'axios'

 import Vue from 'vue'
 import router from '../routers/routers'

 //创建 多基地址, 并把对象导出
 export const http = axios.create({
     baseURL: 'http://localhost:8888/api/private/v1'
 })

 //登录请求封装成函数,要用到直接调用
 //调用此方法要传入一个对象,并且有username和password属性
  http.login = ({username, password}) => {
      //把请求方法 return 出去
      return http.post('login',{
          username,
          password,  
      })  
  }

  //获取左边菜单栏封装成函数
  http.menus = () => {
       return http.get('menus', {
            params: {},
            // headers: {
            //       //发请求时把 token 发过去, 服务器根据 token 识别用户
            //     Authorization: window.localStorage.getItem('token')
            // } 
       }) 
   }

   //获取用户数据的方法
   http.searchUserList = ({query, pagenum, pagesize}) => {
          //get请求用params传参
          return http.get('users', {
             params:{
                 query,
                 pagenum,
                 pagesize,
             },
             headers: {
                //发请求时把 token 发过去, 服务器根据 token 识别用户
              Authorization: window.localStorage.getItem('token')
           } 
          })
      }

    //添加新用户的方法
    http.addNewUser = ({username, password, email, mobile}) => {
        //post请求不要用params来传参
         return http.post('users', {
               username,
               password,
               email,
               mobile,
         })
    }  

    //删除用户的方法
    http.deleteUser = (id) => {
         return http.delete('users/'+id)
    }

    //编辑用户信息的方法
    http.editUser = ({id, email, mobile}) =>{
          return http.put(`users/${id}`, {
               email,
               mobile,
          })
    }

     //id查询用户信息的方法
     http.searchUserMsg = (id) => {
          return http.get('users/'+id)
    }

    //分配用户角色的方法
     http.allotRole = ({id, rid}) => {
          return http.put(`users/${id}/role`, {
              rid,  //角色的id
          })
     }

    //获取角色列表的方法
    //第一层为角色信息,第二层为权限说明,有三层权限
    http.getRolesList = () => {
         return http.get('roles')
    }

    //修改用户状态的方法
     http.alterUserState = (id, type) => {
            return http.put(`users/${id}/state/${type}`)
     }

     //获取权限列表的方法
     http.getRight = (type) => {
           return http.get('rights/'+type)
     }

    
     


    //请求拦截
    //可以在发这个请求之前把请求拦截下来,
    //添加一个请求头 token, 才能获取到数据
     http.interceptors.request.use(function (config) {
        config.headers.Authorization = window.localStorage.getItem('token')
        return config
     }, function(error) {
           // 对请求错误做些什么
        return Promise.reject(error)
     })


     //响应拦截器
     http.interceptors.response.use(function(response) {
        if(response.data.meta.status == 400 && response.data.meta.msg == '无效token'){
              //vue里的方法提示要登录(导入vue文件)
              Vue.prototype.$message.warning('你还没有登录,请先登录!!!')
              //回到登录页(导入router文件)
              router.push('/login')
              return
             }
             return response
  
      }, function(error) {
           //响应错误
           return Promise.reject(error)
      })