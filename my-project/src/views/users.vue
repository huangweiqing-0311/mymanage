<template>
  <div class="my-users">
    <!-- 面包屑导航 -->
    <bread first="用户管理" second="用户列表"></bread>

    <!-- 搜索栏 -->
    <el-row>
         <el-col :span="8">
          <el-input v-model="searchVal" clearable placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="16">
        <el-button type="success" @click="addUsers" plain>添加用户</el-button>
        </el-col>
     </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="300"></el-table-column>
      <el-table-column label="用户状态"  width="80">
          <template slot-scope="scope">
              <el-switch
               @click="handleState(scope.row)"
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
          </template>
      </el-table-column>
      </el-table-column>
      <el-table-column label="操作"  width="240">
      <template slot-scope="scope">
        <el-button
           size="mini"
            plain
            type="primary"
           icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"> </el-button>
        <el-button
          size="mini"
           type="danger"
           plain
           icon="el-icon-delete"
         @click="handleDelete(scope.$index, scope.row)"> </el-button>
        <el-button
          size="mini"
           type="warning"
           plain
           icon="el-icon-check"
            @click="handleRole(scope.$index, scope.row)"> </el-button>
      </template>
    </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchList.pagenum"
      :page-sizes="[5,10]"
      :page-size="5"
       layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addUserFormVisible">
      <el-form
        label-position="right"
        label-width="100px"
        :rules="rules"
         ref="addFormData"
        :model="addFormData"
       >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFormData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addFormData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFormData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addFormData.mobile"></el-input>
        </el-form-item>
       </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addFormData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
 import {http} from '../api/http'
 export default {
  data() {
    return {
      //

      //表格数据
     tableData: [ ],

      //添加用户
      addFormData: {
        username: "",
        password: "",
        email: "",
        mobile: ""
        },
         
        //总页数
        total: '',
        //请求的用户数据列表
        searchList: {
           query: '',
           pagenum: '1', //当前页码
           pagesize: '5', //每条页码显示条数
        },

        //面板显示与隐藏(默认false)
        addUserFormVisible = false

      };
  },

  methods: {
        //添加用户点击事件
        addUsers(){
           //显示添加面板
           addUserFormVisible = true
        },

        //页容量改变的事件
        handleSizeChange(pagesize){
            this.searchList.pagesize = pagesize
            this.searchList.query = 1
            this.getUsers()
        },

        //点击页码的事件
        handleCurrentChange(page){
           //把点击当前页码的参数赋值给搜索数据列表的页码(让它去请求新的数据)
           this.searchList.pagenum = page
           this.getUsers()  
        },

        //获取用户数据列表的方法封装
        getUsers(){
            http.searchUserList(this.searchList)
            .then(res => {
                console.log(res)
                if(res){
                  //把请求回来的数据赋值给表格做展示
                  this.tableData = res.data.data.users
                  this.total = res.data.data.total
                  }
            })
        },    
  },

  created() {
      this.getUsers()
  },
};
</script>

<style lang="less" scoped>
      
</style>
