<template>
    <div class="article" >
        <el-card class="box-card" v-loading="loading">
            <div slot="header" class="clearfix">
                <span>{{article.title}}</span>
                <el-tag type="info" v-if="article.class">{{article.class}}</el-tag>
                <span style="float: right; padding: 3px 0" type="text">{{article.createDate}}</span>
            </div>
            <div class="articleUser">
                <span>作者:</span>
                <span>{{article.user}}</span>
            </div>
            <div class="ql-container ql-snow">
                <div class="ql-editor" v-html="article.content">
            </div>
            </div>
            <div class="articlelabel">
                <el-tag v-for="label in article.label" :key="label" class="elt">{{label}}</el-tag>
            </div>
        </el-card>

    </div>
</template>
<script>
    export default{
        data:function(){
            return{
                requrl:'',
                article:{},
                loading:true
            }
        },
        beforeCreate:function(){
            this.requrl='/api/article/'+this.$route.params.id;
            // console.log(this.requrl);
            this.$http.get(this.requrl)
            .then(function(response){
                this.article=response.data;
                console.log(response.data);
                this.loading=false;
            },function(err){
                console.log(err);
            })
        }
    }
</script>
<style scoped>
    .elt{
        margin: 0 5px;
    }
    .text {
        font-size: 14px;
     }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 10px;
    width: 97%;
  }
  .articleUser{
      margin-bottom: 25px;
  }
  .articlelabel{
    display: flex;
    margin-top: 10px;
  }
</style>

