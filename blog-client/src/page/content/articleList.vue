<template>
    <div class="articlelist">
        <router-view></router-view>
        <div class="fenye">
        <Pagination :articleNum="articleNum" :pageNo="pageNo"></Pagination>
        </div>
    </div>
</template>
<script>
    import Pagination from '@/page/content/pagination'
    export default{
        data:function(){
            return {
                articleNum:0,
                pageNo:0
            }
        },
        components:{
             Pagination
        },
        created:function(){
            this.requrl='/api/articlenum';
            // console.log(this.requrl);
            if(this.$route.query.cla){
                this.requrl=this.requrl+'?cla='+this.$route.query.cla;
            }   
            this.$http.get(this.requrl)
            .then(function(response){
                this.articleNum=response.data;
                this.pageNo=Number(this.$route.params.id);
                // console.log(response.data);
            },function(err){
                console.log(err);
            })
        }
    }
</script>
<style>
.fenye{
        align-self: center;
    }
</style>
