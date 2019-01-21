<template>
	<div class="eil">
		<areaSelect class="search-areaWrap" labelWidth="0px" :rules="{}" selectSize="small" ref="areaCom"><el-button slot="tcl" class="el-button elbtn-red btn-clear" style="position:relative;top:-1px;" @click="searchClassAll" size="small">清  空</el-button></areaSelect>
	    <div>
	    	<ul class="eil-list-ul">
	    		<li v-for="(item,index) in datalist">
	    			<div class="clearfix" style="margin-top:10px;">
		    			<div style="float:left">
		    				<p class="p1" style="display:inline-block">{{item.appraiserName}}</p>
		    				<p class="p2" style="margin-top:5px;">报名时间：{{ item.registrationStartTime }} 至 {{ item.registrationEndTime }}</p>
		    			</div>
						<div class="eil-dv">
							<el-button v-if="item.signType==1" class="el-button has-signup" style="float:right;padding:9px 0;width:98px;" @click="$router.push({path:'/eid/'+item.appraiserId,query:{appraiserId:item.appraiserId,signType:item.signType}})"><span>已报名</span></el-button>
							<el-button v-else-if="isDisabled(item.registrationStartTime)" class="el-button elbtn-blue wait-signup" style="float:right;padding:9px 0;width:98px;" @click="$router.push({path:'/eid/'+item.appraiserId,query:{appraiserId:item.appraiserId,signType:1}})"><span>等待报名</span></el-button>
							<el-button v-else class="el-button imm-signup" style="float:right;padding:9px 0;width:98px;" @click="$router.push({path:'/eid/'+item.appraiserId,query:{appraiserId:item.appraiserId,signType:item.signType}})"><span>立即报名</span></el-button>
							<span></span>
						</div>
					</div>
	    		</li>
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
import areaSelect from '@/components/common/areaSelect'
import {classList} from '@/service/eiData'
export default {
  	name: 'tcl',
  	data () {
    	return {
    		listParam:{
        		page:1,
        		size:pageSize,
        		queryText:''
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
	        }
	    }
	},
	components: {
		areaSelect
	},
	methods: {
      	manage(row){
      		this.$router.push('/tcd/'+row.id)
      	},
      	handleCurrentChange(val){
      		this.listParam.page = val;
      		classList(this.listParam).then((data) => {
				this.datalist = data.data;
				this.total = parseInt(data.recordsTotal);
			})
      	},
      	handleAreaChange(){

      	},
      	isDisabled(time){
      		return (new Date(time)).getTime() > new Date().getTime()
      	},
      	isDisabled2(time){
      		return (new Date(time)).getTime() < new Date().getTime()
      	},
      	searchClass(){
      		this.listParam.queryText = JSON.stringify(this.searchform)
      		classList(this.listParam).then((data) => {
				this.datalist = data.data;
				this.total = parseInt(data.recordsTotal);
			})
      	},
      	searchClassAll(){
      		this.$refs['areaCom'].pform = {
	  			province:'',
	  			city:'',
	  			district:''
	  		}
	  		this.$refs['areaCom'].areaSearch('clear');
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
					classList(this.listParam).then((data) => {
						this.datalist = data.data;
						this.total = parseInt(data.recordsTotal);
					})
				})
			})
      	},
	    areaSelectListen(){
	    	this.$refs['areaCom'].searchflag = true;
		  	this.areaSelect.$off('changeAreaSearch');
	  	    this.areaSelect.$on('changeAreaSearch', (val)=>{
	            this.searchform = Object.assign({},this.searchform,val);
	            this.searchClass();
	        })
	    }
    },
	mounted(){
		// 省市区组件的监听
		this.areaSelectListen();

		classList(this.listParam).then((data) => {
			this.datalist = data.data;
			this.total = parseInt(data.recordsTotal);
		})
	},
	watch: {
	    
	}
}
</script>
<style scoped>

</style>
<style lang="less">
	ul.eil-list-ul{
		li{
			border-bottom:  1px dotted  #ddd;
			padding-bottom:20px;
			.eil-dv{
				margin-top:10px;
				.has-signup{
					color:#FFFFFF;
					background-color: #4294e8;
					&:hover{
						background-color: #1c7fe5;
				    	border: 1px solid #1c7fe5;
					}
				}
				.wait-signup{
					color:#FFFFFF;
					background-color: #bab5b5;
					&:hover{
						background-color: #989494;
				    	border: 1px solid #989494;
					}
				}
				.imm-signup{
					color:#FFFFFF;
					background-color: #398c2e;
					&:hover{
						background-color: #1f8d11;
				    	border: 1px solid #1f8d11;
					}
				}
			}
			.p1{
				font-size:16px;
				font-weight: bold;
				color:#111;
			}
			.p2{
				font-size:14px;
				color:#444;
			}
		}
		
	}
</style>