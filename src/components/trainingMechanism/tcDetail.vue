<template>
	<div id="tcd">
		<div v-if="examineResult==0">正在审核中...</div>
		<div v-if="examineResult==2">
			<p>审核未通过</p>
			<p>天气不好,不能开班</p>
		</div>
		<div v-if="examineResult==1">
			<el-tabs v-model="activeName" type="card">
			    <el-tab-pane label="培训通知" name="first">
			    	<trainingNotice :rdata="trainingNoticeData"></trainingNotice>
			    </el-tab-pane>
			    <el-tab-pane label="课程内容" name="second">
			    	<courseContent :rdata="rdata"></courseContent>
			    </el-tab-pane>
			    <el-tab-pane label="报名审核" name="third">
					<signupExamine :rdata="rdata"></signupExamine>
			    </el-tab-pane>
			    <el-tab-pane label="成绩导入" name="fourth">
					<scoreImport :rdata="scoreImportData"></scoreImport>
			    </el-tab-pane>
			    <el-tab-pane label="办班总结" name="fifth">
					<makeClassSummary :rdata="makeClassSummaryData"></makeClassSummary>
			    </el-tab-pane>
			</el-tabs>
		</div>
  	</div>
</template>
<script>
import {classDetailAll} from '../../service/getData'
import trainingNotice from './trainingClassManage/trainingNotice.vue'
import courseContent from './trainingClassManage/courseContent.vue'
import signupExamine from './trainingClassManage/signupExamine.vue'
import scoreImport from './trainingClassManage/scoreImport.vue'
import makeClassSummary from './trainingClassManage/makeClassSummary.vue'
export default {
  	name: 'tcd',
  	data () {
    	return {
	        activeName:'first',
	        rdata:[],
	        trainingNoticeData:{},
	        scoreImportData:[],
	        approval:{},
	        tcId:this.$route.params.id,
	        examineResult:3 //0待审核,1审核通过,2审核未通过
	    }
	},
	components: {
	  trainingNotice,courseContent,signupExamine,scoreImport,makeClassSummary
	},
	methods: {
      
    },
	mounted(){
		classDetailAll(this.tcId).then((data) => {
			this.trainingNoticeData = data.data.tnDto;
			this.makeClassSummaryData = data.data.at;
			this.approval = data.data.approval;
			this.scoreImportData = data.data.score;
			this.examineResult = 1;
		})
	},
	created(){
		
	},
	watch: {
	   
	}
}
</script>
<style scoped>

</style>
<style>
	
</style>