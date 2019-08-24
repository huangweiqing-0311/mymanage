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
      <el-tab-pane label="基本信息" name="0">
        <el-form :label-position="labelPosition" :rules="rules" label-width="80px" :model="formLabelAlign">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="weight">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="number">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="cate">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      labelPosition: 'top',
      formLabelAlign: {
         name: '',
         price: '',
         weight: '',
         number: '',
         cate: '',
      }, 
      rules: {
           name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          weight: [
            {  required: true, message: '请输入商品重量', trigger: 'blur' }
          ],
          number: [
            {   required: true, message: '请输入商品数量', trigger: 'blur' }
          ],
          cate: [
            {  required: true, message: '请输入商品分类', trigger: 'blur' }
          ],
      },
      tabPosition: "left",
      active: 0,
    };
  }
};
</script>

<style lang="less" scoped>
.my-title {
  margin-top: 20px;
  margin-bottom: 20px;
}

.my-tabs {
  margin-top: 20px;
}
</style>
