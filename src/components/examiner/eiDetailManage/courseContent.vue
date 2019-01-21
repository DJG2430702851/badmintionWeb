<template>
	<div class="cc">
		<el-table :data="dataList" style="width: 100%" class="ccctable">
	      <el-table-column
	      	prop="content"
	      	align="center"
			label="培训内容"
	        width="180">
	      </el-table-column>
	      <el-table-column
	      	prop="time"
	      	align="center"
	        label="学时数">
	      </el-table-column>
	      <el-table-column
	      	prop="method"
	      	align="center"
		    label="考核方式">
	      </el-table-column>
	      <el-table-column
	      	prop="teacher"
	      	align="center"
	        label="授课教师姓名">
	      </el-table-column>
	      <el-table-column
	      	prop="title"
	      	align="center"
	        label="授课教师职称">
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
import {getClassContent} from '@/service/eiData'
export default {
  	name: 'cc',
  	props:['rdata'],
  	data () {
    	return {
    		listParam:{
    			size:pageSize,
    			page:1,
    			queryText:{}
      		},
      		queryText:{
      			appraiserId:''
      		},
      		total:0,
      		dataList:[]
	    }
	},
	methods: {
		handleCurrentChange(val){
	      	this.listParam.page = val;
	      	getClassContent(this.listParam).then((data) => {
				this.dataList = data.data;
				this.total = parseInt(data.recordsTotal)
			})
	      }
    },
	mounted(){
		this.queryText.appraiserId = this.$route.query.appraiserId;
		this.listParam.queryText = JSON.stringify(this.queryText);
		getClassContent(this.listParam).then((data) => {
			this.dataList = data.data;
			this.total = parseInt(data.recordsTotal)
		})
		
	},
	watch: {
	   
	}
}
</script>
<style lang="less">
.cc{
	padding-bottom:40px;
}
</style>