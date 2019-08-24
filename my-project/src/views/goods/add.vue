<template>
  <div class="add-goods">
    <el-alert class="my-title" title="添加商品信息" center type="info" show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="+active" finish-status="success">
      <el-step title="基本信息 1"></el-step>
      <el-step title="商品参数 2"></el-step>
      <el-step title="商品属性 3"></el-step>
      <el-step title="商品图片 3"></el-step>
      <el-step title="商品内容 3"></el-step>
    </el-steps>

    <!-- 标签页 -->
    <el-tabs class="my-tabs" :tab-position="tabPosition" v-model="active">
      <el-tab-pane label="基本信息" name="0">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      tabPosition: "left",
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>
   .my-title{
       margin-top: 20px;
       margin-bottom: 20px; 
   }

   .my-tabs{
      margin-top: 20px;
   }
</style>
