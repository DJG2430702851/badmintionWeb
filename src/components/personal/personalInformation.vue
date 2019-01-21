<template>
	<div id="personalInformation" class="personalInformation">
		<el-form ref="piform" :rules="rules" label-width="200px" label-position="right" class="x-form" :model="piform">
			<el-row>
			  	<el-col>
			  		<div class="grid-content" style="padding:10px 0;">
			  			<el-form-item label="姓名" prop="personalName">
			  				<el-input v-model="piform.personalName"></el-input>
			  			</el-form-item>
			  			<el-form-item label="性别" prop="sex" class="xradio">
								<el-radio-group v-model="piform.sex">
							    <el-radio :label="0">男</el-radio>
							    <el-radio :label="1">女</el-radio>
							 </el-radio-group>
							</el-form-item>

			  			<el-form-item label="证件类型" prop="certificatesType">
						    <el-select v-model="piform.certificatesType" placeholder="">
						      	<el-option label="居民身份证" value="1"></el-option>
						      	<el-option label="军官证" value="2"></el-option>
						      	<el-option label="香港特区护照/身份证明" value="3"></el-option>
						      	<el-option label="澳门特区护照/身份证明" value="4"></el-option>
						      	<el-option label="外籍人员护照号" value="5"></el-option>
						    </el-select>
					  	</el-form-item>
			  			<el-form-item label="证件号码" prop="certificatesNumber">
			  				<el-input v-model="piform.certificatesNumber"></el-input>
			  			</el-form-item>
			  			<el-form-item label="邮箱" prop="email">
			  				<el-input v-model="piform.email"></el-input>
			  			</el-form-item>
			  			<el-form-item label="二寸照片" prop="img1">
							<imgUpload ref="imgCom1" imgType="single" field="atachments" delIdField="delAtachments" validateField="img1"></imgUpload>
			  			</el-form-item>
						<areaSelect label="邮寄地址" ref="areaCom"></areaSelect>
						<el-form-item label="具体地址" prop="mailingAddress">
					    	<el-input v-model="piform.mailingAddress"></el-input>
					  	</el-form-item>
					  	<el-form-item label="学历" prop="educationalInformation">
					    	<el-select v-model="piform.educationalInformation" placeholder="">
					    		<el-option label="博士" value="1"></el-option>
					    		<el-option label="硕士" value="2"></el-option>
					    		<el-option label="大学" value="3"></el-option>
					    		<el-option label="大专" value="4"></el-option>
					    		<el-option label="中专" value="5"></el-option>
						      	<el-option label="高中" value="6"></el-option>
						      	<el-option label="高职" value="7"></el-option>
						      	<el-option label="初中" value="8"></el-option>
						      	<el-option label="小学" value="9"></el-option>
						    </el-select>
					  	</el-form-item>
			  			<el-form-item label="">
			  				<el-button class="elbtn-red" style="padding:9px 30px;width:150px" @click="formSubmit('piform')">保存</el-button>
			  			</el-form-item>
			  		</div>
			  	</el-col>
			</el-row>
		</el-form>
  	</div>
