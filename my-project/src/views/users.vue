<template>
  <div class="my-users">
    <!-- 面包屑导航 -->
    <bread first="用户管理" second="用户列表"></bread>

    <!-- 搜索栏 -->
    <el-row>
         <el-col :span="8">
          <el-input
           @input="getUsers"
           class="input-with-select"
           v-model.trim="searchList.query"
            placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
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
               @click.native="handleState(scope.row)"
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
            @click="handleEdit(scope.row)"> </el-button>
        <el-button
          size="mini"
           type="danger"
           plain
           icon="el-icon-delete"
         @click="handleDelete(scope.row)"></el-button>
        <el-button
          size="mini"
           type="warning"
           plain
           icon="el-icon-check"
         @click="handleRole(scope.row)"> </el-button>
      </template>
    </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchList.pagenum"
      :page-sizes="[5,10]"
      :page-size="searchList.pagesize"
       layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 新增用户 -->
    <el-dialog title="添加用户" :visible.sync="addUserFormVisible">
      <el-form
        label-position="right"
        label-width="120px"
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

    <!-- 编辑用户 -->
     <el-dialog title="编辑用户" :visible.sync="editUserFormVisible">
      <el-form
        label-position="right"
        label-width="120px"
        :rules="rules"
         ref="editFormData"
        :model="editFormData"
       >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editFormData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFormData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editFormData.mobile"></el-input>
        </el-form-item>
       </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editForm('editFormData')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 用户角色 -->
    <el-dialog title="分配角色" :visible.sync="roleFormVisible">
       <el-form 
       label-position="center"
       label-width="120px"
        ref="usermsg"
       :model="usermsg" >
          <el-form-item label="当前用户">
             <span>{{usermsg.username}}</span>
          </el-form-item>
          <el-form-item label="请选择角色">
            <el-select v-model="roleFormData.role_name" placeholder="请选择角色">
              <!-- 角色权限列表 -->
              <el-option v-for="item in rolesList" :label="item.roleName" :value="item.id"></el-option>
               </el-select>
          </el-form-item>
      </el-form>
       <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleForm('usermsg')">确 定</el-button>
      </div>
   </el-dialog>

  
 </div>
</template>

<script>
 import {http} from '../api/http'
 export default {
  data() {
    return {
      //角色分配对象
      roleFormData: {
          id: '',
          ro_id: '',
          role_name:'', 
          username: '',
      },

      //编辑用户
      editFormData: {
          username: '',
          id: '',
          email: '',
          mobile: '', 
          role_id: '',  
      },

      //用户信息
      usermsg: {},

    //保存用户角色的数组,里面是角色权限对象
      rolesList: [],

      //表格数据
     tableData: [ ],

     //表格数据匹配
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      },

      //添加表单的数据
      addFormData: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        id: '',
        },
         
        //总页数
        total: '0',
        //请求的用户数据列表
        searchList: {
           query: '',
           pagenum: '1', //当前页码
           pagesize: '5', //每条页码显示条数
        },

        //面板显示与隐藏(默认false)
        addUserFormVisible: false, 
        editUserFormVisible: false,
        roleFormVisible: false,
      };
  },

  methods: {
        //设置状态
        handleState(row){
            if(row.mg_state){
                http.alterUserState(row.id, row.mg_state)
                  .then(res =>{
                    console.log(res)
                    if(res.data.meta.status == 200){
                        this.$message.success(res.data.meta.msg)
                    }
                    })
                 
            }else{
                http.alterUserState(row.id, row.mg_state)
                  .then(res =>{
                    console.log(res)
                    if(res.data.meta.status == 200){
                        this.$message.success(res.data.meta.msg)
                    }
                    })
            }  
        },
        //添加用户点击事件
        addUsers(){
           //显示添加面板
           this.addUserFormVisible = true
        },
        //新增
        submitForm(formName){
              this.$refs[formName].validate((valid) => {
                  //通过验证
                  if(valid){
                    http.addNewUser(this.addFormData)
                      .then(res => {
                            //console.log(res)
                           if(res.data.meta.status == 201){
                               //把用户的id存起来
                               this.addFormData.id = res.data.data.id
                               //提示用户
                               this.$message.success('创建成功!')
                               //刷新页面
                               this.getUsers()
                               //隐藏添加面板
                               this.addUserFormVisible = false
                           }
                      })  
                      
                  } else{
                      
                     return false
                  }
              })
        },

        //删除用户
       handleDelete(row){
            this.$confirm('亲,你真的要删除该用户吗?', '温馨提示', {
                type: 'warning',
            })
            .then( () => {
              //确认删除,发请求
               http.deleteUser(row.id).then(res => {
                   // console.log(res)
                    if(res.data.meta.status == 200){
                      //提示用户
                       this.$message.success('删除成功!') 
                      //刷新页面
                       this.getUsers()
                    }
                 })   
            }).catch( () => {
               this.$message.warning('已取消删除!')
            })  
       },

       //编辑用户信息
       //01-点击 => 显示面板 => 把当前点击用户的数据展现到面板上
       handleEdit(data){
           this.editFormData.username = data.username
           this.editFormData.id = data.id
           this.editFormData.email = data.email
           this.editFormData.mobile = data.mobile
           this.editUserFormVisible = true
       },
       //02-根据id发编辑请求 => 刷新页面
        editForm(){
            http.editUser(this.editFormData)
              .then(res => {
                  //console.log(res)
                  if(res.data.meta.status == 200){
                      this.$message.success('更新成功!')
                      //
                      this.getUsers() 
                  } else{
                      this.$message.error(res.data.meta.msg)
                  }
              })
        },

        //角色
        //显示分配角色面板 => 获取所有角色信息展现到面板上
        handleRole(row){
            //console.log(row)
            //根据id查询用户信息
             this.getUserMsg(row.id)
             //显示面板,把用户名, 角色权限显示到分配角色面板上
             this.roleFormVisible = true
             //获取权限信息展现到隐藏的下拉框中
             this.getUserRoles()
          },
        //确认设置分配角色
        setRoleForm(){
            //发请求
            http.allotRole(this.usermsg.id, this.usermsg.rid).then(res =>{
                 console.log(res)
                 if(res.data.meta.status == 200) {
                   //设置成功,提示用户
                     this.$message.success(res.data.meta.msg)
                   //隐藏分配角色面板
                   this.roleFormVisible = false
                 }
            })
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
                 //console.log(res)
                if(res){
                  //把请求回来的数据赋值给表格做展示
                  this.tableData = res.data.data.users
                  this.total = res.data.data.total
                  }
            })
        },  

        //根据id查询用户信息
        getUserMsg(id){
             http.searchUserMsg(id)
               .then(res => {
                   //console.log(res)
                   if(res.data.meta.status == 200){
                       this.usermsg = res.data.data
                     }
               })
        },

        //获取用户角色列表的方法
        getUserRoles(){
           http.getRolesList().then(res => {
              console.log(res)
             //把角色信息保存起来
             this.rolesList = res.data.data   
          })
       },

        
  },

  created() {
      
     //调用获取用户的信息
      this.getUsers()
    //调用获取所有角色信息
     //  this.getUserRoles() 
    },

   
};
</script>

<style lang="less" scoped>
      
</style>
