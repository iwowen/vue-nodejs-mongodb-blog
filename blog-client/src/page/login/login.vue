<template>
<div class="lg">
    <div class="login">
        <div class="login-container">
            <h1 class="header1">BLOG</h1>
            <div class="hh">
                <img class="icon-user" src="/static/img/login-name.png">
                <input type="text" class="name" placeholder="请输入用户名" v-model="user" @keyup.enter="login">
            </div>
            <div class="hh">
                <img class="icon-user" src="/static/img/password.png">
                <input type="password" class="name" placeholder="请输入密码" v-model="pass" @keyup.enter="login">
            </div>
            <button class="btn" @click="login">登录<i class="el-icon-loading loading" v-show="loading"></i></button>
        </div>
    </div>
    <img src="/static/img/star.jpg" class="bg"/>
</div>
</template>
<script>

    export default{
        data(){
            return {
                user:'',
                pass:'',
                posturl:'',
                loading:false
            }
        },
        methods:{
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
        }
    }

</script>
<style scoped>
.lg{
    position: relative;
    overflow: hidden;
    /* height: 100%; */
    
}
.login{
    width: 100%;
    height: 753px;
    /* background-image: url("/static/img/star.jpg"); */
    overflow: hidden;
    background-color: rgba(0,0,0,0.5);
}
.login-container{
    width: 15%;
    margin: 200px auto;
}
.header1{
    color: #ff0000;
    text-align: center;
    margin-bottom: 30px;
    font-size: 80px;
}
.name{
    border-radius: 10px;
    width: 185px;
    height: 30px;
    border: 0;
    outline: none;
    /* border: 1px solid #c0c0c0; */
    padding-left: 50px;
}
.icon-user{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 24%;
    left: 7%;
}
.hh{
     position: relative;
     margin-bottom: 20px;
}
.btn{
     border-radius: 10px;
     width: 235px;
     height: 30px;
     color: white;
     font-size: 15px;
     background-color: #ff0000;
    border: 0;
    outline: none;
    cursor: pointer;
    position: relative;
}
.bg{
    width: auto;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
.loading{
    position: absolute;
    top:8px;
    left:60%;
}
</style>

