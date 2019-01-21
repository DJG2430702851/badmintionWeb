<template>
	<div id="taqa">
		<el-form ref="taform" :label-position="labelPosition" :rules="rules" :model="taform" label-width="200px" class="x-form">
			<el-row>
			  	<el-col>
			  		<div class="grid-content bg-purple">
			  			<el-form-item label="报名的时间" prop="signupTimeRange">
			  				<el-date-picker
						      v-model="taform.signupTimeRange"
						      type="datetimerange"
						      :picker-options="pickerOptions"
						      format="yyyy-MM-dd HH:mm"
						      value-format="yyyy-MM-dd HH:mm:ss"
						      range-separator="至"
						      start-placeholder="报名开始时间"
						      end-placeholder="报名结束时间"
						      :default-time="['08:00:00', '20:00:00']">
						    </el-date-picker>
			  			</el-form-item>
			  			<el-form-item label="测试的时间" prop="testTimeRange">
			  				<el-date-picker
						      v-model="taform.testTimeRange"
						      type="datetimerange"
						      :picker-options="pickerOptions2"
						      format="yyyy-MM-dd HH:mm"
						      value-format="yyyy-MM-dd HH:mm:ss"
						      range-separator="至"
						      start-placeholder="测试开始时间"
						      end-placeholder="测试结束时间"
						      :default-time="['08:00:00', '20:00:00']">
						    </el-date-picker>
			  			</el-form-item>
						<areaSelect label="考试地址" ref="areaCom"></areaSelect>
						<el-form-item label="具体地址" prop="testDetailAddr">
					    	<el-input v-model="taform.testDetailAddr"></el-input>
					  	</el-form-item>
					  	<el-form-item label="接纳人数" prop="num">
					    	<el-input type="number" v-model.number="taform.num"></el-input>
					  	</el-form-item>
					  	<el-form-item label="报名费" prop="applyCost">
					    	<el-input v-model="taform.applyCost"></el-input>
					  	</el-form-item>
					  	<el-form-item>
						    <el-button class="elbtn-red" style="padding:9px 30px;width:150px;" type="primary" @click="onSubmit('taform')">保存</el-button>
						</el-form-item>
			  		</div>
			  	</el-col>
			</el-row>
		</el-form>
  </div>
