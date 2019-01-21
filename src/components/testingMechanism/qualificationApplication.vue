<template>
	<div id="qa" class="qa">
		<el-tabs v-if="hasWrite" v-model="activeName" type="card" @tab-click="handleClick">
		    <el-tab-pane label="基本信息" name="0">
				<qastep1 v-on:submitSuccess="qastep1HasSubmit" :rdata="rdata" :hasAdd="hasInformation" :hasWrite="hasWrite"></qastep1>
		    </el-tab-pane>
		    <el-tab-pane label="场地设施及人员" name="1">
		    	<qastep2 v-on:submitSuccess="qastep2HasSubmit" :rdata="rdata" :hasAdd="hasField" :hasWrite="hasWrite"></qastep2>
		    </el-tab-pane>
		    <el-tab-pane label="消防安全设施" name="2">
		    	<qastep3 v-on:submitSuccess="qastep3HasSubmit" :rdata="rdata" :hasAdd="hasFireSafetyFacilities" :hasWrite="hasWrite"></qastep3>
		    </el-tab-pane>
		    <el-tab-pane label="医疗保障设施" name="3">
				<qastep4 v-on:submitSuccess="qastep4HasSubmit" :rdata="rdata" :hasAdd="hasMedicalSecurityFacilities" :hasWrite="hasWrite"></qastep4>
		    </el-tab-pane>
		    <el-tab-pane label="卫生环境" name="4">
				<qastep5 v-on:submitSuccess="qastep5HasSubmit" :rdata="rdata" :hasAdd="hasHygienicEnvironment" :hasWrite="hasWrite"></qastep5>
		    </el-tab-pane>
		</el-tabs>
		<div v-else>
			<div v-if="stepActive!==''">
				<el-steps class="xstep" :active="stepActive" finish-status="success" align-center simple>
				  <el-step :class="{hasFinished:0<finishStepNum,pointerStep:0<=finishStepNum}" @click.native="gostep(0)" title="基本信息" description="111"></el-step>
				  <el-step :class="{hasFinished:1<finishStepNum,pointerStep:1<=finishStepNum}" @click.native="gostep(1)" title="场地设施及人员"></el-step>
				  <el-step :class="{hasFinished:2<finishStepNum,pointerStep:2<=finishStepNum}" @click.native="gostep(2)" title="消防安全设施"></el-step>
				  <el-step :class="{hasFinished:3<finishStepNum,pointerStep:3<=finishStepNum}" @click.native="gostep(3)" title="医疗保障设施"></el-step>
				  <el-step :class="{hasFinished:4<finishStepNum,pointerStep:4<=finishStepNum}" @click.native="gostep(4)" title="卫生环境"></el-step>
				</el-steps>
				<qastep1 v-on:submitSuccess="qastep1HasSubmit" :tmId="tmId" :rdata="rdata" v-if="stepActive==0" :hasWrite="hasWrite" :hasAdd="hasInformation"></qastep1>
				<qastep2 v-on:submitSuccess="qastep2HasSubmit" :tmId="tmId" :rdata="rdata" v-if="stepActive==1" :hasWrite="hasWrite" :hasAdd="hasField"></qastep2>
				<qastep3 v-on:submitSuccess="qastep3HasSubmit" :tmId="tmId" :rdata="rdata" v-if="stepActive==2" :hasWrite="hasWrite" :hasAdd="hasFireSafetyFacilities"></qastep3>
				<qastep4 v-on:submitSuccess="qastep4HasSubmit" :tmId="tmId" :rdata="rdata" v-if="stepActive==3" :hasWrite="hasWrite" :hasAdd="hasMedicalSecurityFacilities"></qastep4>
				<qastep5 v-on:submitSuccess="qastep5HasSubmit" :tmId="tmId" :rdata="rdata" v-if="stepActive==4" :hasWrite="hasWrite"></qastep5>
			</div>
		</div>
  </div>
