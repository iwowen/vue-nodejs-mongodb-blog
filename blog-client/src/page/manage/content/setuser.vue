<template>
    <div class="settings">
        <h2 class="title">用户配置</h2>
        <hr style="margin-bottom:20px"/>
        <el-form label-position="right" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="user"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="pass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="pass2" type="password"></el-input>
          </el-form-item>
        </el-form>
      <el-button type="primary" style="float:right; margin-top:30px" @click="saveSettings" v-loading="loading">确认修改</el-button>
    </div>
</template>
<script>
    export default {
    data() {
      return {
        user:'',
        pass:'',
        pass2:'',
        loading:false
      };
    },
    methods:{
      saveSettings(){
        if(this.pass!=this.pass2){this.$message.error('密码输入不相同');return};
        if(this.pass==''||this.pass2==''){this.$message.error('密码不能为空');return};
        this.loading=true;
        var token=sessionStorage.getItem('token');
        var requrl="/api/setuser";
        this.$http.post(requrl,{user:this.user,pass:this.pass,token:token}).then(function(res){
          if(res.data.success=="yes"){
            this.$message({
              message: '修改成功了',
              type: 'success'
            });
            this.login();
          }else{
            this.$message.error('&-_-!修改失败了');
          }
          this.loading=false;
        })
        
      },
      login(){
                this.posturl='/api/login';
                this.loading=true;
                this.$http.post(this.posturl,{username:this.user,password:this.pass}).then(function(res){
                    if(res.data.success=='yes'){
                        sessionStorage.setItem("token", res.data.token);
                        this.$router.push('/manage/articlelist/1');
                        return;
                    }else {
                        this.$message.error('账户或密码错误');
                    }
                    this.loading=false;
                });
            }
    },
    updated:{

    }
  }
</script>
<style scoped>
    .settings{
        width: 50%;
        margin: 100px auto;
    }
    .title{
        margin-bottom: 20px;
    }
</style>