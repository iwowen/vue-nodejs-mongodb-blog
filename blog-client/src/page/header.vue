<template>
    <div class="header">
        <Emain>
            <div class="welword">
                <span>{{welcome}}</span>
            </div>
            <div class="login">
                <router-link to="/login">登录</router-link>
            </div>
            <div class="clear"></div>
        </Emain>
        <div class="hdcontainer">
            <Emain>
                <div class="hdleft">
                    <div class="hdtitle">
                        <h1 @click="routeToindex">{{title}}</h1>
                    </div>
                </div>
                <div class="hdright">
                    <Emenu ></Emenu>
                </div>
                <div class="clear"></div>
            </Emain>
        </div>
    </div>
</template>
<script>
    import Emain from '@/components/emain'
    import Emenu from '@/components/header/emenu'
    export default{
        components:{Emain, Emenu},
        methods:{
            routeToindex(){
                this.$router.push('/articlelist/1');
            }
        },
        props:{
            title:String,
            welcome:String,
        }
    }
</script>
<style scoped>

    .hdcontainer{
        width: 100%;
        height: 80px;
        background-color: #ffffff;
        color: black;
        /* position:fixed; */
    }
    .hdleft{
        float: left;
        color: #61b3e6;
        /* padding-left: 20px; */
        /* font-size: 130%; */
    }
    .hdright{
        float: right;
        margin-top: 20px;
    }
    .hdtitle{
        margin-top: 20px;
        cursor: pointer;
    }
    .welword{
        padding: 3px 0;
        /* width: 300px; */
        float: left;
    }
    .login{
        float: right;
    }
    .login a{
        color: #1e1e1e;
        text-decoration: none;
        padding-right: 10px;
        cursor: pointer;
    }
</style>
