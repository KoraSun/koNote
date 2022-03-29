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
                            <span class="date">{{notebook.createdAtFriendly}}</span>
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
import {mapState,mapActions,mapGetters} from 'vuex'


//window.Notebooks= Notebooks
    export default {
        data(){
            return {
               //notebooks:[]
            }

        },
        created(){
           Auth.getInfo()
            .then(res=>{
                if(!res.isLogin){
                    this.$router.push('/login')
                }
            })
            /* Notebooks.getAll().then(res=>{
                console.log(res.data)
                this.notebooks=res.data
            }) */
            this.$store.dispatch('getNotebooks')
        },
        computed:{
            ...mapGetters(['notebooks'])
        },
        methods:{
            ...mapActions([
                'getNotebooks',
                'addNotebook',
                'updateNotebook',
                'deleteNotebook'
            ]),
            onCreate(){
                 this.$prompt('请输入文件名', '创建笔记本', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.{1,30}$/,
                    inputErrorMessage: '标题不能为空，且不超过30个字符'
                    }).then(({ value }) => {
                      // return Notebooks.addNotebook({title:value})
                      this.addNotebook({title:value})
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
                       this.updateNotebook({notebookId:notebook.id,title:value})
                    })
            },
            onDelete(notebook){
                 this.$confirm('确定要删除这一条笔记吗?', '删除笔记', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(()=>{
                       this.deleteNotebook({notebookId:notebook.id})
                    })
            },
        }
    }
    
</script>

<style lang='less' scoped>
@import url(../assets/css/notebookLists.less);

</style>