</template>
<script>
import areaSelect from '@/components/common/areaSelect'
import {submitTestApply,testApplyDetail,updateTestApply} from '@/service/testmData'
export default {
  	name: 'taqa',
  	props: ['labelPosition'],
  	data () {
    	return {
    		isEdit:this.$route.query.applyId?true:false,
    		taform:{
    			testTimeRange:[],
    			signupTimeRange:[],
    			testStartTime:'',
    			testEndTime:'',
    			applyStartTime:'',
    			applyEndTime:'',
    			testAddrProvince:'',
		        testAddrCity:'',
		        testAddrArea:'',
		        testDetailAddr:'',
    			num:'',
    			applyCost:''
    		},
	        rules: {
		        testTimeRange: [
		            { required: true, message: '请输入测试时间', trigger: 'blur' }
		        ],
		        signupTimeRange: [
		            { required: true, message: '请输入报名时间', trigger: 'blur' }
		        ],
		        testDetailAddr:[
		        	{ required: true, message: '请输入具体地址', trigger: 'blur' }
		        ],
		        num: [
		            { required: true, message: '请输入可以接纳测试的人数', trigger: 'blur' },
		            { type:'number', message: '请输入数字', trigger: 'blur' }
		        ],
		        applyCost: [
		            { required: true, message: '请输入报名费', trigger: 'blur' }
		        ]
		    },
	        pickerOptions: {
	          disabledDate: (time) => {
	            if (this.taform.testTimeRange!=null && this.taform.testTimeRange.length>0 ) {
                    return time.getTime() < Date.now() || time.getTime() > (new Date(this.taform.testTimeRange[0])).getTime();
                } else {
                    return time.getTime() < Date.now();
                }
	          }
	        },
	        pickerOptions2: {
	          disabledDate: (time) => {
	            if (this.taform.signupTimeRange!=null && this.taform.signupTimeRange.length>0 ) {
                    return time.getTime() < Date.now() || time.getTime() < (new Date(this.taform.signupTimeRange[1])).getTime();
                } else {
                    return time.getTime() < Date.now();
                }
	          }
	        }
	    }
	},
	components: {
		areaSelect
	},
	methods: {
      	handleRemove(file, fileList) {
        	console.log(file, fileList);
      	},
      	handlePictureCardPreview(file) {
        	this.dialogImageUrl = file.url;
        	this.dialogVisible = true;
      	},
      	removeDomain(item) {
        	var index = this.form.domains.indexOf(item)
        	if (index !== -1) {
          	this.form.domains.splice(index, 1)
        	}
      	},
     	addDomain() {
	        this.form.domains.push({
	          	value: '',
	          	key: Date.now()
	        });
      	},
      	onSubmit(formName) {
      		this.$refs[formName].validate((valid) => {
      			let areaValid = this.$refs['areaCom'].areaValidate();
	      		if(valid && areaValid){
	      			this.taform.applyStartTime = this.taform.signupTimeRange[0];
	      			this.taform.applyEndTime = this.taform.signupTimeRange[1];
	      			this.taform.testStartTime = this.taform.testTimeRange[0];
	      			this.taform.testEndTime = this.taform.testTimeRange[1];
	      			if(this.isEdit){
	      				this.editSubmit();
	      			}else{
						this.addSubmit();
	      			}
	      			
	      		}else{
	      			return false;
	      		}
      		})
      	},
      	addSubmit(){
      		submitTestApply(this.taform).then((data)=>{
      			if(data.code==0){
      				this.$message.success('保存成功，待后台人员审核!');
      			}	
      		})
      	},
     	editSubmit(){
	      	updateTestApply(this.taform).then((data)=>{
	      		if(data.code==0){
	      			this.$message.success('保存成功，待后台人员再次审核!');
	      		}
	      	})
      	},
      	areaSelectListen(){
	  		this.areaSelect.$off('changeArea');
  	    	this.areaSelect.$on('changeArea', (val)=>{
  	    		let val2 = {
  	    			testAddrProvince:val.province,
  	    			testAddrCity:val.city,
  	    			testAddrArea:val.district
  	    		}
           		this.taform = Object.assign({},this.taform,val2);
        	})
      	}
    },
	mounted(){
		// 省市区组件的监听
	  	this.areaSelectListen()

	  	if(this.isEdit){
	  		let testAddrArea = '';
	  		testApplyDetail(this.$route.query.applyId).then((data)=>{
	  			this.taform = Object.assign({},this.taform,{
	  				applyId:data.applyId,
	  				testStartTime:data.testStartTime,
	    			testEndTime:data.testEndTime,
	    			applyStartTime:data.applyStartTime,
	    			applyEndTime:data.applyEndTime,
			        testDetailAddr:data.testDetailAddr,
	    			num:data.num,
	    			applyCost:data.applyCost
	  			});
	  			this.$refs['areaCom'].pform = {
		  			province:data.testAddrProvince,
		  			city:data.testAddrCity,
		  			district:data.testAddrArea
		  		}
	  			testAddrArea = data.testAddrArea;
	  			this.taform.testTimeRange = [data.testStartTime,data.testEndTime];
	  			this.taform.signupTimeRange = [data.applyStartTime,data.applyEndTime]
	  		}).then(()=>{
	  			this.taform.testAddrArea = testAddrArea
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
.ta-form input::-webkit-outer-spin-button,input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.ta-form input[type="number"]{
  -moz-appearance: textfield;
}
.ta-form .el-date-editor,.ta-form .el-input{
	width: 70%;
}
.ta-form .el-date-editor .el-range-separator{
	width: 10%
}
.ta-form .workarea .el-input,.ta-form .workarea .el-select{
	width: 100%;
}
</style>