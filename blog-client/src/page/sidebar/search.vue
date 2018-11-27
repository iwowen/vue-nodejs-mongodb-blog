<template>
    <div class="search">
        <div class="sidetitle">
            <h3>站内搜索</h3>
        </div>
        <div class="search-content">
            <input type="text" placeholder="   搜索" v-model="searchtext" class="search-input" @keyup.enter="search"/>
            <div class="searchimg" @click="search">
                <img src="/static/img/search.png" >
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data:function(){
            return {
                searchtext:''
            }
        },
        methods:{
            search(){
                this.$router.push(this.$route.path+'?search='+this.searchtext);
            }
        }
    }
</script>
<style scoped>
    .sidetitle{
        display: flex;
        /* justify-content: flex-start; */
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin: 20px 0;
        border-left: 3px solid #0000ff;
        padding-left: 10px;
    }
    .search-content{
        width: 100%;
        height: 60px;
        background-color: #fff;
        position: relative;
        /* padding-top: 5px; */
        /* display: flex; */
        overflow: hidden;

    }
    .search-input{
        width: 85%;
        display: block;
        margin: 0 auto;
        margin-top: 15px;
        height: 30px;
        border-radius: 15px;
        border: 1px solid #808080;
        padding-left: 10px;
        outline:none;
    }
    .searchimg{
        position: absolute;
        left: 80%;
        top: 18px;
        width: 30px;
        height: 30px;
        /* background-color: #400080; */
        background-image: url('/static/img/search.png');
        cursor: pointer;
    }
    img{
        width: 80%;
    }
</style>

