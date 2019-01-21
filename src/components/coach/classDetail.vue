<template>
	<div class="cld">
		<el-tabs v-if="flag" v-model="activeName" type="card">
			<el-tab-pane label="培训通知" name="first">
		    	<trainingNotice :rdata="trainingNoticeData" :applyStartTime="applyStartTime"></trainingNotice>
		    </el-tab-pane>
		    <el-tab-pane label="基本信息" name="second">
		    	<basicInformation :rdata="basicInformationData"></basicInformation>
		    </el-tab-pane>
		    <el-tab-pane label="课程内容" name="third">
				<courseContent :rdata="courseContentData"></courseContent>
		    </el-tab-pane>
		</el-tabs>
		<!-- <div>
			<el-button size="small" @click="$router.push('/su')" type="primary">立即报名</el-button>
			<div style="margin-top:20px;">
	            <label style="width:120px" for="">培训班名称:</label>
	            <span>{{classAll.name}}</span>
	        </div>
			<div style="margin-top:20px;">
	            <label style="width:120px" for="">办班地址:</label>
	            <span>{{classAll.classRoomAddr}}  {{classAll.detailAddr}}</span>
	        </div>
			<div style="margin-top:20px;">
	            <label style="width:120px" for="">报名时间范围:</label>
	            <span>{{classAll.applyStartTime}} 至 {{classAll.applyEndTime}}</span>
	        </div>
			<div style="margin-top:20px;">
	            <label style="width:120px" for="">培训时间:</label>
	            <span>{{classAll.openingClassStartTime}} 至 {{classAll.openingClassEndTime}}</span>
	        </div>
	        	<div style="margin-top:20px;"><b>课程介绍</b></div>
		        <el-table :data="dataList" style="width: 100%" class="ccctable">
			      <el-table-column
			      	prop="content"
					label="培训内容"
			        width="180">
			      </el-table-column>
			      <el-table-column
			      	prop="time"
			        label="学时数">
			      </el-table-column>
			      <el-table-column
			      	prop="assessmentMethod"
				    label="考核方式">
			      </el-table-column>
			      <el-table-column
			      	prop="teacher"
			        label="授课教师姓名">
			      </el-table-column>
			      <el-table-column
			      	prop="title"
			        label="授课教师职称">
			      </el-table-column>
			    </el-table>
        </div> -->
	</div>
</template>
<script>
import basicInformation from './classDetailManage/basicInformation.vue'
import trainingNotice from './classDetailManage/trainingNotice.vue'
import courseContent from './classDetailManage/courseContent.vue'
import {classListXQ} from '../../service/getData'
export default {
  	name: 'cld',
  	// props:['rdata'],
  	data () {
    	return {
    		activeName:'first',
    		flag:false,
	        tcId:this.$route.params.id,
	        basicInformationData:'',
	        trainingNoticeData:'',
	        courseContentData:'',
	        applyStartTime:'',
	        classAll:{
	        	name:'A班',
	        	classRoomAddr:'上海市杨浦区',
	        	applyStartTime:'2018-10-15 08:00 至 2018-10-28 08:00',
	        	openingClassStartTime:'2018-11-10 08:00 至 2018-12-30 08:00'
	        },
	        dataList:[
	        	{
	        		content:'课程1',
	        		time:'8',
	        		assessmentMethod:'笔试',
	        		teacher:'王玲',
	        		title:'教授'
	        	},
	        	{
	        		content:'课程2',
	        		time:'8',
	        		assessmentMethod:'笔试',
	        		teacher:'王玲',
	        		title:'教授'
	        	},
	        	{
	        		content:'课程3',
	        		time:'8',
	        		assessmentMethod:'笔试',
	        		teacher:'王玲',
	        		title:'教授'
	        	},
	        	{
	        		content:'课程4',
	        		time:'8',
	        		assessmentMethod:'笔试',
	        		teacher:'王玲',
	        		title:'教授'
	        	}
	        ]
	    }
	},
	components: {
	  basicInformation,trainingNotice,courseContent
	},
	methods: {

    },
	mounted(){
		classListXQ(this.tcId).then((data) => {
			this.basicInformationData = data.data.trainingClass;
			this.applyStartTime = this.basicInformationData.applyStartTime;
			this.trainingNoticeData = data.data.tnDto;
			this.courseContentData = data.data.trainingCourse;
			this.flag = true;


        })
	},
	watch: {
	   
	}
}
</script>
<style scoped>

</style>
<style>

</style>