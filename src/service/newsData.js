import {instance} from './dataConfig'
import Qs from 'qs'


/*新闻接口*/
//新闻列表
export const getNewsList = (d) => {
  return instance('get','/api/public/information/news/find/all',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};
//新闻详情
export const getNewsDetail = (d) => {
  return instance('get','/api/public/information/news/find/'+d,{})
};
/*公告接口*/
// 公告列表
export const getNoticeList = (d) => {
  return instance('get','/api/public/information/notice/find/all',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};
// 公告详情
export const getNoticeDetail = (d) => {
  return instance('get','/api/public/information/notice/find/'+d,{})
};
// 当前新闻前一条后一条
export const getNewsLastAndNext = (d) => {
  return instance('get','/api/public/information/news/findLastAndNext/'+d,{})
};
// 当前公告前一条后一条
export const getNoticeLastAndNext = (d) => {
  return instance('get','/api/public/information/notice/findLastAndNext/'+d,{})
};