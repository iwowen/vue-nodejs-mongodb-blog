<template>
    <div class="content">
        <Emain>
            <div class="ctleft">
                <div class="article-card-content">
                   <router-view :key="key"></router-view>
                </div>
            </div>
            <div class="ctright">
                <Search></Search>
            </div>
            <div class="clear"></div>
        </Emain>
    </div>
</template>
<script>
    import Emain from '@/components/emain'
    import ACard from '@/page/content/articleCard'
    import Pagination from '@/page/content/pagination'
    import Search from '@/page/sidebar/search'
    export default{
        components:{
            Emain, ACard,Pagination, Search
        },
        computed:{
            key(){
                return this.$route.path + Math.random();
            }
        }

    }
</script>
<style scoped>
    .content{
        min-height: 500px;
        /* background-color: #808080; */
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .ctleft{
        float: left;
        width: 80%;
        min-width: 700px;
    }
    .ctright{
        width: 20%;
        float: left;
    }
    .article-card-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* padding-top: 20px; */
    }
    
</style>

