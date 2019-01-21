<template>
	<div>
		<el-form ref="qaform" label-position="right" :disabled="!canEdit" :rules="rules" :model="qaform" label-width="200px" class="x-form">
  				<el-row>
				  	<el-col>
				  		<div class="grid-content" style="padding:10px 0;">
				  			<el-form-item class="qa-form-item" label="基本信息">
				  				<div v-if="hasWrite" class="icon-edit-wrap"><span v-if="!canEdit" @click="canEdit=true">编辑<i class="el-icon-edit-outline"></i></span><span v-else @click="canEdit=false">取消编辑</span></div>
				  			</el-form-item>
				  			<el-form-item label="选择身份" prop="identity">
							    <el-select class="block" v-model="qaform.identity" placeholder="">
							      	<el-option label="普通高等院校" value="普通高等院校"></el-option>
							      	<el-option label="高中" value="高中"></el-option>
							      	<el-option label="初中" value="初中"></el-option>
							      	<el-option label="小学" value="小学"></el-option>
							      	<el-option label="高职" value="高职"></el-option>
							      	<el-option label="中专" value="中专"></el-option>
							      	<el-option label="技校" value="技校"></el-option>
							      	<el-option label="体校" value="体校"></el-option>
							      	<el-option label="俱乐部" value="俱乐部"></el-option>
							      	<el-option label="公司" value="公司"></el-option>
							      	<el-option label="其他" value="其他"></el-option>
							    </el-select>
						  	</el-form-item>
						  	<!-- <el-form-item label="手机号" prop="managementTel">
						    	<el-input v-model="qaform.managementTel" :disabled="hasWrite"></el-input>
						  	</el-form-item>
						  	<el-form-item v-if="!hasWrite" label="">
						    	<el-button class="sendyzm" @click="countdown" :disabled="sendyzmFlag">{{sendyzm}}</el-button>
						  	</el-form-item>
						  	<el-form-item v-if="!hasWrite" label="验证码" prop="yzm">
						    	<el-input v-model="qaform.yzm"></el-input>
						  	</el-form-item> -->
						  	<el-form-item label="测试机构全称" prop="mechanismFullname">
						    	<el-input v-model="qaform.mechanismFullname"></el-input>
						  	</el-form-item>
						  	<el-form-item label="营业执照注册号" prop="businessLicense">
						    	<el-input v-model="qaform.businessLicense"></el-input>
						  	</el-form-item>
						  	<el-form-item label="法定代表人姓名" prop="legalPerson">
						    	<el-input v-model="qaform.legalPerson"></el-input>
						  	</el-form-item>
						  	<el-form-item label="法定代表人身份证号" prop="legalPersonIdnumber">
						    	<el-input v-model="qaform.legalPersonIdnumber"></el-input>
						  	</el-form-item>
						  	<el-form-item label="法人证书" prop="img1">
				  				<!-- <el-upload class="imgupload"
				  					:class="{hideupload:qaform.img1==1}"
				  					:limit="1"
								  	:action="imgActionUrl"
								  	list-type="picture-card"
								  	:file-list="img1List"
								  	:drag="true"
								  	name="uploadImage"
								  	:headers="imgHeadersToken"
								  	:before-upload="qaimgBeforeUpload"
								  	:on-preview="handlePictureCardPreview"
								  	:on-remove="img1handleRemove"
								  	:on-success="img1handleSuccess">
								  	<i class="el-icon-plus"></i>
								  	<div class="el-upload__tip" slot="tip">图片请小于1M</div>
								</el-upload> -->
								<imgUpload ref="imgCom1" imgType="single" field="atachmentLegalCertificateKeyDto" delIdField="delAtachmentLegalCertificateKeyDto" validateField="img1"></imgUpload>
				  			</el-form-item>
							<areaSelect label="办公地址"  ref="areaCom"></areaSelect>
							<el-form-item label="具体地址" prop="detailedAddress">
						    	<el-input v-model="qaform.detailedAddress" placeholder="例如：x路xx小区xx号"></el-input>
						  	</el-form-item>
						  	<el-form-item label="固定电话" prop="fixedTelephone">
						    	<el-input v-model="qaform.fixedTelephone" placeholder="例如：021-56155647"></el-input>
						  	</el-form-item>
						  	<el-form-item label="营业执照扫描件" prop="img2">
				  				<!-- <el-upload class="imgupload"
				  					:class="{hideupload:qaform.img2==1}"
				  					:limit="1"
								  	:action="imgActionUrl"
								  	list-type="picture-card"
								  	name="uploadImage"
								  	:headers="imgHeadersToken"
								  	:before-upload="qaimgBeforeUpload"
								  	:file-list="img2List"
								  	:drag="true"
								  	:on-preview="handlePictureCardPreview"
								  	:on-remove="img2handleRemove"
								  	:on-success="img2handleSuccess">
								  	<i class="el-icon-plus"></i>
								  	<div class="el-upload__tip" slot="tip">图片请小于1M</div>
								</el-upload> -->
								<imgUpload ref="imgCom2" imgType="single" field="atachmentBusinessLicenseKeyDto" delIdField="delAtachmentBusinessLicenseKeyDto" validateField="img2"></imgUpload>
				  			</el-form-item>
				  			<el-form-item>
							    <el-button v-if="hasWrite" class="el-button elbtn-red" style="padding:9px 30px;width:150px;" type="primary" @click="formSubmit('qaform')">保存</el-button>
							    <el-button v-else class="el-button elbtn-red" style="padding:9px 30px;width:150px;" type="primary" @click="formSubmit('qaform')">下一步</el-button>
							</el-form-item>
				  		</div>
				  	</el-col>
				</el-row>
		</el-form>
  	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import {getImage} from '@/service/commonData'
