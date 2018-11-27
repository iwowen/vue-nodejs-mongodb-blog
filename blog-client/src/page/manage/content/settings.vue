<template>
    <div class="settings">
        <h2 class="title">站点配置</h2>
        <hr style="margin-bottom:20px"/>
        <el-form label-position="right" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="title"></el-input>
          </el-form-item>
          <el-form-item label="欢迎语">
            <el-input v-model="welcome"></el-input>
          </el-form-item>
          <el-form-item label="页脚">
            <el-input v-model="footer"></el-input>
          </el-form-item>
        </el-form>
      <el-button type="primary" style="float:right; margin-top:30px" @click="saveSettings" v-loading="loading">保存配置</el-button>
    </div>
</template>
<script>
    export default {
    data() {
      return {
        title:'',
        welcome:'',
        footer:'',
        loading:false
      };
    },
    methods:{
      saveSettings(){
        this.loading=true;
        var token=sessionStorage.getItem('token');
        var requrl="/api/settings";
        this.$http.post(requrl,{title:this.title,welcome:this.welcome,footer:this.footer,token:token}).then(function(res){
          if(res.data.success=="yes"){
            this.$message({
              message: '配置修改成功了哦~',
              type: 'success'
            });
          }else{
            this.$message.error('&-_-!配置修改失败了');
          }
          this.loading=false;
        })
        
      },
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