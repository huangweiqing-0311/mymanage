<template>
  <div class="login">
    <div class="my-form">
      <div class="my-header"><h2>用户登录</h2></div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
        
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="password" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="my-submit" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
 //导入http方法
  import {http} from '../api/http'
   
export default {
  data() {
      return {
      ruleForm: {
        username: "admin",
        password: "123456",
        },

      rules:{
        username: [ 
           { required: true, message: '请输入用户名', trigger: 'blur' },],
        password:  [ 
           { required: true, message: '请输入密码', trigger: 'change' },
           { min: 6,   message: '长度不能少于6', trigger: 'blur' }
          ],
      }
    };
  },

  methods: {
      submitForm(formName){
            this.$refs[formName].validate((valid) => {
          if (valid) {
           //获取内容发请求
           http.login(this.ruleForm)
             .then(res => {
                 //console.log(res)
                 if(res.data.meta.status == 200){
                 //把 token 保存起来
                 window.localStorage.setItem('token', res.data.data.token)
                 //提示用户登录成功
                  this.$message.success(res.data.meta.msg)
                  //跳转到首页index
                  this.$router.push('/index')

                 }else{
                   //提示用户登录失败
                   this.$message.error(res.data.meta.msg)
                 }
             }) 
             
             } else {
            // console.log('error submit!!');
            return false;
          }
        });
      
      }
  }
};
</script>

<style lang="less" scoped>
      .login{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ccc;
            .my-form{
                width: 560px;
                height: 400px;
                padding: 30px;
                border-radius: 10px;
                background-color: #fff; 
                .my-header{
                    margin-bottom: 25px;
                }
            }
            .my-submit{
               width: 100%;
            }
      }
</style>