</template>
<script>
import {qaGetDetail} from '@/service/testmData'
// import side from '../common/side.vue'
import qastep1 from './qastep/qastep1.vue'
import qastep2 from './qastep/qastep2.vue'
import qastep3 from './qastep/qastep3.vue'
import qastep4 from './qastep/qastep4.vue'
import qastep5 from './qastep/qastep5.vue'
export default {
  	name: 'qa',
  	data () {
    	return {
    		hasField:0,
    		hasFireSafetyFacilities:0,
    		hasHygienicEnvironment:0,
    		hasMedicalSecurityFacilities:0,
    		hasInformation:0,
    		tmId:'',
    		activeName: '0',
    		stepActive:0,
    		finishStepNum:0,
    		hasWrite:false,
    		rdata:{}
	    }
	},
	components: {
	  qastep1,qastep2,qastep3,qastep4,qastep5
	},
	methods: {
      qastep1HasSubmit:function(childValue){
      	window.scrollTo(0, 0);
      	this.stepActive=1;
      	this.addOrDetail();
      },
      qastep2HasSubmit:function(childValue){
      	window.scrollTo(0, 0);
      	this.stepActive=2;
      	this.addOrDetail();
      },
      qastep3HasSubmit:function(childValue){
      	window.scrollTo(0, 0);
      	this.stepActive=3;
      	this.addOrDetail();
      },
      qastep4HasSubmit:function(childValue){
      	window.scrollTo(0, 0);
      	this.stepActive=4;
      	this.addOrDetail();
      },
      qastep5HasSubmit:function(childValue){
      	window.scrollTo(0, 0);
      	// 跳转到详情
      	this.addOrDetail();
      	// this.stepActive=0;
      	// this.hasWrite=true;

      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      addOrDetail(){
      	qaGetDetail().then((data) => {
      		if(data.applyDetail){
      			this.rdata = data.applyDetail;
      			this.tmId = data.applyDetail.tmId;
      		}
      		this.hasInformation = data.hasInformation;
      		this.hasField = data.hasField;
      		this.hasFireSafetyFacilities = data.hasFireSafetyFacilities;
      		this.hasMedicalSecurityFacilities = data.hasMedicalSecurityFacilities;
      		this.hasHygienicEnvironment = data.hasHygienicEnvironment;
	        // if(this.hasHygienicEnvironment){//已填写完
	        // 	this.hasWrite=false;//true
	        // }else{//未填写完
	        	this.finishStepNum = this.hasInformation + this.hasField + this.hasFireSafetyFacilities + this.hasMedicalSecurityFacilities;
	        	this.activeName = String(this.stepActive)
	        	this.hasWrite=false;
	        // }
	        // 是否登录
	        if(this.$store.state.isLogin){
		  		if(this.hasWrite){//是否已填写过
		  			
		  		}
		  	}else{
		  		
		  	}
	    });
      },
      gostep(step){
      	if(this.finishStepNum>=step){
      		this.stepActive = step
      	}
      }
    },
	mounted(){
		this.addOrDetail();

	},
	watch: {
	    
	}
}
</script>
<style lang="less">
.qa{
	.qa-form-item .el-form-item__label{
		font-size: .16rem;
	}
	.el-tabs__item:hover {
	    color: @colorRed;
	    cursor: pointer;
	}
	.el-tabs__item.is-active {
	    color: @colorRed;
	}
	.xstep{
		padding-left: 4%;
		background-color: transparent;
		.el-step{
			flex-basis:15% !important;
			background:url('/static/iconimg/qa_01.png') no-repeat;
			.el-step__head{
				position: absolute;
			    top: 15px;
			    right: 25px;
			    text-align: center;
			    z-index: 1000;
			    padding-right: 0;
			    background-color: #FFFFFF;
			    color: #444444;
			    border-radius: 50%;
			    &:before{
				    content: '1';
				    position: absolute;
				    left: 4px;
				    top: -1px;
				    font-size: 12px;
			    }
				.el-step__icon.is-text{
					border:0px;
					visibility: hidden;
				}
			}
			.el-step__head.is-process{
				&:before{
					// color:@colorRed;
				}
			}
			.el-step__head.is-success{
				color: @colorRed;
				.el-step__line{
					visibility: hidden;
				}
			}
			.el-step__main{
				.el-step__title{
					margin-left:25px;
					line-height:1;
					padding:10px 0;
					font-size:12px;
					color:#444444;
				}
				.is-process{
					// color: @colorRed;
				}
				.el-step__title.is-success{
					color: @colorRed;
				}
				.el-step__arrow{
					display: none;
				}
			}
		}
		.hasFinished{
			// color: @colorRed;
			// .el-step__head{
			// 	color: @colorRed;
			// }
			// .el-step__main{
			// 	.el-step__title{
			// 		color: @colorRed;
			// 	}
			// }
		}
		.pointerStep{
			cursor:pointer;
			color: @colorRed;
			.el-step__head{
				color: @colorRed;
			}
			.el-step__main{
				.el-step__title{
					color: @colorRed;
				}
			}
		}
		.el-step:nth-of-type(2){
			.el-step__head{
				&:before{
					content:'2';
				}
			}
		}
		.el-step:nth-of-type(3){
			.el-step__head{
				&:before{
					content:'3';
				}
			}
		}
		.el-step:nth-of-type(4){
			.el-step__head{
				&:before{
					content:'4';
				}
			}
		}
		.el-step:nth-of-type(5){
			.el-step__head{
				&:before{
					content:'5';
				}
			}
		}
	}
}
</style>