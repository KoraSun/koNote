<template>
   <div id = "login">
       <div class="model-mask">
           <div class="model-wrapper">
                <div class="model-container">
                    <div class="main"></div>
                    <div class="from">
                        <h3 @click="showRegister">创建用户</h3>
                        <div v-show="isRegister" class="register">
                            <input type="text" v-model="register.username" placeholder="用户名">
                            <input type="password"  v-model="register.password" placeholder="密码">
                            <p v-bind:class="{error:register.isError}">{{register.notice}}</p>
                            <div class="button-in" @click="onRegister">创建账号</div>
                        </div>
                        <h3 @click="showLogin">用户登陆</h3>
                        <div v-show="isLogin"  class="login">
                        <input type="text" v-model="login.username" placeholder="用户名">
                            <input type="password" v-model="login.password" placeholder="密码">
                            <p v-bind:class="{error:login.isError}">{{login.notice}}</p>
                            <div class="button-in" @click="onLogin">登陆</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"Login",
        data(){
            return{
               isRegister:false,
               isLogin:true,
               register:{
                   username:'',
                   password:'',
                   isError:false,
                   notice:'创建后请记住用户名和密码'
               },
               login:{
                   username:'',
                   password:'',
                   isError:false,
                   notice:'请输入用户名和密码'
               },
               
            }

        },
        methods:{
            showRegister(){
                this.isRegister=true,
                this.isLogin=false
            },
             showLogin(){
                this.isRegister=false,
                this.isLogin=true
            },
            onRegister(){
                let result1 =this.validUsername(this.register.username)
                if(!result1.check){
                    this.register.isError=true
                    this.register.notice=result1.notice
                    return
                }
                let result2=this.validPassword(this.register.password)
                if(!result2.check){
                    this.register.isError=true,
                    this.register.notice=result2.notice
                    return
                }
                this.register.isError=false
                this.register.notice=''

                console.log('register send')

            },
            onLogin(){
                let result1 =this.validUsername(this.login.username)
                if(!result1.check){
                    this.login.isError=true
                    this.login.notice=result1.notice
                    return
                }
                let result2=this.validPassword(this.login.password)
                if(!result2.check){
                    this.login.isError=true,
                    this.login.notice=result2.notice
                    return
                }
                this.register.isError=false
                this.register.notice=''
                console.log('login send')

            },
            validUsername(username){
                return{
                    check:/^[\w\u4e00-\u9fa5]{3,15}$/.test(username),
                    notice:'用户名3-15个字符，仅限于字母数字下划线中文'
                }
                
            },
            validPassword(password){
                return{
                    check:/^.{6,16}$/.test(password),
                    notice:'密码是6-16个字符'
                }
            },
        }
        
    }
</script>

<style lang='less' scoped>
.model-mask{
    position: fixed;
    z-index: 100;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: table;
    transition:opacity 0.3s ease;
}
.model-wrapper{
    display: table-cell;
    vertical-align: middle;
}

.model-container{
    width: 800px;
    height: 500px;
    margin: 0 auto;
    background:#fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.33);
    transition: all 0.3s ease;
    font-family:  Helvetica, Arial, sans-serif;
    display: flex;

}
.main{
    flex:1;
    background: #36bc64 url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
    background-size: contain;
}
.from{
    width: 270px;
    border-left: 1px solid #ccc;
    h3{
        color: #444;
        padding: 10px 20px;
        font-weight: normal;
        font-size: 16px;
        border-top: 1px solid #eee;
        cursor: pointer;

        &:nth-of-type(2){
            border-bottom: 1px solid #eee;
        }
    }
    .button-in{
        background-color: #2bb964;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-weight: bold;
        color: #fff;
        border-radius: 4px;
        margin-top: 18px;
        cursor: pointer;
    }
    .login,.register{
        padding:10px 20px;
        border-top: 1px solid #eee;

        input{
            display: block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding:0 6px;
            border-radius: 4px;
            border:1px solid #ccc;
            outline: none;
            font-size:14px;
            margin-top: 10px;
        }
        input:focus{
            border:3px solid #9dcaf8;
        }
        p{
            font-size: 12px;
            margin-top: 10px;
            color: #444;
        }
        .error{
            color:red;
        }
        .login{
            border-top: 0;
        }
    }
}

</style>