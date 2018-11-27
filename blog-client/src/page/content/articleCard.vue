<template>
    <div class="articleCard">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{title}}</span>
                <span class="author">{{author}}</span>
                <!-- <el-button style="float: right; padding: 3px 0" type="text">
                    <router-link :to="'/article/'+routeToarticle">查看更多</router-link>
                </el-button> -->
                <el-tag style="float: right;">{{cla}}</el-tag>
            </div>
            <div  class="text" v-html="content">
                
            </div>
            <div class="more"><router-link :to="'/article/'+routeToarticle">查看更多</router-link></div>
        </el-card>
        <!-- <div class="clear"></div> -->
    </div>
</template>
<script>
    export default{
        props:{
            title:String,
            author:String,
            content:String,
            routeToarticle:String,
            cla:String
        }
    }
</script>
<style scoped>
  .text {
    font-size: 14px;
    max-height: 100px;
    overflow: hidden;
    text-overflow:ellipsis;
  }
    a{
        text-decoration: none;
    }

  .box-card {
    width: 94%;
    margin: 10px 3%;
    /* align-self: center; */
  }
  .author{
      color: #008080;
      padding: 0 10px;
  }
  .more{
      width: 100%;
      text-align: center;
      margin-top: 10px;
      cursor: pointer;
  }
</style>

