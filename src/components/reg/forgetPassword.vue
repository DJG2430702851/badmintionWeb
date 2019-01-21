<template>
	<div class="forgetPwd">
		<top></top>
		<div class="content">
			<div class="midd clearfix">
				<div class="tagbgcom">
					<div class="dv1">
						<div class="dvi"></div>
					</div>
					<div class="dv2">忘记密码</div>
					<div class="dv3"></div>
				</div>
			</div>
			<div  class="midd2">
				<div style="margin-top:30px;">
					<el-form ref="forgetform" class="forgetform" :rules="rules" :model="forgetform" @keyup.enter.native="formSubmit('forgetform')">
						<el-form-item prop="username">
		  					<el-input class="reg-input" prefix-icon="el-icon-ba-username" v-model="forgetform.username" placeholder="请输入手机号"></el-input>
			  			</el-form-item>
			  			<el-form-item prop="code">
			  				<el-input prefix-icon="el-icon-ba-code" v-model="forgetform.code" placeholder="请输入验证码">
			  					<el-button @click="getTelCode" :disabled="hasClick" class="code" type="primary" slot="append"><span v-if="!hasClick">获取验证码</span><span v-if="hasClick">重新获取<font>{{countDown}}</font></span></el-button>
			  				</el-input>
			  			</el-form-item>
			  			<el-form-item prop="newPwd">
			  				<el-input class="reg-input" prefix-icon="el-icon-ba-password" v-model="forgetform.newPwd" type="password" placeholder="请设置密码"></el-input>
			  			</el-form-item>
			  			
			  			<el-form-item>
			  				<el-button type="primary" class="btn-submit reg-button" @click="formSubmit('forgetform')">保 存</el-button>
			  			</el-form-item>
			  			
				  	</el-form>
			  	</div>
			</div>
		</div>
  	</div>
</template>
<script>
import {forgetPwd,forgetPwdGetcode} from '@/service/userData'
import top from '@/components/common/top.vue'
export default {
  	name: 'register',
  	props: [''],
  	data () {
  		var validateusername = (rule, value, callback) => {
  			if(value==''){
  				callback(new Error('请输入手机号'));
  			}else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
                callback(new Error('手机格式不正确'));
            }else{
            	callback();
            }
	    };
	    // var validatePass = (rule, value, callback) => {            
     //        if (value === '') {
     //            callback(new Error('请再次输入密码'));
     //          } else if (value !== this.forgetform.newPwd) {
     //            callback(new Error('两次输入密码不一致'));
     //          } else {
     //            callback();
     //          }
     //  	};
    	return {
    		usernameHasRegFlag:false,
    		// dialogVisible:true,
    		hasClick:false,
    		countDown:'10',
	      	forgetform:{
	      		// webUserType:'',
	      		// userType:'web',
	      		username:'',
	      		code:'',
	      		newPwd:'',
	      		// newPwd2:''
	      	},
	      	rules:{
	      		// webUserType:[
	      		// 	{ required: true, message: '请选择用户类别', trigger: 'change' }
	      		// ],
	      		username: [
		            { required: true, validator: validateusername, trigger: 'blur' }
		        ],
		        newPwd: [
		            { required: true, message: '密码不为空', trigger: 'blur' },
		        	{ pattern:/^[a-zA-Z0-9]{6,18}$/, message: '密码需6-18位数字或字母', trigger: 'blur' }
		        ],
		        // newPwd2: [
		        //     {validator: validatePass, trigger: 'blur' }
		        // ],
		        code: [
		            { required: true, message: '验证码不为空', trigger: 'blur' }
		        ]
	      	}
	    }
	},
	components: {
	  top
	},
	methods: {
      handleClose(done) {
      	done();
      	this.$router.push('/')
      },
      getTelCode() {
      	this.$refs['forgetform'].validateField('username',(validMessage)=>{
      		if(validMessage !=''){
      			return false;
      		}
      		forgetPwdGetcode(this.forgetform.username).then((data) => {
      			if(data.code=='201'){
      				this.$message.error('今日获取验证码次数已达上限');
      				return false;
      			}
      			this.hasClick=true;
		      	var vthis = this;
		      	vthis.countDown = 60;
		      	var countDownId = setInterval(function(){
		      		vthis.countDown--;
		      		if(String(vthis.countDown).length<2){
		      			vthis.countDown = '0'+vthis.countDown;
		      		}
		      		if(vthis.countDown==='00'){
		      			vthis.hasClick=false;
		      			clearInterval(countDownId);
		      		}
		      	},1000);
      		})
      	})
      },
      formSubmit(formName) {
      	this.$refs[formName].validate((valid) => {
      		if(valid){
      			forgetPwd(this.forgetform).then((data) => {
      				if(data.code==0){
      					this.$message.success('保存成功');
			       		this.$router.push('/login');
      				}else{
      					this.$message.error(data.message);
      				}
			       	
      			})
      			
      		}
      	})
      }
    },
	mounted(){
	  	
	},
	watch:{
		
	}
}
</script>
<style lang="less">
.forgetPwd{
	font-size: 14px;
	.tagbgcom{
		.dv2{
			font-size:18px;
		}
	}
	.forgetform{
		font-size: 14px;
		width: 400px;
		margin:0 auto;
		.el-icon-ba-code{
			font-size:24px;
		}
		button.el-button.code {
			width: 112px;
		    color: #fff;
		    background-color: #f15660;
		    border-color: #f15660;
		    border-radius:0px 4px 4px 0;
		}
		.reg-form-item .el-form-item__content{
			height:20px;
			line-height:20px;
			font-size:12px;
		}
		.btn-submit{
			width: 100%;
			background-color:#d4303b;
			border-color: #d4303b;
		}
	}
}
</style>
