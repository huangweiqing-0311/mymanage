 //导入axios
 import axios from 'axios'

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
            headers: {
                //在请求头里设置一个登陆标记
                Authorization: window.localStorage.getItem('token')
            } 
       }) 
   }