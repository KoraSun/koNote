import Auth from '@/apis/auth'
import router from '@/router/index'
const state={
    user:null

}

const getters={
    username:state=>state.user ===null ? '未登录' :state.user.username,
    slug:state=>state.user === null ? '未' :state.username.charAt(0)

}

const mutations={
    setUser(state,payload){
        state.user=payload.user
    }
}

const actions={
    login({commit},{username,password}){
        return Auth.login({username,password})
        .then((res)=>{
            console.log(res)
            commit('setUser',{user:res.data})

        })
    },
    register({commit},{username,password}){
        return Auth.register({username,password})
        .then((res)=>{
            console.log(res)
            commit('setUser',{user:res.data})
        })
    },
    logout({commit}){
        return Auth.logout()
         .then(res=>{
            commit('setUser',{user:null})
            console.log(res)
            router.push({path:'/login'})
         })
    },
    checkLogin({commit,state},payload){
        if (state.user !== null) return Promise.resolve()
        return Auth.getInfo()
        .then(res=>{
            if(!res.isLogin){
                //this.$router.push('/login') 这里的router不是全局的vue实例
                router.push(payload)
            }else{
                commit('setUser',{user:res.data})
            }
        })
    }

}

export default{
    state,
    getters,
    mutations,
    actions
}