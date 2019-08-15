<template>
  <el-container class="container">
    <el-header class="my-header">
      <img src="../assets/logo.png" alt />
      <h2>后台管理系统</h2>
      <a href="javascript:;" @click="Logout">退出</a>
    </el-header>
    <el-container>
      <el-aside class="my-aside" width="200px">
        <!-- :unique-opened => 只允许同时展开一项
             :router 开启路由模式
             default-active: 默认展开项
         -->
        <el-menu
         default-active=""
         :unique-opened = "true"
          class="el-menu-vertical-demo"
          :router="true"
        >
           <el-submenu 
           v-for="(item,index) in menusList"
           :index="'' + index" 
           :key="item.id"
            >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
                 <el-menu-item 
                  v-for="it in item.children"
                 :index="it.path"
                 :key="it.id"
                  >
                  <i class="el-icon-menu"></i><span>{{it.authName}}</span> 
                </el-menu-item>
            </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="my-main">
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入http对象
 import {http} from '../api/http.js'
 
export default {
  name: 'index',
  data(){
      return {
         menusList : [],
      }
  },

    created(){
        http.menus().then(res => {
            console.log(res)
            this.menusList = res.data.data
        })
    },

  methods: {
      Logout() {
      //退出的本质是删除token
      this.$confirm("亲,你真的要退出吗?", "温馨提示", {
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          //删掉token
          window.localStorage.removeItem("token");
          //打回到登录页
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "你已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .my-header {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: rgb(168, 214, 241);
    a {
      font-size: 20px;
      color: rgb(164, 83, 195);
    }
  }
  .my-aside{
      background: #fff;
  }
  .my-main {
      background-color: rgb(242, 248, 248);
      padding-top: 0;
  }
}
</style>
