<template>
  <div class="my-params">
    <bread first="商品管理" second="商品参数"></bread>

    <el-alert class="my-alert" title="注意：只允许为第三级分类设置相关参数" center type="warning" show-icon></el-alert>

    <!-- 级联 -->
    <div class="block">
      <span class="demonstration">请选择商品分类 : </span>
      <el-cascader
          v-model="goodsCate.value"
          :options="list"
          :props="{ expandTrigger: 'hover', label: 'cat_name', value: 'cat_id', checkStrictly:true}"
           ></el-cascader>
    </div>

    <!-- tabs栏 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="动态参数" name="first">
        <el-botton type="primary" size="small" class="my-button">添加动态参数</el-botton>

        <el-table class="table" :data="tableData" style="width: 100%">
          <el-table-column type="expand">
               <template slot-scope="scope">
                     <el-tag closable v-for="tag in tags" :key="tag.name" class="my-tag">{{tag.name}}</el-tag>  
 
                     <el-input 
                     class="input-new-tag"
                     v-if="inputVisible"
                     v-model.trim="inputValue"
                     ref="saveTagInput"
                     size="small"
                     @keyup.enter.native="handleInputConfirm"
                     @blur="handleInputConfirm"
                     ></el-input>
                     <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
               </template>  
          </el-table-column>

          <el-table-column type="index"></el-table-column>
          <el-table-column label="商品参数" prop="parms"></el-table-column>
          <el-table-column label="操作">
         <!-- 自定义列 -->
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
            </template>
          </el-table-column>
         </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="second">静态参数</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
 import {http} from '../../api/http'
export default {
         name: 'params',
         data() {
           return {
               //绑定级联选择器的数据
               list: [],
               //双向绑定的对象
               goodsCate: {
                   cat_name: '',
                   value: [],  
               },

               inputValue: '',
               inputVisible: 'false',
               activeName: 'first',
               tableData:[{parms: '内存'}, {parms: '参数'}],
               tags:[{name: 'xx'}, {name: 'oo'},],
           }
         },

         methods: {
              showInput(){
                this.inputVisible = true
                this.$nextTick(_ => {
                   this.$refs.saveTagInput.$refs.input.focus()
                })  
              },
               
              //键盘弹起并且失去焦点都会触发的事件 
              handleInputConfirm(){ 
                   if(this.inputValue == ''){
                     //隐藏
                      this.inputVisible = false
                      return
                   }

                   //如果不为空,就要添加数据
                   this.tags.push({
                      name: this.inputValue 
                   })
                   //加完之后把输入框清空 隐藏
                   this.inputValue = ''
                  this.inputVisible = false
              },

              //获取分类的方法
             getCateList(){
                   http.categoriesList(2).then( res => {
                     console.log(res)
                  this.list = res.data.data
              })
             }
         },

         created() {
              this.getCateList()
         },
};
</script>

<style>
.my-alert {
  margin-top: 20px;
  margin-bottom: 20px;
}
 
.my-button{
   display: inline-block;
   margin-bottom: 10px;
}
.my-tag + .my-tag{
   margin-left: 10px;
}
.input-new-tag{
    width: 80px;
    margin-left: 10px;
    vertical-align: bottom;
}
.button-new-tag{
   margin-left: 10px;
}
</style>
