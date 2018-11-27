<template>
    <div class="article-table" v-loading="loading">
        <router-link to="/manage/addarticle"><el-button type="primary" class="add">添加文章</el-button></router-link>
        <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
            prop="title"
            label="标题"
            width="300">
            </el-table-column>
            <el-table-column
            prop="user"
            label="作者"
            width="180">
            </el-table-column>
            <el-table-column
            prop="createDate"
            label="日期">
            </el-table-column>
            <el-table-column
            label="操作"
            width="260">
                <template slot-scope="scope">
                    <router-link :to="'/article/'+scope.row.id"><el-button type="text" size="small">查看</el-button></router-link>
                    <router-link :to="'/manage/changearticle/'+scope.row.id"><el-button type="text" size="small">编辑</el-button></router-link>
                    <el-button type="text" size="small" @click="delarticle(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Mpag :currentPage="currentPage" :articleNum="articleNum"></Mpag>
    </div>
</template>

<style>
  .el-table .warning-row {
    background: #ffffff;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .article-table{
      width: 80%;
      margin: 0 auto;
      margin-top: 30px;
      margin-bottom: 100px;
  }

  .add{
      margin: 10px 0;
  }

  .pag{
      margin: 20px 0;
  }
</style>

<script>
import Mpag from '@/page/manage/content/mpag'

  export default {
    inject:['reload'],
    components:{Mpag},
    methods: {
      handleClick(row) {
        console.log(row);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'warning-row';
        } else if (rowIndex%2 === 0) {
          return 'success-row';
        }
        return '';
      },
      getarticle(){
        this.requrl='/api/articlelist/'+this.$route.params.id;
        this.$http.get(this.requrl).then(function(response){
          var data=response.data.data;
          this.articleNum=response.data.articleNum;
          this.currentPage=Number(this.$route.params.id);
          for(var i=0;i<data.length;i++){
            var tdata={};
             tdata.title=data[i].title;
             tdata.user=data[i].user;
             tdata.createDate=data[i].createDate;
             tdata.id=data[i]._id;
             this.tableData.push(tdata);
          }
          this.loading=false;
        },function(error){
          console.log(error);
        })
      },
      delarticle(id){
        var requrl='/api/delarticle';
        this.$http.post(requrl,{token:sessionStorage.getItem('token'),id:id}).then(function(res){
          if(res.data.success=="yes"){
            this.reload();

          }else{
            this.$message.error('&-_-!删除失败');
          }
        })
      }
    },
    data() {
      return {
        currentPage:0,
        articleNum:0,
        tableData: [],
        requrl:'',
        loading:true
      }
    },
    created:function(){
        this.getarticle();
    }
  }
</script>