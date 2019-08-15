<template>
  <!-- 面包屑导航 -->
  <div class="my-bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{first}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{second}}</el-breadcrumb-item>
     
    </el-breadcrumb>
  </div>
</template>

<script>
 //父子组件传值

export default {
   props: [
     'first',
     'second',
   ]
};
</script>

<style lang="less" scoped>
     .my-bread{
        display: flex;
        justify-content: start;
        align-items: center;
        height: 45px;
        font-size: 16px;
        padding-left: 10px;
        background: #d3dce6;
     }
</style>
