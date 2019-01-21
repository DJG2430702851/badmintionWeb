<template>
	<div class="mysul">
		<el-table
	      	:data="datalist"
	      	style="width: 100%">
	      	<el-table-column
	        	type="index"
	        	label="序号"
	        	width="60">
	      	</el-table-column>
	      	<el-table-column
	        	prop="testMechanism.mechanismFullname"
	        	label="机构名称"
	        	width="180">
	        </el-table-column>
	      	<el-table-column
	        	prop="name"
	        	label="培训班名称"
	        	width="240">
	        	<template slot-scope="scope">
			        <span style="cursor:pointer" class="color-blue" @click="$router.push('/mysud/'+scope.row.tcId)">{{scope.row.name}}</span>
			    </template>
	        </el-table-column>
	      	<!-- <el-table-column
	        	label="培训时间"
	        	width="150">
	        	<template slot-scope="scope">
			        <span>{{ scope.row.applyStartTime }} / <br>{{ scope.row.applyEndTime }}</span>
			    </template>
	        </el-table-column>
	     	<el-table-column
	        	label="报名时间"
	        	width="150">
	        	<template slot-scope="scope">
			        <span>{{ scope.row.openingClassStartTime }} / <br>{{ scope.row.openingClassEndTime }}</span>
			    </template>
	        </el-table-column> -->
	      	<el-table-column
	        	label="状态">
	        	<template slot-scope="scope">
			        <span slot="reference" class="reviewFeedback" :class="{'red':(scope.row.stateValue=='审核驳回' || scope.row.stateValue=='考核失败'),'green':(scope.row.stateValue=='审核通过' || scope.row.stateValue=='考核通过'),'orange':scope.row.stateValue=='待审核'}">{{ scope.row.stateValue}}</span>
			    </template>
	        </el-table-column>
	        <!-- <el-table-column
	        	label="培训班信息"
	        	width="150">
	        	<template slot-scope="scope">
			        <el-button @click="$router.push('/mysud/'+scope.row.tcId)" type="text" size="small">详情</el-button>
			    </template>
	        </el-table-column> -->
	        <el-table-column
	        	label="审核说明">
	        	<template slot-scope="scope">
			        <el-button :disabled="!(scope.row.registrationResultAudit===1 || scope.row.registrationResultAudit===2)" type="text" size="small" @click="dialogShow(scope.row.opinion)">查看</el-button>
			    </template>
	        </el-table-column>
	        <el-table-column
	        	label="成绩">
	        	<template slot-scope="scope">
			        <el-button :disabled="!(scope.row.registrationResultAudit===1 && scope.row.performanceReview===1)" type="text" size="small"  @click="$router.push('/csd/'+scope.row.tcId)">查看</el-button>
			    </template>
	        </el-table-column>
	      	<el-table-column
		      	label="操作"
		      	align="left">
		      	<template slot-scope="scope">
			        <el-button :disabled="scope.row.registrationResultAudit!==0" @click="$router.push({path:'/su',query:{tcId:scope.row.tcId}})" type="text" size="small"><em title="编辑" class="font18 el-icon-edit"></em></el-button>
		        	<el-button v-if="scope.row.registrationResultAudit===0 || (scope.row.registrationResultAudit===1 && !isOver(scope.row.applyEndTime))" @click="cancelSignUp(scope.row.cteId,scope.row.tcId)" type="text" class="color-red" size="small"><em title="取消报名" class="el-icon-ba-quxiaobaoming"></em></el-button>
		        	<el-button v-if="scope.row.registrationResultAudit===1 && isOver(scope.row.applyEndTime)" type="text" size="small"><em title="报名成功" class="el-icon-ba-baomingchenggong"></em></el-button>
		        	<el-button v-if="scope.row.registrationResultAudit===2 && scope.row.enrolmentAgain==1" @click="$router.push({path:'/su',query:{tcId:scope.row.tcId,cteId:scope.row.cteId}})" type="text" class="color-red" size="small"><em title="重新报名" class="el-icon-ba-baoming"></em></el-button>
		        	<el-button v-if="scope.row.registrationResultAudit===2 && scope.row.enrolmentAgain==0" :disabled="true" type="text" size="small"><!-- 不可报名 --><em title="不可报名" class="el-icon-ba-baoming"></em></el-button>
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
		  	<span>{{auditStatement}}</span>
		  	<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible=false">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import areadata from '../../common/areadata'
