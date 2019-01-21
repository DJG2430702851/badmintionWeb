import {instance} from './dataConfig'
import Qs from 'qs'


/*测试机构接口*/
// 资格申请
export const qaGetDetail = (d) => {
  return instance('get','/api/organization/qualificationApply/applyDetail',{})
};
// export const qastep1Submit = (d) => {
//   return instance('post','/api/organization/qualificationApply/basicInformation',JSON.stringify(d))
// };
export const qastep1Update = (d) => {
  return instance('put','/api/organization/qualificationApply/basicInformation',JSON.stringify(d))
};
export const qastep2Submit = (d) => {
  return instance('post','/api/organization/qualificationApply/field',JSON.stringify(d))
};
export const qastep2Update = (d) => {
  return instance('put','/api/organization/qualificationApply/field',JSON.stringify(d))
};
export const qastep3Submit = (d) => {
  return instance('post','/api/organization/qualificationApply/fireSafety',JSON.stringify(d))
};
export const qastep3Update = (d) => {
  return instance('put','/api/organization/qualificationApply/fireSafety',JSON.stringify(d))
};
export const qastep4Submit = (d) => {
  return instance('post','/api/organization/qualificationApply/medicalSecurity',JSON.stringify(d))
};
export const qastep4Update = (d) => {
  return instance('put','/api/organization/qualificationApply/medicalSecurity',JSON.stringify(d))
};
export const qastep5Submit = (d) => {
  return instance('post','/api/organization/qualificationApply/environment',JSON.stringify(d))
};
export const qastep5Update = (d) => {
  return instance('put','/api/organization/qualificationApply/environment',JSON.stringify(d))
};
export const removeImage = (d) => {
  return instance('post','/api/organization/qualificationApply/removeImage',JSON.stringify(d))
};
// 测试申请
// 测试申请保存
export const submitTestApply = (d) => {
  return instance('post','/api/organization/testApply/save',JSON.stringify(d))
};
// 获取测试申请详情
export const testApplyDetail = (d) => {
  return instance('get','/api/organization/testApply/'+d,{})
};
// 取消申请
export const cancelTestApply = () => {
  return instance('delete','/api/organization/testApply/'+d,{})
};
// 编辑测试申请
export const updateTestApply = (d) => {
  return instance('put','/api/organization/testApply',JSON.stringify(d))
};