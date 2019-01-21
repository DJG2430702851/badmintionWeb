<template>
	<div>
		<el-form ref="qaform" :disabled="!canEdit" :rules="rules" :model="qaform" label-width="200px" class="x-form">
			<el-row>
			  	<el-col>
			  		<div class="grid-content" style="padding:10px 0;">
			  			<el-form-item class="qa-form-item" label="消防安全设施">
			  				<div v-if="hasWrite" class="icon-edit-wrap"><span v-if="!canEdit" @click="canEdit=true">编辑<i class="el-icon-edit-outline"></i></span><span v-else @click="canEdit=false">取消编辑</span></div>
			  			</el-form-item>
			  			<el-form-item label="疏散指示标志" prop="img1">
                  <imgUpload ref="imgCom1" imgType="multiple" field="safetyTipsPaths" delIdField="safetyTipsIds" tipText="添加图片2张,图片请小于1M" validateField="img1" :validateFieldLen="2"></imgUpload>
							</el-upload>
						</el-form-item>
			  			<el-form-item label="火灾报警探测器等设施" prop="img2">
                  <imgUpload ref="imgCom2" imgType="multiple" field="fireAlarmPaths" delIdField="fireAlarmIds" tipText="添加图片2张,图片请小于1M" validateField="img2" :validateFieldLen="2"></imgUpload>
			  			</el-form-item>
			  			<el-form-item label="消火栓箱或灭火器等设施" prop="img3">
                  <imgUpload ref="imgCom3" imgType="multiple" field="fireExtinguisherPaths" delIdField="fireExtinguisherIds" tipText="添加图片2张,图片请小于1M" validateField="img3" :validateFieldLen="2"></imgUpload>
			  			</el-form-item>
			  			<el-form-item label="灭火器维护检查记录" prop="img4">
                  <imgUpload ref="imgCom4" imgType="multiple" field="maintenanceRecordPaths" delIdField="maintenanceRecordIds" tipText="添加图片1张,图片请小于1M" validateField="img4"></imgUpload>
			  			</el-form-item>
			  			<el-form-item>
						    <el-button v-if="hasWrite" class="el-button elbtn-red" style="padding:9px 30px;width:150px;" type="primary" @click="editSubmit('qaform')">保存</el-button>
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
import {getAnotherImage} from '@/service/commonData'
import {qastep3Submit,qastep3Update} from '@/service/testmData'
import imgUpload from '@/components/common/imgUpload'
export default {
  	name: 'qa',
  	props: ['hasWrite','rdata','tmId','hasAdd'],
  	data () {
  		var validateimg = (rule, value, callback) => {            
	        if (value !== 2) {
                callback(new Error('请上传图片2张'));
            }else {
                callback();
            }
	    };
	    var validateimg4 = (rule, value, callback) => {            
	        if (value !== 1) {
                callback(new Error('请上传图片'));
            }else {
                callback();
            }
	    };
    	return {
    		  canEdit:true,
	      	qaform: {
	          	img1:0,
	          	img2:0,
	          	img3:0,
	          	img4:0,
              safetyTipsIds:[],
	          	safetyTipsPaths:[],
              fireAlarmIds:[],
	          	fireAlarmPaths:[],
              fireExtinguisherIds:[],
	          	fireExtinguisherPaths:[],
              maintenanceRecordIds:[],
	          	maintenanceRecordPaths:[]
	        },
	        rules: {
		        img1:[
		            { required: true,validator: validateimg, message: '请上传图片2张', trigger: 'change' }
		        ],
		        img2:[
		            { required: true,validator: validateimg, message: '请上传图片2张', trigger: 'change' }
		        ],
		        img3:[
		            { required: true,validator: validateimg, message: '请上传图片2张', trigger: 'change' }
		        ],
		        img4:[
		            { required: true,validator: validateimg4, message: '请上传图片', trigger: 'change' }
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
      			qastep3Submit(this.qaform).then((data) => {
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
      			qastep3Update(this.qaform).then((data) => {
      				this.submitCallback();
      			})
      		}else{
      			return false;
      		}
      	})
      },
      formSubmit(formName){
        // console.log(this.hasAdd)
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
          this.$emit('submitSuccess', true)
        }
      },
      getDetail(){
      	this.qaform = Object.assign(this.qaform, this.rdata);
        this.$refs['imgCom1'].imgList = this.qaform.safetyTipsPaths?this.qaform.safetyTipsPaths:[];
        this.$refs['imgCom2'].imgList= this.qaform.fireAlarmPaths?this.qaform.fireAlarmPaths:[];
        this.$refs['imgCom3'].imgList = this.qaform.fireExtinguisherPaths?this.qaform.fireExtinguisherPaths:[];
        this.$refs['imgCom4'].imgList = this.qaform.maintenanceRecordPaths?this.qaform.maintenanceRecordPaths:[];
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
        for(let i=0;i<this.$refs['imgCom3'].imgList.length;i++){
            getAnotherImage(this.$refs['imgCom3'].imgList[i].filePath).then((data) => {
              this.$set(this.$refs['imgCom3'].imgList[i], 'url', URL.createObjectURL(data))
            })
        }
        for(let i=0;i<this.$refs['imgCom4'].imgList.length;i++){
            getAnotherImage(this.$refs['imgCom4'].imgList[i].filePath).then((data) => {
              this.$set(this.$refs['imgCom4'].imgList[i], 'url', URL.createObjectURL(data))
            })
        }
    		this.qaform.img1=this.$refs['imgCom1'].imgList.length;
    		this.qaform.img2=this.$refs['imgCom2'].imgList.length;
    		this.qaform.img3=this.$refs['imgCom3'].imgList.length;
    		this.qaform.img4=this.$refs['imgCom4'].imgList.length;
        this.qaform.safetyTipsPaths = [];
        this.qaform.fireAlarmPaths = [];
        this.qaform.fireExtinguisherPaths = []; 
        this.qaform.maintenanceRecordPaths = [];
        this.qaform.fireSafetyFacilitiesDto = this.rdata.fireSafetyFacilitiesDto;
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
    //     this.canEdit = false;
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
      this.getDetail();
	},
	watch: {
	    
	}
}
</script>
<style scoped>

</style>
