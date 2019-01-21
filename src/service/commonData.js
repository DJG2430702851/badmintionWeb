import {instance} from './dataConfig'
import Qs from 'qs'

//新闻图片流获取接口
export const getNewsImage = (d) => {
  return instance('get','/api/public/information/news/find/image?filePath='+d,{},{
    responseType:'blob'
  })
};
//测试机构图片获取接口
export const getAnotherImage = (d) => {
  return instance('get','/api/web/find/image?filePath='+d,{},{
    responseType:'blob'
  })
};
//新闻详情文档流获取接口
export const getFile = (d) => {
  return instance('get','/api/public/information/news/find/attachment?filePath='+d,{},{headers:{'Content-Type': 'application/x-www-form-urlencoded'},responseType:'blob'
  })
};
// 获取图片接口(小杜)
export const getImage = (d) => {
  return instance('get','/api'+d,{},{
    responseType:'blob'
  })
};
// 获取图片接口(小杜)
export const getImageNoToken = (d) => {
  return instance('get','/api/public'+d,{},{
    responseType:'blob'
  })
};

// 获取某一级下的区域集合
export const getAreaList = (areaId) => {
  return instance('get','api/district/'+areaId,{})
};
