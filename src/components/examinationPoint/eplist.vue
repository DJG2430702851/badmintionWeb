<template>
	<div id="eplist" class="eplist">
		<div class="epsearch">
			<areaSelect labelWidth="0px" formWidth="100%" :span="5" :rules="{}" selectSize="small" ref="areaCom">
				<div slot="epl">
					<el-col :span="2">
						<el-button class="elbtn-red btn-submit" style="margin-top:3px;" @click="searchAll()" size="small" type="primary">清  空</el-button>
					</el-col>
					<el-col :span="5">
				    	<el-form-item>
					        <el-input size="small" @keyup.native.enter="getList()" v-model="listParam.queryText.mechanismFullname" placeholder="请输入搜索">
					        	<i @click="getList()" style="cursor:pointer" slot="suffix" class="el-input__icon el-icon-search"></i>
					        </el-input>
					    </el-form-item>
					</el-col>
				</div>
			</areaSelect>
		</div>
		<div>
			<ul class="ep-ul clearfix">
				<li v-for="(item,index) in eplist" :key="index">
					<div class="img-wrap"><img :src="item.url" alt=""></div>
					<p class="p1">{{item.mechanismFullname}}</p>
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
import {getImage} from '@/service/commonData'
import {getExaminationPointList} from '@/service/indexData'
export default {
  	name: 'eplist',
  	data () {
    	return {
	      	listParam:{
	      		size:pageSize,
	      		page:1,
	      		queryText:{
	      			mechanismFullname:''
	      		}
	      	},
	      	total:0,
	      	eplist:[],
	      	defaultImg: 'this.src="/static/images/default.jpg"',
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
	filters:{
		createdDateFormat(param){
			if(!param){
				return
			}
			return param.split(' ')[0]
		}
	},
	methods:{
		contentfilter(val){
			// return trim(val).substr(0,500)+'...'
			let result = val.replace(/(^\s+)|(\s+$)/g,"");
			return result.replace(/\s/g,"").substr(0,500)+'...';
		},
		handleCurrentChange(val){
			this.listParam.page = val;
	      	this.getList();
		},
		searchAll(){
      		this.$refs['areaCom'].pform = {
      			province:'',
      			city:'',
      			district:''
      		}
      		this.listParam.queryText.mechanismFullname = '';
      		this.$refs['areaCom'].areaSearch('clear');
      	},
		getList(){
			this.listParam.queryText = Object.assign({},this.listParam.queryText,this.searchform)
			getExaminationPointList(this.listParam).then((data) => {
		  		this.eplist = data.data;
		  		for(let i=0;i<this.eplist.length;i++){
		  			getImage(this.eplist[i].atachmentsInstitutionalDtos[0].imageUrl).then((data) => {
		    			this.$set(this.eplist[i], 'url', URL.createObjectURL(data))
		    		})
		  		}
		  		this.total = parseInt(data.recordsTotal);
		  	})
		},
	    areaSelectListen(){console.log(11)
	    	this.$refs['areaCom'].searchflag = true;
		  	this.areaSelect.$off('changeAreaSearch');
	  	    this.areaSelect.$on('changeAreaSearch', (val)=>{
	            this.searchform = Object.assign({},this.searchform,val);
	            this.getList();
	        })
	    }
	},
	mounted(){
		// 省市区组件的监听
		this.areaSelectListen();

		this.getList();
	  	
	},
	watch: {
	    
	}
	
}
</script>
<style lang="less">
	.eplist{
		margin-bottom: 50px;
		.epsearch{
			width: 800px;
			margin:0 auto;
		}
		.ep-ul{
			li{
				float: left;	
				width: 218px;
				height:300px;
				margin-right: 27.5px;
				margin-top: 10px;
				.img-wrap{
					width: 100%;
					height: 218px;
					img{
						width: 100%;
						height: 218px;
					}
				}
				p{
					text-align: center;
					font-size:14px;
					color:#111111;
					padding: 20px 25px;
				}
				&:nth-of-type(5n){
					margin-right: 0;
				}
			}
		}
	}
</style>