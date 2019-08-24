 //导入axios
 import axios from 'axios'

 import Vue from 'vue'
 

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
           return http.get(`rights/${type}`)
     }

     //添加角色的方法
      http.addRoles = ({roleName, roleDesc}) => {
             return http.post('roles', {
                    roleName,
                    roleDesc,
               
             })
      }

      //编辑提交角色的方法
      http.editRoles = ({id, roleName, roleDesc}) => {
            return http.put(`roles/${id}`, {
                roleDesc,
                roleName, 
            })
      }

     //删除某个角色的指定权限的方法
     http.delRoleRight = (roleId, rightId) => {
           return http.delete(`roles/${roleId}/rights/${rightId}`)
     }

     //删除角色的方法
     http.delRole = (id) =>{
           return http.delete(`roles/${id}`)
     }

     //角色授权的方法
      http.roleAuthorization = ({roleId, rids}) => {
           return http.post(`roles/${roleId}/rights`, {
                rids
           })
      }

      //获取商品列表的方法
      http.getGoods = ({query, pagenum, pagesize}) => {
             return http.get('goods', {
                   params: {
                    query,
                    pagenum,
                    pagesize, 
                   }
             })
      }
      
      //删除商品的方法
      http.delGoods = (id) => {
            return http.delete('goods/'+ id)
      }

      //添加商品的方法
      http.addGoods = ({
          goods_name,
          goods_cat,
          goods_price,
          goods_number,
          goods_weight,
          goods_introduce,
          pics,
          attrs,   
      }) =>{
           return http.post('goods', {
               goods_name,
               goods_cat,
               goods_price,
               goods_number,
               goods_weight,
               goods_introduce,
               pics,
               attrs, 
           }) 
      }

      //商品分类列表的方法
      http.categoriesList = (type) => {
           return http.get('categories', {
                type,
           }) 
      }

      //添加商品分类的方法
      http.addGoodsCate = ({cat_pid, cat_name, cat_level}) => {
            return http.post('categories',{
                   cat_pid,
                   cat_name,
                   cat_level,
            })
      }

      //编辑提交分类的方法
       http.editCate = ({id, cat_name}) =>{
              return http.put(`categories/${id}`,{
                   cat_name,
              })
       }

      //删除商品分类的方法
      http.delGoodsCate = (id) => {
            return http.delete(`categories/${id}`)
      }

      //图片上传的方法
      http.setImgUpload = (file) => {
            return http.post('upload', { file})
      }

      //获取订单列表的方法
      http.getOrders = ({query, pagenum, pagesize}) => {
            return http.get('orders', {
                 params: {
                    query,
                    pagenum,
                    pagesize,
                 }
            })
      }


    //请求拦截
    //可以在发这个请求之前把请求拦截下来,
    //添加一个请求头 token, 才能获取到数据
     http.interceptors.request.use(function (config) {
        //每次请求之前把是响应弹出一次的记录清除  
        
        config.headers.Authorization = window.localStorage.getItem('token')
        return config
     }, function(error) {
           // 对请求错误做些什么
        return Promise.reject(error)
     })

     
     //响应拦截器
     // http.interceptors.response.use(function(response) {
     //          //如果已经登录了就直接返回
     //      //     if(flag){
     //      //       return response    
     //      //     }
              
     //          if(response.data.meta.status == 400 && response.data.meta.msg == '无效token'){
                
     //          //vue里的方法提示要登录(导入vue文件)
     //          Vue.prototype.$message.warning('你还没有登录,请先登录!!!')
     //          //标记已经登录过一次了
     //          //flag = true  //记录登录信息

     //          //回到登录页(导入router文件)
     //          router.push('/login')
     //          return
     //          }
     //          return response
  
     //  }, function(error) {
     //       //响应错误
     //       return Promise.reject(error)
     //  })