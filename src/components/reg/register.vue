<template>
	<div id="register" class="register">
		<top></top>
		<div class="content">
			<div class="midd clearfix">
				<div class="tagbgcom">
					<div class="dv1">
						<div class="dvi"></div>
					</div>
					<div class="dv2">用户注册</div>
					<div class="dv3"></div>
				</div>
				<div class="skip">
					如果您已有账号,请点击&nbsp;&nbsp;<router-link class="textBtn" to="/login">登录</router-link>
				</div>

			</div>
			<div  class="midd2">
				<div>
					<div class="ltdv">
						<el-radio-group class="xradio" v-model="regform.webUserType">
			  				<el-radio label="0">个人</el-radio>
							<el-radio label="1" style="margin-left:95px;">机构</el-radio>
						</el-radio-group>
					</div>
					<img class="lline" src="/static/iconimg/l_01.png" alt="">
					<el-form ref="regform" class="regform" :rules="rules" :model="regform" @keyup.enter.native="formSubmit('regform')">
						<el-form-item prop="username">
		  					<el-input class="reg-input" prefix-icon="el-icon-ba-username" v-model="regform.username" placeholder="请输入手机号"></el-input>
			  			</el-form-item>
			  			<el-form-item prop="code">
			  				<el-input prefix-icon="el-icon-ba-code" v-model="regform.code" placeholder="请输入短信验证码">
			  					<el-button @click="getTelCode" :disabled="hasClick" class="code" type="primary" slot="append"><span v-if="!hasClick">获取验证码</span><span v-if="hasClick">重新获取<font>{{countDown}}</font></span></el-button>
			  				</el-input>
			  			</el-form-item>
			  			<el-form-item prop="userPwd">
			  				<el-input class="reg-input" prefix-icon="el-icon-ba-password" v-model="regform.userPwd" type="password" placeholder="请设置密码 6-18个数字、字母或字符"></el-input>
			  			</el-form-item>
			  			
			  			<el-form-item>
			  				<el-button type="primary" class="btn-submit reg-button" @click="formSubmit('regform')">注 册</el-button>
			  			</el-form-item>
			  			<el-form-item class="reg-form-item agreement">
			  				点击注册，表示您同意羽协 <a @click="dialogVisible=true">《服务协议及隐私声明》</a>
			  			</el-form-item>
				  	</el-form>
			  	</div>
			</div>
		</div>
		<el-dialog
		  	class="reg-dialog"
			:visible.sync="dialogVisible"
			width="80%"
			:before-close="handleClose">
			<span slot="title" class="el-dialog__title">服务协议</span>
			<el-scrollbar style="height:400px;">
				<div class="agreementContent">
				  	<span><b>一、羽毛球运动水平等级测试服务平台网上报名系统（以下简称服务平台）的所有权归中国羽毛球协会所有，报考人员使用服务平台进行网上报名，视为报考人员同意服务平台所有服务条款</b><br>
					<b>二、报考人员责任</b><br>
					1．保证所提供相关证明材料和提交的报名信息完整、准确、有效。<br>
					2．保证不利用本平台从事违反法律、法规和政策规章的活动。<br>
					3．保证不进行针对本平台的任何恶意行为，对于破坏本平台的恶意行为，将依法追究其相应法律责任。<br>
					4. 承诺已认真阅读本服务协议，并点击“我接受”选项之后，表示已与我协会方(中国羽毛球协会，以下简称中羽协)自愿达成本协议，并完全接受协议各条款的约束。<br>
					5. 报考人员承诺将仔细阅读本平台上指导报名和考试的有关通知、政策、制度、流程及公告等内容作为本服务使用协议的附属条款加以遵守，并严格按照其要求进行操作。<br>
					<b>三、报考人员隐私保护</b><br>
					1．中羽协承诺尊重和保护报考人员个人隐私，不对社会公众公开其个人信息资料。但此承诺在下列情况下自动失效：<br>
					（1）报考人员姓名、性别、等级信息、成绩信息除外，其本人包括其授权人或法定监护人要求中羽协公开这些信息，并采用书面形式提出上述要求。<br>
					（2）在符合国家政策和法律的情况下，拥有合法调查权的国家机关索取考生个人信息。<br>
					（3）按照有关规定公布违纪违规考生的相关信息。<br>
					（4）非中羽协过失，因报考人员自身操作原因或不可抗力的作用所导致的个人信息泄漏。<br>
					2．中羽协系统维护、组织考试、成绩存档等内部管理工作需要，在相应工作范围内使用并公开考生个人信息料不受本协义的约束。<br>
					3．在考试制度和考试业务允许范围内，报考人员有查阅和修改其个人信息的权利。<br>
					4．如果报考人员提供的资料不真实、不准确，中羽协有权中止报考人员使用本系统服务的权利。<br>
					<b>四、关于考试费用支付</b><br>
					1．用户完全接受报考通知上所列出的相关考试费用。<br>
					2．报考人员同意并接受以下支付方式及责任分担：<br>
					（1）根据服务平台设置，统一进行测试费用网上支付方式。 <br>
					（2）如报考人员需要，测试机构应出具收据或发票。<br>
					（3）电子银行网上消费支付结算按考生开户银行的网上银行服务协议的有关条款进行。我方只提供相应的链接服务，如付费交易过程中出现错误由报考生与开户银行共同解决，中羽协不承担责任。<br>
					<b>五、关于服务条款的修改</b><br>
					1、我方有权随时修改系统的服务条款和服务内容。<br>
					2、系统服务条款及服务内容一旦发生变化，中羽协将会在网页页面提示修改内容。如果考生不接受修改内容，则即时取消考生本网站使用服务资格。考生要继续使用相关服务需要两方面的确认：<br>
					（1）首先确认系统服务条款及其变动。<br>
					（2）同意接受所有的服务条款限制。<br>
					<b>六、关于考生密码和安全性</b><br>
					1．禁止使用他人身份登录系统享受系统提供的服务。<br>
					2．考生有妥善保管其登录密码的义务，因考生对自己的密码安全保管不善所造成的损失，由其本人负全部责任。<br>
					3．考生如发现任何程序问题或安全漏洞情况，请立即通知我方。<br>
					4．考生用于银行支付的密码系由银行提供，应仅属考生本人知晓，中羽协无权获知，亦不对其银行密码安全承担任何责任。<br>
					<b>七、关于结束服务</b><br>
					1．我方有权随时中断服务，我方行使中断服务的权利不需对考生或第三方负责。<br>
					2．考生若反对任何服务条款的建议或对后来的条款修改有异议，或对我方网络系统服务不满，仅享有以下的权利：<br>
					（1）不再使用我方网络系统提供的服务。<br>
					（2）通知我方停止该考生的服务。我方不对考生自行终止结束服务的选择所产生的后果承担任何责任。<br>
					3．对违反本协议以及本协议附属条款的考生，我方有权利终止对其服务。<br>
					<b>八、关于信息发布</b><br>
					我方将通过网上公告形式向考生发布提供权威资讯，并将提前告知服务条款的修改、服务变更或其它重要事项。<br>
					<b>九、法律 </b><br>
					网上报考及查询等服务条款均要遵守国家的法律、法规，考生和我方一致同意服从有管辖权法院管辖。若我方部分服务条款与法律、法规相抵触，并不影响其他条款的法律效力。<br>
					</span>
				</div>
			</el-scrollbar>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="$router.push('/')">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible = false">同意协议并继续</el-button>
			</span>
		</el-dialog>
  	</div>