// import {mySignupList,deleteSignUp} from '@/service/personalData'
export default {
  	name: 'mysul',
  	data () {
    	return {
    		listParam:{
        		page:1,
        		size:pageSize,
        		pcId:localStorage.getItem('userId')
      		},
      		total:0,
      		datalist:[],
	        activeName:'first',
	        hasClickManageFlag:false,
	        examineResult:0, //0待审核,1审核通过,2审核未通过
	        searchform:{
	        	province:'',
		        city:'',
		        district:''
	        },
	        provinceArr: areadata.arrAll,
	        districtArr:[],
	        cityArr:[],
	        dialogVisible:false,
	        auditStatement:''
	    }
	},
	filters:{
		registrationResultAuditFormat:function(value){
			if(value===null){
				return '可报名'
			}else if(value===0){
				return '待审核'
			}else if(value===1){
				return '审核通过'
			}else{
				return '审核驳回'
			}
		}
	},
	methods: {
	  handleClose(done){
	  	done();
	  },
	  isOver(time){//培训是否结束
      	return (new Date(time)).getTime()<(new Date()).getTime()
      },
      manage(row){
      	// this.hasClickManageFlag = true;
      	// this.examineResult = row.examineResult;
      	this.$router.push('/tcd/'+row.id)
      },
      handleCurrentChange(val){
      	this.listParam.page = val;
  //     	mySignupList(this.listParam).then((data) => {
		// 	this.datalist = data.data.data;
		// 	this.total = parseInt(data.data.recordsTotal);
		// })
      },
      handleAreaChange(){

      },
      updateCity: function () {
        if(this.searchform.province==='选择省份'){
        	this.searchform.city = '请选择';
        	return false;
        }
        for (var i in this.provinceArr) {
          var obj = this.provinceArr[i];
          if (obj.name == this.searchform.province) {
            this.cityArr = obj.sub;
            break;
          }
        }
        this.searchform.city = this.cityArr[1].name;
      },
      updateDistrict: function () {
        if(this.searchform.city==='请选择'){
        	this.searchform.district = '请选择';
        	return false;
        }
        for (var i in this.cityArr) {
          var obj = this.cityArr[i];
          if (obj.name == this.searchform.city) {
            this.districtArr = obj.sub;
            break;
          }
        }
        this.searchform.district = this.districtArr[1].name;
      },
      searchClass(){
      	this.listParam.queryText = JSON.stringify(this.searchform)
  //     	mySignupList(this.listParam).then((data) => {
		// 	this.datalist = data.data.data;
		// 	this.total = parseInt(data.data.recordsTotal);
		// })
      },
      cancelSignUp(cteId,tcId){
      	this.$confirm('确定取消报名培训班吗?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
	        	let d = {
	        		cteId:cteId,
	        		tcId:tcId
	        	}
		  //     	deleteSignUp(d).then((data) => {
		  //     		this.$message({
			 //          	message: '取消成功',
			 //          	type: 'success'
			 //        });
				// 	mySignupList(this.listParam).then((data) => {
				// 		this.datalist = data.data.data;
				// 		this.total = parseInt(data.data.recordsTotal);
				// 	})
				// })
			})
      	},
      	dialogShow(opinion){
      		this.auditStatement = opinion;
      		this.dialogVisible = true;
      	}
    },
	mounted(){
		// mySignupList(this.listParam).then((data) => {
		// 	this.datalist = data.data.data;
		// 	this.total = parseInt(data.data.recordsTotal);
		// })
	},
	watch: {
	    'searchform.province': function () {
	      	this.updateCity();
	    },
	    'searchform.city': function () {
	      	this.updateDistrict();
	    }
	}
}
</script>
<style scoped>

</style>
<style lang="less">
	
</style>