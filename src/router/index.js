import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import index2 from '@/components/index2'
import newsindex from '@/components/newsindex'
import epindex from '@/components/epindex'


Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      	path: '/',
      	navhidden:true,
      	// navshow:true,
      	component: index,
      	meta: {
      		title:'首页'
      	},
      	children: [
		    {
		        path: '/',
		        name: 'indexcontent',
		        component: resolve => require(['@/components/indexcontent.vue'], resolve)
		    }
      	]
    },
    {
    	path: '',
    	// navshow:true,
      	name: 'news',
      	meta: {
      		title:'新闻公告'
      	},
      	redirect:'/nel',
      	component: newsindex,
      	children: [
		    {
		      	path: '/nel',
		      	// title:'协会新闻',
		     	name: 'nel',
		     	meta:{
		     		title:'协会新闻'
		     	},
		      	component: resolve => require(['@/components/news/newslist.vue'], resolve)
		    },
		    {
		      	path: '/ned/:id',
		      	name: 'ned',
		      	// navhidden:true,
		      	meta:{
		     		title:'新闻详情'
		     	},
		      	component: resolve => require(['@/components/news/newsdetail.vue'], resolve)
		    },
		    {
		      	path: '/nol',
		     	name: 'nol',
		     	meta:{
		     		title:'协会公告'
		     	},
		      	component: resolve => require(['@/components/news/noticelist.vue'], resolve)
		    },
		    {
		      	path: '/nod/:id',
		      	name: 'nod',
		      	navhidden:true,
		      	meta:{
		     		title:'公告详情'
		     	},
		      	component: resolve => require(['@/components/news/noticedetail.vue'], resolve)
		    }
		]
    },
    {
    	path: '',
    	navshow:true,
      	name: 'testingMechanism',
      	meta: {
      		title:'测试机构',
      		requireLogin: true,
      		userType:1
      	},
      	component: index2,
      	redirect:'/qa',
      	children: [
      		{
		      	path: '/qa',
		      	name: 'qa',
		      	meta: {
		      		title:'资格申请',
		      		level2:true,
			      	requireLogin: true,
			      	requireFillInformation: 1,
      				userType:1
			      // requireFillPersonalInformation:true
			    },
		      	component: resolve => require(['@/components/testingMechanism/qualificationApplication.vue'], resolve)
		    },
		    {
		      	path: '/ta',
		      	name: 'ta',
		      	meta: {
		      		title:'测试申请',
		      		level2:true,
		      		requireLogin: true,
		      		requireFillInformation: 1,
		      		userType:1
		      	},
		      	component: resolve => require(['@/components/testingMechanism/testApplication.vue'], resolve)
		    },
		    {
		      	path: '/sf',
		      	name: 'sf',
		      	meta: {
		      		title:'成绩反馈',
		      		level2:true,
		      		requireLogin: true,
		      		requireFillInformation: 1,
		      		userType:1
		      	},
		      	component: resolve => require(['@/components/testingMechanism/scoreFeedback.vue'], resolve)
		    }
      	]
    },
    {
    	path: '',
    	navshow:true,
    	name:'sportsman',
      	meta: {
      		title:'运动员入口',
      		requireLogin: true,
      		userType:0
      	},
      	redirect:'/ga',
      	component: index2,
      	children: [
      		{
		      	path: '/ga',
		      	name: 'ga',
		      	meta: {
		      		title:'等级申请',
		      		level2:true,
		      		requireLogin: true,
			      	requireFillInformation: 1,
			        keepAlive: true,
			        requireLogin: true,
      			    userType:0
			    },
		      	component: resolve => require(['@/components/sportsman/gradeApplication.vue'], resolve)
		    },
      		{
		      	path: '/mat',
		      	name: 'mat',
		      	meta: {
		      		title:'赛事申请',
		      		level2:true,
		      		requireLogin: true,
			      	requireFillInformation: 1,
			        keepAlive: true,
			        requireLogin: true,
      			    userType:0
			    },
		      	component: resolve => require(['@/components/sportsman/matchApplication.vue'], resolve)
		    },
		    {
		      	path: '/cv',
		      	name: 'cv',
		      	meta: {
		      		title:'证书查看',
		      		requireLogin: true,
			      	requireFillInformation: 1,
		      		userType:0
		      	},
		      	component: resolve => require(['@/components/sportsman/certificateView.vue'], resolve)
		    },
		    {
		      	path: '/ra',
		      	name: 'ra',
		      	navhidden:true,
		      	meta: {
		      		title:'报名协议',
		      		requireLogin: true,
		      		requireFillInformation: 1,
		      		userType:0
		      	},
		      	component: resolve => require(['@/components/sportsman/registrationAgreement.vue'], resolve)
		    },
		    {
		      	path: '/ciq',
		      	name: 'ciq',
		      	navhidden:true,
		      	meta: {
		      		title:'证书查询',
		      		level2:true,
		      		requireLogin: true,
			      	requireFillInformation: 1,
		      		userType:0
		      	},
		      	component: resolve => require(['@/components/sportsman/certificateInquiry.vue'], resolve)
		    }
      	]
    },
    {
    	path: '',
    	navshow:true,
    	name:'eir',
      	meta: {
      		title:'考评员入口',
      		requireLogin: true,
      		userType:0
      	},
      	redirect:'/eil',
      	component: index2,
      	children: [
      		{
		      	path: '/eisu',
		      	name: 'eisu',
		      	meta: {
		      		title:'考评员报名',
			        requireLogin: true,
			      	requireFillInformation: 1,
      			    userType:0
			    },
		      	component: resolve => require(['@/components/examiner/signup.vue'], resolve)
		    },
      		{
		      	path: '/eil',
		      	name: 'eilist',
		      	meta: {
		      		title:'考评员报名',
		      		level2:true,
			        requireLogin: true,
			      	requireFillInformation: 1,
      			    userType:0
			    },
		      	component: resolve => require(['@/components/examiner/eiList.vue'], resolve)
		    },
		    {
		      	path: '/eid/:id',
		      	// name: 'eidetail',
		      	meta: {
		      		title:'考评员报名',
			        requireLogin: true,
			      	requireFillInformation: 1,
      			    userType:0
			    },
			    redirect:'/eitn',
		      	component: resolve => require(['@/components/examiner/eiDetail.vue'], resolve),
		      	children: [
      				{
      					path: '/eitn',
				      	name: 'eitn',
				      	meta: {
				      		title:'培训通知',
					        requireLogin: true,
					      	requireFillInformation: 1,
		      			    userType:0
					    },
					    component: resolve => require(['@/components/examiner/eiDetailManage/trainingNotice.vue'], resolve),
      				},
      				{
      					path: '/eibi',
				      	name: 'eibi',
				      	meta: {
				      		title:'基本信息',
					        requireLogin: true,
					      	requireFillInformation: 1,
		      			    userType:0
					    },
					    component: resolve => require(['@/components/examiner/eiDetailManage/basicInformation.vue'], resolve),
      				},
      				{
      					path: '/eicc',
				      	name: 'eicc',
				      	meta: {
				      		title:'课程内容',
					        requireLogin: true,
					      	requireFillInformation: 1,
		      			    userType:0
					    },
					    component: resolve => require(['@/components/examiner/eiDetailManage/courseContent.vue'], resolve),
      				}
      			]
		    },
		    {
		      	path: '/eicsl',
		      	name: 'eicsl',
		      	meta: {
		      		title:'查看成绩',
		      		level2:true,
			        requireLogin: true,
			      	requireFillInformation: 1,
      			    userType:0
			    },
		      	component: resolve => require(['@/components/examiner/checkScoreList.vue'], resolve)
		    },
		    {
		      	path: '/eicsd',
		      	name: 'eicsd',
		      	meta: {
		      		title:'成绩详情',
			        requireLogin: true,
			      	requireFillInformation: 1,
      			    userType:0
			    },
		      	component: resolve => require(['@/components/examiner/checkScoreDetail.vue'], resolve)
		    }
      	]
    },
    {
    	path: '',
      	name: 'personal',
      	navhidden:true,
      	// title:'个人中心',
      	// redirect:'/pi'
      	meta: {
		    title:'个人中心'
		},
		redirect:localStorage.getItem('webUserType')=='1'?'/mi':'/pi',
      	component: index2,
      	children: [
      		{
		      	path: '/pi',
		      	name: 'pi',
		      	meta: {
		      		title:'个人信息',
			      	requireLogin: true,
			      	userType:0
			    },
		      	component: resolve => require(['@/components/personal/personalInformation.vue'], resolve)
		    },
		    {
		      	path: '/mi',
		      	name: 'mi',
		      	meta: {
		      		title:'机构信息',
			      	requireLogin: true,
			      	userType:1
			    },
		      	component: resolve => require(['@/components/personal/mechanismInformation.vue'], resolve)
		    },
		    {
		      	path: '/mysul',
		      	name: 'mysul',
		      	meta: {
		      		title:'我的报名',
			      	requireLogin: true
			    },
		      	component: resolve => require(['@/components/personal/mySignupList.vue'], resolve)
		      // 	redirect:'/mysul',
		      // 	children: [
		      // 		{
				    //   	path: '/mysul',
				    //   	name: 'mysul',
				    //   	title:'我的报名列表',
				    //   	meta: {
					   //    requireLogin: true
					   //  },
				    //   	component: resolve => require(['@/components/personal/mySignup/mySignupList.vue'], resolve)
				    // },
				    // {
				    //   	path: '/mysud/:id',
				    //   	name: 'mysud',
				    //   	title:'我的报名详情',
				    //   	meta: {
					   //    requireLogin: true
					   //  },
				    //   	component: resolve => require(['@/components/personal/mySignup/mySignupDetail.vue'], resolve)
				    // }
		      // 	]
		    },
		    {
		      	path: '/myta',
		      	name: 'myta',
		      	meta: {
		      		title:'测试申请',
			      	requireLogin: true,
			      	userType:1
			    },
		      	component: resolve => require(['@/components/personal/myTestApplication.vue'], resolve)
		    },
		    {
		      	path: '/myma',
		      	name: 'myma',
		      	meta: {
		      		title:'赛事申请',
			      	requireLogin: true,
			      	userType:0

			    },
		      	component: resolve => require(['@/components/personal/myMatchApplication.vue'], resolve)
		    },
		    {
		      	path: '/myga',
		      	name: 'myga',
		      	meta: {
		      		title:'等级申请',
			      	requireLogin: true,
			      	userType:0
			    },
		      	component: resolve => require(['@/components/personal/myGradeApplication.vue'], resolve)
		    },
		    {
		      	path: '/myce',
		      	name: 'myce',
		      	meta: {
		      		title:'我的证书',
			      	requireLogin: true,
			      	userType:0
			    },
		      	component: resolve => require(['@/components/personal/myCertificate/myCertificate.vue'], resolve),
		      	redirect:'/ceun',
		      	children: [
      				{
      					path: '/ceun',
				      	name: 'ceun',
				      	meta: {
				      		title:'未领证书',
					        requireLogin: true,
			      			userType:0
					    },
					    component: resolve => require(['@/components/personal/myCertificate/unCollected.vue'], resolve),
      				},
      				{
      					path: '/ceha',
				      	name: 'ceha',
				      	meta: {
				      		title:'已领证书',
					        requireLogin: true,
			      			userType:0
					    },
					    component: resolve => require(['@/components/personal/myCertificate/haveReceived.vue'], resolve),
      				}
      			]
		    },
		    {
		      	path: '/cp',
		      	name: 'cp',
		      	meta: {
		      		title:'修改密码',
			      	requireLogin: true,
			      	userType:0
			    },
		      	component: resolve => require(['@/components/personal/changePassword.vue'], resolve)
		    }
		    
      	]
    },
    {
      	path: '/ep',
      	name: 'ep',
      	title:'考点',
      	component: epindex,
      	children: [
      		{
		      	path: '/eplist',
		      	name: 'eplist',
		      	meta: {
		      		title:'考点分布',
			      	requireLogin: true
			    },
		      	component: resolve => require(['@/components/examinationPoint/eplist.vue'], resolve)
		    }
		]
    },
    {
      	path: '/login',
      	name: 'login',
      	title:'登录',
      	component: resolve => require(['@/components/reg/login.vue'], resolve)
    },
    {
      	path: '/register',
      	name: 'register',
      	title:'注册',
      	component: resolve => require(['@/components/reg/register.vue'], resolve)
    },
    {
      	path: '/forgetPassword',
      	name: 'forgetPassword',
      	title:'忘记密码',
      	component: resolve => require(['@/components/reg/forgetPassword.vue'], resolve)
    }
  ]
})
