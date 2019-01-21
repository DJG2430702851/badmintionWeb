<template>
	<div>
		<el-form ref="qaform" :disabled="!canEdit" :rules="rules" :model="qaform" label-width="200px" class="x-form">
			<el-row>
			  	<el-col>
			  		<div class="grid-content" style="padding:10px 0;">
			  			<el-form-item class="qa-form-item" label="医疗保障设施">
			  				<div v-if="hasWrite" class="icon-edit-wrap"><span v-if="!canEdit" @click="canEdit=true">编辑<i class="el-icon-edit-outline"></i></span><span v-else @click="canEdit=false">取消编辑</span></div>
			  			</el-form-item>
			  			<el-form-item
						    v-for="(staffName, index) in qaform.staffNameList"
						    label="员工姓名"
						    :key="staffName.key"
						    :prop="'staffNameList.' + index + '.value'"
						    :rules="{
						        required: true, message: '姓名不能为空', trigger: 'blur'
						    }"
						>
						    <el-input v-model="staffName.value"></el-input>&nbsp;&nbsp;<el-button @click.prevent="removeStaffName(staffName)">删除</el-button>
						</el-form-item>
						<el-form-item>
						    <el-button @click="addStaffName">新增员工</el-button>
						</el-form-item>
						<el-form-item label="医疗设备" prop="img1">
                   <imgUpload ref="imgCom1" imgType="multiple" field="medicalSecurityPaths" delIdField="medicalSecurityIds" tipText="处理突发情况的急救箱或其他医疗设备（图片至少2张至多10张）,图片请小于1M" validateField="img1" :validateFieldLen="10"></imgUpload>
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
import {qastep4Submit,qastep4Update} from '@/service/testmData'
import imgUpload from '@/components/common/imgUpload'
export default {
  	name: 'qa',
  	props: ['hasWrite','rdata','tmId','hasAdd'],
  	data () {
  		var validateimg1 = (rule, value, callback) => {            
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
	          	medicalSecurityPaths:[],
              medicalSecurityIds:[],
	          	staffNameList: [{
  		           value: ''
  		        }]
	        },
	        rules: {
		        img1:[
		            { required: true,validator: validateimg1, message: '图片至少2张', trigger: 'change' }
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
      removeStaffName(item) {
        var index = this.qaform.staffNameList.indexOf(item)
        if (index !== -1) {
          this.qaform.staffNameList.splice(index, 1)
        }
      },
      addStaffName() {
        this.qaform.staffNameList.push({
          value: '',
          key: Date.now()
        });
      },
      addSubmit(formName) {
        // this.submitCallback();
      	this.$refs[formName].validate((valid) => {
      		if(valid){
      			var staffNameStr = [];
      			for(var i=0;i<this.qaform.staffNameList.length;i++){
      				staffNameStr.push(this.qaform.staffNameList[i].value);
      			}
      			this.qaform.staffName = staffNameStr.join(',');
      			qastep4Submit(this.qaform).then((data) => {
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
      			var staffNameStr = [];
      			for(var i=0;i<this.qaform.staffNameList.length;i++){
      				staffNameStr.push(this.qaform.staffNameList[i].value);
      			}
      			this.qaform.staffName = staffNameStr.join(',');
      			qastep4Update(this.qaform).then((data) => {
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
      		this.$emit('submitSuccess', true)
      	}
      },
      getDetail(){
      	if(this.rdata.medicalSecurityFacilitiesDto){
      		delete this.rdata.medicalSecurityFacilitiesDto.medicalSecurityPaths;
      		delete this.rdata.medicalSecurityFacilitiesDto.medicalSecurityIds;
      	}
      	this.qaform = Object.assign(this.qaform,this.rdata.medicalSecurityFacilitiesDto);
        this.qaform = Object.assign(this.qaform, this.rdata);
      	this.$refs['imgCom1'].imgList = this.rdata.medicalSecurityPaths?this.qaform.medicalSecurityPaths:[];
      	for(let i=0;i<this.$refs['imgCom1'].imgList.length;i++){
          getAnotherImage(this.$refs['imgCom1'].imgList[i].filePath).then((data) => {
            this.$set(this.$refs['imgCom1'].imgList[i], 'url', URL.createObjectURL(data))
          })
      	}

        if(this.qaform.staffName){
            var staffNameArr = this.qaform.staffName.split(',');
            this.qaform.staffNameList = [];
            for(let i=0;i<staffNameArr.length;i++){
              this.qaform.staffNameList.push({
                value:staffNameArr[i]
              })
            }
        }
      	this.qaform.img1=this.$refs['imgCom1'].imgList.length;
      	this.qaform.medicalSecurityPaths = [];
      	this.qaform.medicalSecurityFacilitiesDto = this.rdata.medicalSecurityFacilitiesDto;

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
	  	// 	this.canEdit = false;
	  	// 	if(this.hasAdd===0){
		  //       Object.assign(this.qaform,{tmId:this.rdata.tmId});
		  //   }else if(this.hasAdd===1){
		  //       this.getDetail();
		  //   }
	  	// }else{
	  	// 	this.qaform = Object.assign({tmId:this.tmId}, this.qaform);
	  	// }
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