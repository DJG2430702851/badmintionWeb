<template>
	<div class="mysud">
		<el-tabs v-if="flag" v-model="activeName" type="card">
			<el-tab-pane label="培训通知" name="first">
		    	<trainingNotice :rdata="trainingNoticeData"></trainingNotice>
		    </el-tab-pane>
		    <el-tab-pane label="基本信息" name="second">
		    	<basicInformation :rdata="basicInformationData"></basicInformation>
		    </el-tab-pane>
		    <el-tab-pane label="课程内容" name="third">
				<courseContent :rdata="courseContentData"></courseContent>
		    </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import basicInformation from './mySignupDetailManage/basicInformation.vue'
import trainingNotice from './mySignupDetailManage/trainingNotice.vue'
import courseContent from './mySignupDetailManage/courseContent.vue'
// import {classListXQ} from '@/service/userData'
export default {
  	name: 'mysud',
  	// props:['rdata'],
  	data () {
    	return {
    		activeName:'first',
    		flag:false,
	        tcId:this.$route.params.id,
	        basicInformationData:'',
	        trainingNoticeData:'',
	        courseContentData:''
	    }
	},
	components: {
	  basicInformation,trainingNotice,courseContent
	},
	methods: {

    },
	mounted(){
		// classListXQ(this.tcId).then((data) => {
		// 	this.basicInformationData = data.data.trainingClass;
		// 	this.trainingNoticeData = data.data.tnDto;
		// 	this.courseContentData = data.data.trainingCourse;
		// 	this.flag = true;
		// 	// console.log(data.data)
  //  //          console.log(data.data.tnDto)

  //       })
	},
	watch: {
	   
	}
}
</script>
<style scoped>

</style>
<style>

</style>