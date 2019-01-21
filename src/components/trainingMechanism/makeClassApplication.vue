<template>
	<div id="mca">
		<!-- <side navtype="trm" title="培训机构"></side>
		<div class="col-md-9 col-lg-10 padding-top-20">
			<fieldset>
				<legend class="legend-title">办班申请</legend> -->
				<el-form ref="mcaform" :rules="rules" label-width="160px" label-position="right" class="x-form" :model="mcaform">
					<el-row>
					  	<el-col>
					  		<div class="grid-content" style="padding:10px 0;">
					  			<el-form-item label="培训班名称" prop="name">
					  				<el-input v-model="mcaform.name"></el-input>
					  			</el-form-item>
					  			<el-row class="workarea areaWrap" :gutter="10">
							  		<el-form-item required label="考点区域" >
								  		<div style="width:70%;">
						  					<el-col :span="8">
						  						<el-form-item prop="province">
											        <el-select v-model="mcaform.province" placeholder="请选择省">
											          <el-option
											            v-for="(item,index) in provinceArr"
											            :value="item.name"
											            :key="index">
											          </el-option>
											        </el-select>
											    </el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item prop="city">
											        <el-select v-model="mcaform.city" placeholder="请选择市">
											          <el-option
											            v-for="(item,index) in cityArr"
											            :value="item.name"
											            :key="index">
											          </el-option>
											        </el-select>
											    </el-form-item>
											</el-col>
										    <el-col :span="8">
										    	<el-form-item prop="district">
											        <el-select v-model="mcaform.district" placeholder="请选择区">
											          <el-option
											            v-for="(item,index) in districtArr"
											            :value="item.name"
											            :key="index">
											          </el-option>
											        </el-select>
											    </el-form-item>
											</el-col>
										</div>
									</el-form-item>
								</el-row>
								<el-form-item label="具体地址" prop="detailAddr">
					  				<el-input v-model="mcaform.detailAddr"></el-input>
					  			</el-form-item>
								<el-form-item label="联系人一" prop="firstPeople">
					  				<el-input v-model="mcaform.firstPeople"></el-input>
					  			</el-form-item>
					  			<el-form-item label="联系人(一)电话" prop="firstPhone">
					  				<el-input v-model="mcaform.firstPhone"></el-input>
					  			</el-form-item>
					  			<el-form-item label="联系人二">
					  				<el-input v-model="mcaform.anotherPeople"></el-input>
					  			</el-form-item>
					  			<el-form-item label="联系人(二)电话">
					  				<el-input v-model="mcaform.anotherPhone"></el-input>
					  			</el-form-item>
					  			<el-form-item label="班级人数" prop="num">
					  				<el-input v-model="mcaform.num"></el-input>
					  			</el-form-item>
								<el-form-item label="报名时间范围" prop="applyTimeRange">
					  				<el-date-picker
								      v-model="mcaform.applyTimeRange"
								      type="datetimerange"
								      :picker-options="pickerOptions"
								      format="yyyy-MM-dd HH:mm"
								      value-format="yyyy-MM-dd HH:mm"
								      range-separator="至"
								      start-placeholder="报名开始时间"
								      end-placeholder="报名结束时间"
								      :default-time="['08:00:00', '20:00:00']">
								    </el-date-picker>
					  			</el-form-item>
					  			<el-form-item label="培训时间范围" prop="openingClassTimeRange">
					  				<el-date-picker
								      v-model="mcaform.openingClassTimeRange"
								      type="datetimerange"
								      :picker-options="pickerOptions2"
								      format="yyyy-MM-dd HH:mm"
								      value-format="yyyy-MM-dd HH:mm"
								      range-separator="至"
								      start-placeholder="培训开始时间"
								      end-placeholder="培训结束时间"
								      :default-time="['08:00:00', '20:00:00']">
								    </el-date-picker>
					  			</el-form-item>
					  			<el-form-item label="">
					  				<el-button @click="$router.go(-1)">返回</el-button>
					  				<!-- <el-button type="primary" @click="formSubmit('mcaform')">保存</el-button> -->
					  				<el-button type="primary" @click="formSubmit('mcaform')">保存</el-button>
					  			</el-form-item>
					  		</div>
					  	</el-col>
					</el-row>
				</el-form>
			<!-- </fieldset>
		</div> -->
  </div>
