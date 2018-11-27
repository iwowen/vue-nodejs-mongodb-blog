<template>
    <div class="mpag">
        <el-pagination
            class="pag"
            :page-size="6"
            @current-change="changeTo"
            :current-page="currentPage"
            layout="prev, pager, next, jumper"
            :total="articleNum">
        </el-pagination>
    </div>
</template>
<script>
    export default{
        props:{
            currentPage:Number,
            articleNum:0
        },
        methods:{
            changeTo(val){
                this.$router.push(val+"");
            }
        }

    }
</script>
