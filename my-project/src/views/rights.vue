 <template>
  <div class="my-right">
     <bread first="权限列表" second="权限列表"></bread>

     <el-table :data="rightData" border style="width: 100%">
       <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级"  width="180"></el-table-column>
    </el-table>
  </div>
</template>
      
 <script>

  import {http} from '../api/http.js'

 export default {
        data() {
          return {
              //保存权限列表的数据
              rightData: {},
          }
        },

        created() {
            http.getRight('list').then(res => {
                //console.log(res)
                for(let i = 0; i < res.data.data.length; i++){
                   //switch这里的要判断全等 ===
                   //既然要全等, 也要类型一致
                   switch(res.data.data[i].level){
                       
                       case '0':
                            res.data.data[i].level = '一级'
                            break
                       case '1':
                            res.data.data[i].level = '二级'
                            break
                       case '2':
                             res.data.data[i].level = '三级'
                             break     
                    }
                } 
                
                this.rightData = res.data.data
            })
        },
};
</script>
 
 <style>
</style>
 