 <template>
  <div class="my-categories">
    <!-- 面包屑导航 -->
    <bread first="商品管理" second="商品分类"></bread>

    <el-button type="success" plain>添加商品</el-button>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="cat_id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="cat_name" label="分类名称" sortable width="300"></el-table-column>
      <el-table-column label="级别" sortable width="150">
        <template slot-scope="scope">{{ scope.row.cat_level | formGrad}}</template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="150">
        <template slot-scope="scope">{{cat_deleted=false ? '无效' : '有效' }}</template>
      </el-table-column>

       <el-table-column prop="handle" label="操作" width="150">
        <template slot-scope="scope">
        <el-button
          size="mini"
           type="primary"
           plain
           icon="el-icon-edit"
            @click="classEdit(scope.$index, scope.row)"></el-button>
        <el-button
          size="mini"
          type="danger"
          plain
          icon="el-icon-delete"
         @click="classDel(scope.row)"></el-button>
      </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>
 
 <script>
import { http } from "../../api/http.js";
export default {
  data() {
    return {
      //和表格绑定的数据源 
      tableData: [],

      //分页渲染的总数据
      data: [],
      //页码
      pageIndex: 1,
      //总容量
      pageSize: 5,

    };
  },

  methods: {
    //获取商品分类列表的方法
    //通过假分页渲染商品分类的内容
    getGoodsList() {
      http.categoriesList().then(res => {
        console.log(res);
        if (res.status == 200) {
          this.data = res.data.data
          //算出开始索引
          let star = (this.pageIndex - 1) * this.pageSize
          //算出结束索引
          let end = star + this.pageSize - 1
          //使用截取数组的方法来获取伪造的假页码数据
          const arr = this.data.slice(0, end + 1)
          //最后在赋值给表格的数组
          this.tableData = arr
         }
      });
    }
  },

  created() {
    this.getGoodsList();
  },

  //过滤器
  filters: {
    formGrad(val) {
      switch (val) {
        case 0:
          return "一级";
        case 1:
          return "二级";
        case 2:
          return "三级";
      }

     
    }
  }
};
</script>
 
 <style>
</style>
 