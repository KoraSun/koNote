<template>
<div  id="note" class="detail">
    <NoteSidebar />
    <div id="note-detail">  
      <h1>
         notebookId:{{$route.query.notebooksId}}
      </h1>
       <h1>
         noteId:{{$route.query.noteId}}
      </h1>
    </div>
</div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteSidebar from "@/components/NoteSidebar"
    export default {
        components:{NoteSidebar},
        data(){
            return {message:'笔记详情'}

        },
        created(){
           Auth.getInfo()
            .then(res=>{
                if(!res.isLogin){
                    this.$router.push('/login')
                }
            })
        },  
        
    }
</script>


<style  scoped>
.detail{
    color: black;
   display:flex;
   align-items: stretch;
   background-color: #f7f7f7;
   flex: 1;
}

</style>