</template>
<script>
import {register,login,getcode,user} from '@/service/userData'
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
            }else if(this.usernameHasRegFlag){
                callback(new Error('手机号已注册'));
            }else{
            	callback();
            }
	    };
    	return {
    		usernameHasRegFlag:false,
    		dialogVisible:true,
    		hasClick:false,
    		countDown:'10',
    		registerflag:true,
	      	regform:{
	      		webUserType:'0',
	      		userType:'web',
	      		username:'',
	      		code:'',
	      		userPwd:''
	      	},
	      	loginform:{
	      		username:'',
	      		password:''
	      	},
	      	rules:{
	      		webUserType:[
	      			{ required: true, message: '请选择用户类别', trigger: 'change' }
	      		],
	      		username: [
		            { required: true, validator: validateusername, trigger: 'blur' }
		        ],
		        userPwd: [
		            { required: true, message: '密码不为空', trigger: 'blur' },
		        	{ pattern:/^[a-zA-Z0-9]{6,18}$/, message: '密码需6-18位数字或字母', trigger: 'blur' }
		        ],
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
      	this.$refs['regform'].validateField('username',(validMessage)=>{
      		if(validMessage !=''){
      			return false;
      		}
      		getcode(this.regform.username).then((data) => {
      			if(data.code=='201'){
      				this.$message.error('今日获取验证码次数已达上限');
      				return false;
      			}
      			if(data.code=='208'){
      				this.$message.error(data.message);
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
      	var vthis = this;
      	this.$refs[formName].validate((valid) => {
      		if(valid){
      			register(this.regform).then((data) => {
      				if(data.code=='1000153'){
      					this.usernameHasRegFlag = true;
      					this.$refs['regform'].validateField('username',(validMessage)=>{
      						if(validMessage !=''){
				      			return false;
				      		}
      					})
      				}
			       	if(data.code=='0'){
			       		this.loginform.username = this.regform.username;
				       	this.loginform.password = this.regform.userPwd;
			       		login(this.loginform).then((data) => {
			       			if(true){
			       				localStorage.setItem('token',data.token);
			       				user(this.loginform.username).then((data) => {
			       					localStorage.setItem('username',data.data.username)
      								localStorage.setItem('displayName',data.data.displayName)
							        localStorage.setItem('userId',data.data.userId)
							        localStorage.setItem('webUserType',data.data.webUserType)
							        localStorage.setItem('webUserState',data.data.webUserState)
				       				this.$alert('2s后自动前往个人中心完善信息。', '注册成功', {
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
			       				})

			       			}
			       		})
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
.register{
	font-size: 14px;
	.regform{
		font-size: 14px;
		width: 400px;
		margin:0 auto;
		.el-icon-ba-code{
			font-size:24px;
		}
		button.el-button.code {
			width: 112px;
		    color: #fff;
		    background-color: #ff6969;
		    border-color: #ff6969;
		    border-radius:0px 4px 4px 0;
		    padding: 13px 20px;
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
		.agreement{
			text-align: right;
			a{
				color:#ffa575;
			}
		}
	}
	.reg-dialog{
		padding: 0 10px;

		.el-dialog{
			max-width:768px;
			.el-dialog__header{
				padding:15px 20px;
				background-color:#F3F3F3;
				.el-dialog__title{
					color:#111111;
					font-weight:bold;
				}
			}
			.el-dialog__body{
				padding: 0 10px;
				.agreementContent{
					padding:0 20px;
					line-height: 26px;
				    text-align: justify;
				    color: #444;
				}
			}
			.el-dialog__footer{
				border-top:1px solid #CCC;
			}
		}
		.el-scrollbar__wrap{
			overflow-x: hidden;
		}
	}

}
</style>
