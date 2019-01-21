<template>
	<div id="cv" class="cv">
		<el-form class="x-form">
			<el-row>
			  	<el-col :span="8"  v-for="(item,index) in dataList" :key="index">
			  		<div class="grid-content bg-purple" style="padding:10px 0;">
			  			<p class="certificateTitle">{{item.gradeName}}</p>
			  			<div class="certificateImgWrap" @mouseover="maskflag=true" @mouseout="maskflag=false">
			  				<img class="certificateImg" :src="item.attachments.filePath">
								<div class="certificateImgMaskWrap" v-if="maskflag==true" @click="certificateBigImgView(item.attachments.filePath)">
									<span>查看证书</span>
				  					<div class="certificateImgMask"></div>
								</div>
			  			</div>
			  			<div class="certificateBtnDv">
			  				<span @click="receiveCertificate(item)">查看</span>
			  				<!-- <span v-else @click="$router.push('/cm')">申请纸质证书</span> -->
			  			</div>
			  		</div>
			  	</el-col>
			</el-row>
		</el-form>
		<el-dialog
		  	title=""
		  	:visible.sync="certificateBigImgViewFlag"
		  	:class="{'imgHide':imgHideFlag}"
		  	:before-close="handleClose">
		  	<div class="certificateBigImgViewContent">
				<img @load="imageLoaded" width="100%" v-bind:src="imageUrl" alt="">
			</div>
		</el-dialog>
  	</div>
</template>
<script>
import {certificateSearch} from '@/service/sportsmanData'
export default {
  	name: 'cv',
  	data () {
    	return {
    		API_ROOT:API_ROOT,
    		cong1:false,
    		cong2:false,
    		certificateEffectFlag:false,
    		imgHideFlag:true,
    		hasReceive:false,
    		maskflag:false,
    		certificateBigImgViewFlag:false,
    		imageUrl:'',
    		qaimg1List:[{url:'static/img/cv.jpg'}],
    		dialogLogistics:false,
    		logisticsForm:{
    			userName:'',
    			phone:'',
    			address:'',
    			loginName:''
    		},
    		rdata:[
    			{gradeName:'第二级运动员',attachments:{filePath:"/static/img/cv2.jpg"},mailStatus:2},
    			{gradeName:'第二级运动员',attachments:{filePath:"/static/img/cv2.jpg"},mailStatus:2},
    			{gradeName:'第二级运动员',attachments:{filePath:"/static/img/cv2.jpg"},mailStatus:2}
    		],
    		dataList:[
    			{
    				gradeName:'第二级运动员',
    				attachments:{
	    				filePath:"/static/images/cv.jpg"
	    			},
	    			mailStatus:0
    			}
    		],
    		listParam:{
    			size:pageSize,
    			page:1,
    			queryText:{
    				applyer:this.$route.query.applyer,
    				certificateType:this.$route.query.certificateType,
    				certificateNumber:this.$route.query.certificateNumber
    			}
      		}
	    }
	},
	components: {

	},
	methods: {
      
      handleClose(done){
      	done();
      },
      receiveCertificate(item){
      	item.hasReceive = true;
      	item.mailStatus = 1;
      	this.imageUrl = API_ROOT+item.attachments.filePath;
      	this.certificateEffectFlag = true;
      	this.cong1 = true;
      	this.hasReceive = true;
      	var vthis = this;
      	setTimeout(function(){
      		vthis.cong2 = true;
      	},1000)
      	setTimeout(function(){
      		vthis.cong1 = false;
      	},1000)
      },
      receiveCertificate2(){
      	this.$alert('恭喜您,证书领取成功！点击证书可查看证书内容。', '证书领取', {
            confirmButtonText: '确定',
            callback: action => {
	            // this.$message({
	            //     type: 'info',
	            // });
	        }
        })
        this.hasReceive = true;
      },
      certificateBigImgView(imageUrl){
      	// if(flag){
      		// this.imageUrl = API_ROOT+imageUrl;
      		this.imageUrl = imageUrl;
      		this.certificateBigImgViewFlag = true;
      	// }
      },
      imageLoaded(){
      	this.imgHideFlag = false;
      }
    },
	mounted(){
		// certificateViewList().then((data) => {
		// 	this.hasReceive = data.applyStatus;
		// 	this.rdataList = data.data.hasCertificate;
		// })

		certificateSearch(this.listParam).then((data)=>{
			console.log(data.data);
			// this.dataList = data.data;
		})
	},
	watch: {
	    
	}
}
</script>
<style lang="less">
.cv{
	padding:0 20px;
	font-size:14px;
	.certificateImg{
		width:100%;
	}
	.certificateBtnDv{
		span{
			display: inline-block;
			width:188px;
			text-align: center;
			cursor: pointer;
		}
		&:hover{
			color:#d23023;
		}
	}
	.certificateTitle{
		margin-bottom:10px;
		width:188px;
		text-align:center;
	}
	.certificateImgWrap{
		width: 188px;
		height: 126px;
		cursor:pointer;
		margin-bottom: 10px;
		position: relative;
		.certificateImg{
			width: inherit;
			height: inherit;
		}
		.certificateImgMaskWrap{
			position: absolute;
			width: inherit;
			height: inherit;
			color: #FFFFFF;
			padding-top:50px;
			text-align: center;
			left: 0;
			top: 0;
			span{
				position: relative;
				z-index: 5;

			}
			.certificateImgMask{
				width: inherit;
				height: inherit;
				position: absolute;
				background-color: #000000;
				left: 0;
				top: 0;
				opacity: 0.5;
			}
		}
	}
}
</style>
