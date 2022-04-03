<template>
    <div class="note-sidebar">
        <span class="button add-note" @click="onAddNote">
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
                <router-link :to="`/note?noteId=${note.id}&notebookId=${currentNotebook.id}`">
                <span class="date">{{note.updatedAtFriendly}}</span>
                <span class="title">{{note.title}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

export default {
    created(){
        this.getNotebooks().then(()=>{
            this.setCurrentNotebook({currentNotebookId:this.$route.query.notebookId})
                return this.getNotes({notebookId:this.currentNotebook.id})
            }).then(()=>{
                this.setCurrentNote({currentNoteId:this.$route.query.noteId})
                this.$router.replace({
                    path:'/note',
                    query:{
                        noteId:this.currentNote.id,
                        notebookId:this.currentNotebook.id
                    }
                })
            })
    },
    data(){
        return{}
    },
    computed:{
        ...mapGetters([
            'notebooks',
            'notes',
            'currentNotebook',
            'currentNote'
        ])
    },
    methods:{
        ...mapMutations([
            'setCurrentNotebook',
            'setCurrentNote'
        ]),
        ...mapActions([
            'getNotebooks',
            'getNotes',
            'addNote'

        ]),
        handleCommand(notebookId){
            if(notebookId == 'trash'){
               return this.$router.push({path:'/trash'})   
            }
            this.$store.commit('setCurrentNotebook',{currentNotebookId:notebookId})
            this.getNotes({ notebookId }).then(()=>{
                this.setCurrentNote({})
                // 此时还没有noteId，默认选择第一个
                this.$router.replace({
                    path:'/note',
                    query:{
                        noteId:this.currentNote.id,
                        notebookId:this.currentNotebook.id
                    }
                })
            })
        },
        onAddNote(){
            this.addNote({notebookId:this.currentNotebook.id})
        }    
    }
}
</script>

<style lang="less" scoped >
@import url(../assets/css/note-sidebar.less);
</style>