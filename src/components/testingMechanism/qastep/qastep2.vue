<template>
	<div>
		<el-form ref="qaform" :disabled="!canEdit" :rules="rules" :model="qaform" label-width="200px" class="x-form">
			<el-row>
			  	<el-col>
			  		<div class="grid-content" style="padding:10px 0;">
			  			<el-form-item class="qa-form-item" label="场地设施及人员">
			  				<div v-if="hasWrite" class="icon-edit-wrap"><span v-if="!canEdit" @click="canEdit=true">编辑<i class="el-icon-edit-outline"></i></span><span v-else @click="canEdit=false">取消编辑</span></div>
			  			</el-form-item>
			  			<el-form-item label="羽毛球场地" prop="fieldNum">
			  				<el-input type="number" v-model.number="qaform.fieldNum"></el-input>&nbsp;&nbsp;片
			  			</el-form-item>
			  			<el-form-item label="" prop="img1">
							<imgUpload ref="imgCom1" imgType="multiple" field="fieldPaths" delIdField="deleteId" tipText="俯视图及侧视图图片3张,图片请小于1M" validateField="img1" :validateFieldLen="3"></imgUpload>
			  			</el-form-item>
			  			<el-form-item label="场地管理人员" prop="fieldManager">
			  				<el-input type="number" v-model.number="qaform.fieldManager"></el-input>&nbsp;&nbsp;名
			  			</el-form-item>
			  			<el-form-item label="全职教练" prop="fullCoach">
			  				<el-input type="number" v-model.number="qaform.fullCoach"></el-input>&nbsp;&nbsp;名
			  			</el-form-item>
			  			<el-form-item label="助教" prop="assistant">
			  				<el-input type="number" v-model.number="qaform.assistant"></el-input>&nbsp;&nbsp;名
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
import {getImage,getAnotherImage} from '@/service/commonData'
import {qastep2Submit,qastep2Update} from '@/service/testmData'
import imgUpload from '@/components/common/imgUpload'
export default {
  	name: 'qa',
  	props: ['hasWrite','rdata','tmId','hasAdd'],
  	data () {
  		var validateimg1 = (rule, value, callback) => {            
	        if (value !== 3) {
                callback(new Error('请上传图片3张'));
            }else {
                callback();
            }
	    };
    	return {
    		canEdit:true,
    		img1List:[],
	      	qaform: {
	          	fieldNum:'',
	          	fieldManager:'',
	          	fullCoach:'',
	          	assistant:'',
	          	img1:0,
	          	deleteId:[],
	          	fieldPaths:[]
	        },
	        rules: {
		        fieldNum:[
		            { required: true, message: '数量不能为空', trigger: 'blur' },
		            { type:'number', message: '请输入数字', trigger: 'blur' }
		        ],
		        fieldManager:[
		            { required: true, message: '数量不能为空', trigger: 'blur' },
		            { type:'number', message: '请输入数字', trigger: 'blur' }
		        ],
		        fullCoach:[
		            { required: true, message: '数量不能为空', trigger: 'blur' },
		            { type:'number', message: '请输入数字', trigger: 'blur' }
		        ],
		        assistant:[
		            { required: true, message: '数量不能为空', trigger: 'blur' },
		            { type:'number', message: '请输入数字', trigger: 'blur' }
		        ],
		        img1:[
		            { required: true, validator: validateimg1, message: '请上传图片3张', trigger: 'change' }
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
      			qastep2Submit(this.qaform).then((data) => {
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
      			qastep2Update(this.qaform).then((data) => {
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
      	if(this.rdata.fieldDto){
      		delete this.rdata.fieldDto.fieldPaths;
      		delete this.rdata.fieldDto.deleteId;
      	}
      	Object.assign(this.qaform,{tmId:this.rdata.tmId},this.rdata.fieldDto);
        this.$refs['imgCom1'].imgList = this.rdata.fieldPaths?this.rdata.fieldPaths:[];
        for(let i=0;i<this.$refs['imgCom1'].imgList.length;i++){
        	getAnotherImage(this.$refs['imgCom1'].imgList[i].filePath).then((data) => {
        		this.$set(this.$refs['imgCom1'].imgList[i], 'url', URL.createObjectURL(data))
          	})
        }
      	this.qaform.img1=this.$refs['imgCom1'].imgList.length;
      	this.qaform.fieldDto = this.rdata.fieldDto;
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
	  	this.getDetail();
	},
	watch: {
	    
	}
}
</script>
<style scoped>

</style>
<style>

</style>