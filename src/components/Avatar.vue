<template>
    <span :title="username">{{slug}}</span>
</template>

<script>
import Auth from '@/apis/auth'
import Bus from '@/helpers/bus'
import {mapGetters,mapActions} from 'vuex'
    export default {
        data(){
            return{}
        },
        created(){
            this.checkLogin()
           /*  Auth.getInfo().then(
                res=>{
                if(res.isLogin){
                    this.username=res.data.username
                }
                }
            ).catch(
               
            ) */
        },
        computed:{
            ...mapGetters([
                'username',
                'slug'
            ]),
            slug(){
                return this.username.charAt(0)
            }
        },
        methods:{
            ...mapActions([
                'checkLogin'
            ]),
        }
        
    }
</script>

<style  scoped>
span{
    display: inline-block;
    width: 34px;
    height: 34px;
    text-align: center;
    line-height: 32px;
    border-radius: 50%;
    background: #0661a6;
    color: #fff;
    text-shadow: 1px 0 1px #0661a6;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 18px;
    margin-top: 15px;
}

</style>