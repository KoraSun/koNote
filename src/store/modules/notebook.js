import Notebooks from '@/apis/notebooks'
import {Message} from 'element-ui'

const state={
    notebooks:[],
    currentNotebookId:null,

}

const getters={
    notebooks:state=>state.notebooks || [],

    currentNotebook:state=>{
        if(!Array.isArray(state.notebooks))return {}
        if(!state.currentNotebookId) return state.notebooks[0]
        return state.notebooks.find(notebook=> notebook.id == state.currentNotebookId)

    }

}

const mutations ={
    setNotebooks(state,payload){
        state.notebooks=payload.notebooks
    },
    addNotebook(state,payload){
        state.notebooks.unshift(payload.notebook)
    },
    updateNotebook(state,payload){
        let notebook = state.notebooks.find(notebook=>notebook.id === payload.notebookId) || {}
        notebook.title= payload.title
    },
    deleteNotebook(state,payload){
        state.notebooks= state.notebooks.filter(notebook=>notebook.id !== payload.notebookId)
    },
    setCurrentNotebook(state,payload){
        state.currentNotebookId=payload.currentNotebookId
    }
}

const actions={
    getNotebooks({ commit,state }){
        if(state.notebooks !== null) return Promise.resolve()
        return Notebooks.getAll().then(
            res=>{
                commit('setNotebooks',{notebooks:res.data})
            }
        )
    },
    addNotebook({commit},payload){
        return Notebooks.addNotebook({title:payload.title}).then(
            res=>{
                console.log("1")
                commit('addNotebook',{notebook:res.data})  
            }
        )
    },
    updateNotebook({commit},payload){
       return  Notebooks.updateNotebook(payload.notebookId,{title:payload.title}).then(
            res=>{
                commit('updateNotebook',{notebookId:payload.notebookId,title:payload.title})
            }
        )
    },
    deleteNotebook({commit},payload){
        return Notebooks.deleteNotebook(payload.notebookId).then(
            res=>{
                commit('deleteNotebook',{notebookId:payload.notebookId})
                Message.success(res.msg)
            }
        )
    },
}

export default{
    state,
    getters,
    mutations,
    actions
}