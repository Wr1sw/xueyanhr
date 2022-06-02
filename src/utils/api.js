import axios from 'axios'
import { Message } from 'element-ui';
import router  from "@/router";
import message from "element-ui/packages/message";

axios.interceptors.response.use(success=>{
    // 业务上的错误
    if (success.status && success.status == 200 && success.data.status == 500) {
        Message.error({message:success.data.msg});
        return;
    }
    if (success.data.msg) {
        Message.success({message:success.data.msg})
    }
    return success.data;
}, error => {
    if (error.response.status==504 || error.response.status == 404) {
        Message.error({message:'服务器不见了:('});
        router.replace('/404');
    } else if (error.response.status == 403) {
        Message.error({message:'权限不足，请联系管理员'})
        router.replace('/403');
    } else if (error.response.status == 401) {
        Message.error({message:'要登陆的哟'})
        router.replace('/')
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message:'出大问题，未知错误'})
        }
        router.replace('/unknown');
    }
    return;
})

let base = '';

export const postKeyValueRequest=(url, params)=>{
    return axios({
        method: 'post',
        url:`${base}${url}`,
        data:params,
        transformRequest:[function (data) {
            let ret = '';
            for (let i in data) {
                ret+=encodeURIComponent(i)+'='+encodeURIComponent(data[i])+'&'
            }
            return ret;
        }],
        headers:{
           'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
export const getRequest=(url, params)=>{
    return axios({
        method:'get',
        url:`${base}${url}`,
        data:params
    })
}
export const postRequest=(url, params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params
    })
}
export const putRequest=(url, params)=>{
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params
    })
}
export const deleteRequest=(url, params)=>{
    return axios({
        method:'delete',
        url:`${base}${url}`,
        data:params
    })
}