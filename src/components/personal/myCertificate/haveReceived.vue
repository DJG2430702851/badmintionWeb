<template>
	<div id="ceha" class="ceha">
		<el-form class="x-form clearfix">
			<el-form-item class="cedv" v-for="(item,index) in dataList" :key="index">
				<div>
					<div class="title">{{item.title}}</div>
					<div class="imgUpload">
		  				<el-upload class="hideupload"
						  	list-type="picture-card"
						  	action=""
						  	:file-list="imgList"
						  	name="uploadImage"
						  	:on-preview="handlePictureCardPreview">
						  	<i class="el-icon-plus"></i>
						</el-upload>
					</div>
					<a class="receive" @click="applyCertificateDialogVisible=true">申请纸质证书</a>
				</div>
  			</el-form-item>
  		</el-form>
  		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		<el-dialog class="applyCertificateDialog" :visible.sync="applyCertificateDialogVisible">
			<div slot="title"><h3>申请纸质证书</h3></div>
			<div>
			  	<el-form ref="acform" :rules="rules" label-width="125px" label-position="right" class="x-form acform" :model="acform">
					<el-form-item label="邮寄接收者" prop="postalReceiver">
		  				<el-input v-model="acform.postalReceiver"></el-input>
		  			</el-form-item>
		  			<el-form-item label="联系方式" prop="contact">
		  				<el-input v-model="acform.contact"></el-input>
		  			</el-form-item>
		  			<el-form-item label="邮寄地址" prop="postalAddress">
		  				<el-input v-model="acform.postalAddress"></el-input>
		  			</el-form-item>
			  	</el-form>
		  	</div>
		  	<div slot="footer"><el-button class="elbtn-red btnSubmit" @click="formSubmit('acform')">保&nbsp;存</el-button></div>
		</el-dialog>
  	</div>
</template>
<script>
export default {
  	name: 'myce',
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
    		acform:{

    		},
    		dialogVisible:false,
    		applyCertificateDialogVisible:false,
    		dialogImageUrl:'',
    		rules:{
	      		postalReceiver:[
		        	{ required: true, message: '请输入接收人', trigger: 'blur'}
		        ],
		        contact:[
		        	{ required: true, message: '请输入联系方式', trigger: 'blur'}
		        ],
		        postalAddress:[
		        	{ required: true, message: '请输入邮寄地址', trigger: 'blur'}
		        ]
		    }
	    }
	},
	methods: {
	    handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	    },
	    formSubmit(formName) {
      		this.$refs[formName].validate((valid) => {
      			if(valid){
      				this.applyCertificateDialogVisible = false;
      				this.$message.success('申请成功!');
      			}
      		})
      	}
      
    },
	mounted(){

	},
	watch: {
	    
	}
}
</script>
<style lang="less">
.ceha{
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
					// .el-upload-list__item-actions{
					// 	.el-upload-list__item-preview{
					// 		display:none;
					// 	}
					// 	&:after{
					// 		width:65px;
					// 		margin-top:40px;
					// 		content:'点击领取后可查看证书';
					// 		font-size:12px;
					// 	}
					// }
				}
			}
		}
		.receive{
			display: inline-block;
			width: 100%;
			text-align: center;
			color:#333;
			&:hover{
				color:#e6000f;
			}
		}
	}
	.applyCertificateDialog{
		.el-dialog{
			width:800px;
			height: 400px;
			.el-dialog__header{
				padding-bottom:0;
				h3{
					margin-bottom:0;
					color:@colorRed;
					text-align:center;
				}
			}
			.el-dialog__body{
				padding-bottom:18px;
			}
			.el-dialog__footer{
				text-align: center;
				padding-top:0;
				.btnSubmit{
					height: 34px;
					line-height: 34px;
					width: 60px;
					text-align: center;
					padding: 0;
				}
			}
			.acform{
				width: 624px;
				margin:0 auto;
				.el-input{
					width: 100%;
				}
			}
		}
	}
}

</style>

