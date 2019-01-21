<template>
	<div id="ga" class="ga">
		<el-form ref="gaform" label-position="right" :rules="rules" :model="gaform" label-width="200px" class="x-form">
			<el-row>
			  	<el-col>
			  		<div class="grid-content bg-purple" style="padding:10px 0;">
			  			<el-form-item label="姓名" prop="applyer">
			  				<el-input v-model="gaform.applyer" placeholder="请输入姓名"></el-input>
			  			</el-form-item>
			  			<el-form-item label="性别" prop="sex">
						    <el-radio-group class="xradio" v-model="gaform.sex">
						      	<el-radio :label="0">男</el-radio>
			      				<el-radio :label="1">女</el-radio>
						    </el-radio-group>
						</el-form-item>
			  			<el-form-item label="证件类型" prop="certificateType">
						    <el-select v-model="gaform.certificateType" placeholder="请选择">
						      	<el-option label="居民身份证" value="1"></el-option>
						      	<el-option label="军官证" value="2"></el-option>
						      	<el-option label="香港特区护照/身份证明" value="3"></el-option>
						      	<el-option label="澳门特区护照/身份证明" value="4"></el-option>
						      	<el-option label="外籍人员护照号" value="5"></el-option>
						    </el-select>
					  	</el-form-item>
			  			<el-form-item label="证件号码" prop="certificateNumber">
			  				<el-input v-model="gaform.certificateNumber" placeholder="请输入证件号码"></el-input>
			  			</el-form-item>
			  			<el-form-item label="手机号码" prop="phone">
			  				<el-input v-model="gaform.phone" placeholder="请输入手机号码"></el-input>
			  			</el-form-item>
			  			<el-form-item label="近期免冠照片" prop="img1">
							<imgUpload ref="imgCom1" imgType="single" field="atachments" delIdField="delAtachments" validateField="img1"></imgUpload>
			  			</el-form-item>
			  			<el-form-item label="选择等级" prop="gradeName">
			  				<el-select @change="handleLevelChange" v-model="gaform.gradeName" placeholder="请选择等级">
						      	<el-option label="七级" value="七级"></el-option>
						      	<el-option label="八级" value="八级"></el-option>
						      	<el-option label="九级" value="九级"></el-option>
						    </el-select>
			  			</el-form-item>
				  		<areaSelect label="考试地址" ref="areaCom"></areaSelect>
			  			<el-form-item label="选择考点" prop="examDetail">
						    <el-select @change="getExaminationAddressTestList()" v-model="gaform.examDetail" placeholder="请选择考点">
						      	<el-option v-for="(item, index) in examDetailList" :key="index" :label="item" :value="item"></el-option>
						    </el-select>
					  	</el-form-item>
			  			<el-form-item label="考试时间" prop="examDate">
						    <el-select @change="examDateChange" v-model="gaform.examDate" placeholder="请选择考试时间">
						      	<el-option v-for="(item, index) in examDateList" :key="index" :label="item.examDate" :value="item.examDate"></el-option>
						    </el-select>
					  	</el-form-item>
			  			<el-form-item label="" prop="enrolmentAgreement" class="lhnormal">
						      <el-checkbox  class="xcheckbox" v-model="gaform.enrolmentAgreement" label="" name="type">已阅读并同意</el-checkbox>&nbsp;&nbsp;<router-link class="agreement" to="/ra">《考生网上报名协议》</router-link>
						</el-form-item>
			  			<el-form-item>
						    <el-button class="elbtn-red xprimary" type="primary" @click="formSubmit('gaform')">提交</el-button>
						</el-form-item>
			  		</div>
			  	</el-col>
			</el-row>
		</el-form>
  </div>
