<template>
	<div id="ceun" class="ceun">
		<el-form class="x-form clearfix">
			<el-form-item class="cedv" v-for="(item,index) in dataList" :key="index">
				<div>
					<div class="title">{{item.title}}</div>
					<div class="imgUpload" @click="certificateReceive(index)">
		  				<el-upload class="hideupload"
						  	list-type="picture-card"
						  	action=""
						  	:file-list="imgList"
						  	name="uploadImage"
						  	:on-preview="handlePictureCardPreview">
						  	<!-- <i class="el-icon-plus"></i> -->
						</el-upload>
					</div>
					<p class="receive"><a @click="certificateReceive(index)">领取</a></p>
				</div>
  			</el-form-item>
  		</el-form>
  		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
  	</div>
</template>
<script>
export default {
  	name: 'ceun',
  	data () {
    	return {
    		imgList:[
    			{url:'/static/img/cv2.jpg'}
    		],
    		dataList:[
    			{title:'第二级运动员'},
    			{title:'第二级运动员'},
    			{title:'第二级运动员'},
    			{title:'第二级运动员'},
    			{title:'第二级运动员'},
    			{title:'第二级运动员'}
    		],
    		dialogVisible:false,
    		dialogImageUrl:''
	    }
	},
	methods: {
	    handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	    },
	    certificateReceive(index){
	    	this.dataList.splice(index,1);
	    	this.$message.success('证书已领取');
	    }
      
    },
	mounted(){

	},
	watch: {
	    
	}
}
</script>
<style lang="less">
.ceun{
	.cedv{
		width: 188px;
		float: left;
		margin-right: 59px;
		margin-bottom: 20px;
		&:nth-of-type(4n){
			margin-right: 0;
		}
		.title{
			font-size:14px;
			text-align: center;
			color:#444444;
		}
		.imgUpload{
			line-height:1.4;
			.el-upload-list--picture-card{
				.el-upload-list__item{
					width:100%;
					height:126px;
					margin-bottom: 0;
					border:0px;
					.el-upload-list__item-status-label{
						display:none;
					}
					.el-upload-list__item-actions{
						cursor:pointer;
						.el-upload-list__item-preview{
							display:none;
						}
						&:after{
							width:65px;
							margin-top:40px;
							content:'点击领取后可查看证书';
							font-size:12px;
						}
					}
				}
			}
			&:hover{
				+ p.receive{
					a{
						color:#e6000f;
					}
				}
			}
		}
		.receive{
			width: 100%;
			text-align: center;
			a{
				color:#333;
				&:hover{
					color:#e6000f;
				}
			}
		}

	}
}
</style>

