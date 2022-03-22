<template>
    <div id="notebook-list" class="detail">
        <header>
            <a href="#" class="button" @click="onCreate"> <i class="iconfont icon-plus"> 新建笔记</i></a>
        </header>
        <main>
            <div class="layout">
                <h3>笔记本列表({{notebooks.length}})</h3>
                <div class="lists">
                    <router-link v-for="notebook in notebooks" to='/notebooks/1' class="notebook" :key='notebook.id'>
                        <div>
                            <span class='iconfont icon-notebook'></span>
                            {{notebook.title}}
                            <span>{{notebook.noteCounts}}</span>
                            <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
                            <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
                            <span class="date">{{notebook.createdAt}}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'

//window.Notebooks= Notebooks
    export default {
        data(){
            return {
               notebooks:[]
            }

        },
        created(){
           Auth.getInfo()
            .then(res=>{
                if(!res.isLogin){
                    this.$router.push('/login')
                }
            })
            Notebooks.getAll().then(res=>{
                this.notebooks=res.data
            })
        },
        methods:{
            onCreate(){
                let title = window.prompt('创建笔记本')
                if (title.trim() === ''){
                    alert('标题不能为空')
                    return 
                }
                console.log('create..')
                Notebooks.addNotebook({title}).then(
                    res=>{
                        this.notebooks.unshift(res.data)
                    }
                )   
            },
            onEdit(notebook){
                console.log('edit..',notebook)
                let title =window.prompt('编辑标题')
                Notebooks.updateNoteBook(notebook.id,{title})
                .then(
                    res=>{
                    console.log(res)
                    notebook.title=title
                    }
                )
            },
            onDelete(notebook){
                console.log('delete..',notebook)
                let isConfirm = window.confirm('确定要删除吗')
                if(isConfirm){
                    Notebooks.deleteNotebook(notebook.id)
                    .then(
                        res=>{
                            console.log(res)
                            this.notebooks.splice(this.notebooks.indexOf(notebook),1)
                        })     
                }
            }
        }
        
    }
</script>

<style lang='less' scoped>
@import url(../assets/css/notebookLists.less);

</style>