 <template>
   <div class="my-categories">
    <!-- 面包屑导航 -->
    <bread first="商品管理" second="商品分类"></bread>

    <el-button type="success" @click.native="addGoods" plain>添加分类</el-button>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 20px;"
       >
       <!-- label:表头的名字 treekey:商品分类里的id  parentkey: 父节点的id  levelkey: 自身层级-->
      <el-table-tree-column
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        prop="cat_name"
        label="分类名称"
        width="220"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
      ></el-table-tree-column>

      <el-table-column prop="cat_level" label="级别" sortable width="150">
        <template slot-scope="scope">{{ scope.row.cat_level | formGrad}}</template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="150">
        <template slot-scope="scope">{{scope.row.cat_deleted=false ? '无效' : '有效' }}</template>
      </el-table-column>

      <el-table-column prop="handle" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            icon="el-icon-edit"
            @click="classEdit(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="classDel(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5,10, 15, 25]"
      :page-size="pageSize"
       layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加商品 -->
    <el-dialog title="添加商品分类" :visible.sync="dialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="分类名称"  label-width="90px">
          <el-input v-model="addForm.cat_name"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" label-width="90px">
             <el-cascader 
              v-model="addForm.value"
             :options="levelList" 
             :props="{expandTrigger: 'hover',label:'cat_name', value:'cat_id', checkStrictly:true }" 
             clearable></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑商品 -->
     <el-dialog title="编辑分类" :visible.sync="editFormVisible">
      <el-form :model="editForm">
        <el-form-item label="分类名称"  label-width="90px">
          <el-input v-model="editForm.cat_name"  autocomplete="off"></el-input>
        </el-form-item>
       </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editClass()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
 <script>
import { http } from "../../api/http.js";
export default {
    name: 'categories',
  data() {
    return {
       //绑定给级联选择器的数据
       levelList: [],

      //跟表单双向绑定的对象
      addForm: {
          cat_name: '',
          value: [],
      },
   
      //和表格绑定的数据源
      tableData: [ ],

      //总数据
      data: [],
      //页码
      pageIndex: 1,
      //总容量
      pageSize: 5,
      //总条数
      total: '',
      //添加商品
      dialogFormVisible: false,
      //编辑分类
      editFormVisible: false,
      //编辑参数
      editForm: {
         id: '',
         cat_name: '',  
      }
      };
  },

  methods: {
    //添加商品分类
    addGoods() {
        this.dialogFormVisible = true;
       //获取分类层级: 其实就是级联选择器的长度
       let length = this.addForm.value.length
       this.addForm.cat_level = length

       //设置它的父类id
       //如果长度为0,父类id就是0
       //如果长度不为0,就取长度减一作为父类id
       if(this.addForm.value.length == 0){
            this.addForm.cat_pid = 0
       }else{
            this.addForm.cat_pid = this.addForm.value[length - 1]
       }

     },
    addCate(){
       //console.log(this.addForm.value)
       http.addGoodsCate(this.addForm).then( res =>{
            console.log(res)
            if(res.data.meta.status == 201){
                this.getGoodsList()
                this.$message.success(res.data.meta.msg)
                this.dialogFormVisible = false
            }else{
                this.$message.error(res.data.meta.msg)
            }
        })  
    },

    //编辑商品分类
    classEdit(row){
        this.editFormVisible = true
        this.editForm.id = row.cat_id
        this.editForm.cat_name = row.cat_name
    },
    editClass(){
         http.editCate(this.editForm).then( res => {
             console.log(res)
             if(res.data.meta.status == 200){
                 this.$message.success(res.data.meta.msg)
                 this.editFormVisible = false
                 this.getGoodsList()
             }else{
                 this.$message.error(res.data.meta.msg)
             }
         })  
    },

    //删除商品
    classDel(row) {
      this.$confirm("是否真的要删除!", "温馨提示", {
        type: "warning"
      })
        .then(() => {
          //删除商品的方法
          http.delGoodsCate(row.cat_id).then(res => {
            console.log(res);
            if (res.data.meta.status == 200) {
              this.$message.success("删除成功!");
              this.getGoodsList();
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //页码的点击事件
    handleCurrentChange(pagenum) {
      //要查出这一页的数据
      /**
       * 页容量为10
       * 第一页: 下标 0 - 9
       * 第二页: 下标 10 - 19
       * 第三页: 下标 20 - 29
       * 结论: 
       * 起始索引 = (页码 - 1) * 页容量
       * 结束索引 = 起始索引 + 页容量 - 1
       */
      this.pageIndex = pagenum;
      this.getPageDate()
    },
    //页容量选择
    handleSizeChange(pagesize) {
      this.pageSize = pagesize;
      this.pageIndex = 1;
      this.getPageDate()
     },

    //根据最新页码获取出当前页数据
     getPageDate(){
         //算出起始索引
         let start = (this.pageIndex - 1) * this.pageSize
         //算出结束索引
         let end = start + this.pageSize
         //算出要存放的数据
         let arr = this.data.slice(start, end)
         //赋值给table
         this.tableData = arr 
     },

    //获取商品分类列表的方法
    //通过假分页渲染商品分类的内容
    getGoodsList() {
      http.categoriesList(3).then(res => {
            //总数据
            this.data = res.data.data
           //数据总条数
            this.total = this.data.length
            //把数据给渲染到页面
            this.getPageDate()    
      })
       //添加分类的级联弹框中的数据
       http.categoriesList(2).then( res =>{
           this.levelList = res.data.data
       })
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
 