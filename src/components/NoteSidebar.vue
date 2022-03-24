<template>
    <div class="note-sidebar">
        <span class="button add-note">
            添加笔记
        </span>
        <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom" >
            <span class="el-dropdown-link">
                我的笔记本1<i class="iconfont icon-down" />
            </span>   
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id" :key="notebook.id">
                    {{notebook.title}}
                </el-dropdown-item>
                <el-dropdown-item command="trash">
                    回收站
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="menu">
            <div class="update">更新时间</div>
            <div class="title">标题</div>
        </div>
        <ul class="notes">
            <li v-for="note in notes" :key="note.id">
                <router-link :to="`/note?noteId=${note.id}`">
                <span class="date">{{note.updateAtFriendly}}</span>
                <span class="title">{{note.title}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import friendlyDate from '@/helpers/until'
export default {
    data(){
        return{
            notebooks:[
                {
                    id:1,
                    title:"hello1"                
                },
                {
                    id:2,
                    title:"hello2",
                    updateAtFriendly:'三分钟前'
                }
            ],
            notes:[
                {
                    id:11,
                    title:'第一个笔记',
                    updateAtFriendly:'3分钟前'
                },
                {
                    id:12,
                    title:'第2个笔记',
                    updateAtFriendly:'5分钟前'
                }
            ],
        }
    },
    methods:{
        handleCommand(command){
            console.log(command)
        },
        updateAtFriendly(date){
            console.log(date)
        },
    }
}
</script>

<style lang="less" scoped >
@import url(../assets/css/note-sidebar.less);
</style>