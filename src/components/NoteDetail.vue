<template>
<div  id="note" class="detail">
    <NoteSidebar @update:notes="val=>notes=val" />
    <div class="note-detail">  
        <div class="note-bar">
              {{notes}}
            <span>创建日期：{{currentNote.createdAtFriendly}}</span>
            <span>更新日期：{{currentNote.updatedAtFriendly}}</span>
            <span>{{currentNote.statusText}}</span>
            <span class="iconfont icon-delete"></span>
            <span class="iconfont icon-fullscreen"></span>
        </div>
        <div class="note-title">
            <input type="text"  v-model="currentNote.title" placeholder="标题">
        </div>
        <div class="editor">
            <textarea v-show="true" v-model="currentNote.content" placeholder="请输入内容"></textarea>
            <div class="preview markdown-body" v-show="false" ></div>
        </div>
    </div>
</div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteSidebar from "@/components/NoteSidebar"

    export default {
       
        components:{NoteSidebar},
        data(){
            return {
                currentNote:{},
                notes:[]

            }

        },
        created(){
           Auth.getInfo()
            .then(res=>{
                if(!res.isLogin){
                    this.$router.push('/login')
                }
            })
        },  
        beforeRouteUpdate(to,from,next){
            console.log('beforeRouteUpdate')
            console.log(to,from)
            this.currentNote=this.notes.find(note=>note.id.toString()===to.query.noteId)
            next()
        }
       
        
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