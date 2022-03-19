<template>
    <div id="note-detail">  
      <h1>
          {{message}}:{{$route.params.noteId}}
      </h1>
    </div>
</template>

<script>
import Auth from '@/apis/auth'
    export default {
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
h1{
    color: red;
}

</style>