</template>
<script>
import {trainingClassApplySaveMessage,trainingClassApply,getTrainingClass,updateTrainingClass} from '../../service/getData'
import areadata from '../common/areadata'
import side from '../common/side.vue'
export default {
  	name: 'mca',
  	data () {
    	return {
    		mcaform:{
    			name:'',
    			province:'',
		        city:'',
		        district:'',
		        classRoomAddr:'',
		        detailAddr:'',
		        firstPeople:'',
		        firstPhone:'',
		        anotherPeople:'',
		        anotherPhone:'',
		        applyTimeRange:[],
		        openingClassTimeRange:[],
		        applyStartTime:'',
		        applyEndTime:'',
		        openingClassStartTime:'',
		        openingClassEndTime:'',
		        num:'',
		        tmId:localStorage.getItem('userId'),
		        tcId:this.$route.query.tcId
    		},
    		provinceArr: areadata.arrAll,
	        districtArr:[],
	        cityArr:[],
	        rules: {
		        name: [
		            { required: true, message: '请输入培训班名', trigger: 'blur' }
		        ],
		        applyTimeRange: [
		            { required: true, message: '请输入报名时间范围', trigger: 'blur' }
		        ],
		        openingClassTimeRange: [
		            { required: true, message: '请输入培训时间范围', trigger: 'blur' }
		        ],
		        // applyStartTime: [
		        //     { required: true, message: '请输入报名开始时间', trigger: 'blur' }
		        // ],
		        // applyEndTime: [
		        //     { required: true, message: '请输入报名截止时间', trigger: 'blur' }
		        // ],
		        detailAddr:[
		        	{ required: true, message: '请输入具体地址', trigger: 'blur' }
		        ],
		        province:[
		            { required: true,pattern:/^(?!选择省份$)/, message: '请选择省', trigger: 'change' }
		        ],
		        city:[
		            { required: true,pattern:/^(?!请选择$)/, message: '请选择市', trigger: 'change' }
		        ],
		        district:[
		            { required: true,pattern:/^(?!请选择$)/, message: '请选择区', trigger: 'change' }
		        ],
		        firstPeople:[
		        	{ required: true, message: '请输入联系人一', trigger: 'blur' }
		        ],
		        firstPhone:[
		        	{ required: true, message: '请输入联系人一电话', trigger: 'blur' }
		        ],
		        anotherPeople:[
		        	{ required: true, message: '请输入联系人二', trigger: 'blur' }
		        ],
		        anotherPhone:[
		        	{ required: true, message: '请输入联系人二电话', trigger: 'blur' }
		        ],
		        num:[
		        	{ required: true, message: '请输入班级人数', trigger: 'blur' },
		        	{ pattern:/^[1-9]\d*$/, message: '请输入数字', trigger: 'blur' }
		        ]
		    },
		    pickerOptions: {
	          // disabledDate(time) {
	          //   return time.getTime() < Date.now()
	          // }
	          disabledDate: (time) => {
	            if (this.mcaform.openingClassTimeRange!=null && this.mcaform.openingClassTimeRange.length>0 ) {
                    return time.getTime() < Date.now() || time.getTime() > (new Date(this.mcaform.openingClassTimeRange[0])).getTime();
                } else {
                    return time.getTime() < Date.now();
                }
	          }
	        },
	        pickerOptions2: {
	          disabledDate: (time) => {
	            if (this.mcaform.applyTimeRange!=null && this.mcaform.applyTimeRange.length>0 ) {
                    return time.getTime() < Date.now() || time.getTime() < (new Date(this.mcaform.applyTimeRange[1])).getTime();
                } else {
                    return time.getTime() < Date.now();
                }
	          }
	        }
	    }
	},
	components: {
	  side
	},
	methods: {
      	updateCity: function () {
        	if(this.mcaform.province==='选择省份'){
        		this.mcaform.city = '请选择';
        		return false;
	        }
	        for (var i in this.provinceArr) {
	          	var obj = this.provinceArr[i];
	          	if (obj.name == this.mcaform.province) {
	            	this.cityArr = obj.sub;
	            	break;
	          	}
	        }
        	this.mcaform.city = this.cityArr[1].name;
      	},
      	updateDistrict: function () {
        	if(this.mcaform.city==='请选择'){
        		this.mcaform.district = '请选择';
        		return false;
        	}
	        for (var i in this.cityArr) {
	          	var obj = this.cityArr[i];
	          	if (obj.name == this.mcaform.city) {
	            	this.districtArr = obj.sub;
	            	break;
	          }
	        }
        	this.mcaform.district = this.districtArr[1].name;
      	},
      	formSubmit(formName){
	      	this.$refs[formName].validate((valid) => {
	      		if(valid){
	      			this.mcaform.classRoomAddr = this.mcaform.province+','+this.mcaform.city+','+this.mcaform.district;
	      			this.mcaform.applyStartTime = this.mcaform.applyTimeRange[0];
	      			this.mcaform.applyEndTime = this.mcaform.applyTimeRange[1];
	      			this.mcaform.openingClassStartTime = this.mcaform.openingClassTimeRange[0];
	      			this.mcaform.openingClassEndTime = this.mcaform.openingClassTimeRange[1];
	      			if(this.mcaform.tcId){
			      		this.editSubmit()
			      	}else{
			      		this.addSubmit()
			      	}
	      		}
	  		})
	  	},
      	addSubmit(){
      		trainingClassApply(this.mcaform).then((data) => {console.log(data)
  				if(data.data.code==0){
  					this.$message({
			          message: '保存成功',
			          type: 'success'
			        });
      				this.$router.push('/tcl');
  				}else if(data.data.code==500){
  					this.$message.error(data.data.message);
  				}
  			})
      	},
      	editSubmit(){
      		updateTrainingClass(this.mcaform).then((data) => {console.log(data)
  				if(data.data.code==0){
  					this.$message({
			          message: '保存成功',
			          type: 'success'
			        });
      				this.$router.push('/tcl');
  				}else if(data.data.code==500){
  					this.$message.error(data.data.message);
  				}
  			})
      	}
    },
	mounted(){
		if(this.mcaform.tcId){
			getTrainingClass(this.mcaform.tcId).then((data) => {
				this.mcaform = Object.assign(this.mcaform,data.data);
				var classRoomAddr = data.data.classRoomAddr.split(',');
				this.mcaform.province = classRoomAddr[0];
				this.mcaform.city = classRoomAddr[1];
				this.mcaform.district = classRoomAddr[2];
				this.mcaform.applyTimeRange.push(this.mcaform.applyStartTime);
				this.mcaform.applyTimeRange.push(this.mcaform.applyEndTime)
		        this.mcaform.openingClassTimeRange.push(this.mcaform.openingClassStartTime)
		        this.mcaform.openingClassTimeRange.push(this.mcaform.openingClassEndTime)
			})
		}
	},
	watch: {
	    'mcaform.province': function () {
	      	this.updateCity();
	    },
	    'mcaform.city': function () {
	      	this.updateDistrict();
	    }
	}
}
</script>
<style scoped>

</style>
<style>

</style>