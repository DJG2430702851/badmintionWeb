<template>
	<div>
		<el-table
	      	:data="dataList"
	      	style="width: 100%">
	      	<el-table-column
	        	type="index"
	        	label="序号"
	        	width="80">
	      	</el-table-column>
	      	<el-table-column
	        	prop="trainingClass[0].testMechanism.mechanismFullname"
	        	label="培训班">
	      	</el-table-column>
	      	<el-table-column
	        	prop="trainingClass[0].name"
	        	label="培训班">
	      	</el-table-column>
	      	<el-table-column
	        	prop="isQualified"
	        	label="成绩是否合格">
	      	</el-table-column>
	      	<el-table-column
	        	prop="attendance"
	        	label="出勤率">
	      	</el-table-column>
	     	<el-table-column
		      	label="操作"
		      	width="180">
		      	<template slot-scope="scope">
		        	<el-button type="text" @click="$router.push('/csd/'+scope.row.trainingClass[0].tcId)" size="small">查看具体成绩</el-button>
		      	</template>
		  	</el-table-column>
	    </el-table>
	    <div class="fy-dv">
	    	<el-pagination
			  background
			  layout="prev, pager, next"
			  @current-change="handleCurrentChange"
			  :page-size="listParam.size"
			  :total="total">
			</el-pagination>
	    </div>
  </div>
</template>
<script>
import {coachClassList} from '../../service/getData'
export default {
  	name: 'csl',
  	data () {
    	return {
    		listParam:{
    			pcId:localStorage.getItem('userId'),
        		page:1,
        		size:pageSize
      		},
      		total:0,
      		dataList:[]
	    }
	},
	methods: {
      	handleCurrentChange(val){
      		this.listParam.page = val;
      		this.getList();
      	},
      	getList(){
      		coachClassList(this.listParam).then((data) => {
				if(data.data.length>0){
					this.dataList = data.data;
					this.total = parseInt(data.recordsTotal);
				}
			})
      	}
      	
    },
	mounted(){
		this.getList();
	},
	watch: {
	    
	}
}
</script>
<style scoped>

</style>
<style>

</style>