</template>
<script>
import {getPersonal} from '@/service/personalData'
import {examinationAddressList,gradeApplySubmit,examinationAddressTestList} from '@/service/sportsmanData'
import {getImage} from '@/service/commonData'
import areaSelect from '@/components/common/areaSelect'
import imgUpload from '@/components/common/imgUpload'
export default {
  	name: 'ga',
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
	        piform:{
	        	userId:localStorage.getItem('userId')
	        },
	        examDetailList:[],
	        examDateList:[],
    		gaform:{
    			enrolmentAgreement:'',
    			applyer:'',
    			sex:'',
    			certificateType:'',
    			certificateNumber:'',
    			phone:'',
    			img1:0,
    			gradeName:'',
    			atachments:{},
    			delAtachments:{},
	    		score:'',
    			province:'',
		        city:'',
		        district:'',
		        examAddr:'',
		        examDetail:'',
		        examDate:'',
		        testApplyId:'',
		        applyType:'1'
		        
    		},
    		rules: {
		        applyer: [
		            { required: true, message: '请选择身份', trigger: 'blur' }
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
		        score:[
		            { required: true,validator: validateScore, message: '请填写成绩1-64或上场', trigger: 'change' }
		        ],
		        img1:[
		            { required: true,validator: validateimg1, message: '请上传图片', trigger: 'change' }
		        ],
		        gradeName: [
		            { required: true, message: '请选择等级', trigger: 'change' }
		        ],
		        examDetail: [
		            { required: true, message: '请选择考点', trigger: 'change' }
		        ],
		        examDate: [
		            { required: true, message: '请考试时间', trigger: 'change' }
		        ],
		        enrolmentAgreement: [
		            { required: true, pattern:/^true$/, message: '请阅读并同意报名协议', trigger: 'change' }
		        ]
		    }
	    }
	},
	components: {
		areaSelect,imgUpload
	},
	methods: {
      	handleLevelChange(v){
	      	if(v==0 || v==1 || v==2 || v==3 ){
	      		this.competitionPartFlag=1;
	      	}else if(v==4 || v==5){
	      		this.competitionPartFlag=0;
	      	}else if(v==6 || v==7 || v==8 || v==9){
	      		this.competitionPartFlag=2;
	      	}
      	},
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
      	getExaminationAddress(){
	      	let d = {
	      		testAddrProvince:this.gaform.province,
	      		testAddrCity:this.gaform.city,
	      		testAddrArea:this.gaform.district
	      	}
	      	examinationAddressList(d).then((data) => {
	      		this.examDetailList = data.data;
	      	})
      	},
      	getExaminationAddressTestList(){
	      	let d ={
	      		testDetailAddr:this.gaform.examDetail
	      	}
			examinationAddressTestList(d).then((data) => {
				let cdata = data.data;
				this.examDateList = cdata.map((item,val)=>{
					return {
						examDate:item.testStartTime +'  至  '+ item.testEndTime,
						testApplyId:item.applyId
					};
				})
	      	})
      	},
      	examDateChange(val){console.log(val)
      		this.gaform.testApplyId = this.examDateList.filter((item,index,arr)=>{
	    		return val == item.examDate
	    	})[0].testApplyId;
      	},
      	formSubmit:function(formName){
	      	this.$refs[formName].validate((valid) => {
	      		let areaValid = this.$refs['areaCom'].areaValidate();
	      		if(valid && areaValid){
	      			this.gaform.examAddr = this.gaform.province+','+this.gaform.city+','+this.gaform.district;
	      			gradeApplySubmit(this.gaform).then((data) => {
	      				if(data.code==0){
	      					this.$message.success('申请成功!');
	      				}else if(data.code==500){
	      					this.$message.error('该申请已存在!');
	      				}
	      			})
	      		}

	      	})
      	},
      	areaSelectListen(){
		  	this.areaSelect.$off('changeArea');
	  	    this.areaSelect.$on('changeArea', (val)=>{
	            this.gaform = Object.assign({},this.gaform,val);
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
	  	this.imgUploadListen('gaform');

		this.scoreList = this.loadAll();
		getPersonal(this.piform).then((data) => {
			let cdata = data.data;
			this.gaform.applyer = cdata.personalName;
			this.gaform.phone = cdata.phone;
			this.gaform.sex = cdata.sex;
			this.gaform.certificateType = cdata.certificatesType;
			this.gaform.certificateNumber =  cdata.certificatesNumber;
			this.gaform.atachments = cdata.atachments;
			this.gaform.atachments.fileId = '';
			this.gaform.atachments.relationId = '';
			if(cdata.atachments){
	  			getImage(this.gaform.atachments.imageUrl).then((data) => {
	  				this.$refs['imgCom1'].imgList.push({
			  			fileId:this.gaform.atachments.fileId,
			  			url:URL.createObjectURL(data),
			  			fileName:this.gaform.atachments.fileName,
			  			filePath:this.gaform.atachments.filePath,
			  			fileSrcName:this.gaform.atachments.fileSrcName
			  		});
			  		this.gaform.img1=1;
	  			})
		  		
		  	}

		})

	},
	watch: {
	    'gaform.examDetail':function(){
	    	this.getExaminationAddressTestList();
	    },
	    'gaform.district':function(){
	    	this.getExaminationAddress();
	    	this.examDetail = '';
	    	this.examDate = '';
	    }
	}
}
</script>
<style lang="less">

</style>