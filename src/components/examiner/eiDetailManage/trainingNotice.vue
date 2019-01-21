<template>
	<div id="eitn" class="eitn">
        <div class="dv1">
        	<el-button v-if="$route.query.signType!=1" class="el-button elbtn-blue" style="padding:9px 20px;" @click="goUrl('/eisu')">立即报名</el-button>
        </div>
        <div class="tcontent">
        	<div class="dv2">
	        	<hgroup>
		        	<h4>{{classAll.title}}</h4>
					<p class="p1">创建时间：{{classAll.createdDate}}</p>
				</hgroup>
			</div>
			<div v-html="classAll.content">
				
			</div>
        </div>
        <div class="dv1">
        	<el-button v-if="$route.query.signType!=1" class="el-button elbtn-blue" style="padding:9px 20px;" @click="goUrl('/eisu')">立即报名</el-button>
        </div>
        
	</div>
</template>
<script>
import {getClassNotice} from '@/service/eiData'
export default {
  	name: 'eitn',
  	data () {
    	return {
    		classAll:{
    			// applyStartTime:this.applyStartTime
    		},
    		appraiserId:this.$route.query.appraiserId
	    }
	},
	methods: {
		isDisabled(time){
	      	return (new Date(time)).getTime() > new Date().getTime()
	    },
	    goUrl(path){
	    	this.$router.push({path:path,query:{type:'signup',appraiserId:this.$route.query.appraiserId}});
	    }
    },
	mounted(){
		getClassNotice(this.appraiserId).then((data)=>{
			this.classAll = data.data;
		})
	},
	watch: {
	   
	}
}
</script>
<style lang="less">
.eitn{
	padding-bottom:50px;
	.dv1{
		margin:30px 0 10px;
		text-align: right;
	}
	.tcontent{
		padding-bottom: 40px;
		.dv2{
			border-bottom: 1px dashed #CCCCCC;
			padding-bottom:5px;
			margin-bottom: 30px;
			hgroup{
				width: 508px;
				
				margin:0 auto;
				text-align: center;
				h4{
					font-weight: bold;
					width: 468px;
					line-height:1.6;
				}
				.p1{
					text-align: center;
					margin-bottom: 20px;
					color:#999999;
				}
			}
		}
	}
}
</style>