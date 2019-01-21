<template>
	<div id="eisu">
		<el-form ref="eisuform" :rules="rules" label-width="200px" label-position="right" class="x-form" :model="eisuform">
			<el-row>
			  	<el-col>
			  		<div class="grid-content" style="padding:10px 0;">
			  			<el-form-item label="职称" prop="title">
			  				<el-input v-model="eisuform.title"></el-input>
			  			</el-form-item>
			  			<el-form-item label="所属单位" prop="subordinateUnit">
			  				<el-input v-model="eisuform.subordinateUnit"></el-input>
			  			</el-form-item>
			  			<el-form-item label="现有证书等级" prop="existingCertificateLevel">
			  				<el-input v-model="eisuform.existingCertificateLevel"></el-input>
			  			</el-form-item>
			  			<el-form-item label="现有证书编号" prop="existingCertificateNumber">
			  				<el-input v-model="eisuform.existingCertificateNumber"></el-input>
			  			</el-form-item>
			  			<el-form-item label="现有证书上传" prop="qaimg1">
			  				<el-upload class="imgupload"
			  					:class="{hideupload:eisuform.qaimg1==1}"
			  					:limit="1"
							  	:action="imgActionUrl"
							  	list-type="picture-card"
							  	:file-list="qaimg1List"
							  	:drag="true"
							  	name="uploadImage"
                                :headers="imgHeadersToken"
							  	:before-upload="qaimgBeforeUpload"
							  	:on-preview="handlePictureCardPreview"
							  	:on-remove="qaimg1handleRemove"
							  	:on-success="qaimg1handleSuccess"
                                accept="image/jpeg,image/gif,image/png,image/bmp">
							  	<i class="el-icon-plus"></i>
							  	<div class="el-upload__tip" slot="tip">图片请小于3M</div>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
			  			</el-form-item>
			  			<el-form-item label="">
			  				<el-button size="small" @click="$router.go(-1)">返回</el-button>
			  				<el-button class="elbtn-red" style="padding:9px 30px;" size="small" type="primary" @click="formSubmit('eisuform')">保存</el-button>
			  			</el-form-item>
			  		</div>
			  	</el-col>
			</el-row>
		</el-form>
  </div>
