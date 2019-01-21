<template>
	<div id="su">
		<el-form ref="tsuform" :rules="rules" label-width="150px" label-position="right" class="x-form" :model="tsuform">
			<el-row>
			  	<el-col>
			  		<div class="grid-content" style="padding:10px 0;">
			  			<el-form-item label="职称" prop="coachTitle">
			  				<el-input v-model="tsuform.coachTitle"></el-input>
			  			</el-form-item>
			  			<el-form-item label="所属单位" prop="subordinateUnit">
			  				<el-input v-model="tsuform.subordinateUnit"></el-input>
			  			</el-form-item>
			  			<el-form-item label="现有证书等级" prop="existingCertificateLevel">
			  				<el-input v-model="tsuform.existingCertificateLevel"></el-input>
			  			</el-form-item>
			  			<el-form-item label="现有证书编号" prop="existingCertificateNumber">
			  				<el-input v-model="tsuform.existingCertificateNumber"></el-input>
			  			</el-form-item>
			  			<el-form-item label="现有证书上传" prop="qaimg1">
			  				<el-upload class="imgupload"
			  					:class="{hideupload:tsuform.qaimg1==1}"
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
			  				<el-button @click="$router.go(-1)">返回</el-button>
			  				<el-button type="primary" @click="formSubmit('tsuform')">保存</el-button>
			  			</el-form-item>
			  		</div>
			  	</el-col>
			</el-row>
		</el-form>
  </div>
</template>
<script>
import side from '../common/side.vue'
import {classListSignUp,getCoachSignUp,updateCoachSignUp,deleteSignUp,getImage} from '../../service/getData'
export default {
  	name: 'su',
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
    		tsuform:{
    			coachTitle:'',
    			subordinateUnit:'',
    			existingCertificateLevel:'',
    			existingCertificateNumber:'',
                attachments:{},
                pcId:localStorage.getItem('userId'),
                ptId:this.$route.query.tcId,
                qaimg1:0
    		},
            tsuform2:{
                coachTitle:'',
                subordinateUnit:'',
                existingCertificateLevel:'',
                existingCertificateNumber:'',
                attachments:{},
                pcId:localStorage.getItem('userId'),
                ptId:this.$route.query.tcId,
                qaimg1:0
            },
            tsuform3:{
                coachTitle:'',
                subordinateUnit:'',
                existingCertificateLevel:'',
                existingCertificateNumber:'',
                attachments:{},
                pcId:localStorage.getItem('userId'),
                ptId:this.$route.query.tcId,
                qaimg1:0
            },
    		rules: {
		        coachTitle: [
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
	    side
	},
	methods: {
        qaimg1handleRemove(file, fileList) {
          	if(file.fileId){

            }else{
        	
            }
            this.tsuform.qaimg1=fileList.length;
            this.$refs['tsuform'].validateField('qaimg1')
        },
        qaimg1handleSuccess(response, file, fileList){
      	    this.tsuform.qaimg1=fileList.length;
            this.tsuform.attachments['fileName'] = response.fileName;
            this.tsuform.attachments['filePath'] = response.filePath;
            this.tsuform.attachments['fileSrcName'] = response.fileSrcName;
      	    this.$refs['tsuform'].validateField('qaimg1')
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
                if(this.tsuform.registrationResultAudit===0){
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
            
            if(this.tsuform.registrationResultAudit===2){
                deleteSignUp(this.cteId).then((data) => {
                    delete this.tsuform.cteId;
                    this.tsuform2.coachTitle = this.tsuform.coachTitle;
                    this.tsuform2.subordinateUnit = this.tsuform.subordinateUnit;
                    this.tsuform2.existingCertificateLevel = this.tsuform.existingCertificateLevel;
                    this.tsuform2.existingCertificateNumber = this.tsuform.existingCertificateNumber;
                    this.tsuform2.attachments = this.tsuform.attachments;
                    this.tsuform2.attachments.fileId = '';
                    this.tsuform2.pcId = this.tsuform.pcId;
                    this.tsuform2.ptId = this.tsuform.ptId;
                    this.tsuform2.qaimg1 = this.tsuform.qaimg1;
                    classListSignUp(this.tsuform2).then((data) => {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.$router.push('/mysul');
                    })
                })
            }else{
                classListSignUp(this.tsuform).then((data) => {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    this.$router.push('/mysul');
                })
            }
        },
        editSubmit(){
            this.tsuform3 = {
                cteId:this.tsuform.cteId,
                coachTitle:this.tsuform.coachTitle,
                subordinateUnit:this.tsuform.subordinateUnit,
                existingCertificateLevel:this.tsuform.existingCertificateLevel,
                existingCertificateNumber:this.tsuform.existingCertificateNumber,
                attachments:this.tsuform.attachments,
                pcId:this.tsuform.pcId,
                ptId:this.tsuform.ptId,
                existingCertificate:this.tsuform.existingCertificate,
                registrationResultAudit:this.tsuform.registrationResultAudit,
                qaimg1:this.tsuform.qaimg1
            },
            updateCoachSignUp(this.tsuform3).then((data) => {
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
            getCoachSignUp(this.tsuform).then((data) => {
                this.tsuform = Object.assign(this.tsuform,data.data.data);
                if(data.data.data && data.data.data.attachments){
                    getImage(this.tsuform.attachments.imageUrl).then((data) => {
                        this.qaimg1List.push({
                            fileId:this.tsuform.attachments.fileId,
                            url:URL.createObjectURL(data.data),
                            fileName:this.tsuform.attachments.fileName,
                            filePath:this.tsuform.attachments.filePath,
                            fileSrcName:this.tsuform.attachments.fileSrcName
                        });
                        this.tsuform.qaimg1=this.qaimg1List.length;
                    });
                }
                if(this.tsuform.attachments==null){
                    this.tsuform.attachments = {};
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