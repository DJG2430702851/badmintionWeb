<template>
	<div id="myga" class="myga">
		<el-table
			class="tablenobg"
	      	:data="datalist"
	      	style="width: 100%">
	      	<el-table-column
	        	type="index"
	        	label="序号"
	        	align="center"
	        	width="60">
	      	</el-table-column>
	      	<el-table-column
	        	prop="gradeName"
	        	label="等级"
	        	align="center"
	        	width="60">
	        </el-table-column>
	      	<el-table-column
	        	label="考点"
	        	align="center"
	        	width="260">
	        	<template slot-scope="scope">
	        		{{scope.row.examAddr}}&nbsp;&nbsp;{{scope.row.examDetail}}
	        	</template>
	        </el-table-column>
	      	<el-table-column
	      		prop="examDate"
	        	label="考试时间"
	        	align="center"
	        	width="170">
	        	<template slot-scope="scope">
	        		<div style="text-align:left;">{{scope.row.examDate}}</div>
	        	</template>
	        </el-table-column>
	        <el-table-column
	        	label="状态"
	        	align="center">
	        	<template slot-scope="scope">
	        		<div v-if="scope.row.applyStatus==1"><span class="xblock bgorange">审批中</span></div>
	        		<div v-if="scope.row.applyStatus==2"><span class="xblock bggreen">审批通过</span></div>
	        		<div v-if="scope.row.applyStatus==3"><span class="xblock bgred">审批驳回</span></div>
	        		<div v-if="scope.row.applyStatus==4"><span class="xblock bgred">已有证书</span></div>
	        	</template>
	        </el-table-column>
	        <el-table-column
	        	label="操作"
	        	align="center">
	        	<template slot-scope="scope">
	        		<div v-if="scope.row.applyStatus==1"><span class="txtbtn-red" @click="cancelApply(scope.row.applyId)">取消申请</span></div>
	        		<div v-if="scope.row.applyStatus==2"><span class="txtbtn-red">申请成功</span></div>
	        		<div v-if="scope.row.applyStatus==3"><span class="txtbtn-red">申请失败</span></div>
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
// import {jsonData} from '@/service/personalData'
// import {gaStatusList} from './status.vue'
import {myApplication,cancelMyApplication} from '@/service/personalData'
export default {
  	name: 'myga',
  	data () {
    	return {
    		datalist:[],
    		total:0,
    		listParam:{
    			page:1,
        		size:pageSize,
    			queryText:{
    				applyType:'1'
    			}
    		}
	    }
	},
	methods: {
		handleCurrentChange(val){
			this.listParam.page = val;
	      	this.getApplyList();
		},
      	cancelApply(applyId){
	      	this.$confirm('确定取消申请吗?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
	        	cancelMyApplication(applyId).then((data)=>{
		      		if(data.code==0){
		      			this.getApplyList();
		      			this.$message.success('取消成功!');
		      		}
		      	})
	        })
      	
      	},
	    getApplyList(){
	      	myApplication(this.listParam).then((data)=>{
				this.datalist = data.data;
				this.total = parseInt(data.recordsTotal);
			})
	    }
    },
	mounted(){
		this.getApplyList();
	},
	watch: {
	    
	}
}
</script>
<style lang="less">
.myga{
	padding-bottom:40px;
}
</style>