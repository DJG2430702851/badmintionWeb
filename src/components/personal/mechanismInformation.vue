<template>
	<div id="mechanismInformation" class="mechanismInformation">
		<el-form ref="miform" :rules="rules" label-width="200px" label-position="right" class="x-form" :model="miform">
			<el-row>
			  	<el-col>
			  		<div class="grid-content" style="padding:10px 0;">
			  			<el-form-item label="机构名称" prop="mechanismFullname">
			  				<el-input v-model="miform.mechanismFullname"></el-input>
			  			</el-form-item>
			  			<el-form-item label="机构代码" prop="businessLicense">
			  				<el-input v-model="miform.businessLicense"></el-input>
			  			</el-form-item>
						<areaSelect label="机构地址" ref="areaCom"></areaSelect>
						<el-form-item label="具体地址" prop="detailedAddress">
					    	<el-input v-model="miform.detailedAddress"></el-input>
					  	</el-form-item>
					  	<el-form-item label="法人姓名" prop="legalPerson">
					    	<el-input v-model="miform.legalPerson"></el-input>
					  	</el-form-item>
					  	<el-form-item label="法人身份证号" prop="legalPersonIdnumber">
					    	<el-input v-model="miform.legalPersonIdnumber"></el-input>
					  	</el-form-item>
					  	<el-form-item label="法人联系电话" prop="fixedTelephone">
					    	<el-input v-model="miform.fixedTelephone"></el-input>
					  	</el-form-item>
					  	<el-form-item label="营业执照扫描件" prop="img1">
							<imgUpload ref="imgCom1" imgType="single" field="atachmentBusinessLicenseKeyDto" delIdField="delAtachmentBusinessLicenseKeyDto" validateField="img1"></imgUpload>
			  			</el-form-item>
			  			<el-form-item label="机构实景" prop="img2">
			  				<imgUpload ref="imgCom2" imgType="multiple" field="atachmentsInstitutionalDtos" delIdField="delAtachmentsInstitutionalDtos" validateField="img2" :validateFieldLen="3"></imgUpload>
			  			</el-form-item>
			  			<el-form-item label="">
			  				<el-button class="elbtn-red" style="padding:9px 30px;width:150px" @click="formSubmit('miform')">保存</el-button>
			  			</el-form-item>
			  		</div>
			  	</el-col>
			</el-row>
		</el-form>
  	</div>
</template>
<script>
import {getImage} from '@/service/commonData'
import {getMechanism,updateMechanism} from '@/service/personalData'
import areaSelect from '@/components/common/areaSelect'
import imgUpload from '@/components/common/imgUpload'
import { mapActions } from 'vuex'
export default {
  	name: 'mi',
  	props: [''],
  	data () {
  		var validateImg1 = (rule, value, callback) => {            
	        if (value !== 1) {
                callback(new Error('请上传图片'));
            }else {
                callback();
            }
	    };
	    var validateimg2 = (rule, value, callback) => {            
	        if (value > 3) {
                callback(new Error('图片请少于三张'));
            }else if(value < 1){
                callback(new Error('图片至少一张'));
            }else{
            	callback();
            }
	    };
    	return {
    		miform:{
    			mechanismFullname:'',
    			businessLicense:'',
    			legalPerson:'',
    			legalPersonIdnumber:'',
    			fixedTelephone:'',
    			province:'',
		        city:'',
		        district:'',
		        officeAddress:'',
		        detailedAddress:'',
		        atachmentBusinessLicenseKeyDto:{},
		        atachmentsInstitutionalDtos:[],
		        delAtachmentBusinessLicenseKeyDto:{},
		        delAtachmentsInstitutionalDtos:[],
		        img1:0,
	          	img2:0,
	          	userId:localStorage.getItem('userId')
    		},
	      	rules:{
	      		mechanismFullname:[
		        	{ required: true, message: '请输入机构', trigger: 'blur' }
		        ],
		        businessLicense:[
		        	{ required: true, message: '请输入机构代码', trigger: 'blur' }
		        ],
		        legalPerson:[
		        	{ required: true, message: '请输入法人姓名', trigger: 'blur' }
		        ],
		        legalPersonIdnumber:[
		        	{ required: true, message: '请输入法人身份证号', trigger: 'blur' },
		        	{ pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确格式', trigger: 'blur' }
		        ],
		        fixedTelephone:[
		        	{ required: true, message: '请输入法人联系电话', trigger: 'blur' }
		        ],
		        detailedAddress:[
		        	{ required: true, message: '请输入具体地址', trigger: 'blur' }
		        ],
		        img1:[
		            { required: true,validator: validateImg1, message: '请上传图片', trigger: 'change' }
		        ],
		        img2:[
		            { required: true,validator: validateimg2, message: '', trigger: 'change' }
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
	      			this.miform.officeAddress = this.miform.province+','+this.miform.city+','+this.miform.district;
	      			updateMechanism(this.miform).then((data)=>{
	      				localStorage.setItem('displayName',this.miform.mechanismFullname)
	      				this.displayname.$emit('changeDisplayName',this.miform.mechanismFullname);
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
	            this.miform = Object.assign({},this.miform,val);
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
	  	this.areaSelectListen();
	  	// 图片监听
	  	this.imgUploadListen('miform');

	  	getMechanism(this.miform).then((data) => {
	  		if(data.data.officeAddress){
	  			let arr = data.data.officeAddress.split(',');
				this.$refs['areaCom'].pform = {
		  			province:arr[0],
		  			city:arr[1],
		  			district:arr[2]
		  		}
	  		}
	      	delete data.data.delAtachmentBusinessLicenseKeyDto;
	      	delete data.data.delAtachmentsInstitutionalDtos;
	  		this.miform = Object.assign(this.miform,data.data);
	  		if(this.miform.atachmentBusinessLicenseKeyDto){
	  			getImage(this.miform.atachmentBusinessLicenseKeyDto.imageUrl).then((data) => {
		  			this.$refs['imgCom1'].imgList.push({
			  			fileId:this.miform.atachmentBusinessLicenseKeyDto.fileId,
			  			url:URL.createObjectURL(data),
			  			fileName:this.miform.atachmentBusinessLicenseKeyDto.fileName,
			  			filePath:this.miform.atachmentBusinessLicenseKeyDto.filePath,
			  			fileSrcName:this.miform.atachmentBusinessLicenseKeyDto.fileSrcName
			  		});
			  		this.miform.img1=1;
			  		
		  		})
	  		}
	  		if(this.miform.atachmentsInstitutionalDtos){
	  			this.$refs['imgCom2'].imgList = this.miform.atachmentsInstitutionalDtos;
		      	for(let i=0;i<this.$refs['imgCom2'].imgList.length;i++){
	      			getImage(this.miform.atachmentsInstitutionalDtos[i].imageUrl).then((data) => {
		    			this.$set(this.$refs['imgCom2'].imgList[i], 'url', URL.createObjectURL(data))
		    		})
		      	}
		      	this.miform.img2=this.$refs['imgCom2'].imgList.length;
	  		}
	  		if(this.miform.atachmentBusinessLicenseKeyDto==null){
	  			this.miform.atachmentBusinessLicenseKeyDto = {};
	  		}
	  		this.miform.atachmentsInstitutionalDtos = [];
	  	})

	},
	watch: {
	    
	}
}
</script>
