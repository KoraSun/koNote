<template>
    <div id="notebook-list" class="detail">
        <header>
            <button href="#" class="button" @click="onCreate">
                <svg class="icon" >
                    <use xlink:href="#icon-plus"></use>
                </svg>
                添加笔记本
            </button>
        </header>
        <main>
            <div class="layout">
                <h3>笔记本列表({{notebooks.length}})</h3>
                <div class="lists">
                    <router-link v-for="notebook in notebooks" :to="`note?notebookId=${notebook.id}`" class="notebook" :key='notebook.id'>
                        <div>
                            <svg class="icon" >
                                <use xlink:href="#icon-book"></use>
                            </svg>
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
import {mapState,mapActions,mapGetters} from 'vuex'


//window.Notebooks= Notebooks
    export default {
        data(){
            return {
               //notebooks:[]
            }

        },
        created(){
            this.checkLogin({path:'/login'})
           /* Auth.getInfo()
            .then(res=>{
                if(!res.isLogin){
                    this.$router.push('/login')
                }
            }) */
            /* Notebooks.getAll().then(res=>{
                console.log(res.data)
                this.notebooks=res.data
            }) */
            this.getNotebooks()
        },
        computed:{
            ...mapGetters(['notebooks'])
        },
        methods:{
            ...mapActions([
                'getNotebooks',
                'addNotebook',
                'updateNotebook',
                'deleteNotebook',
                'checkLogin',
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
                 this.$confirm('确定要删除这一个笔记本吗?', '删除笔记', {
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