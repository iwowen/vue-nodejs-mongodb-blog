<template>
    <div class="manage">
        <div class="M-header">
            <div class="M-title">
                <h1>我的博客后台</h1>
            </div>
            <div class="M-right">
                <span>欢迎登录</span>
                <el-tooltip class="logout" effect="dark" content="退出登录" placement="bottom">
                    <el-button @click="logout">{{user}}</el-button>
                </el-tooltip>
            </div>
        </div>
        <div class="M-content">
            <div class="M-menu">
                <Mmenu></Mmenu>
            </div>
            <div class="M-container">
                <router-view :key="key"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import Mmenu from '@/components/manage/Mmenu'
    export default{
        data:function(){
            return {
                user:'',
                ishow:true
            }
        },
        components:{Mmenu},
        computed:{
                key(){
                    return this.$route.path + Math.random();
                }
            },
        created:function(){
            var token=sessionStorage.getItem('token');
            var url='api/ishow?token='+token;
            this.$http.get(url).then(function(res){
                if(res.data.success=='yes'){
                    this.user=res.data.user;
                    this.ishow=false;
                }else{
                    this.$router.push('/login');
                }
            })
        },
        methods:{
            logout(){
                sessionStorage.setItem('token','');
                this.$router.push('/login');
            }
        }
    }
</script>
<style scoped>
    .M-header{
        width:100%;
        height: 50px;
        background-color: #517dff;
        color: white;
    }
    .M-header h1{
        font-size: 30px;
        line-height: 50px;
        margin-left: 50px;
        width: 300px;
    }
    .M-title{
        float: left;
    }
    .M-right{
        float: right;
        margin: 0 50px;
    }
    .M-right span{
        line-height: 50px;
    }
    .M-content{
        width: 100%;
        display: flex;
        flex-direction: row;
        background-color: #3e424e;
    }
    .M-menu{
        background-color: #3e424e;
        height: 703px;
        width: 230px;
    }
    .M-container{
        flex-grow:1;
        background-color:#ffffff;
    }
</style>