import {getMechanism} from '@/service/personalData'
import {qastep1Update} from '@/service/testmData'
import imgUpload from '@/components/common/imgUpload'
import areaSelect from '@/components/common/areaSelect'
export default {
  	name: 'qa',
  	props: ['hasWrite','rdata','hasAdd'],
  	data () {
  		var validateimg1 = (rule, value, callback) => {            
	        if (value !== 1) {
                callback(new Error('请上传图片'));
            }else {
                callback();
            }
	    };
	    var validateimg2 = (rule, value, callback) => {            
	        if (value !== 1) {
                callback(new Error('请上传图片'));
            }else {
                callback();
            }
	    };
    	return {
    		canEdit:true,
    		sendyzm:'发送验证码',
	        sendyzmFlag:false,
	      	qaform: {
	          	identity: '',
	          	// managementTel:'',
	          	// yzm:'',
	          	mechanismFullname:'',
	          	businessLicense:'',
	          	legalPerson:'',
	          	legalPersonIdnumber:'',
	          	fixedTelephone:'',
	          	img1:0,
	          	img2:0,
		        province:'',
		        city:'',
		        district:'',
		        officeAddress:'',
		        detailedAddress:'',
		        atachmentLegalCertificateKeyDto:{},
		        atachmentBusinessLicenseKeyDto:{},
		        businessLicenseKey:'',
		        legalCertificateKey:''
	        },
	        d:{
	        	userId:localStorage.getItem('userId')
	        },
	        rules: {
		        identity: [
		            { required: true, message: '请选择身份', trigger: 'change' }
		        ],
		        name: [
		            { required: true, message: '请输入值', trigger: 'blur' }
		        ],
		        // managementTel: [
		        //     { required: true, pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
		        // ],
		        // yzm: [
		        //     { required: true, message: '请输入验证码', trigger: 'blur' },
		        //     { len: 6, message: '请输入6位数字', trigger: 'blur' }
		        // ],
		        mechanismFullname: [
		            { required: true, message: '请输入测试机构全称', trigger: 'blur' }
		        ],
		        businessLicense: [
		            { required: true, message: '请输入营业执照注册号', trigger: 'blur' }
		        ],
		        legalPerson: [
		            { required: true, message: '请输入法定代表人姓名', trigger: 'blur' }
		        ],
		        legalPersonIdnumber: [
		            { required: true, pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入法定代表人身份证号', trigger: 'blur' }
		        ],
		        fixedTelephone:[
		            { required: true,  message: '请输入固定电话例如：021-56155647', trigger: 'blur' }// pattern:/\d{3}-\d{8}|\d{4}-\d{7}/,
		        ],
		        
		        detailedAddress:[
		        	{ required: true, message: '请输入具体地址', trigger: 'blur' }
		        ],
		        img1:[
		            { required: true,validator: validateimg1, message: '请上传图片', trigger: 'change' }
		        ],
		        img2:[
		            { required: true,validator: validateimg2, message: '请上传图片', trigger: 'change' }
		        ]
		    }
	    }
	},
	components: {
		areaSelect,imgUpload
	},
	methods: {
	  	...mapActions([
        	'qaEdit'
      	]),
      	countdown(){
	      	var self = this;
	      	this.$refs['qaform'].validateField('managementTel',function(errorMessage){
	      		if(!errorMessage){
	      			self.sendyzmFlag = true;
			      	self.sendyzm = 59;
			      	var sid = setInterval(function(){
			      		self.sendyzm--;
			      		if(self.sendyzm==0){
			      			self.sendyzmFlag = false;
			      			self.sendyzm = '发送验证码';
			      			clearInterval(sid);
			      		}
			      	},1000)
	      		}
	      	})
      	},
      	formSubmit(formName){
	      	this.$refs[formName].validate((valid) => {
	      		let areaValid = this.$refs['areaCom'].areaValidate();
	      		if(valid && areaValid){
	      			this.qaform.officeAddress = this.qaform.province+','+this.qaform.city+','+this.qaform.district;
	      			qastep1Update(this.qaform).then((data) => {
						this.submitCallback();
					})
	      		}else{
	      			return false;
	      		}
	      	})
      	},
      	submitCallback(){
	      	if(this.hasWrite){
	      		this.$message({
		          message: '保存成功',
		          type: 'success'
		        });
		        this.canEdit = false;
	      	}else{
	      		this.$emit('submitSuccess', true)
	      	}
      	},
      	getDetail(){
      		getMechanism(this.d).then((data)=>{
		      	this.qaform = Object.assign(this.qaform, data.data);
		      	var arr = this.rdata.officeAddress.split(',');
				this.$refs['areaCom'].pform = {
		  			province:arr[0],
		  			city:arr[1],
		  			district:arr[2]
		  		}
		  		getImage(this.qaform.atachmentLegalCertificateKeyDto.imageUrl).then((data) => {
			  		this.img1List.push({
			  			fileId:this.qaform.atachmentLegalCertificateKeyDto.fileId,
			  			url:URL.createObjectURL(data),
			  			fileName:this.qaform.atachmentLegalCertificateKeyDto.fileName,
			  			filePath:this.qaform.atachmentLegalCertificateKeyDto.filePath,
			  			fileSrcName:this.qaform.atachmentLegalCertificateKeyDto.fileSrcName
			  		});
			  		this.qaform.img1=this.img1List.length;
			  	})
			  	getImage(this.qaform.atachmentBusinessLicenseKeyDto.imageUrl).then((data) => {
			  		this.img2List.push({
			  			fileId:this.qaform.atachmentBusinessLicenseKeyDto.fileId,
			  			url:URL.createObjectURL(data),
			  			fileName:this.qaform.atachmentBusinessLicenseKeyDto.fileName,
			  			filePath:this.qaform.atachmentBusinessLicenseKeyDto.filePath,
			  			fileSrcName:this.qaform.atachmentBusinessLicenseKeyDto.fileSrcName
			  		});
			  		this.qaform.img2=this.img2List.length;
			  	})
		  	})
      	},
      	areaSelectListen(){
		  	this.areaSelect.$off('changeArea');
	  	    this.areaSelect.$on('changeArea', (val)=>{
	            this.qaform = Object.assign({},this.qaform,val);
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
	  	this.imgUploadListen('qaform');

		if(this.hasWrite){
	  		this.canEdit = false;
	  		this.getDetail();
	  	}else{
	  		getMechanism(this.d).then((data)=>{
	  			let cdata = data.data;
	  			let arr = cdata.officeAddress.split(',');
	  			this.$refs['areaCom'].pform = {
		  			province:arr[0],
		  			city:arr[1],
		  			district:arr[2]
		  		}
	  			this.qaform = Object.assign({},this.qaform,{
	  				mechanismFullname:cdata.mechanismFullname,
	  				legalPerson:cdata.legalPerson,
	  				legalPersonIdnumber:cdata.legalPersonIdnumber,
	  				businessLicense:cdata.businessLicense,
	  				detailedAddress:cdata.detailedAddress,
	  				atachmentBusinessLicenseKeyDto:cdata.atachmentBusinessLicenseKeyDto,
	  				atachmentLegalCertificateKeyDto:cdata.atachmentLegalCertificateKeyDto,
	  				businessLicenseKey:cdata.businessLicenseKey,
	  				legalCertificateKey:cdata.legalCertificateKey,
	  				identity:cdata.identity,
	  				fixedTelephone:cdata.fixedTelephone
	  			});
	  			
	  			if(cdata.atachmentLegalCertificateKeyDto){
	  				getImage(cdata.atachmentLegalCertificateKeyDto.imageUrl).then((data) => {
		  				this.$refs['imgCom1'].imgList.push({
		  					fileId:cdata.atachmentLegalCertificateKeyDto.fileId,
				  			url:URL.createObjectURL(data),
				  			fileName:cdata.atachmentLegalCertificateKeyDto.fileName,
				  			filePath:cdata.atachmentLegalCertificateKeyDto.filePath,
				  			fileSrcName:cdata.atachmentLegalCertificateKeyDto.fileSrcName
				  		});
				  		this.qaform.img1=this.$refs['imgCom1'].imgList.length;
			  		})
	  			}else{
	  				this.qaform.atachmentLegalCertificateKeyDto = {};
	  			}
	  			if(cdata.atachmentBusinessLicenseKeyDto){
	  				getImage(cdata.atachmentBusinessLicenseKeyDto.imageUrl).then((data) => {
			  			this.$refs['imgCom2'].imgList.push({
			  				fileId:cdata.atachmentBusinessLicenseKeyDto.fileId,
				  			url:URL.createObjectURL(data),
				  			fileName:cdata.atachmentBusinessLicenseKeyDto.fileName,
				  			filePath:cdata.atachmentBusinessLicenseKeyDto.filePath,
				  			fileSrcName:cdata.atachmentBusinessLicenseKeyDto.fileSrcName
				  		});
				  		this.qaform.img2=this.$refs['imgCom2'].imgList.length;
				  	})
	  			}else{
	  				this.qaform.atachmentBusinessLicenseKeyDto = {};
	  			}
	  		});
	  	}
	  	// var vthis = this;
	  // 	window.onresize = function(){
	  // 		if(document.body.clientWidth<768){
			// 	vthis.labelPosition = 'top';
			// }else{
			// 	vthis.labelPosition = 'right';
			// }
	  // 	}
	},
	watch: {
	    
	}
}
</script>
<style scoped>
.sendyzm{
	width: 120px;
}
</style>
