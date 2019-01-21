<template>
	<div class="side">
		<div class="pcside">
			<div class="tagbg">
				<div class="dv1">
					<div class="dvi"></div>
				</div>
				<div class="dv2">{{navtype}}</div>
				<div class="dv3"></div>
			</div>
			<div class="menuwrap">
				<ul>
					<li v-for="(item,index) in sidenav" @click="goUrl(item)" :class="{active:index==cindex}">{{item.name}}</li>
				</ul>
			</div>
			<img class="contactus" src="/static/images/n_02.jpg" alt="">
		</div>
		<!-- <div class="ipadmenu">
			<div class=""></div>	
		</div> -->
		<!-- <ipadmenu></ipadmenu> -->
	</div>
	<!-- <div class="col-md-3 col-lg-2 x-list-left padding-20 clearfix">
		<div class="x-arrow-wrap">
			<h5 class="xp-title">{{title}}</h5><div class="x-arrow"></div>
		</div>
		<div class="x-menu2 col-sm-12 col-xs-12">
			<ul class="clearfix" style="overflow:hidden;">
				<li v-for="(item,index) in sidenav" @click="goUrl(item)" :class="{active:index==cindex}" class="col-sm-3 col-md-12 col-xs-6"><a>{{item.name}}</a></li>
			</ul>
		</div>
	</div> -->
	<!-- <div class=""></div> -->
</template>
<script>
// import {menumap as a ,menumap2 as b} from '@/components/common/menudata.vue';
export default {
  	name: 'side',
  	props: ['title'],
  	components:{
  		// ipadmenu
  	},
  	data () {
    	return {
    		cindex:'',
    		sidenav:[],
    		navtype:'',
    		side:{
    			tm:[
	    			{name:'资格申请',path:'/qa'},
	    			{name:'测试申请',path:'/ta'},
	    			{name:'成绩反馈',path:'/sf'}
    			],
	    		'新闻公告':[
	    			{name:'协会新闻',path:'/nel',childrenPath:['/ned']},
	    			{name:'协会公告',path:'/nol',childrenPath:['/nod']}
	    		],
	    		'测试机构':[
	    			{name:'资格申请',path:'/qa'},
	    			{name:'测试申请',path:'/ta'},
	    			{name:'成绩反馈',path:'/sf'}
	    		],
	    		'运动员':[//运动员左侧
	    			{name:'等级申请',path:'/ga'},
	    			{name:'赛事申请',path:'/mat'},
	    			{name:'证书查询',path:'/ciq',childrenPath:['/ciq','/cv']}
	    		],
	    		'考评员':[
	    			{name:'考评员报名',path:'/eil',childrenPath:['/tcl','/eid','/eitn','/eibi','/eicc','/eisu']},
	    			{name:'查看成绩',path:'/eicsl',childrenPath:['/eicsl','/eicsd']}
	    		],
	    		coa:[
	    			{name:'培训班报名',path:'/cll'},
	    			{name:'查看成绩',path:'/csl',childrenPath:['/csd']}
	    		],
	    		'个人中心':[
	    			{name:'基本信息',path:'/mi'},
	    			{name:'测试申请',path:'/myta'},
	    			{name:'修改密码',path:'/cp'}
	    		]
	    	},
	    	obj:{
	    		'/nel/ned/nol/nod':'新闻公告',
	    		'/qa/ta/sf':'测试机构',
		  		'/mat/ga/ciq/cv/ra':'运动员',
		  		'/eil/eid/eitn/eibi/eicc/eicsl/eicsd/eisu':'考评员',
		  		'/pi/mi/mysul/myta/myga/myma/myce/cp/ceun/ceha':'个人中心'
		  	}
	    }

	},
	methods: {
      getActive(){
      	for(let i =0;i<this.sidenav.length;i++){
      		if(this.$route.path===this.sidenav[i].path){
      			this.cindex=i;
      		}
      		if(this.sidenav[i].childrenPath && this.sidenav[i].childrenPath.includes('/'+this.$route.path.split('/')[1])){
      			this.cindex=i;
      		}
      	}
      },
      goUrl(item){
      	if(item.name=='基本信息'){
      		if(localStorage.getItem('webUserType')==0){
      			this.$router.push('/pi');
      		}else if(localStorage.getItem('webUserType')==1){
      			this.$router.push('/mi');
      		}
      	}else{
      		this.$router.push(item.path);
      	}
      	this.getActive();
      	
      },
      sideInit(){
      	if(localStorage.getItem('webUserType')==0){
	  		this.side['个人中心'] = [
	  			{name:'基本信息',path:'/pi'},
    			{name:'我的报名',path:'/mysul',childrenPath:['/mysud']},
	    		{name:'等级申请',path:'/myga'},
    			{name:'赛事申请',path:'/myma'},
	    		{name:'我的证书',path:'/ceun',childrenPath:['/ceha']},
    			{name:'修改密码',path:'/cp'}
	  		]
	  	}
	  	

	  	for(var k in this.obj){
	  		if(k.includes(this.$route.path.split('/')[1])){
	  			this.navtype = this.obj[k];
	  			this.sidenav = this.side[this.navtype];
	  			this.getActive();
	  			break;
	  		}
	  		
	  	}
      }
    },
	mounted(){
	  	this.sideInit();
	  	// console.log(this.$router.options.routes)
	},
	
	watch: {
	    $route(to, from) {
	    	this.sideInit();
	      	// this.getActive();
	    }
	}
}
</script>
<style lang="less">
@colorRed:#e60010;
.side{
	margin-top:40px;
	float: left;
	width: 230px;
	display: inline-block;
	.tagbg{
		font-size: 0;
		height: 51px;
		line-height: 51px;
		>div{
			height: inherit;
			float: left;
			// display: inline-block;
			font-size: 20px;
		}
		.dv1{
			width:23px;
			background-color: @colorRed;
			position: relative;
			.dvi{
				position:absolute;
				top: 51px;
				left: 0;
				border-top:11px solid @colorRed;
				border-right:11px solid @colorRed;
				border-left:11px solid transparent;
				border-bottom:11px solid transparent;
			}
		}
		.dv2{
			width: 190px;
			color:#FFFFFF;
			background-color: #e6000f;
			text-align: center;
		}
		.dv3{
			border-left:17px solid @colorRed;
			border-top: 25px solid transparent;
			border-bottom: 25px solid transparent;
			border-right:0;
		}
	}
	.menuwrap{
		font-size:16px;
		padding-left: 27px;
		padding-right:13px;
		ul{
			li{
				height:44px;
				line-height: 44px;
				text-align: center;
				color:#111111;
				border-bottom:1px solid #CCCCCC;
				cursor:pointer;
			}
			li.active{
				border-bottom:2px solid @colorRed;
				color:@colorRed;
			}
		}
	}
	.contactus{
		margin-top:56px;
		width:100%;
	}
}

</style>