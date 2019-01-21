import {instance} from './dataConfig'
import Qs from 'qs'


/*首页接口*/
// 首页banner列表
export const getBannerList = () => {
  return instance('get','/api/public/web/banner',{})
};

// 首页新闻
export const getIndexNewsList = () => {
  return instance('get','/api/public/information/news/find/hot',{})
};
// 首页图片新闻
export const getIndexImagesNewsList = () => {
  return instance('get','/api/public/information/news/find/hotImage',{})
};
// 首页公告
export const getIndexNoticeList = () => {
  return instance('get','/api/public/information/notice/find/hot',{})
};

// 考点列表
export const getExaminationPointList = (d) => {
  return instance('get','/api/public/information/ExaminationPoint/find/allTestMechanismAdopt',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};

