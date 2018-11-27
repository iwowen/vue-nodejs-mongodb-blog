<template>
    <div class="M-menu">
        <el-row class="tac">
            <el-col :span="24">
                <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#3e424e"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-edit-outline"></i>
                        <span>文章管理</span>
                        </template>
                        <el-menu-item-group>
                        <router-link to="/manage/articlelist/1"><el-menu-item index="1-1">文章列表</el-menu-item></router-link>
                        <router-link to="/manage/addarticle"><el-menu-item index="1-2">添加文章</el-menu-item></router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <router-link to="/manage/setuser">
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                    </router-link>
                    <!-- <router-link to="/manage/liuyan">
                        <el-menu-item index="3">
                            <i class="el-icon-document"></i>
                            <span slot="title">留言管理</span>
                        </el-menu-item>
                    </router-link> -->
                    <router-link to="/manage/settings">
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">站点配置</span>
                        </el-menu-item>
                    </router-link>
                    
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
    .tac{
        width: 100%;
    }
    .Mmenu{
        width: 100%;
    }
    a:active,a:hover{
        text-decoration: none;
    }
</style>
