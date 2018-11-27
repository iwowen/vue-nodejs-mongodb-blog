import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'

import ArticleList from '@/page/content/articleList'
import Article from '@/page/content/showarticle'
import Alist from '@/page/content/alist'
import Login from '@/page/login/login'
import Manage from '@/page/manage/manage'
import ArticleTable from '@/page/manage/content/ArticleTable'
import Settings from '@/page/manage/content/settings'
import Addarticle from '@/page/manage/content/addArticle'
import ChangeArticle from '@/page/manage/content/changeArticle'
import Setuser from '@/page/manage/content/setuser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Index',
      component: Index,
      children:[
        {
          path:'',
          redirect:'articlelist/1'
        },
        {
          path:'articlelist',
          component:ArticleList,
          children:[
            {
              path:':id',
              component:Alist
            }
          ]
        },
        // {
        //   path:'articlelist/:id',
        //   component:ArticleList,
        // },
        {
          path:'article/:id',
          component:Article,
        }
      ]
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/manage',
      component: Manage,
      children:[
        {
            path:'articlelist/:id',
            component:ArticleTable
        },
        {
          path:'settings',
          component:Settings
        },
        {
          path:'addarticle',
          component:Addarticle
        },
        {
          path:'changearticle/:id',
          component:ChangeArticle
        },
        {
          path:'setuser',
          component:Setuser,
        }
      ]
    }
  ]
})
