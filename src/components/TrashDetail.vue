<template>
    <div  id="trash" class="detail">
        <div class="note-sidebar">
            <h3 class="notebook-title">回收站</h3>
            <div class="menu">
                <div class="title">标题</div>
                <div class="update">更新时间</div>
            </div>
            <ul class="notes">
                <li v-for="note in trashNotes" :key="note.id">
                    <router-link :to="`/trash?noteId=${note.id}`">
                    <span class="title">{{note.title}}</span>
                    <span class="date">{{note.updatedAtFriendly}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="note-detail">
            <div class="note-empty" v-show="!currentTrashNote.id" >目前回收站无笔记</div>
            <div v-show="currentTrashNote.id" class="note-bar" v-if="currentTrashNote">
                <span>创建日期：{{currentTrashNote.createdAtFriendly}}</span>
                <span>|</span>
                <span>更新日期：{{currentTrashNote.updatedAtFriendly}}</span>
                <span>|</span>
                <span>所属笔记本：{{belongTo}}</span>
                <a class="button action" @click="onRevert">恢复</a>
                <a class="button action" @click="onDelete">彻底删除</a>
            </div>
            <div class="note-title">
                <span>{{currentTrashNote.title}}</span>
            </div>
            <div class="editor">
                <div class="preview" v-html="compileMarkDown"></div>
            </div>
        </div>
    </div>
</template>

<script>
   import MarkDownIt from 'markdown-it'
   import {mapGetters,mapActions, mapMutations} from 'vuex'
   let md = new MarkDownIt()

    export default {
        data(){
            return {}

        },
        created(){
           this.checkLogin({path:'/login'})
           this.getNotebooks()
           this.getTrashNotes().then(
               ()=>{
                  this.setCurrentTrashNote({currentTrashNoteId:this.$route.query.noteId}) 
                  this.$router.replace({
                      path:'/trash',
                      query:{
                          noteId:this.currentTrashNote.id
                      }
                  })
               })
        },
        methods:{
            ...mapActions([
                'checkLogin',
                'deleteTrashNote',
                'revertTrashNote',
                'getTrashNotes',
                'getNotebooks'
            ]),
            ...mapMutations([
                'setCurrentTrashNote'
            ]),
            onRevert(){
                this.revertTrashNote({noteId:this.currentTrashNote.id})
                .then(()=>{
                     this.setCurrentTrashNote({})
                     this.$router.replace({
                         path:'/trash',
                         query:{
                             noteId:this.currentTrashNote.id
                         }
                     })
                })
      
            },
            onDelete(){
                 this.$confirm('删除后将无法恢复', ' 确定删除吗？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(()=>{
                       return this.deleteTrashNote({noteId:this.currentTrashNote.id})
                    }).then(()=>{
                        this.setCurrentTrashNote({})
                        this.$router.replace({
                        path:'/trash',
                        query:{
                             noteId:this.currentTrashNote.id
                        }
                     })

                    })
            },
        },
        beforeRouteUpdate(to,from,next){
            this.setCurrentTrashNote({currentTrashNoteId:to.query.noteId}) 
            next()
        },
        computed:{
            ...mapGetters([
                'trashNotes',
                'currentTrashNote',
                'belongTo',
            ]),
            compileMarkDown(){
                  return md.render(this.currentTrashNote.content ||'')
            },
        }
        
    }
</script>

<style  lang="less">
@import url(../assets/css/note-sidebar);
@import url(../assets/css/note-detail);
#trash{
    display: flex;
    align-content: stretch;
    background-color: #fff;
    flex: 1;
    .note-bar {
    .action {
      border: 1px solid #0761a4;
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;
      cursor: pointer;
    }
  }
    
}
</style>