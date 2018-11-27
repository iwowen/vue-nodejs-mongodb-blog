<template>
    <div class="alist">
        <ACard v-for="(article,index) in articles" :key="index"
         :title="article.title" :author="article.user" :content="article.content"
         :routeToarticle="article._id" :cla="article.class"
         ></ACard>
         <div class="loading" v-if="loading" v-loading="loading"></div>
    </div>
</template>
<script>
    import ACard from '@/page/content/articleCard'
    export default{
        data:function(){
            return {
                requrl:'',
                articles:{},
                loading:true
            }
        },
        components:{
             ACard
        },
        created:function(){
            this.requrl='/api/articlelist/'+this.$route.params.id;
            if(this.$route.query.cla){
                this.requrl=this.requrl+'?cla='+this.$route.query.cla;
            }
            if(this.$route.query.search){
                this.requrl=this.requrl+'?search='+this.$route.query.search;
            }
            // console.log(this.requrl);
            this.$http.get(this.requrl)
            .then(function(response){
                this.articles=response.data.data;
                // console.log(response.data);
                this.loading=false;
            },function(err){
                console.log(err);
            })
        }
    }
</script>
<style scoped>
    .loading{
        width: 100%;
        height: 700px;
    }
</style>
