<template>
    <div class="hdmenu">
        <el-menu
        :default-active="activeIndex" 
        class="el-menu-demo" 
        mode="horizontal" 
        @select="handleSelect">
        <el-menu-item index="1" @click="routeToindex">首页</el-menu-item>
        <el-submenu index="2">
            <template slot="title">分类</template>
            <el-menu-item :index="'2-'+index" v-for="(cla,index) in clas" :key="index"><router-link :to="'/articlelist/1?cla='+cla">{{cla}}</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="3">归档</el-menu-item>
        <el-menu-item index="4">关于</el-menu-item>
        </el-menu>

        
    </div>
</template>
<style scoped>
    .hdmenu>ul>li{
        padding: 0 30px;
    }
    .hdmenu>ul>li:nth-child(2){
        padding: 0 0;
    }
    a{
      text-decoration: none;
      color:#404040;
      display: block;
    }

</style>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        clas:[],
        requrl:''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      routeToindex(){
        this.$router.push('/articlelist/1');
      }
    },
    created:function(){ //获取分类
            this.requrl='/api/getclass';
            // console.log(this.requrl);
            this.$http.get(this.requrl).then(function(response){
                this.clas=response.data.class;
            },function(err){
                console.log(err);
            })
    }
  }
</script>
