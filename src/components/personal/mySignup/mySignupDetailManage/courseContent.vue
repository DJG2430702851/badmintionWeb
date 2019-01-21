<template>
	<div>
		<el-table :data="dataList" style="width: 100%" class="ccctable">
	      <el-table-column
	      	prop="content"
			label="培训内容"
	        width="180">
	        <!-- <template slot-scope="scope">
	        	<el-input v-if="scope.row.canedit" v-model="scope.row.trainingContent"></el-input>
		        <span v-else>{{scope.row.trainingContent}}</span>
		    </template> -->
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
// import {courseFind} from '@/service/getData'
export default {
  	name: 'ccc',
  	props:['rdata'],
  	data () {
    	return {
    		listParam:{
    			tcId:this.$route.params.id,
    			size:pageSize,
    			page:1
      		},
      		total:0,
      		dataList:[]
	    }
	},
	methods: {
		handleCurrentChange(val){
	      	this.listParam.page = val;
	  //     	courseFind(this.listParam).then((data) => {
			// 	this.dataList = data.data.content;
			// 	this.total = parseInt(data.data.totalElements)
			// })
	      }
    },
	mounted(){
		// courseFind(this.listParam).then((data) => {
		// 	this.dataList = data.data.content;
		// 	this.total = parseInt(data.data.totalElements)
		// })
		
	},
	watch: {
	   
	}
}
</script>
<style scoped>

</style>
<style>

</style>