import {instance} from './dataConfig'
import Qs from 'qs'


//用户注册
export const register = (d) => {
  return instance('post','/api/public/web/verificationCode/'+d.username+'/'+d.code,JSON.stringify(d))
};
//用户登录
export const login = (d) => {
  return instance('post','/api/auth/login',JSON.stringify(d))
};
//用户修改密码
export const changePassword = (d) => {
  return instance('put','/api/user/changepwd',JSON.stringify(d))
};
//忘记密码
export const forgetPwd = (d) => {
  return instance('put','/api/public/users/forgetpwd',JSON.stringify(d))
};
//忘记密码获取手机验证码
export const forgetPwdGetcode = (d) => {
  return instance('post','/api/public/web/smsSend/'+d+'/forgetpwd',JSON.stringify(d))
};
//获取用户信息
export const user = (d) => {
  return instance('get','/api/web/users/'+d,{})
};
//注册获取手机验证码
export const getcode = (d) => {
  return instance('post','/api/public/web/smsSend/'+d+'/reg',JSON.stringify(d))
};


