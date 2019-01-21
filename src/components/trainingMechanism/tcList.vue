<template>
	<div id="tcl">
		<div class="text-right" style="margin:10px 20px;">
			<el-button size="small" @click="$router.push('/mca')" type="primary">办班申请</el-button>
			<el-button size="small" @click="batchDeleteClass" type="danger">批量删除</el-button>
		</div>
		<el-table ref="multipleTable" :data="dataList" style="width: 100%"  @selection-change="handleSelectionChange">
	      	<el-table-column
			    type="selection"
			    :selectable="checkboxT"
			    width="55">
			  </el-table-column>
	      	<el-table-column
	        	prop="name"
	        	label="培训班名称"
	        	>
	      	</el-table-column>
	     	<el-table-column
	        	prop="signUpTime"
	        	label="报名时间"
	        	width="150">
	        	<template slot-scope="scope">
			        <span>{{ scope.row.applyStartTime }} / <br>{{ scope.row.applyEndTime }}</span>
			    </template>
	      	</el-table-column>
	      	<el-table-column
	        	label="培训时间"
	        	width="150">
	        	<template slot-scope="scope">
			        <span>{{ scope.row.openingClassStartTime }} / <br>{{ scope.row.openingClassEndTime }}</span>
			    </template>
	      	</el-table-column>
	      	<el-table-column
	        	label="人数">
	        	<template slot-scope="scope">
			        <span slot="reference" class="color-red">{{ scope.row.num }}</span>
			    </template>
	      	</el-table-column>
	      	<el-table-column
	        	label="审核结果"
	        	>
	        	<template slot-scope="scope">
			        <span slot="reference" class="reviewFeedback" :class="{'red':scope.row.applyStatus==2,'green':scope.row.applyStatus==1,'orange':scope.row.applyStatus==0,'cursor-pointer':(scope.row.applyStatus==1 || scope.row.applyStatus==2)}" @click="dialogShow(scope.row)">{{ scope.row.applyStatus | applyStatusFormat }}</span>
			    </template>
	      	</el-table-column>
	      	<!-- <el-table-column
	        	label="审核说明"
	        	width="60">
	        	<template slot-scope="scope">
			        <el-button v-if="scope.row.applyStatus!=0 && !!scope.row.content" type="text">查看</el-button>
			    </template>
	      	</el-table-column> -->
	      	<el-table-column
		      	label="操作"
		      	align="center"
		      	>
		      	<template slot-scope="scope">
		      		<el-button :disabled="isOver(scope.row.openingClassEndTime)" type="text" size="small" @click="$router.push({path:'/mca',query:{tcId:scope.row.tcId}})"><em title="编辑" class="font18 el-icon-edit"></em></el-button>
		        	<el-button :disabled="scope.row.applyStatus!=1" @click="$router.push({path:'/tcd/'+scope.row.tcId,query:{applyStartTime:scope.row.applyStartTime,openingClassEndTime:scope.row.openingClassEndTime}})" type="text" size="small"><em title="管理" class="font18 el-icon-document"></em></el-button>
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
	    <el-dialog
		  	title="审核说明"
		  	:visible.sync="dialogVisible"
		  	:before-close="handleClose">
		  	<span>{{opinion}}</span>
		  	<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible=false">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import {trainingClassList,trainingClassDelete} from '../../service/getData'
export default {
  	name: 'tcl',
  	data () {
    	return {
    		listParam:{
    			tmId:localStorage.getItem('userId'),
    			size:pageSize,
    			page:1
    		},
    		total:0,
    		tcIds:[],
    		trainingTime:'',
    		dataList: [],
	        activeName:'first',
	        hasClickManageFlag:false,
	        examineResult:0, //0待审核,1审核通过,2审核未通过
	        dialogVisible:false,
	        opinion:''
	    }
	},
	filters:{
		applyStatusFormat:function(value){
			if(value==0){
				return '待审核'
			}else if(value==1){
				return '审核通过'
			}else{
				return '审核驳回'
			}
		}
		// ,
		// applyTimeFormat:function(value,row){
		// 	return row.applyStartTime+' / '+row.applyEndTime;
		// },
		// trainingTimeFormat:function(value,row){
		// 	return row.openingClassStartTime+'/'+row.openingClassEndTime;
		// }
	},
	methods: {
	  handleClose(done){
	  	done();
	  },
      manage(row){
      	// this.hasClickManageFlag = true;
      	// this.examineResult = row.examineResult;
      	this.$router.push('/tcd/'+row.id)
      },
      isOver(time){//培训是否结束
      	return (new Date(time)).getTime()<(new Date()).getTime()
      },
      dialogShow(row){
      		if(row.applyStatus!=0){
      			if(row.content){
      				this.opinion = row.content;
      				this.dialogVisible = true;
      			}else{
      				this.opinion = '审核通过';
      				this.dialogVisible = true;
      			}
      		}
      		
      },
      checkboxT(row,index){
    		if(row.applyStatus==1){
    			return 0;
    		}else{
    			return 1;
    		}
      },
      handleCurrentChange(val){
      	this.listParam.page = val;
      	trainingClassList(this.listParam).then((data) => {
			this.dataList = data.data.data;
			this.total = parseInt(data.data.recordsTotal);
			this.tcIds = [];
		})
      },
	  handleSelectionChange(val){
	  	for(var i=0;i<val.length;i++){
	  		this.tcIds.push(val[i].tcId)
	  	}
	  },
      batchDeleteClass(){
      	if(this.tcIds.length==0){
      		this.$message.error('请选择培训班');
      		return false;
      	}
      	this.$confirm('确定删除这些课程吗?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
	        	trainingClassDelete(this.tcIds).then((data) => {
		      		this.$message.success('删除成功');
		      	}).then(() => {
		      		trainingClassList(this.listParam).then((data) => {
						this.dataList = data.data.data;
						this.total = parseInt(data.data.recordsTotal);
					})
		      	})
	        })
      	
      }
    },
	mounted(){
		trainingClassList(this.listParam).then((data) => {
			this.dataList = data.data.data;
			this.total = parseInt(data.data.recordsTotal);
		})
	},
	watch: {
	   
	}
}
</script>
<style scoped>

</style>
<style>
	#tcl .color-red{
		color:#d23023;
	}
</style>