</template>
<script>
import {getImage} from '@/service/commonData'
import {signup,signupDetail,updateDetail} from '@/service/eiData'
export default {
  	name: 'eisu',
  	data () {
  		var validateqaimg1 = (rule, value, callback) => {            
	        if (value !== 1) {
                callback(new Error('请上传图片'));
            }else {
                callback();
            }
	    };
    	return {
    		API_ROOT:API_ROOT,
            imgHeadersToken:{'X-Authorization': 'Bearer '+localStorage.getItem('token')},
    		imgActionUrl:imgActionUrl,
    		dialogVisible:false,
    		dialogImageUrl:'',
    		qaimg1List:[],
            listParam:{
                page:1,
                size:pageSize
            },
            type:this.$route.query.type,
            registrationResultAudit:0,
            cteId:this.$route.query.cteId,
    		eisuform:{
    			title:'',
    			subordinateUnit:'',
    			existingCertificateLevel:'',
    			existingCertificateNumber:'',
                attachments:{},
                pcId:localStorage.getItem('userId'),
                appraiserId:this.$route.query.appraiserId,
                qaimg1:0
    		},
            eisuform2:{
                title:'',
                subordinateUnit:'',
                existingCertificateLevel:'',
                existingCertificateNumber:'',
                attachments:{},
                pcId:localStorage.getItem('userId'),
                ptId:this.$route.query.tcId,
                qaimg1:0
            },
            eisuform3:{
                title:'',
                subordinateUnit:'',
                existingCertificateLevel:'',
                existingCertificateNumber:'',
                attachments:{},
                pcId:localStorage.getItem('userId'),
                ptId:this.$route.query.tcId,
                qaimg1:0
            },
    		rules: {
		        title: [
		            { required: true, message: '请填写职称', trigger: 'blur' }
		        ],
		        subordinateUnit: [
		            { required: true, message: '请填写所属单位', trigger: 'blur' }
		        ],
		        existingCertificateLevel: [
		            { required: true, message: '请填写现有证书等级', trigger: 'blur' }
		        ],
		        existingCertificateNumber: [
		            { required: true, message: '请填写现有证书编号', trigger: 'blur' }
		        ],
		        qaimg1: [
		            { required: true, message: '', trigger: 'change' }
		        ]
		    }
	    }
	},
	components: {
	    // side
	},
	methods: {
        qaimg1handleRemove(file, fileList) {
          	if(file.fileId){

            }else{
        	
            }
            this.eisuform.qaimg1=fileList.length;
            this.$refs['eisuform'].validateField('qaimg1')
        },
        qaimg1handleSuccess(response, file, fileList){
      	    this.eisuform.qaimg1=fileList.length;
            this.eisuform.attachments['fileName'] = response.fileName;
            this.eisuform.attachments['filePath'] = response.filePath;
            this.eisuform.attachments['fileSrcName'] = response.fileSrcName;
      	    this.$refs['eisuform'].validateField('qaimg1')
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        qaimgBeforeUpload(file){
            var isLt1M = file.size / 1024 / 1024 < 3;
            if (!isLt1M) {
                this.$message.error('证书图片大小不能超过3MB!');
            }
                return isLt1M;
        },
        formSubmit(formName) {
            this.$refs[formName].validate((valid) => {
            if(valid){
                if(this.eisuform.registrationResultAudit===0){
                    this.editSubmit()
                }else{
                    this.addSubmit()
                }
                
            }else{
                return false;
            }
            })
        },
        addSubmit(){
            if(this.eisuform.registrationResultAudit===2){
                cancelSignup(this.cteId).then((data) => {
                    delete this.eisuform.cteId;
                    this.eisuform2.title = this.eisuform.title;
                    this.eisuform2.subordinateUnit = this.eisuform.subordinateUnit;
                    this.eisuform2.existingCertificateLevel = this.eisuform.existingCertificateLevel;
                    this.eisuform2.existingCertificateNumber = this.eisuform.existingCertificateNumber;
                    this.eisuform2.attachments = this.eisuform.attachments;
                    this.eisuform2.attachments.fileId = '';
                    this.eisuform2.pcId = this.eisuform.pcId;
                    this.eisuform2.ptId = this.eisuform.ptId;
                    this.eisuform2.qaimg1 = this.eisuform.qaimg1;
                    signup(this.eisuform2).then((data) => {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.$router.push('/mysul');
                    })
                })
            }else{
                signup(this.eisuform).then((data) => {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    this.$router.push('/mysul');
                })
            }
        },
        editSubmit(){
            this.eisuform3 = {
                cteId:this.eisuform.cteId,
                title:this.eisuform.title,
                subordinateUnit:this.eisuform.subordinateUnit,
                existingCertificateLevel:this.eisuform.existingCertificateLevel,
                existingCertificateNumber:this.eisuform.existingCertificateNumber,
                attachments:this.eisuform.attachments,
                pcId:this.eisuform.pcId,
                ptId:this.eisuform.ptId,
                existingCertificate:this.eisuform.existingCertificate,
                registrationResultAudit:this.eisuform.registrationResultAudit,
                qaimg1:this.eisuform.qaimg1
            },
            updateDetail(this.eisuform3).then((data) => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                this.$router.push('/mysul');
            })
        }

    },
	mounted(){
        if(this.type != 'signup'){
            signupDetail(this.eisuform).then((data) => {
                this.eisuform = Object.assign(this.eisuform,data.data);
                if(data.data && data.data.attachments){
                    getImage(this.eisuform.attachments.imageUrl).then((data) => {
                        this.qaimg1List.push({
                            fileId:this.eisuform.attachments.fileId,
                            url:URL.createObjectURL(data),
                            fileName:this.eisuform.attachments.fileName,
                            filePath:this.eisuform.attachments.filePath,
                            fileSrcName:this.eisuform.attachments.fileSrcName
                        });
                        this.eisuform.qaimg1=this.qaimg1List.length;
                    });
                }
                if(this.eisuform.attachments==null){
                    this.eisuform.attachments = {};
                }

                
            })
        }
        
	},
	watch: {
	    
	}
}
</script>
<style scoped>

</style>
<style>

</style>