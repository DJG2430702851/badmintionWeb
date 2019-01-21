<template>
	<div>
		<!-- <div style="font-size:1.4rem;">
			<p style="margin-bottom:10px;">成绩是否合格：{{deData.isQualified}}</p>
			<p style="margin-bottom:10px;">出勤率：{{deData.attendance}}</p>
		</div>
 -->	<div style="margin-top:20px;display:inline-block;">
            <label style="width:120px" for="">成绩是否合格:</label>
            <span>{{deData.isQualified}}</span>
        </div>
        <div style="margin-top:20px;margin-left:40px;display:inline-block;">
            <label style="width:120px" for="">出勤率:</label>
            <span>{{deData.attendance}}</span>
        </div>
		<el-table ref="multipleTable" :data="dDataList" style="width: 100%">
	      	<el-table-column label="序号" type="index" width="80"></el-table-column>
	     	<el-table-column
	        	prop="content"
	        	label="课程名">
	      	</el-table-column>
	      	<el-table-column
	      		prop="score.score"
	        	label="成绩">
	      	</el-table-column>
	    </el-table>
		<el-button style="margin-top:20px;" @click="$router.go(-1)">返回</el-button>
  	</div>
</template>
<script>
import {coachScoreFind} from '../../service/getData'
export default {
  	name: 'csd',
  	data () {
    	return {
    		dDataList:[],
    		rdata:{
    			tcId:this.$route.params.id,
    			pcId:localStorage.getItem('userId')
    		},
    		deData:{}
	    }
	},
	methods: {
      
      
    },
	mounted(){
		coachScoreFind(this.rdata).then((data) => {
			this.dDataList = data.data;
			if(this.dDataList.length>0){
				this.deData = this.dDataList[0].score;
			}
			
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