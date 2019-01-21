<template>
	<div id="login" class="login">
		<top></top>
		<div class="content">
			<div class="midd clearfix">
				<div class="tagbgcom">
					<div class="dv1">
						<div class="dvi"></div>
					</div>
					<div class="dv2">用户登录</div>
					<div class="dv3"></div>
				</div>
				<div class="skip">
					如果您还没有账号,请点击&nbsp;&nbsp;<router-link class="textBtn" to="/register">注册</router-link>
				</div>

			</div>
			<div  class="midd2">
				<div>
					<div class="ltdv">
						<el-radio-group class="xradio" v-model="loginType">
			  				<el-radio label="0">微信登录</el-radio>
							<el-radio label="1">账户登录</el-radio>
						</el-radio-group>
					</div>
					<img class="lline" src="/static/iconimg/l_01.png" alt="">
					<div v-if="loginType==1">
						<el-form ref="logform" class="logform" :rules="rules" :model="logform" @keyup.enter.native="formSubmit('logform')">
				  			<el-form-item prop="username">
				  				<el-input autocomplete="off" name="username" prefix-icon="el-icon-ba-username" class="log-input" v-model="logform.username" placeholder="请输入手机号"></el-input>
				  			</el-form-item>
				  			<el-form-item prop="password" class="pwd">
				  				<el-input autocomplete="off" name="pwd" prefix-icon="el-icon-ba-password" type="password" class="log-input" v-model="logform.password" placeholder="请输入密码"></el-input>
				  			</el-form-item>
				  			<p class="forget"><router-link class="textBtn" to="/forgetPassword">忘记密码</router-link></p>
				  			<el-form-item>
				  				<el-button type="primary" class="btn-submit log-button" @click="formSubmit('logform')">登 录</el-button>
				  			</el-form-item>
					  	</el-form>
					</div>
				  	<div v-else style="text-align:center;margin-bottom:75px;">
				  		<img width="147px" src="/static/img/erweima.png">
				  		<p style="margin-top:20px;">打开微信,扫描二维码</p>
				  	</div>
			  	</div>
			</div>
		</div>
  	</div>
</template>
<script>
import {login,user} from '@/service/userData'
import top from '@/components/common/top.vue'
import { mapActions } from 'vuex'
export default {
  	name: 'login',
  	props: [''],
  	data () {
    	return {
    		weixin_logflag:false,
    		loginflag:true,
    		loginType:'1',
	      	logform:{
	      		username:'',
	      		password:''
	      	},
	      	rules:{
	      		username:[
		        	{ required: true, message: '请输入手机号', trigger: 'blur' },
		        	{ pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: '手机格式不正确', trigger: 'blur' }
		        ],
		        password:[
		        	{ required: true, message: '请输入密码', trigger: 'blur' },
		        	{ pattern:/^[a-zA-Z0-9]{6,18}$/, message: '密码格式6-18位数字或字母', trigger: 'blur' }
		        ]
	      	}
	    }
	},
	components: {
	  top//,bottom
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
      			login(this.logform).then((data) => {
      				this.login(true);
      				localStorage.setItem('token',data.token);
      				user(this.logform.username).then((data) => {
      					localStorage.setItem('username',data.data.username)
      					localStorage.setItem('displayName',data.data.displayName)
					    localStorage.setItem('userId',data.data.userId)
					    localStorage.setItem('webUserType',data.data.webUserType)
					    localStorage.setItem('webUserState',data.data.webUserState)
					    if(localStorage.getItem('webUserState')==1){
					    	this.$message.success('登录成功')
					    	// this.$message({
					    	// 	type:'error',
					     //      	message: '登录成功',
					     //      	duration:0
					     //    });
					    	this.$router.push('/')
					    }else{
					    	this.$alert('2s后自动前往个人中心完善信息。', '登录成功', {
					            confirmButtonText: '确定',
					            confirmButtonClass:'xalert-btnConfirm',
					            callback: action => {
						            if(localStorage.getItem('webUserType')==1){
								        vthis.$router.push('/mi')
								    }else{
								        vthis.$router.push('/pi')
								    }
						        }
					        })
					        setTimeout(function(){
				        		$('.xalert-btnConfirm').click();
				        	},2000)
					    }
      				})
      				
      			}).catch((error) => {
      				if(error.response.status==401){
      					this.$message.error('用户名或密码不正确!');
      				}else if(error.response.status==500){
      					this.$message.error('该用户不存在!');
      				}
      				
      			})
		        
      			
      		}else{
      			return false;
      		}
      	})
      },
      weixinLogin(){
      	var APPID = 'wx6ce56f461f926a7d';
      	var REDIRECT_URI = encodeURIComponent('http://127.0.0.1:8080');
      	var SCOPE = 'snsapi_login'; 
      	window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid='+APPID+'&redirect_uri='+REDIRECT_URI+'&response_type=code&scope='+SCOPE+'&state=ABCD1234#wechat_redirect'
      }
    },
	mounted(){
	  	
	}
}
</script>
<style lang="less">
.login{
	.tagbgcom{
		.dv2{
			font-size:18px;
		}
	}
	.logform{
		font-size: 14px;
		width: 400px;
		margin:0 auto;
		.pwd{
			margin-bottom: 15px;
		}
		.forget{
			text-align: right;
			margin-bottom: 25px;
			a{
				color:#f15660;
			}
		}
		.btn-submit{
			width: 100%;
			background-color:#d4303b;
			border-color: #d4303b;
		}
	}
}
</style>