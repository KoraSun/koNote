<template>
    <div id="trash-detail">
    <h1>
        {{message}}:{{$route.params.noteId}}
    </h1>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                message:'回收页笔记详情'
            }
        }
        
    }
</script>

<style  scoped>
h1{
    color: green;
}

</style>