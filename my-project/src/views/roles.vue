<template>
  <div class="my-roles">
    <bread first="权限管理" second="角色列表"></bread>

    <!-- 添加栏 -->
    <el-row>
      <el-col :span="8">
        <el-button type="success" @click="doRoles" plain>添加角色</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="roleList" :border="true" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <p v-if="scope.row.children.length == 0">没有分配权限</p>
          <!--一级菜单  -->
          <el-row v-for="tag in scope.row.children">
            <el-col :span="6">
              <el-tag closable @close="delRight(scope.row.id, tag.id, scope.row)">{{tag.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="18">
              <!-- 二级菜单 -->
              <el-row v-for="level2 in tag.children">
                <el-col :span="6">
                  <el-tag
                    closable
                    @close="delRight(scope.row.id, level2.id, scope.row)"
                    type="success"
                  >{{level2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="18">
                  <!-- 三级菜单 -->
                  <el-tag
                    closable
                    class="my-tag"
                    type="warning"
                    v-for="level3 in level2.children"
                    @close="delRight(scope.row.id, level3.id, scope.row)"
                  >{{level3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>

      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            @click="handleRole(scope.row)"
          ></el-button>

          <el-button
            size="mini"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          ></el-button>

          <el-button
            size="mini"
            type="warning"
            plain
            icon="el-icon-check"
            @click="trreRole(scope.row)"
          ></el-button>

          <!-- 树形图表 -->
          <!-- <el-dialog title="树形图表" :visible.sync="trreFormVisible">
            <el-tree show-checkbox node-key="id" default-expand-all></el-tree>
          </el-dialog> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addRoleFormVisible">
      <el-form
        label-position="right"
        label-width="120px"
        ref="addRole"
        :rules="addRules"
        :model="addRole"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRole.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleForm('addRole')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="editRoleFormVisible">
      <el-form label-position="right" label-width="120px" :rules="rules" :model="editRole">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRole.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRoleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleForm('editRole')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 树形 -->
    <el-dialog title="权限分配" :visible.sync="dialogVisible">
      <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        node-key="id"
         default-expand-all
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoles()" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "../api/http.js";

export default {
  data() {
    return {
      //角色列表数据
      roleList: [],

      //树形的数据
      data:[],
     
      //保存选中的keys的数组
      roleId: '',
      checkedKeys: [],
       
      defaultProps: {
        // 子节点的属性
          children: 'children',
        // 显示文字的属性  
          label: 'authName'
        },

      //添加角色
      addRole: { roleName: "", roleDesc: "" },

      //编辑角色
      editRole: { id: "", roleName: "", roleDesc: "" },

      //表格数据匹配
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },

      addRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },

      //添加角色弹框
      addRoleFormVisible: false,

      //编辑角色弹框
      editRoleFormVisible: false,

      //树形图表
      dialogVisible: false,
    };
  },

  methods: {
    //添加角色
    doRoles() {
      this.addRoleFormVisible = true;
    },
    addRoleForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.addRoles(this.addRole).then(res => {
            //console.log(res)
            if (res.data.meta.status == 201) {
              this.$message.success(res.data.meta.msg);
              this.addRoleFormVisible = false;
              this.getRolesList();
             }else{
               this.$message.error(res.data.meta.msg)
             }
          });
        } else {
          return false;
        }
      });
    },

    //删除角色
    handleDelete(row) {
      http.delRole(row.id).then(res => {
        //console.log(res)
        if (res.data.meta.status == 200) {
          this.$message.success(res.data.meta.msg);
          this.getRolesList();
        } else{
           this.$message.error(res.data.meta.msg)
        }
      });
    },

    //编辑角色
    handleRole(row) {
      // console.log(row);
      this.editRoleFormVisible = true;
      this.editRole.roleName = row.roleName;
      this.editRole.roleDesc = row.roleDesc;
      this.editRole.id = row.id;
    },
    editRoleForm() {
      http.editRoles(this.editRole).then(res => {
        //console.log(res);
        if (res.data.meta.status == 200) {
          this.$message.success('编辑成功!');
          this.getRolesList();
          this.editRoleFormVisible = false;
        } else{
           this.$message.error(res.data.meta.msg)
        }
      });
    },

    //删除某个角色的指定权限
    delRight(roleId, rightId, row) {
      http.delRoleRight(roleId, rightId).then(res => {
        // console.log(res)

        if (res.data.meta.status == 200) {
          this.$message.success("删除成功!");
          row.children = res.data.data;
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },

    //树形图
    trreRole(row){
         // console.log(row)
          this.dialogVisible = true
          //保存角色id
          this.roleId = row.id
          
          //保存原来的值(concat())
           let temp = this.data.concat()
          //清空树形图数据
           this.data = []
          //还原数据,根据数据重新生成
           this.data = temp
          //保存的权限id(过去)
          let list = []

          //使用递归遍历树形结构
          function getChildrenId(row){
             //判断如果还有子元素,继续往下遍历子元素
             if(row.children){
                 for(let i = 0; i < row.children.length; i++){
                     //每个子元素可能还有自己的子元素
                     getChildrenId(row.children[i])    
                 } 
             }else{
               //么有子元素了
               list.push(row.id)
             }
          }
          getChildrenId(row)
          this.checkedKeys = list
       }, 
      //确认角色分配
       setRoles(){
           //获取目前被选中的节点的Key所组成的数组
           let keys = this.$refs.tree.getCheckedKeys()

           //获取目前半选中的节点的Key所组成的数组
           let halfKeys = this.$refs.tree.getHalfCheckedKeys()

           //把数组拼成一组以 , 分隔的数列
           let rids = keys.concat(halfKeys).toString()
            
             http.roleAuthorization({roleId: this.roleId, rids: rids})
                .then( res => {
                       //console.log(res)
                       if(res.data.meta.status == 200){
                          this.getRolesList()
                          this.$message.success(res.data.meta.msg)
                           this.dialogVisible = false
                       }else{
                          this.$message.error(res.data.meta.msg)
                       }
                })
      },

    //获取角色列表方法的封装
    getRolesList() {
      http.getRolesList().then(res => {
        //console.log(res);
        this.roleList = res.data.data;
      });
    },

    //获取树形权限列表的方法封装
     getTreeRoles(){
          http.getRight('tree').then( res => {
                 //console.log(res)
                 if(res.data.meta.status == 200){
                    this.data = res.data.data
                 }
                   
          })
     }
  },

  created() {
    //获取角色列表
    this.getRolesList();
    //获取树形权限列表
    this.getTreeRoles();
  }
};
</script>

<style lang="less" scoped>
.my-tag {
  margin-right: 20px;
  margin-bottom: 5px;
}
</style>
