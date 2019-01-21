<template>
	<div id="weixinLoading" class="login">
		
  	</div>
</template>
<script>
import top from './common/top.vue'
import { mapActions } from 'vuex'
export default {
  	name: 'login',
  	props: [''],
  	data () {
    	return {
    		weixin_logflag:false,
    		loginflag:true,
	      	logform:{
	      		username:'',
	      		code:'',
	      		password:''
	      	},
	      	rules:{
	      		username:[
		        	{ required: true, message: '请输入用户名', trigger: 'blur' }
		        ],
		        password:[
		        	{ required: true, message: '请输入密码', trigger: 'blur' }
		        ]
	      	}
	    }
	},
	components: {
	  top
	},
	methods: {
	  ...mapActions([
     	'login' 
      ]),
      handleClose(done) {
      	done();
      },
      goRegister(){

      },
      formSubmit(formName) {
      	var vthis = this;
      	this.$refs[formName].validate((valid) => {
      		if(valid){
      			this.login(true);
      			// this.$message({
		       //    message: '登录成功,2s后前往个人中心完善信息',
		       //    type: 'success',
		       //    onClose:function(){
		       //    	// vthis.$emit('dialogOperate','userLogin');
		       //    	vthis.$router.push('/pi');
		       //    }
		       //  });
		       
		        this.$alert('2s后自动前往个人中心完善信息。', '登录成功', {
		            confirmButtonText: '确定',
		            confirmButtonClass:'xalert-btnConfirm',
		            callback: action => {
			            vthis.$router.push('/pi');
			        }
		        })
		        setTimeout(function(){
		        	$('.xalert-btnConfirm').click();
		        	// vthis.$router.push('/pi');
		        },2000)
      			
      		}else{
      			return false;
      		}
      	})
      },
      weixinLogin(){
      	var APPID = 'wx6ce56f461f926a7d';
      	var REDIRECT_URI = encodeURI('http://118.24.35.80/#/news/newslist');
      	var SCOPE = 'snsapi_login'; 
      	window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid='+APPID+'&redirect_uri='+REDIRECT_URI+'&response_type=code&scope='+SCOPE+'&state=ABCD1234#wechat_redirect'
      }
    },
	mounted(){
	  	
	}
}
</script>
<style scoped>
.btn-submit{
	width: 100%;
}
.grid-content{
	padding-top:50px;
}
.log-title{
	margin-bottom: 30px;
	font-size: 18px;
	display: inline-block;
	text-align: center;
	width: 49%;
	cursor:pointer;
}
.log-title{
	border-bottom: 1px solid #f4f4f4;
	padding-bottom: 10px;
	position: relative;
}
.log-title.active{
	color: #034b8b;
	font-weight: bold;
}
.log-tab-line{
	
	color: #f4f4f4;
	position: absolute;
	right: 0;
	width: 1px;
	height: 16px;

	/*font-size: 2rem;*/
}
.log-button{
	font-size:1.8rem;
	background-color: rgb(210, 48, 35);
	border-color: rgb(210, 48, 35);
}

/*.log-input input{
		height: 50px;
		line-height:50px;
	}
	.log-button{
		font-size:1.8rem;
		background-color: rgb(210, 48, 35);
		border-color: rgb(210, 48, 35);
	}
	.el-input__icon{
		line-height:50px;
	}*/
</style>
<style lang="less">
.login {
	.header-bline{
		height:10px;
		width: 100%;
		box-shadow:0px 3px 5px #CCCCCC;
	}
	.weixin-login{
		cursor:pointer;
		float: left;
		color:#5aa700;
		.el-icon-ba-weixin{
			vertical-align: middle;
			font-size:24px;
			position: relative;
			top:-3px;
		}
	}
	.go-register{
		float: right;
		margin-top: 2px;
		.line{
			position:relative;
			top:-1px;
			color:#CCCCCC
		}
	}
	.log-form-item .el-form-item__content{
		height:20px;
		line-height:20px;
		font-size:1.2rem;
	}
	
}


</style>