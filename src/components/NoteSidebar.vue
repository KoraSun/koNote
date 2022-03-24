<template>
    <div class="note-sidebar">
        <span class="button add-note">
            添加笔记
        </span>
        <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom" >
            <span class="el-dropdown-link">
                {{currentNotebook.title}}<i class="iconfont icon-down" />
            </span>   
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebook.id">
                    {{notebook.title}}
                </el-dropdown-item>
                <el-dropdown-item command="trash">
                    回收站
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="menu">
            <div class="update">更新时间</div>
            <div class="title">标题</div>
        </div>
        <ul class="notes">
            <li v-for="note in notes" :key="note.id">
                <router-link :to="`/note?noteId=${note.id}`">
                <span class="date">{{note.updatedAtFriendly}}</span>
                <span class="title">{{note.title}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import friendlyDate from '@/helpers/until'
import Notebooks from '@/apis/notebooks'
import Notes from '@/apis/notes'

export default {
    created(){
        Notebooks.getAll().then(
            res=>{
                console.log(res)
                this.notebooks=res.data
            }
        )

    },
    data(){
        return{
            notebooks:[],
            notes:[],
            currentNotebook:{}
        }
    },
    methods:{
        handleCommand(notebookId){
            if(notebookId !== 'trash'){
                Notes.getAll({notebookId}).then(
                    res=>this.notes=res.data
                )
            }
        },
        updateAtFriendly(date){
            console.log(date)
        },
    }
}
</script>

<style lang="less" scoped >
@import url(../assets/css/note-sidebar.less);
</style>