import {instance} from './dataConfig'
import Qs from 'qs'


/*远动员接口*/
//赛事名称下拉

//比赛项目下拉
export const playerNameList = () => {
  return instance('get','/api/grade/gradeApply/gradeName/playerName/player_game',{})
};
//考试地址待定
//考点下拉
export const examinationAddressList = (d) => {
  return instance('post','/api/grade/gradeApply/examinationAddress',JSON.stringify(d))
};
//考试时间下拉
//赛事申请、等级申请提交
export const gradeApplySubmit = (d) => {
  return instance('post','/api/grade/gradeApply',JSON.stringify(d))
};
// 获取某考点下可报名的测试
export const examinationAddressTestList = (d) => {
  return instance('post','api/grade/gradeApply/examinationAddress/test',JSON.stringify(d))
};
// 证书查看(条件查询)
export const certificateSearch = (d) => {
  return instance('get','api/grade/gradeApply/search/certificateAll',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};