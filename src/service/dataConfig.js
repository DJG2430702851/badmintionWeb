import Vue from 'vue'
import router from '../router'

export const instance = function(type,url,data,otherParams){
    return new Promise((resolve, reject) => {
        Vue.prototype.$axios({
          baseURL:(otherParams && otherParams.baseURL)?otherParams.baseURL:process.env.API_ROOT,
          url:url,
          method: type,
          responseType:(otherParams && otherParams.responseType)?otherParams.responseType:'json',
          withCredentials:false,//(otherParams && otherParams.withCredentials===false)?otherParams.withCredentials:
          headers:(otherParams && otherParams.headers)?otherParams.headers:{'Content-Type': 'application/json','X-Requested-With':'XMLHttpRequest'},
          data: data,
          params:(otherParams && otherParams.params)?otherParams.params:''
        }).then(function(res){resolve(res.data)}).catch(function(err){
            reject(err);
            if(err.response.data.errorCode==11){
              Vue.prototype.$message.error('登录信息过期,请重新登陆')
              router.push('/login')
              localStorage.removeItem('token');
              localStorage.removeItem('userId');
              localStorage.removeItem('username');
              localStorage.removeItem('displayName');
              localStorage.removeItem('webUserType');
              localStorage.removeItem('webUserState');
            }
        })
    })
};

Vue.prototype.$axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['X-Authorization'] = 'Bearer '+localStorage.getItem('token');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);


