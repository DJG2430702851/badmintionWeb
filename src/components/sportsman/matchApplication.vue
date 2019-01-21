<template>
	<div id="mat" class="mat">
		<el-form ref="matform" label-position="right" :rules="rules" :model="matform" label-width="200px" class="x-form xs-form">
			<el-row>
			  	<el-col>
			  		<div class="grid-content bg-purple" style="padding:10px 0;">
			  			<el-form-item label="姓名" prop="applyer">
			  				<el-input v-model="matform.applyer" placeholder="请输入姓名"></el-input>
			  			</el-form-item>
			  			<el-form-item label="性别" prop="sex">
						    <el-radio-group class="xradio" v-model="matform.sex">
						      <el-radio :label="0">男</el-radio>
						      <el-radio :label="1">女</el-radio>
						    </el-radio-group>
						</el-form-item>
			  			<el-form-item label="证件类型" prop="certificateType">
						    <el-select v-model="matform.certificateType" placeholder="请选择">
						      	<el-option label="居民身份证" value="1"></el-option>
						      	<el-option label="军官证" value="2"></el-option>
						      	<el-option label="香港特区护照/身份证明" value="3"></el-option>
						      	<el-option label="澳门特区护照/身份证明" value="4"></el-option>
						      	<el-option label="外籍人员护照号" value="5"></el-option>
						    </el-select>
					  	</el-form-item>
			  			<el-form-item label="证件号码" prop="certificateNumber">
			  				<el-input v-model="matform.certificateNumber" placeholder="请输入证件号码"></el-input>
			  			</el-form-item>
			  			<el-form-item label="手机号码" prop="phone">
			  				<el-input v-model="matform.phone" placeholder="请输入手机号码"></el-input>
			  			</el-form-item>
			  			<el-form-item label="近期免冠照片" prop="img1">
							<imgUpload ref="imgCom1" imgType="single" field="atachments" delIdField="delAtachments" validateField="img1"></imgUpload>
			  			</el-form-item>
			  			<el-form-item label="选择等级" prop="gradeName">
			  				<el-select class="block" v-model="matform.gradeName" placeholder="请选择等级">
						      	<el-option label="四级" value="四级"></el-option>
						      	<el-option label="五级" value="五级"></el-option>
						      	<el-option label="六级" value="六级"></el-option>
						    </el-select>
			  			</el-form-item>
					  	<el-form-item label="赛事名称" prop="gameName">
						    <el-select class="block" v-model="matform.gameName" placeholder="请输入赛事名称">
						      	<el-option label="上海竞标赛" value="上海竞标赛"></el-option>
						      	<el-option label="江苏竞标赛" value="江苏竞标赛"></el-option>
						      	<el-option label="全国巡回赛" value="全国巡回赛"></el-option>
						    </el-select>
					  	</el-form-item>
					  	<el-form-item label="比赛项目" prop="gameItem">
						    <el-select v-model="matform.gameItem" placeholder="请选择比赛项目">
						      	<el-option v-for="(item,index) in gameItemList" :key="index" :label="item.display" :value="item.display"></el-option>
						    </el-select>
					  	</el-form-item>
					  	<el-form-item label="比赛成绩" prop="gameScore">
						    <el-autocomplete
						      class="block"
						      v-model="matform.gameScore"
						      :fetch-suggestions="querySearch"
						      placeholder="请输入比赛成绩"
						      :trigger-on-focus="false"
						      @select="handleSelect"
						    ></el-autocomplete>
					  	</el-form-item>
			  			<el-form-item label="" prop="enrolmentAgreement" class="lhnormal">
						      <el-checkbox class="xcheckbox" v-model="matform.enrolmentAgreement" label="" name="type">已阅读并同意</el-checkbox>&nbsp;&nbsp;<router-link class="agreement" to="/ra">《考生网上报名协议》</router-link>
						</el-form-item>
			  			<el-form-item>
						    <el-button class="elbtn-red xprimary" type="primary" @click="formSubmit('matform')">提交</el-button>
						</el-form-item>
			  		</div>
			  	</el-col>
			</el-row>
		</el-form>
  </div>
