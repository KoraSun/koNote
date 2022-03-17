import axios from 'axios'
import baseURLconfig from './config-baseURL.js'

axios.defaults.headers['Content-type']='application/json;charset=UTF-8'
//设置post请求统一设置content-type
axios.defaults.baseURL=baseURLconfig.baseURL
axios.defaults.withCredentials=true

export default function request(url, type='GET',data={}){
    return new Promise((resolve,reject)=>{
        let option ={
            url,
            method:type,
            validateStatus(status){
                return (status >= 200 & status <300) || status===400
            }
        }
        if (type.toLowerCase()==='get'){
            option.params=data
        }else{
            option.data= data
        }
        axios(option).then(res=>{
            if(res.status===200){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        }).catch(err=>{
            console.error({msg:'网络异常'})
            reject({msg:'网络异常'})
        })

    })
}