</template>
<script>
import {getImage} from '@/service/commonData'
import {getPersonal,updatePersonal} from '@/service/personalData'
import { mapActions } from 'vuex'
import areaSelect from '@/components/common/areaSelect'
import imgUpload from '@/components/common/imgUpload'
export default {
  	name: 'pi',
  	data () {
  		var validateimg1 = (rule, value, callback) => {            
	        if (value !== 1) {
                callback(new Error('请上传图片'));
            }else {
                callback();
            }
	    };
	    var validateCertificatesNumber = (rule, value, callback) => {
		    if(this.piform.certificatesType==1){
		    	if(!value){
		    		callback(new Error('请输入身份证号'));
		    	}else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
	                callback(new Error('格式不正确'));
	            }else{
	            	callback();
	            }
		    }else{
		    	callback();
		    }       
	    };
    	return {
    		piform:{
    			personalName:'',
    			sex:'',
    			certificatesType:null,
    			certificatesNumber:'',
    			email:'',
    			img1:0,
    			educationalInformation:'',
    			province:'',
		        city:'',
		        district:'',
		        nativePlace:'',
		        mailingAddress:'',
		        atachments:{},
		        delAtachments:{},
		        userId:localStorage.getItem('userId')
    		},
	      	rules:{
	      		personalName:[
		        	{ required: true, message: '请输入姓名', trigger: 'blur' }
		        ],
		        sex:[
		        	{ required: true, message: '请选择性别', trigger: 'change' }
		        ],
		        certificatesType:[
		        	{ required: true, message: '请选择证件类型', trigger: 'change' }
		        ],
		        certificatesNumber:[
		        	{ required: true,validator: validateCertificatesNumber, trigger: 'blur' }
		        ],
		        email:[
		        	{ required: true, message: '请输入邮箱', trigger: 'blur' },
		        	{ pattern:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '请输入正确格式', trigger: 'blur' }
		        ],
		        img1:[
		            { required: true,validator: validateimg1, message: '', trigger: 'change' }
		        ],
		        educationalInformation:[
		        	{ required: true, message: '请输入学历', trigger: 'blur' }
		        ],
		        mailingAddress:[
		        	{ required: true, message: '请输入具体地址', trigger: 'blur' }
		        ]
	      	}
	    }
	},
	components: {
		areaSelect,imgUpload
	},
	methods: {
	  	...mapActions([
     		'fillPersonalInformation'
      	]),
      	formSubmit(formName) {
      		this.$refs[formName].validate((valid) => {
      			let areaValid = this.$refs['areaCom'].areaValidate();
      			if(valid && areaValid){
      				this.piform.nativePlace = this.piform.province+','+this.piform.city+','+this.piform.district;
      				updatePersonal(this.piform).then((data)=>{
	      				localStorage.setItem('displayName',this.piform.personalName);
	      				this.displayname.$emit('changeDisplayName',this.piform.personalName);
	      				localStorage.setItem('webUserState',1)
		      			this.$message({
				          message: '保存成功',
				          type: 'success'
				        });
	      			})
	      		}else{
	      			return false;
	      		}
      		})
      	},
      	areaSelectListen(){
	  		this.areaSelect.$off('changeArea');
  	    	this.areaSelect.$on('changeArea', (val)=>{
            	this.piform = Object.assign({},this.piform,val);
       		})
      	},
      	imgUploadListen(formName){
	      	this.imgUpload.$off('changeImgAdd');
	  	    this.imgUpload.$on('changeImgAdd', (obj)=>{
	  	    	if(obj.imgType==='single'){
	  	    		this[formName][obj.field] = Object.assign({},this[formName][obj.field],{
		                fileName:obj.response.fileName,
		                filePath:obj.response.filePath,
		                fileSrcName:obj.response.fileSrcName
		            });
	  	    	}else{
	  	    		this[formName][obj.field].push({
	  	    			uid:obj.file.uid,
	  	    			url:obj.file.url,
		                fileName:obj.response.fileName,
		                filePath:obj.response.filePath,
		                fileSrcName:obj.response.fileSrcName
		            })
	  	    	}
	  	    	this[formName][obj.validateField] = obj.fileList.length;
	  	    	this.$refs[formName].validateField(obj.validateField)
	        })
	        this.imgUpload.$off('changeImgDel');
	  	    this.imgUpload.$on('changeImgDel', (obj)=>{
	  	    	this[formName][obj.validateField] = obj.fileList.length;
	  	    	if(obj.file.fileId){
	              	if(obj.imgType==='single'){
	                	this[formName][obj.delIdField] = obj.file
	              	}else{
	                	this[formName][obj.delIdField].push(obj.file);
	              	}
	          	}else{
	              	if(this.imgType==='single'){
	                	this[formName][obj.field] = {}
	              	}else{
	                	for(let i=0;this[formName][obj.field].length;i++){
			      			if(this[formName][obj.field][i].uid===obj.file.uid){
			      				this[formName][obj.field].splice(i,1);
			      			}
			      		}
	              	}
	          	}
	  	    	this.$refs[formName].validateField(obj.validateField)
	        })
      	}
    },
	mounted(){
		// 省市区组件的监听
	  	this.areaSelectListen()

	  	// 图片监听
	  	this.imgUploadListen('piform');

	  	getPersonal(this.piform).then((data) => {
	  		data.data.sex == null ?delete data.data.sex:true;
	  		data.data.delAtachments == null ?delete data.data.delAtachments:true;
	  		this.piform = Object.assign(this.piform,data.data);
	  		if(data.data.atachments){
	  			getImage(this.piform.atachments.imageUrl).then((data) => {
	  				this.$refs['imgCom1'].imgList.push({
			  			fileId:this.piform.atachments.fileId,
			  			url:URL.createObjectURL(data),
			  			fileName:this.piform.atachments.fileName,
			  			filePath:this.piform.atachments.filePath,
			  			fileSrcName:this.piform.atachments.fileSrcName
			  		});
			  		this.piform.img1=1;
	  			})
		  		
		  	}
	  		
	  		if(this.piform.atachments==null){
	  			this.piform.atachments = {};
	  		}
	  		if(this.piform.nativePlace){
	  			var arr = this.piform.nativePlace.split(',');
		  		this.$refs['areaCom'].pform = {
		  			province:arr[0],
		  			city:arr[1],
		  			district:arr[2]
		  		}
	  		}
	  	});
	  	
	  	

	},
	watch: {
	    'piform.certificatesType':function(){
	    	if(this.piform.certificatesType!=1){
	    		this.$refs['piform'].clearValidate(['certificatesNumber']);
	    	}else{
	    		// this.$refs['piform'].validateField('certificatesNumber');
	    	}
	    }
	}
}
</script>
<style lang="less">
.personalInformation .el-upload-list__item-preview{
	display:none !important;
}
.personalInformation .el-upload-list--picture-card .el-upload-list__item-actions span+span{
	margin-left:0 !important;
}

</style>