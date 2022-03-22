<template>
    <div id="notebook-list" class="detail">
        <header>
            <a href="#" class="button"> <i class="iconfont icon-plus"> 新建笔记</i></a>
        </header>
        <main>
            <div class="layout">
                <h3>笔记本列表(10)</h3>
                <div class="lists">
                    <a href="#" class="notebook">
                        <div>
                            <span class='iconfont icon-notebook'></span>
                            笔记本标题1
                            <span>3</span>
                            <span class="action">编辑</span>
                            <span class="action">删除</span>
                            <span class="date">3天前</span>
                        </div>
                    </a>
                    <a href="#" class="notebook">
                        <div>
                            <span class="iconfont icon-notebook"></span>
                            笔记本标题2
                            <span>1</span>
                            <span class="action">编辑</span>
                            <span class="action">删除</span>
                            <span class="date">5天前</span>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'

window.Notebooks= Notebooks
    export default {
        data(){
            return {message:'笔记本列表'}

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

<style lang='less' scoped>
@import url(../assets/css/notebookLists.less);

</style>