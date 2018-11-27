<template>
    <div class="container">
        <Header :title="title" :welcome="welcome"></Header>
        <Content></Content>
        <Footer :footer="footer"></Footer>
    </div>
</template>
<script>
    import Header from '@/page/header'
    import Footer from '@/page/footer'
    import Content from '@/page/content'
    export default{
        name:'index',
        data(){
            return {
                title:'',
                welcome:'',
                footer:'',
            }
        },
        components:{Header,Footer, Content},
        created: function(){
            var requrl='/api/getoptions';
            this.$http.get(requrl).then(function(res){
                this.title=res.data.title;
                this.welcome=res.data.welcome;
                this.footer=res.data.footer;
            })

        }
    }
</script>
<style scoped>
    .container{
        background-color: #f1f1f1;
    }
</style>

