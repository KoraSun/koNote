import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NotebookLists from '@/components/NotebookLists'
import NoteDetail from '@/components/NoteDetail'
import TrashDetail from '@/components/TrashDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: ()=>import ('@/components/Login')
    },
    {
      path:'/',
      alias: '/notebookLists',
      component:()=>import('@/components/NotebookLists')
    },
    {
      path: '/note',
      component: ()=>import('@/components/NoteDetail')
    },
    {
      path: '/trash',
      component: ()=>import('@/components/TrashDetail')
    },
    
  ]
})
