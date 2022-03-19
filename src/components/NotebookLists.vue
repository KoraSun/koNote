<template>
    <div id="notebook-list">
        <h1>
            {{message}}
        </h1>
        <ul>
            <li>
                <router-link to="/notebooks/1">笔记本1</router-link>
            </li>
            <li>
                <router-link to="/notebooks/2">笔记本2</router-link>
            </li>
        </ul>
     
    </div>
</template>

<script>
import Auth from '@/apis/auth'
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

<style  scoped>
h1{
    color: blue;
}

</style>