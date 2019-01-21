<template>
	<div>
		<el-form ref="qaform" :disabled="!canEdit" :rules="rules" :model="qaform" label-width="200px" class="x-form">
			<el-row>
			  	<el-col>
			  		<div class="grid-content" style="padding:10px 0;">
			  			<el-form-item class="qa-form-item" label="卫生环境">
			  				<div v-if="hasWrite" class="icon-edit-wrap"><span v-if="!canEdit" @click="canEdit=true">编辑<i class="el-icon-edit-outline"></i></span><span v-else @click="canEdit=false">取消编辑</span></div>
			  			</el-form-item>
			  			<el-form-item label="卫生合格证明" prop="img1">
                  <imgUpload ref="imgCom1" imgType="multiple" field="hygienicCertificatePaths" delIdField="hygienicCertificateIds" tipText="添加图片1张,图片请小于1M" validateField="img1"></imgUpload>
							</el-upload>
			  			</el-form-item>
			  			<el-form-item label="环境照片" prop="img2">
                  <imgUpload ref="imgCom2" imgType="multiple" field="environmentPaths" delIdField="environmentIds" tipText="场地、室内、场馆外部环境照片（图片至少2张至多10张）" validateField="img2" :validateFieldLen="10"></imgUpload>
			  			</el-form-item>
						<el-form-item>
						    <el-button v-if="hasWrite" class="el-button elbtn-red" style="padding:9px 30px;width:150px;" type="primary" @click="editSubmit('qaform')">保存</el-button>
						    <el-button v-else class="el-button elbtn-red" style="padding:9px 30px;width:150px;" type="primary" @click="formSubmit('qaform')">完成</el-button>
						</el-form-item>
			  		</div>
			  	</el-col>
			</el-row>
		</el-form>
  	</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import {removeImage,getAnotherImage} from '@/service/commonData'
import {qastep5Submit,qastep5Update} from '@/service/testmData'
import imgUpload from '@/components/common/imgUpload'
export default {
  	name: 'qa',
  	props: ['hasWrite','rdata','tmId','hasAdd'],
  	data () {
  		var validateimg1 = (rule, value, callback) => {            
	        if (value !== 1) {
                callback(new Error('请上传图片'));
            }else {
                callback();
            }
	    };
	    var validateimg2 = (rule, value, callback) => {            
	        if (value < 2) {
                callback(new Error('图片至少2张'));
            }else {
                callback();
            }
	    };
    	return {
    		  canEdit:true,
	      	qaform: {
	          	img1:0,
	          	img2:0,
	          	hygienicCertificateIds:[],
	          	hygienicCertificatePaths:[],
	          	environmentIds:[],
	          	environmentPaths:[]
	        },
	        rules: {
		        img1:[
		            { required: true,validator: validateimg1, message: '请上传图片', trigger: 'change' }
		        ],
		        img2:[
		            { required: true,validator: validateimg2, message: '图片至少2张至多10张', trigger: 'change' }
		        ]
		    }
	    }
	},
	components: {
	  imgUpload
	},
	methods: {
	  ...mapActions([
        'qaEdit'
      ]),
      addSubmit(formName) {
        // this.submitCallback();
      	this.$refs[formName].validate((valid) => {
      		if(valid){
      			qastep5Submit(this.qaform).then((data) => {
      				this.submitCallback();
      			})
      		}else{
      			return false;
      		}
      	})
      },
      editSubmit(formName){
      	this.$refs[formName].validate((valid) => {
      		if(valid){
      			qastep5Update(this.qaform).then((data) => {
      				this.submitCallback();
      			})
      		}else{
      			return false;
      		}
      	})
      },
      formSubmit(formName){
        if(this.hasAdd===0){
          this.addSubmit(formName);
        }else if(this.hasAdd===1){
          this.editSubmit(formName);
        }else{
          this.addSubmit(formName);
        }
      },
      submitCallback(){
        if(this.hasWrite){
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.canEdit = false;
        }else{
           this.$message({
            message: '保存成功,请等待审核',
            type: 'success'
          });
          this.$emit('submitSuccess', true)
        }
      },
      getDetail(){
      	this.qaform = Object.assign(this.qaform, this.rdata);
        this.$refs['imgCom1'].imgList = this.qaform.hygienicCertificatePaths?this.qaform.hygienicCertificatePaths:[];
        this.$refs['imgCom2'].imgList = this.qaform.environmentPaths?this.qaform.environmentPaths:[];
        for(let i=0;i<this.$refs['imgCom1'].imgList.length;i++){
          getAnotherImage(this.$refs['imgCom1'].imgList[i].filePath).then((data) => {
            this.$set(this.$refs['imgCom1'].imgList[i], 'url', URL.createObjectURL(data))
          })
        }
        for(let i=0;i<this.$refs['imgCom2'].imgList.length;i++){
          getAnotherImage(this.$refs['imgCom2'].imgList[i].filePath).then((data) => {
            this.$set(this.$refs['imgCom2'].imgList[i], 'url', URL.createObjectURL(data))
          })
        }
    		this.qaform.img1=this.$refs['imgCom1'].imgList.length;
    		this.qaform.img2=this.$refs['imgCom2'].imgList.length;
        this.qaform.hygienicCertificatePaths = [];
        this.qaform.environmentPaths = [];
        this.qaform.hygienicEnvironmentDto = this.rdata.hygienicEnvironmentDto;
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
	  	// if(this.hasWrite){
    //     // this.canEdit = false;
    //     if(this.hasAdd===0){
    //         Object.assign(this.qaform,{tmId:this.rdata.tmId});
    //     }else if(this.hasAdd===1){
    //         this.getDetail();
    //     }
    //   }else{
    //     this.qaform = Object.assign({tmId:this.tmId}, this.qaform);
    //   }
    // 图片监听
    this.imgUploadListen('qaform');

    if(this.hasWrite){
      this.canEdit = false;
    }
    this.getDetail()
	},
	watch: {
	    
	}
}
</script>
<style scoped>

</style>
<style>

</style>