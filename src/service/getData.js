import Vue from 'vue'
import router from '../router'
import Qs from 'qs'
// import router from './router'
// import ElementUI from 'element-ui'
// Vue.use(ElementUI);
var instance = function(type,url,data,otherParams){
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
        }).then(function(res){resolve(res)}).catch(function(err){
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
  return instance('get','/api/users/'+d,{})
};
//注册获取手机验证码
export const getcode = (d) => {
  return instance('post','/api/public/web/smsSend/'+d+'/reg',JSON.stringify(d))
};

/*个人中心*/
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

// 资格申请
export const qaGetDetail = (d) => {
  return instance('get','/api/organization/qualificationApply/applyDetail',{})
};
export const qastep1Submit = (d) => {
  return instance('post','/api/organization/qualificationApply/basicInformation',JSON.stringify(d))
};
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
// 运动员证书查看
export const certificateViewList = () => {
  return instance('get','/api/paperWork/paperWorkManagement',{})
};
export const getLogistics = () => {
  return instance('get','/api/paperWork/paperWorkManagement/logistics',{})
};
export const postLogistics = (d) => {
  return instance('post','/api/paperWork/paperWorkManagement/logistics?applyId=',JSON.stringify(d))
};
export const updateLogistics = (d) => {
  return instance('put','/api/paperWork/paperWorkManagement/logistics?applyId='+d.applyId,JSON.stringify(d))
};
/* 培训机构 */
//办班申请提交审核
export const trainingClassApply = (d) => {
  return instance('post','/api/organization/trainingClass/apply',JSON.stringify(d))
};
//培训班列表
export const trainingClassList = (d) => {
  return instance('get','/api/organization/trainingClass/mechanism/'+d.tmId+'?size='+d.size+'&page='+d.page,{})
};
//批量删除培训班
export const trainingClassDelete = (d) => {
  return instance('delete','/api/organization/trainingClass',JSON.stringify(d))
};
//编辑培训班
export const updateTrainingClass = (d) => {
  return instance('put','/api/organization/trainingClass/'+d.tcId,JSON.stringify(d))
};
//获取培训班信息
export const getTrainingClass = (d) => {
  return instance('get','/api/organization/trainingClass/one/'+d,{})
};
//获取培训班详情所有信息
// export const getTrainingClassAll = (d) => {
//   return instance('get','/api/organization/trainingClass/detail/all/',d)
// };
//获取培训班详情所有信息
export const classDetailAll = (d) => {
  return instance('get','/api/organization/trainingClass/detail/all/'+d,{},{headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
};
//培训班新增培训通知
export const addNoticeManagement = (d) => {
  return instance('post','/api/notice/noticeManagement',Qs.stringify(d),{headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
};
//培训班编辑培训通知
export const editNoticeManagement = (d) => {
  return instance('put','/api/notice/noticeManagement',JSON.stringify(d));
};
//下载课程execl
export const courseExportTemplate = (d) => {
  return instance('get','/api/organization/trainingClass/course/exportTemplate',{},{
    responseType:'blob'
  })
};
//上传课程
export const courseImport = (d) => {
  return instance('post','/api/organization/trainingClass/course/import',d,{headers:{'Content-Type': 'multipart/form-data'}})
};
//查询课程所有内容                                                      
export const courseFind = (d) => {
  return instance('get','/api/organization/trainingClass/course/find',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};
//单量课程新增                                                     
export const courseAdd = (d) => {
  return instance('post','/api/organization/trainingClass/course/add?tcId='+d.tcId,JSON.stringify(d))
};
//单量课程编辑                                                     
export const courseEdit = (d) => {
  return instance('put','/api/organization/trainingClass/course/edit',JSON.stringify(d))
};
//单量课程删除                                                    
export const courseDelete = (d) => {
  return instance('delete','/api/organization/trainingClass/course/delete/'+d.tcId,{})
};
//报名审核
export const coachFindAll = (d) => {
  return instance('get','/api/organization/trainingClass/coach/find/all',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};
//报名审核详情
export const coachDetailFind = (d) => {
  return instance('get','/api/organization/trainingClass/coach/find/'+d.pcId+'?tcId='+d.tcId,{})
};
//单个报名审核
export const coachExamine = (d) => {
  return instance('put','/api/web/Examine/'+d.cteId,JSON.stringify(d))
};
//批量报名审核
export const coachMultipleExamine = (d) => {
  return instance('put','/api/web/coachTrainingEnrolmentList/'+d.tcId,JSON.stringify(d))
};








// 所有课程成绩
export const scoreFindAll = (d) => {
  return instance('get','/api/organization/trainingClass/score/find',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};
// 下载成绩导入模板execl
export const scoreExportTemplate = (d) => {
  return instance('get','/api/organization/trainingClass/score/exportTemplate?tcId='+d.tcId,{},{
    responseType:'blob'
  })
};
// 成绩导入
export const scoreImport = (d) => {
  return instance('post','/api/organization/trainingClass/score/import?tcId='+d.tcId,d.formdata,{headers:{'Content-Type': 'multipart/form-data'}})
};
// 成绩导入单量课程新增
export const scoreAdd = (d) => {
  return instance('post','/api/organization/trainingClass/score/add?tcId='+d.tcId,JSON.stringify(d.rdata))
};
// 成绩导入单量课程编辑
export const scoreEdit = (d) => {
  return instance('put','/api/organization/trainingClass/score/edit?tcId='+d.tcId,JSON.stringify(d.rdata))
};
// 成绩单量课程删除
export const scoreDelete = (d) => {
  return instance('delete','/api/organization/trainingClass/score/delete/'+d.tcId,JSON.stringify(d.rdata))
};
// 上传办班总结
export const uploadSummary = (d) => {
  return instance('post','/api/organization/trainingClass/uploadSummary',d,{headers:{'Content-Type': 'multipart/form-data'}})
};
// 下载办班总结
export const summaryExportTemplate = (d) => {
  return instance('get','/api/organization/trainingClass/summary/exportTemplate?tcId='+d,{},{
    responseType:'blob'
  })
};
// 删除办班总结
export const deleteSummary = (d) => {
  return instance('delete','/api/organization/trainingClass/deleteSummary?tcId='+d.tcId,{})
};



//教练员 培训班报名
export const classListTCL = (d) => {
  return instance('get','/api/organization/trainingClass/coach',{},{params:d,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
};
//教练员 培训班报名 详情内容
export const classListXQ = (d) => {
  return instance('get','/api/organization/trainingClass/detail/some/'+d,{})
};
//教练员 培训班报名 报名
export const classListSignUp = (d) => {
  return instance('post','/api/web/coachTrainingEnrolment',JSON.stringify(d))
};
//教练员 培训班 取消报名
export const deleteSignUp = (d) => {
  return instance('delete','/api/web/delCoachTrainingEnrolment/'+d.cteId+'/'+d.tcId,{})
};
//教练员 获取培训班报名信息
export const getCoachSignUp = (d) => {
  return instance('get','/api/web/coachTrainingEnrolment/'+d.pcId+'/'+d.ptId,{})
};
//教练员 编辑培训班报名信息
export const updateCoachSignUp = (d) => {
  return instance('put','/api/web/coachTrainingEnrolment/'+d.cteId,JSON.stringify(d))
};

//教练员 培训班报名 查看成绩
export const resultsCK = (d) => {
  return instance('get','',JSON.stringify(d))
};
// 教练员报名通过的培训班
export const coachClassList = (d) => {
  return instance('get','/api/organization/trainingClass/applyed/'+d.pcId,{})
};
// 教练员培训班某人的培训成绩
export const coachScoreFind = (d) => {
  return instance('get','/api/organization/trainingClass/coach/score/find/'+d.tcId+'/'+d.pcId,{})
};
// 获取图片接口(小杜)
export const getImage = (d) => {
  return instance('get','/api'+d,{},{
    responseType:'blob'
  })
};

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



/*首页接口*/
// 首页banner列表
export const getBannerList = () => {
  return instance('get','/api/public/web/banner',{})
};
// 获取图片接口(小杜)
export const getImageNoToken = (d) => {
  return instance('get','/api/public'+d,{},{
    responseType:'blob'
  })
};
// 首页新闻
export const getIndexNewsList = () => {
  return instance('get','/api/public/information/news/find/hot',{})
};
// 首页公告
export const getIndexNoticeList = () => {
  return instance('get','/api/public/information/notice/find/hot',{})
};
//图片流获取接口
export const getNewsImage = (d) => {
  return instance('get','/api/public/information/news/find/image?filePath='+d,{},{
    responseType:'blob'
  })
};
//新闻详情文档流获取接口
export const getFile = (d) => {
  return instance('get','/api/public/information/news/find/attachment?filePath='+d,{},{headers:{'Content-Type': 'application/x-www-form-urlencoded'},responseType:'blob'
  })
};