</template>
<script>
import {getPersonal} from '@/service/personalData'
import {playerNameList,gradeApplySubmit} from '@/service/sportsmanData'
import {getImage} from '@/service/commonData'
import imgUpload from '@/components/common/imgUpload'
export default {
  	name: 'mat',
  	// props: ['labelPosition'],
  	data () {
  		var validateimg1 = (rule, value, callback) => {            
	        if (value !== 1) {
                callback(new Error('请上传图片'));
            }else {
                callback();
            }
	    };
	    var validateScore = (rule, value, callback) => {
	    	var list = this.loadAll();
	    	var flag = false;
	    	for(var i=0;i<list.length;i++){
	    		if(value==list[i].value){
	    			flag=true
	    		}
	    	}     
	        if (flag===true) {
                callback();
            }else {
                callback(new Error('请填写成绩1-64或上场'));
            }
	    };
    	return {
    		scoreList:[],
    		competitionPartFlag:'0',
	        gameItemList:[],
	        piform:{
	        	userId:localStorage.getItem('userId')
	        },
    		matform:{
    			enrolmentAgreement:'',
    			applyer:'',
    			sex:'',
    			certificateType:'',
    			phone:'',
    			certificateNumber:'',
    			img1:0,
    			gradeName:'',
    			raceOrTestRadio:'',
    			atachments:{},
    			delAtachments:{},
	    		gameName:'',
	    		gameItem:'',
	    		gameScore:'',
		        chooseTestspot:'',
		        testTime:'',
		        applyType:'0'
    		},
    		rules: {
		        applyer: [
		            { required: true, message: '请输入姓名', trigger: 'blur' }
		        ],
		        sex: [
		            { required: true, message: '请选择性别', trigger: 'blur' }
		        ],
		        certificateType: [
		            { required: true, message: '请选择证件类型', trigger: 'change' }
		        ],
		        certificateNumber: [
		            { required: true, message: '请输入证件号码', trigger: 'blur' }
		        ],
		        phone: [
		            { required: true, pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入手机号码', trigger: 'blur' }
		        ],
		        raceOrTestRadio:[
		            { required: true, message: '请选择赛事申请或申请测试', trigger: 'change' }
		        ],
		        gameName:[
		            { required: true, message: '请选择赛事名称', trigger: 'change' }
		        ],
		        gameItem:[
		            { required: true, message: '请选择比赛项目', trigger: 'change' }
		        ],
		        gameScore:[
		            { required: true,validator: validateScore, message: '请填写成绩1-64或上场', trigger: 'change' }
		        ],
		        img1:[
		            { required: true,validator: validateimg1, message: '请上传图片', trigger: 'change' }
		        ],
		        gradeName: [
		            { required: true, message: '请选择等级', trigger: 'change' }
		        ],
		        chooseTestspot: [
		            { required: true, message: '请选择考点', trigger: 'change' }
		        ],
		        testTime: [
		            { required: true, message: '请考试时间', trigger: 'change' }
		        ],
		        enrolmentAgreement: [
		            { required: true, pattern:/^true$/, message: '请阅读并同意报名协议', trigger: 'change' }
		        ]
		    }
	    }
	},
	components: {
		imgUpload
	},
	methods: {
      	handleRadioChange(v){
	      	if(v==1){
	      		this.competitionPartFlag=1;
	      	}else if(v==2){
	      		this.competitionPartFlag=2;
	      	}
      	},
      	querySearch(queryString,cb){
	      	var scoreList = this.scoreList;
	        var results = queryString ? scoreList.filter(this.createFilter(queryString)) : scoreList;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
      	},
      	createFilter(queryString) {
	        return (score) => {
	          	return (score.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	        };
      	},
	    handleSelect(item){

	    },
      	loadAll() {
	      	let arr = []
	      	for(let i=0;i<64;i++){
	      		arr.push({value:String(i+1)})
	      	}
	      	arr.push({value:"上场"})
	      	return arr;
      	},
      	loadAll2(){
	      	let arr = [];
	      	for(let i=0;i<64;i++){
	      		arr.push(String(i+1))
	      	}
	      	arr.push('上场');
	      	return arr;
      	},
      	formSubmit:function(formName){
	      	this.$refs[formName].validate((valid) => {
	      		if(valid){
	      			gradeApplySubmit(this.matform).then((data) => {
	      				if(data.code==0){
	      					this.$message.success('申请成功!');
	      				}else if(data.code==500){
	      					this.$message.error('该申请已存在!');
	      				}
	      			})
	      		}else{
	      			return false;
	      		}

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
		// 图片监听
	  	this.imgUploadListen('matform');

		this.scoreList = this.loadAll();
		getPersonal(this.piform).then((data) => {
			let cdata = data.data;
			this.matform.applyer = cdata.personalName;
			this.matform.phone = cdata.phone;
			this.matform.sex = cdata.sex;
			this.matform.certificateType = cdata.certificatesType;
			this.matform.certificateNumber =  cdata.certificatesNumber;
			this.matform.atachments = cdata.atachments;
			this.matform.atachments.fileId = '';
			this.matform.atachments.relationId = '';
			if(cdata.atachments){
	  			getImage(this.matform.atachments.imageUrl).then((data) => {
	  				this.$refs['imgCom1'].imgList.push({
			  			fileId:this.matform.atachments.fileId,
			  			url:URL.createObjectURL(data),
			  			fileName:this.matform.atachments.fileName,
			  			filePath:this.matform.atachments.filePath,
			  			fileSrcName:this.matform.atachments.fileSrcName
			  		});
			  		this.matform.img1=1;
	  			})
		  	}

		})
		playerNameList().then((data) => {
			this.gameItemList = data.data;
		})
	},
	watch: {
	    
	}
}
</script>
<style lang="less">

</style>