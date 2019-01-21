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
	      		prop="appraiserName"
	        	label="班级名称"
	        	align="center"
	        	width="260">
	        	<template slot-scope="scope">
	        		<div><router-link class="color-blue" :to="{path:'/eitn',query:{appraiserId:scope.row.appraiserId,signType:scope.row.signType}}">{{scope.row.appraiserName}}</router-link></div>
	        	</template>
	        </el-table-column>
	      	<el-table-column
	      		prop="examDate"
	        	label="状态"
	        	align="center">
	        	<template slot-scope="scope">
	        		<div v-if="scope.row.applyStatus==0"><span class="xblock bgorange">审批中</span></div>
	        		<div v-if="scope.row.applyStatus==1"><span class="xblock bggreen">审批通过</span></div>
	        		<div v-if="scope.row.applyStatus==2"><span class="xblock bgred">审批驳回</span></div>
	        	</template>
	        </el-table-column>
	        <el-table-column
	        	label="审核说明"
	        	align="center">
	        	<template slot-scope="scope">
	        		<div>暂无</div>
	        	</template>
	        </el-table-column>
	        <el-table-column
	        	label="成绩"
	        	align="center">
	        	<template slot-scope="scope">
	        		<div>暂无</div>
	        	</template>
	        </el-table-column>
	        <el-table-column
	        	label="操作"
	        	align="center">
	        	<template slot-scope="scope">
	        		<div v-if="scope.row.applyStatus==0"><span class="txtbtn-red" @click="cancelMySignup(scope.row.ateId)">取消报名</span></div>
	        		<div v-if="scope.row.applyStatus==1"><span class="txtbtn-red">报名成功</span></div>
	        		<div v-if="scope.row.applyStatus==2"><span class="txtbtn-red">报名失败</span></div>
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
import {classList} from '@/service/eiData'
import {cancelSignup} from '@/service/personalData'
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
    				type:'one'
    			}
    		}
	    }
	},
	methods: {
		handleCurrentChange(val){
			this.listParam.page = val;
	      	this.getMyClassList();
		},
      	cancelMySignup(ateId){
	      	this.$confirm('确定取消申请吗?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
	        	cancelSignup(ateId).then((data)=>{
		      		if(data.code==0){
		      			this.getMyClassList();
		      			this.$message.success('取消成功!');
		      		}
		      	})
	        })
      	},
      	getMyClassList(){
	      	classList(this.listParam).then((data)=>{
				this.datalist = data.data;
				this.total = parseInt(data.recordsTotal);
			})
      	}
    },
	mounted(){
		this.getMyClassList();
	},
	watch: {
	    
	}
}
</script>
<style scoped>

</style>
<style>

</style>