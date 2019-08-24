<template>
  <div>
    <bread first="订单管理" second="订单列表"></bread>

    <!-- 表格 -->
    <el-table :data="pageList" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="300"></el-table-column>
      <el-table-column prop="order_price" label="订单价格(元)"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" plain>{{scope.row.pay_status == 0 ? '未付款' : '已付款' }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
   <el-table-column
        prop="update_time"
        label="下单时间"
      >
        <template slot-scope="scope">
             {{scope.row.create_time | formTime('YYYY-MM-DD hh:mm:ss')}} 
        </template>
   </el-table-column>
      <el-table-column prop="handle" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            icon="el-icon-edit"
            @click.native="handleEdit(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
  </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageList.query"
      :page-sizes="[10,15,20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

     <!-- 编辑 -->
      <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
        <el-form :model="editForm">
           
          <el-form-item label="省市区/县">
            <el-select v-model="editForm.order_id" placeholder="请选择区域">
                   <template>
                            
                   </template>
             </el-select>
          </el-form-item>

          <el-form-item label="详细地址"  >
            <el-input v-model="editForm.detail" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { http } from "../api/http.js";
export default {
  data() {
    return {
      //编辑
      editForm: {
          order_id: '',
      },

      pageList: {
        query: 1,
        pagenum: 1,
        pagesize: 10
      },
      //总数
      total: "",

      dialogFormVisible: false,
    };
  },

  methods: {
    //编辑
    handleEdit(row) {
      console.log(row);
      this.dialogFormVisible = true
      this.editForm.order_id = row.order_id

    },

    //点击页码的事件
    handleCurrentChange(page) {
      this.pageList.pagenum = page;
      this.getOrdersList();
    },

    //点击页容量的事件
    handleSizeChange(pagesize) {
      this.pageList.pagesize = pagesize;
      this.pageList.query = 1;
      this.getOrdersList();
    },

    //获取订单列表的方法
    getOrdersList() {
      http.getOrders(this.pageList).then(res => {
        // console.log(res)
        this.pageList = res.data.data.goods;
        this.total = res.data.data.total;
      });
    }
  },
  created() {
    this.getOrdersList();
  },

  updated() {}
};
</script>

<style>
</style>
