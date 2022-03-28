<template>
    <div id="notebook-list" class="detail">
        <header>
            <button href="#" class="button" @click="onCreate"> <i class="iconfont icon-plus"> 新建笔记</i></button>
        </header>
        <main>
            <div class="layout">
                <h3>笔记本列表({{notebooks.length}})</h3>
                <div class="lists">
                    <router-link v-for="notebook in notebooks" :to="`note?notebookId=${notebook.id}`" class="notebook" :key='notebook.id'>
                        <div>
                            <span class='iconfont icon-notebook'></span>
                            {{notebook.title}}
                            <span>{{notebook.noteCounts}}</span>
                            <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
                            <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
                            <span class="date">{{notebook.friendlyCreatedAt}}</span>
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
import {friendlyDate} from '@/helpers/until'


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
                console.log(res.data)
                this.notebooks=res.data
            })
        },
        methods:{
            onCreate(){
                 this.$prompt('请输入文件名', '创建笔记本', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.{1,30}$/,
                    inputErrorMessage: '标题不能为空，且不超过30个字符'
                    }).then(({ value }) => {
                       return Notebooks.addNotebook({title:value})
                    }).then(res=>{
                        console.log(res)
                            res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
                            this.notebooks.unshift(res.data)  
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });       
                      })
            },
            onEdit(notebook){
                let title=''
                this.$prompt('请输入文件名', '编辑笔记', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.{1,30}$/,
                    inputErrorMessage: '标题不能为空，且不超过30个字符',
                    inputValue:notebook.title
                    }).then(({value}) => {
                        title=value
                       return Notebooks.updateNotebook(notebook.id,{title})
                    }).then(res=>{
                        notebook.title=title
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });       
                      })
            },
            onDelete(notebook){
                 this.$confirm('确定要删除这一条笔记吗?', '删除笔记', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(()=>{
                        return Notebooks.deleteNotebook(notebook.id)
                    }).then((res)=>{
                         this.notebooks.splice(this.notebooks.indexOf(notebook),1)
                         this.$message({
                             type:'success',
                             message:res.msg})
                    })
            },
        }
    }
    
</script>

<style lang='less' scoped>
@import url(../assets/css/notebookLists.less);

</style>