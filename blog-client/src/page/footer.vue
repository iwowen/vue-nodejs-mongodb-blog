<template>
    <div class="footer">
        <Emain>
            <p>{{footer}}</p>
        </Emain>
    </div>
</template>
<script>
    import Emain from '@/components/emain'
    export default{
        components:{Emain},
        props:{
            footer:String
        },
    }
</script>
<style scoped>
    .footer{
        text-align: center;
        height: 50px;
        line-height: 50px;
        margin-top: 1px;
        background-color: #ffffff;
    }
    
</style>

