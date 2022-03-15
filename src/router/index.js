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
      component: Login
    },
    {
      path: '/notebookLists',
     
      component: NotebookLists
    },
    {
      path: '/notebooks/:noteId',
     
      component: NoteDetail
    },
    {
      path: '/trash/:noteId',
     
      component: TrashDetail
    },
    
  ]
})
