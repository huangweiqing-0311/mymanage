<template>
         <div class="my-goods">
              <bread first="商品管理" second="商品列表"></bread>
    
            
      <!-- 搜索栏 -->
       <!-- 搜索栏 -->
    <el-row>
      <el-col :span="6">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="success" @click="toAddGoods" plain>添加商品</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="goodsList" :border="true" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="550"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="120"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="" label="创建时间" >{{add_time | formTime('YYYY-MM-DD hh:mm:ss')}}</el-table-column>
      <el-table-column prop="handle" label="操作">
        <template slot-scope="scope">
        <el-button
          size="mini"
           type="primary"
           plain
           icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"></el-button>
        <el-button
          size="mini"
          type="danger"
          plain
          icon="el-icon-delete"
         @click="goodsDel(scope.row)"></el-button>
      </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageList.query"
      :page-sizes="[10, 20, 30]"
       layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

     <!-- 添加商品 -->
     

       

   </div> 
</template>

<script>
 import moment from 'moment' 

 import {http} from '../api/http'

export default {
   data() {
     return {
        
        //商品列表数据
        goodsList: [],  

        //请求商品数据的列表
        pageList: {
            query: '',
            pagenum: '1',
            pagesize: '5',
        },

        total: '',
     }
   },
     
   methods: {
        //删除商品
        goodsDel(row){
              this.$confirm('你确定要删除此商品吗?', '温馨提示', {
               type: 'warning'
            }).then( () => {
                 http.delGoods(row.goods_id).then( res => {
                     console.log(res)
                      if(res.data.meta.status == 200){
                           this.$message.success('删除成功!')
                           this.getGoodsList()
                      }
                 }) 
                   
             }).catch( () => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除!',
                  })
            })
        },

        //添加商品
        toAddGoods(){
            this.$router.push('/goods/add')
        }, 

        //当前页码的事件
        handleCurrentChange(pagenum){
           this.pageList.pagenum = pagenum
           this.getGoodsList()
        },
        //页容量的事件
        handleSizeChange(pageSize){
           this.pageList.pagesize = pageSize
           this.pageList.query = 1
           this.getGoodsList() 
        },

       //获取商品列表的 方法的封装
       getGoodsList(){
            http.getGoods(this.pageList).then( res => {
                //console.log(res)
                if(res.data.meta.status == 200){
                   this.goodsList = res.data.data.goods
                   this.total = res.data.data.total
                } 
            })
       }
   },
   
   //过滤器
    // filters: {
    //     //时间过滤器
    //     formTime(value, format){
    //       return moment(value).format(format)
    //     },
    // },

   created() {
         this.getGoodsList()
   },
}
</script>

<style>

</style>
