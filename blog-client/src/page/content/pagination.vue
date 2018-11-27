<template>
    <div class="pagination">
        <el-pagination
        :page-size="6"
        @current-change="changeTo"
        background
        layout="prev, pager, next"
        :current-page="pageNo"
        :total="articleNum">
        </el-pagination>
    </div>
</template>
<script>
    export default{
        props:{
            articleNum:Number,
            pageNo:0
        },
        
        methods:{
            changeTo(val){
                // this.pageNo=val;
                this.$router.push(val+"");
            }
        }
    }
</script>
