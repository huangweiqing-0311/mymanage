<template>
  <div class="my-roles">
    <break first="权限管理" second="角色列表"></break>

    <!-- 添加栏 -->
    <el-row>
      <el-col :span="8">
        <el-button type="success" @click="addRoles" plain>添加角色</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="roleForm" :border="true" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="角色名称" prop="role_name"></el-table-column>
      <el-table-column label="角色描述" prop="desc"></el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
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
            @click="handleRole(scope.row)"
          ></el-button>

          <!-- 树形图表 -->
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">Append</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">Delete</el-button>
              </span>
            </span>
          </el-tree>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
       data() {
             return {
                   
             }
       },
};
</script>

<style>
</style>
