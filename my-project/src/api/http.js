 //导入axios
 import axios from 'axios'

 //创建 多基地址, 并把对象导出
 export const http = axios.create({
     baseURL: 'http://localhost:8888/api/private/v1'
 })