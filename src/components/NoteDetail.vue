<template>
    <div id="note-detail">  
      <h1>
          {{message}}:{{$route.params.noteId}}
      </h1>
    </div>
</template>

<script>
    export default {
        
        data(){
            return{
                message:"笔记页面详情"
            }

        }
        
    }
</script>

<style  scoped>
h1{
    color: red;
}

</style>