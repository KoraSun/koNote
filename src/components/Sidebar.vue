<template>
    <div id="sidebar">
        <avatar></avatar>
        <div class="icons">
            <router-link to="/note" title="笔记">
                <svg class="icon" >
                    <use xlink:href="#icon-notes"></use>
                </svg>
            </router-link>
             <router-link to="/notebookLists" title="笔记本">
              <svg class="icon" >
                    <use xlink:href="#icon-notebooks"></use>
                </svg>
              </router-link>
              <router-link to="/trash" title="回收站">
               <svg class="icon" >
                    <use xlink:href="#icon-trash"></use>
                </svg>
              </router-link>
        </div>
        <div class="logout" @click="onLogout">
           <svg class="icon" >
                <use xlink:href="#icon-logout"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import avatar from '@/components/Avatar'
import {mapActions} from 'vuex'
    export default {
        components:{avatar},
        methods:{
          ...mapActions(['logout']) ,
          onLogout(){
              this.logout({path:'/login'})
          }
        },

        
    }
</script>

<style  scoped lang="less">
#sidebar{
    position: relative;
    width:78px;
    text-align: center;
   /*  background: #dbe6fa; */
   background: white;
   border-right: 1px solid #ccc;
}
.icons{
    margin-top:15px;
}

.icons a{
    padding: 15px 3px;
    display: block;
    border: 0 2px solid transparent;
}
.icon{
    height: 20px;
    width: 20px;
}
.icons .router-link-active{
   background: #dbe6fa;
   border-right: 2px solid #0661a6;
}
.logout{
    position: absolute;
    bottom: 30px;
    width: 78px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    padding:10px;
    :hover{
     height: 28px;
     width: 28px;
    }
}

</style>