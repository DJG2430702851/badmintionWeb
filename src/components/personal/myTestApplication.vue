<template>
	<div id="myta" class="myta">
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
	        	label="报名时间"
	        	align="center"
	        	width="170">
	        	<template slot-scope="scope">
	        		<div style="text-align:left;">{{scope.row.applyStartTime}} 至 {{scope.row.applyEndTime}}</div>
	        	</template>
	        </el-table-column>
	      	<el-table-column
	        	label="测试时间"
	        	align="center"
	        	width="170">
	        	<template slot-scope="scope">
	        		<div style="text-align:left;">{{scope.row.testStartTime}} 至 {{scope.row.testEndTime}}</div>
	        	</template>
	        </el-table-column>
	      	<el-table-column
	        	prop="gameItem"
	        	label="考点"
	        	align="center"
	        	width="180">
	        	<template slot-scope="scope">
	        		{{scope.row.testAddrProvince}},{{scope.row.testAddrCity}},{{scope.row.testAddrArea}}&nbsp;{{scope.row.testDetailAddr}}
	        	</template>
	        </el-table-column>
	        <el-table-column
	      		prop="num"
	        	label="人数"
	        	align="center"
	        	width="60">
	        </el-table-column>
	      	<el-table-column
	      		prop="applyCost"
	        	label="报名费"
	        	align="center"
	        	width="80">
	        </el-table-column>
	        <el-table-column
	        	label="状态"
	        	align="center">
	        	<template slot-scope="scope">
	        		<div v-if="scope.row.applyStatus==0"><span class="xblock bgorange">审批中</span></div>
	        		<div v-if="scope.row.applyStatus==1"><span class="xblock bggreen">审批通过</span></div>
	        		<div v-if="scope.row.applyStatus==2"><span class="xblock bgred">审批驳回</span></div>
	        	</template>
	        </el-table-column>
	        <el-table-column
	        	label="操作"
	        	align="center">
	        	<template slot-scope="scope">
	        		<div v-if="scope.row.applyStatus==0"><span class="txtbtn-red" @click="cancelApply(scope.row.applyId)">取消申请</span></div>
	        		<div v-if="scope.row.applyStatus==1"><span class="txtbtn-blue" @click="$router.push({path:'/ta',query:{applyId:scope.row.applyId}})">修改申请</span></div>
	        		<div v-if="scope.row.applyStatus==2"><span class="txtbtn-red">重新申请</span></div>
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
import {myTestApplication} from '@/service/personalData'
export default {
  	name: 'myta',
  	data () {
    	return {
    		datalist:[],
    		total:0,
    		listParam:{
    			page:1,
        		size:pageSize
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
		    });
	    },
	    getApplyList(){
	      	myTestApplication(this.listParam).then((data)=>{
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
.myta{
	padding-bottom:40px;
}
</style>