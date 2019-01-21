import {instance} from './dataConfig'
import Qs from 'qs'


/*考评员接口*/
// 考评员培训班列表
export const classList = (d) => {
  return instance('get','/api/appraiserManager/appraiser',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};
// 考评员培训报名
export const signup = (d) => {
  return instance('post','/api/appraiserManager/appraiserTrainingEnrolmen',JSON.stringify(d))
};
// 考评员培训报名详情
export const signupDetail = (d) => {
  return instance('get','/api/appraiserManager/appraiserTrainingEnrolmen/'+d,{})
};
// 更新考评员培训报名信息
export const updateDetail = (d) => {
  return instance('put','/api/appraiserManager/appraiserTrainingEnrolmen',JSON.stringify(d))
};

// 某考评员培训班下的课程内容获取
export const getClassContent = (d) => {
  return instance('get','/api/appraiserManager/appraiserCourseContent',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};
// 某考评员培训班下的培训通知获取
export const getClassNotice = (d) => {
  return instance('get','/api/appraiserManager/appraiserTrainingNotice/'+d,{})
};
// 获取培训班详情
export const getClassDetail = (d) => {
  return instance('get','/api/appraiserManager/appraiser/'+d,{})
};