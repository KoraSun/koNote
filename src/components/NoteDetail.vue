<template>
<div  id="note" class="detail">
    <NoteSidebar @update:notes="val=>notes=val" />
    <div class="note-detail">  
        <div class="note-empty" v-show="!currentNote.id" >请选择笔记</div>
        <div class="note-detail-ct" v-show="currentNote.id">
            <div class="note-bar">
                <span>创建日期：{{currentNote.createdAtFriendly}}</span>
                <span>更新日期：{{currentNote.updatedAtFriendly}}</span>
                <span>{{statusText}}</span>
                <span class="iconfont icon-delete" @click="onDeleteNote"></span>
                <span class="iconfont icon-fullscreen" @click="isShowPreview=!isShowPreview"></span>
            </div>
            <div class="note-title">
                <input type="text"  
                    v-model="currentNote.title"
                    @input="onUpdateNote"
                    @keydown="statusText='输入中...'"
                    placeholder="标题">
            </div>
            <div class="editor">
                <textarea v-show="!isShowPreview" 
                   v-model="currentNote.content" 
                    @input="onUpdateNote"
                    @keydown="statusText='输入中...'"
                    
                   placeholder="请输入内容"></textarea>
                <div class="preview markdown-body"
                    v-show="isShowPreview" 
                    v-html="previewContent"
                    >
                </div>
            </div>
        </div>
    </div>  
</div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteSidebar from "@/components/NoteSidebar"
import _ from 'lodash'
import MarkDownIt from 'markdown-it'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
let md = new MarkDownIt()

    export default {
       
        components:{NoteSidebar},
        data(){
            return {
                statusText:'未修改',
                isShowPreview:false,
            }

        },
        computed:{
            previewContent(){
                return md.render(this.currentNote.content ||'')
               
            },
            ...mapGetters([
                'notes',
                'currentNote'
            ])
        },
        methods:{
            ...mapMutations([
                'setCurrentNote'
            ]),
            ...mapActions([
                'updateNote',
                'deleNote',
                'checkLogin'
            ]),
            onUpdateNote:_.debounce(function(){
                this.updateNote( {noteId:this.currentNote.id,title:this.currentNote.title,content:this.currentNote.content})
                .then(data=>{
                    this.statusText="已保存"
                })
                .catch(data=>{
                    this.statusText="保存出错"
                })
            },300),

            onDeleteNote() {
                this.deleteNote({ noteId: this.currentNote.id })
                    .then(data => {
                this.$router.replace({ path: '/note' })
                })
            },
        },
        created(){
            this.checkLogin({path:'/login'})
          /*  Auth.getInfo()
            .then(res=>{
                if(!res.isLogin){
                    this.$router.push('/login')
                }
            }) */
        },  
        beforeRouteUpdate(to,from,next){
            this.setCurrentNote({currentNoteId:to.query.noteId})
            //this.currentNote=this.notes.find(note=>note.id.toString()===to.query.noteId) || {}
            next()
        },
       
    }
</script>


<style  lang="less" scoped>
@import url(../assets/css/note-detail.less);

#note{
    color: black;
   display:flex;
   align-items: stretch;
   background-color: #fff;
   flex: 1;
}

</style>