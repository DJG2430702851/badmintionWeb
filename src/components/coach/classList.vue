<template>
	<div class="cll">
		<!-- <div>
			<el-select v-model="area" width="500" clearable placeholder="选择指定地区的培训班">
			    <el-option
			      v-for="item in areaOptions"
			      :change="handleAreaChange"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
		</div> -->
		<el-form ref="searchform" label-position="right" class="x-form" :model="searchform">
			<el-row class="areaWrap" :gutter="10">
				<el-col :span="6">
					<el-form-item>
				        <el-select size="small" v-model="searchform.province" placeholder="请选择省">
				          <el-option
				            v-for="(item,index) in provinceArr"
				            :value="item.name"
				            :key="index">
				          </el-option>
				        </el-select>
				    </el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item>
				        <el-select size="small" v-model="searchform.city" placeholder="请选择市">
				          <el-option
				            v-for="(item,index) in cityArr"
				            :value="item.name"
				            :key="index">
				          </el-option>
				        </el-select>
				    </el-form-item>
				</el-col>
			    <el-col :span="6">
			    	<el-form-item>
				        <el-select size="small" v-model="searchform.district" placeholder="请选择区">
				          <el-option
				            v-for="(item,index) in districtArr"
				            :value="item.name"
				            :key="index">
				          </el-option>
				        </el-select>
				    </el-form-item>
				</el-col><el-button style="margin-top:5px;" @click="searchClassAll" size="small" type="primary">清  空</el-button><el-button style="margin-top:5px;" @click="searchClass" size="small" type="primary">查  询</el-button>
			</el-row>
		</el-form>
	    <div>
	    	<ul class="cll-list-ul">
	    		<li v-for="(item,index) in datalist">
	    			<div class="clearfix" style="margin-top:10px;">
		    			<div style="float:left">
		    				<h4 style="display:inline-block">{{item.name}}</h4>({{item.testMechanism.mechanismFullname}})
		    				<p style="margin-top:5px;">报名时间：{{ item.applyStartTime }} 至 {{ item.applyEndTime }}</p>
		    			</div>
						<div class="cll-dv">
							<el-button class="el-button el-button--primary" size="small" style="float:right" @click="$router.push({path:'/cld/'+item.tcId,query:{tcId:item.tcId}})"><span v-if="isDisabled(item.applyStartTime)">班级信息</span><span v-else>立即报名</span></el-button>
						</div>
					</div>
	    		</li>
	    		<!-- <li>
	    			<div class="clearfix" style="margin-top:10px;">
		    			<div style="float:left">
		    				<h4>A班</h4>
		    				<p style="margin-top:5px;">xx培训机构 2018-10-10</p>
		    			</div>
						<div class="cll-dv">
							<el-button size="small" style="float:right" @click="$router.push('/cld/')" type="success">立即报名</el-button>
						</div>
					</div>
	    		</li>
	    		<li>
	    			<div class="clearfix" style="margin-top:10px;">
		    			<div style="float:left">
		    				<h4>A班</h4>
		    				<p style="margin-top:5px;">xx培训机构 2018-10-10</p>
		    			</div>
						<div class="cll-dv">
							<el-button size="small" style="float:right" @click="$router.push('/cld/')" type="success">立即报名</el-button>
						</div>
					</div>
	    		</li> -->
	    	</ul>
	    </div>
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
import areadata from '../common/searchAreadata'
import {classListTCL,deleteSignUp} from '../../service/getData'
export default {
  	name: 'tcl',
  	data () {
    	return {
    		listParam:{
        		page:1,
        		size:pageSize,
        		pcId:localStorage.getItem('userId'),
        		queryText:''
      		},
      		total:0,
      		datalist:[],
	        activeName:'first',
	        hasClickManageFlag:false,
	        examineResult:0, //0待审核,1审核通过,2审核未通过
	        // areaOptions: [{
	        //   value: '1',
	        //   label: '上海'
	        // }, {
	        //   value: '2',
	        //   label: '广东'
	        // }, {
	        //   value: '3',
	        //   label: '江苏'
	        // }, {
	        //   value: '4',
	        //   label: '湖北'
	        // }, {
	        //   value: '5',
	        //   label: '浙江'
	        // }],
	        // area: '',
	        searchform:{
	        	province:'',
		        city:'',
		        district:''
	        },
	        provinceArr: areadata.arrAll,
	        districtArr:[],
	        cityArr:[],
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
				return '审核未通过'
			}
		}
	},
	methods: {
      manage(row){
      	// this.hasClickManageFlag = true;
      	// this.examineResult = row.examineResult;
      	this.$router.push('/tcd/'+row.id)
      },
      handleCurrentChange(val){
      	this.listParam.page = val;
      	classListTCL(this.listParam).then((data) => {
			this.datalist = data.data.data;
			this.total = parseInt(data.data.recordsTotal);
		})
      },
      handleAreaChange(){

      },
      isDisabled(time){
      	return (new Date(time)).getTime() > new Date().getTime()
      },
      updateCity: function () {
        if(this.searchform.province==='全部'){
        	this.searchform.city = '';
        	this.searchform.province = '';
        	this.districtArr = [];
        	this.cityArr = [];
        	return false;
        }
        if(this.searchform.district == '全部'){
        	this.searchform.district = '';
        	this.districtArr = [];
        	return false;
        }
        for (var i in this.provinceArr) {
          var obj = this.provinceArr[i];
          if (obj.name == this.searchform.province) {
            this.cityArr = obj.sub;
            break;
          }
        }
        this.searchform.city = this.cityArr[0].name;
      },
      updateDistrict: function () {
        if(this.searchform.city===''){
        	this.searchform.district = '';
        	this.districtArr = [];
        	return false;
        }
        if(this.searchform.city == '全部'){
        	this.searchform.city = '';
        	return false;
        }
        for (var i in this.cityArr) {
          var obj = this.cityArr[i];
          if (obj.name == this.searchform.city) {
            this.districtArr = obj.sub;
            break;
          }
        }
        this.searchform.district = this.districtArr[0].name;
      },
      searchClass(){
      	this.listParam.queryText = JSON.stringify(this.searchform)
      	classListTCL(this.listParam).then((data) => {
			this.datalist = data.data.data;
			this.total = parseInt(data.data.recordsTotal);
		})
      },
      searchClassAll(){
      	this.searchform.province = '';
      	this.searchform.city = '';
      	this.searchform.district = '';
      	this.listParam.queryText = JSON.stringify(this.searchform)
      	classListTCL(this.listParam).then((data) => {
			this.datalist = data.data.data;
			this.total = parseInt(data.data.recordsTotal);
		})
      },
      cancelSignUp(cteId){
      	this.$confirm('确定取消报名培训班吗?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
		      	deleteSignUp(cteId).then((data) => {
		      		this.$message({
			          	message: '取消成功',
			          	type: 'success'
			        });
					classListTCL(this.listParam).then((data) => {
						this.datalist = data.data.data;
						this.total = parseInt(data.data.recordsTotal);
					})
				})
			})
      	}
    },
	mounted(){
		classListTCL(this.listParam).then((data) => {
			this.datalist = data.data.data;
			this.total = parseInt(data.data.recordsTotal);
		})
	},
	watch: {
	    'searchform.province': function () {
	    	if(this.searchform.province!=''){
	    		this.updateCity();
	    	}
	    },
	    'searchform.city': function () {
	      	this.updateDistrict();
	    },
	    'searchform.district': function () {
	      	if(this.searchform.district=='全部'){
	    		this.searchform.district = '';
	    	}
	    }
	}
}
</script>
<style scoped>

</style>
<style lang="less">
	ul.cll-list-ul{
		li{
			border-bottom: 2px solid #EEEEEE;
			padding-bottom:10px;
			.cll-dv{
				margin-top:20px;
			}
		}
		
	}
</style>