import Trash from "@/apis/trash.js"
import {Message} from 'element-ui'
import note from "./note"

const state={
    trashNotes:null,
    currentTrashNoteId:null
}

const getters= {
    trashNotes: state => state.trashNotes || [],
    currentTrashNote:(state,getters)=>{
        if(!state.currentTrashNoteId) return getters.trashNotes[0] || {}
        return state.trashNotes.find(note=>note.id == state.currentTrashNoteId)||{}
    },
    belongTo:(state,getters,rootState,rootGetters)=>{
        //这里的rootGetters可以获取任意一个modules的getter，一开始进入noteDetail或者list获取notebooks，否则为空
        //在created里面增加调用getNotebooks可以解决这个问题
        let notebook = rootGetters.notebooks.find(notebook=>notebook.id==getters.currentTrashNote.notebookId)||{}
        return notebook.title || ''

    }
    

}

const mutations ={
    setTrashNotes(state,payload){
        state.trashNotes=payload.trashNotes
    },
    addTrashNote(state,payload){
       setTrashNotes.unshift(payload.note)  
    },
    deleteTrashNote(state,payload){
        state.trashNotes= state.trashNotes.filter(note=>note.id!= payload.noteId)
    },
    setCurrentTrashNote(state,payload){
        state.currentTrashNoteId=payload.currentTrashNoteId

    }

}

const actions ={
    getTrashNotes({commit}){
        return Trash.getAll().then(
            res=>{
                console.log(res)
                commit('setTrashNotes',{trashNotes:res.data})
            }
        )
    },
    deleteTrashNote({commit},{noteId}){
        return Trash.deleteTrashNote({noteId}).then(
            res=>{
                commit('deleteTrashNote',{noteId})
                Message.success(res.msg)
            }
        )  
    },
    revertTrashNote({commit},{noteId}){
        return Trash.revertTrashNote({noteId}).then(
            res=>{
                commit('deleteTrashNote',{noteId})
            }
        )  
    }

}

export default {
    state,
    getters,
    mutations,
    actions
}
