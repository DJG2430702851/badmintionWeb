import {instance} from './dataConfig'
import Qs from 'qs'


/*个人中心*/
//用户修改密码
export const changePassword = (d) => {
  return instance('put','/api/user/changepwd',JSON.stringify(d))
};
//获取完善个人信息
export const getPersonal = (d) => {
  return instance('get','/api/web/personal/'+d.userId,{})
};
//修改完善个人信息
export const updatePersonal = (d) => {
  return instance('put','/api/web/personal/'+d.userId,JSON.stringify(d))
};
//获取完善机构信息
export const getMechanism = (d) => {
  return instance('get','/api/web/institution/'+d.userId,{})
};
//修改完善机构信息
export const updateMechanism = (d) => {
  return instance('put','/api/web/institution/'+d.userId,JSON.stringify(d))
};
//我的报名
export const mySignupList = (d) => {
  return instance('get','/api/organization/trainingClass/curr',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};
//考评员取消报名
export const cancelSignup = (d) => {
  return instance('delete','/api/appraiserManager/appraiserTrainingEnrolmen/'+d,{})
};
//我的等级,赛事申请
export const myApplication = (d) => {
  return instance('get','/api/grade/gradeApply',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
};
//取消我的等级,赛事申请
export const cancelMyApplication = (d) => {
  return instance('delete','/api/grade/gradeApply/gradeName/'+d,{});
};
//我的测试申请
export const myTestApplication = () => {
  return instance('get','/api/organization/testApply',{});
};
