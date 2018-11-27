<template>
    <div class="addArticle">
        <el-button type="primary" style="width:100px" @click="submit" v-loading="loading">提交</el-button>
        <div class="title">
            <h3 style="width:50px; margin-top:10px">标题</h3>
            <el-input
                placeholder="请输入标题......"
                v-model="inputtitle"
                clearable>
            </el-input>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="分类">
                <el-select v-model="cla" placeholder="分类" style="width:350px;margin-left:10px" >
                <el-option :label="item" :value="item" v-for="item in clas" :key="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签">
                <el-input v-model="tag" placeholder="添加标签"  style="width:350px" @keyup.enter.native="btn"></el-input>
            </el-form-item>
            <el-button type="info" @click="btn">添加</el-button>
        </el-form>
        <div class="biao">
            <el-tag closable :disable-transitions="true" v-for="item in tags" :key="item" style="margin-left:10px;"  
            @close="handleClose(item)">{{item}}</el-tag>
        </div>
        <quill-editor 
            v-model="content" 
            ref="myQuillEditor" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event )"
            @change="onEditorChange($event)">
        </quill-editor>
      </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'
    export default{
        data(){
            return {
                inputtitle:'',
                content:'',
                tag:'',
                tags:[],
                clas:'',
                cla:'',
                loading:false
            }
        },
        methods:{
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
                
            },
            btn(){
                // this.formInline.user=this.tag;
                this.tags.push(this.tag);
                this.tag='';
            },
             handleClose(a){
                   this.tags.splice(this.tags.indexOf(a), 1);
             },
             submit(){
                 this.loading=true;
                 var requrl="/api/changearticle";
                 var token=sessionStorage.getItem('token');
                 var submitdata={
                    title:this.inputtitle,
                    class:this.cla,
                    label:this.tags,
                    content:this.content,
                    token:token,
                    id:this.$route.params.id
                 };
                 this.$http.post(requrl,submitdata).then(function(res){
                     if(res.data.success=="yes"){
                        this.$message({
                        message: '数据更新成功了',
                        type: 'success'
                        });
                    }else{
                        this.$message.error('&-_-!数据更新失败');
                    }
                    this.loading=false;
                 });
                 this.$router.push('/manage/articlelist/1')
             }
        },
        beforeCreate:function(){
            this.requrl='/api/article/'+this.$route.params.id;
            // console.log(this.requrl);
            this.$http.get(this.requrl)
            .then(function(response){
                var article=response.data;
                this.inputtitle=article.title;
                this.content=article.content;
                this.tags=article.label;
                this.cla=article.class;
            },function(err){
                console.log(err);
            })
        },
        created:function(){ //获取分类
                this.requrl='/api/getclass';
                // console.log(this.requrl);
                this.$http.get(this.requrl)
                .then(function(response){
                    this.clas=response.data.class;
                },function(err){
                    console.log(err);
                });

        }
    }
</script>

<style scoped>
      .addArticle{
          width: 80%;
          margin: 45px auto;
      }
      .title{
          margin: 20px auto;
          display: flex;
      }
      .biao{
          display: flex;
          margin-bottom:15px;
      }
</style>
