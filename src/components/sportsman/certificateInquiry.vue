<template>
	<div id="ciq" class="ciq">
		<div class="title">运动员证书查询</div>
		<div class="ciqform-wrap">
			<el-form ref="ciqform" :model="ciqform" :rules="rules" class="x-form" label-width="120px" label-position="right">
				<!-- <p>填写邮寄信息</p> -->
	  			<el-form-item label="姓名" prop="applyer">
				    <el-input v-model="ciqform.applyer"></el-input>
				</el-form-item>
				<el-form-item label="证件类型" prop="certificateType">
				    <el-select v-model="ciqform.certificateType" placeholder="">
				      	<el-option label="居民身份证" value="1"></el-option>
				      	<el-option label="军官证" value="2"></el-option>
				      	<el-option label="香港特区护照/身份证明" value="3"></el-option>
				      	<el-option label="澳门特区护照/身份证明" value="4"></el-option>
				      	<el-option label="外籍人员护照号" value="5"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="证件号码" prop="certificateNumber">
				    <el-input v-model="ciqform.certificateNumber"></el-input>
				</el-form-item>
				<el-form-item label-width="0px" align="center">
				    <el-button class="elbtn-red xprimary" type="primary" @click="formSubmit('ciqform')">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
  	</div>
</template>
<script>
// import {getLogistics,postLogistics,updateLogistics} from '@/service/sportsmanData'

export default {
  	name: 'ciq',
  	data () {
  		var validateCertificatesNumber = (rule, value, callback) => {
		    if(this.ciqform.certificateType==1){
		    	if(!value){
		    		callback(new Error('请输入身份证号'));
		    	}else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
	                callback(new Error('格式不正确'));
	            }else{
	            	callback();
	            }
		    }else{
		    	if(value){
					callback();
		    	}else{
		    		callback(new Error('请输入证件号码'));
		    	}
		    }       
	    };
    	return {
    		ciqform:{
    			applyer:'',
    			certificateType:'',
    			certificateNumber:''
    		},

    		hasLogistics:'',
    		applyId:'',
    		rules: {
		        applyer: [
		            { required: true, message: '请输入姓名', trigger: 'blur' }
		        ],
		        certificateType: [
		            { required: true, message: '请选择证件类型', trigger: 'change' }
		        ],
		        certificateNumber: [
		            { required: true,validator: validateCertificatesNumber, trigger: 'blur' }
		        ]
		    }
	    }
	},
	components: {

	},
	methods: {
      formSubmit(formName){
      	this.$refs[formName].validate((valid) => {
      		if(valid){
      			this.$router.push({path:'/cv',query:this.ciqform})
      		}
      	})
      	// this.$router.push('/cv');
   //    	if(this.hasLogistics){
   //    		this.cmForm.applyId = this.applyId;
   //    		updateLogistics(this.cmForm).then((data) => {
			// 	this.$message({
		 //          message: '保存成功',
		 //          type: 'success'
		 //        });
			// })
   //    	}else{
   //    		postLogistics(this.cmForm).then((data) => {
			// 	this.$message({
		 //          message: '保存成功',
		 //          type: 'success'
		 //        });
			// })
   //    	}
      	
      }
    },
	mounted(){
		// getLogistics().then((data) => {
			// this.hasLogistics = data.data.hasLogistics;
			// if(this.hasLogistics){
			// 	Object.assign(this.cmForm,data.data.logistics);
			// }
		// })
		// certificateSearch(this.ciqform).then((data)=>{

		// })
	},
	watch: {
	    
	}
}
</script>
<style lang="less">
.ciq{
	.title{
		font-size:18px;
		text-align: center;
		font-weight:bold;
		margin:10px 0 20px;
		letter-spacing: 3px;
	}
	.ciqform-wrap{
		width: 640px;
		height:370px;
		margin: 0 auto 100px;
		padding:60px 65px;
		box-shadow: 0px 0px 4px #CCCCCC;
		.el-form-item__label{
			font-weight: normal;
			padding-right: 40px;
		}
		.el-input,.el-select{
			width: 100% !important;
		}
		.btn-submit{
			width: 150px;
			background-color:#f15660;
			border-color: #f15660;
			letter-spacing: 2px;
		}
	}
}
</style>
