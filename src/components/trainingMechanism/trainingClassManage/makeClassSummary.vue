<template>
	<div class="mcs">
		<h3 style="margin-top:20px;">上传办班总结</h3>
		<div style="margin-top:30px;">
			<el-col :span="12">
				<el-upload 
		            class="upload-demo"
		            action=""
		            :on-change="handleChange" 
		            :on-remove="handleRemove"
		            :before-upload="beforeUpload"
		            :file-list="fileList"
		            accept=".docx">
		            <el-button size="small" type="primary">上传附件</el-button> (注:必须是word文档且大小不能超过5MB)
		        </el-upload>
		        <a v-if="existDocx" style="display:block" download="" @click="download" title="下载">下载</a>
		    </el-col>

        </div>
        
        <!-- <el-button   size="small" type="primary">下载word</el-button> -->
  	</div>
</template>
<script>
import {uploadSummary,deleteSummary,classDetailAll,summaryExportTemplate} from '../../../service/getData'
export default {
  	name: 'mary',
  	props:['rdata'],
  	data () {
    	return {
    		API_ROOT:API_ROOT,
	        existDocx:false,
	        tcId:this.$route.params.id,
	        openingClassEndTime:this.$route.query.openingClassEndTime,
	        uploadFile:'',
	        fileList:[]
	    }
	},
	methods: {
      	handleChange(file, fileList){
   //    		this.fileList = fileList
			// this.fileList[0]['name'] = this.fileList[0]['fileName']
		},
		handleRemove () {
			if(this.existDocx){
				deleteSummary({tcId:this.tcId}).then((data) => {
					this.existDocx = false;
					this.fileList = [];
				})
			}
		},
		handleSuccess (response, file, fileList) {

		},
		download(){
      		summaryExportTemplate(this.tcId).then((data) => {
				var blob = data.data;
				if (blob instanceof Blob) { // 判断是否二进制
					// console.log(blob)
					var filename = this.fileList[0].name;
					var a = document.createElement("a");
					document.body.appendChild(a);
					// 创建URL对象
					var url = window.URL.createObjectURL(blob);
					a.href = url;
					a.download = filename;
					a.click();
					// 移除URL对象
					window.URL.revokeObjectURL(url);
				}
			})
      	},
		beforeUpload(file){
	        var isLt5M = file.size / 1024 / 1024 < 5;
	        if (!isLt5M) {
	          this.$message.error('图片大小不能超过5MB!');
	          return false;
	        }
	        let formdata = new FormData();
			formdata.append('tcId',this.tcId);
			formdata.append('openingClassEndTime',this.openingClassEndTime);
   			formdata.append('uploadFile',file);
   			if(this.fileList.length>0){
   				deleteSummary({tcId:this.tcId}).then((data) => {
					this.existDocx = false;
					this.fileList = [];
					uploadSummary(formdata).then((data) => {
						if(data.data.code==500){
	   						this.$message.error(data.data.message);
	   						return false;
	   					}
						classDetailAll(this.tcId).then((data) => {
							this.fileList.push(data.data.at);
							for(var i=0;i<this.fileList.length;i++){
					          this.fileList[i].url = this.API_ROOT+this.fileList[i].filePath;
					          this.fileList[i].name = this.fileList[i].fileName;
					        }
					        this.existDocx = true;
					        this.$message.success('上传成功');
						})
					})
				})
   			}else{
   				uploadSummary(formdata).then((data) => {
   					if(data.data.code==500){
   						this.$message.error(data.data.message);
   						return false;
   					}
					classDetailAll(this.tcId).then((data) => {
						this.fileList.push(data.data.at);
						for(var i=0;i<this.fileList.length;i++){
				          this.fileList[i].url = this.API_ROOT+this.fileList[i].filePath;
				          this.fileList[i].name = this.fileList[i].fileName;
				        }
				        this.existDocx = true;
				        this.$message.success('上传成功');
					})
				})
   			}
	        return false;
	    }
    },
	mounted(){
		if(this.rdata){
			this.fileList.push(this.rdata);
			for(var i=0;i<this.fileList.length;i++){
	          this.fileList[i].url = this.API_ROOT+this.fileList[i].filePath;
	          this.fileList[i].name = this.fileList[i].fileName;
	        }
	        this.existDocx = true;
		}
		
	},
	watch: {
	   
	}
}
</script>
<style scoped>

</style>
<style>
.mcs .el-upload__input{
	display: none;
}
</style>