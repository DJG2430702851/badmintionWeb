<template>
	<div id="cp" class="cp">
		<el-form ref="cpform" label-width="200px" label-position="right" :rules="rules" class="x-form" :model="cpform">
			<el-row>
			  	<el-col>
			  		<div class="grid-content" style="padding:30px 0 0;">
			  			<el-form-item prop="oldPwd" label="原密码">
			  				<el-input autocomplete="off" auto-complete="off" name="changePassword1" class="reg-input" prefix-icon="el-icon-ba-password" v-model="cpform.oldPwd" type="password" placeholder="请输入原密码"></el-input>
			  			</el-form-item>
			  			<el-form-item prop="newPwd" label="密码">
			  				<el-input autocomplete="off" name="changePassword2" class="reg-input" prefix-icon="el-icon-ba-password" v-model.trim="cpform.newPwd" type="password" placeholder="请输入新密码"></el-input>
			  			</el-form-item>
			  			<el-form-item prop="confirmPassword" label="确认密码">
			  				<el-input autocomplete="off" name="changePassword3" class="reg-input" prefix-icon="el-icon-ba-password" v-model.trim="cpform.confirmPassword" type="password" placeholder="请确认新密码"></el-input>
			  			</el-form-item>
			  			<el-form-item label="">
			  				<el-button class="elbtn-red" style="padding:9px 30px;width:150px" @click="formSubmit('cpform')">保存</el-button>
			  			</el-form-item>
			  		</div>
			  	</el-col>
			</el-row>
		</el-form>
  	</div>
</template>
<script>
import {changePassword} from '@/service/userData'
export default {
  	name: 'cp',
  	props: [''],
  	data () {
  		var validatePass = (rule, value, callback) => {            
            if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.cpform.newPwd) {
                callback(new Error('两次输入密码不一致'));
              } else {
                callback();
              }
      	};
    	return {
    		cpform:{
    			userName:localStorage.getItem('username'),
    			oldPwd:'',
	      		newPwd:'',
	      		confirmPassword:''
	      	},
	      	rules:{
	      		oldPwd: [
		            { required: true, message: '密码不为空', trigger: 'blur' }
		        ],
		        newPwd: [
		            { required: true, message: '密码不为空', trigger: 'blur' },
		        	{ pattern:/^[a-zA-Z0-9]{6,18}$/, message: '密码需6-18位数字或字母', trigger: 'blur' }
		        ],
		        confirmPassword: [
		            {required: true, validator: validatePass, trigger: 'blur' }
		        ]
	      	}
	    }
	},
	// components: {
	// 	side
	// },
	methods: {
      handleClose(done) {
      	done();
        // this.$emit('dialogOperate','close');
      },
      goRegister(){
      	// this.$emit('dialogOperate','goregister');
      },
      formSubmit(formName) {
      	this.$refs[formName].validate((valid) => {
      		if(valid){
      			changePassword(this.cpform).then((data)=>{console.log(data)
      				if(data.code==0){
      					this.$message({
				          message: '修改成功,请重新登录',
				          type: 'success'
				        });
				        localStorage.removeItem('token');
					    localStorage.removeItem('userId');
					    localStorage.removeItem('username');
					    localStorage.removeItem('displayName');
					    localStorage.removeItem('webUserType');
					    localStorage.removeItem('webUserState');
					   	this.$router.push('/login');
      				}else{
      					this.$message({
				          message: '原密码不匹配',
				          type: 'error'
				        });
      				}
	      			
      			})
      			// this.$emit('dialogOperate','userLogin');
      		}else{
      			return false;
      		}

      	})
      },
    },
	mounted(){
	  	
	}
}
</script>
