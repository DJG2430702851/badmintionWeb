<template>
	<div class="cc">
		<div class="text-right" style="margin:10px 20px;">
			<!-- <a href="/static/execl/课程内容模板.xlsx"><el-button size="small" type="primary">下载模板</el-button></a> -->
			<el-button size="small" @click="download" type="primary">下载模板</el-button>
			<el-upload 
	            class="cc-upload"
	            action=""
	            :before-upload="beforeUpload"
	            :auto-upload="false"
	            :on-success="handleSuccess"
	            :on-change="handleChange"
	            accept=".xlsx">
	            <el-button size="small" type="primary">导入课程</el-button>
	        </el-upload>
			<el-button size="small" @click="handleAdd" type="primary">新增课程</el-button>
		</div>
		<el-table :data="dataList" v-loading="loading" style="width: 100%" class="cctable">
		  	<!-- <el-table-column label="序号" type="index" width="80"></el-table-column> -->
		  	<el-table-column label="排序" width="65">
		        <template slot-scope="scope">
		        	<el-input v-if="scope.row.editStatus" v-model="scope.row.sort" @keyup.native="number(scope.row)"></el-input>
			        <span v-else>{{scope.row.sort}}</span>
			    </template>
	      	</el-table-column>
	      	<el-table-column label="培训内容" width="240">
		        <template slot-scope="scope">
		        	<el-input v-if="scope.row.editStatus" v-model="scope.row.content"></el-input>
			        <span v-else>{{scope.row.content}}</span>
			    </template>
	      	</el-table-column>
	      	<el-table-column label="学时数" width="90">
		        <template slot-scope="scope">
		        	<el-input v-if="scope.row.editStatus" v-model="scope.row.time"></el-input>
			        <span v-else>{{scope.row.time}}</span>
			    </template>
	      	</el-table-column>
	      	<el-table-column label="考核方式">
			    <template slot-scope="scope">
		        	<el-input v-if="scope.row.editStatus" v-model="scope.row.assessmentMethod"></el-input>
			        <span v-else>{{scope.row.assessmentMethod}}</span>
			    </template>
	      	</el-table-column>
	      	<el-table-column label="授课教师姓名">
		        <template slot-scope="scope">
		        	<el-input v-if="scope.row.editStatus" v-model="scope.row.teacher"></el-input>
			        <span v-else>{{scope.row.teacher}}</span>
			    </template>
	        </el-table-column>
	        <el-table-column label="授课教师职称">
		        <template slot-scope="scope">
		        	<el-input v-if="scope.row.editStatus" v-model="scope.row.title"></el-input>
			        <span v-else>{{scope.row.title}}</span>
			    </template>
	      	</el-table-column>
	      	
	      	<el-table-column label="操作" align="center" width="120">
		      	<template slot-scope="scope">
		        	<span class="primary pointer"><font title="保存" class="font18 el-icon-ba-baocun" v-if="scope.row.editStatus" @click="handleEditKeep(scope.$index, scope.row)"><!-- 保存 --></font><font title="编辑" class="font18 el-icon-edit" v-else @click="handleEdit(scope.$index, scope.row)"><!-- 编辑 --></font></span>&nbsp;&nbsp;
		        	<span class="danger pointer" @click="handleDelete(scope.$index, scope.row)"><!-- 删除 --><font title="删除" class="font18 el-icon-delete"></font></span>
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
  	</div>
</template>
<script>
import {courseImport,courseExportTemplate,courseFind,courseAdd,courseEdit,courseDelete} from '../../../service/getData'
export default {
  	name: 'tent',
  	data () {
    	return {
    		execlUrl:API_ROOT+'/admin/organization/trainingClass/course/import',
    		listParam:{
    			tcId:this.$route.params.id,
    			size:pageSize,
    			page:1
    		},
    		onelineData:{},
    		total:0,
    		dataList:[],
    		loading:false
	    }
	},
	methods: {
		number(row){　　
	　　　 	row.sort = row.sort.replace(/[^\.\d]/g,'');
	        row.sort = row.sort.replace('.','');
	　　},
		handleSuccess (response, file, fileList) {
			console.log(response)
		},
		handleChange(file, fileList){
			let formdata = new FormData();
			formdata.append('tcId',this.listParam.tcId);
   			formdata.append('courseFile',file.raw);
			courseImport(formdata).then((data) => {
				if(data.data.code==500){
					this.$message.error(data.data.message);
					return false;
				}
				if(data.data.code==0){
					this.$message.success('导入成功');
					courseFind(this.listParam).then((data) => {
						this.dataList = data.data.data.content;
						this.total = parseInt(data.data.data.totalElements);
						this.course.$emit('toChangeCourse','');
					})
				}
			})
		},
		beforeUpload(file){
	        // var isLt5M = file.size / 1024 / 1024 < 5;
	        // if (!isLt5M) {
	        //   this.$message.error('图片大小不能超过5MB!');
	        // }
	        // return isLt5M;
	    },
      	handleEdit(index,data){
      		
      		// if(data.trainingClassId){
      		// 	this.onelineData[data.trainingClassId] = JSON.stringify(data);
      		// }
      		this.$set(data, 'editStatus', true)
	      	
      	},
      	handleEditKeep(index,data){
      		for(var k in data){
      			if(data[k]=='' || data['sort']==null){console.log(data)
  					this.$message.error('保存失败,请填写完整!');
      				return false;
      			}
      		}
      		
      		// delete data.editStatus;
      		delete data.editStatus;
      		if(data.type){
      			delete data.type;
      			this.loading = true;
      			courseAdd(data).then((cdata) => {
					if(cdata.data.code==500){
      					this.$message.error(cdata.data.message);
      					this.$set(data, 'editStatus', true)
      					this.$set(data, 'type', 'add')
      					this.loading = false;
      					return false;
      				}else{
      					this.$set(data, 'editStatus', false)
      					courseFind(this.listParam).then((data) => {
	      					this.loading = false;
							this.dataList = data.data.data.content;
							this.total = parseInt(data.data.data.totalElements);
							if(cdata.data.code!=500){
								this.$message.success('保存成功!');
								this.course.$emit('toChangeCourse','');
							}
						})
      				}
				})
      		}else{
      			// if(JSON.stringify(data)!=this.onelineData[data.trainingClassId]){
      				this.loading = true;
      				courseEdit(data).then((cdata) => {
      					this.$set(data, 'editStatus', false)
      					courseFind(this.listParam).then((data) => {
      						this.loading = false;
      						this.dataList = data.data.data.content;
							this.total = parseInt(data.data.data.totalElements);
							if(cdata.data.code!=500){
	      						this.course.$emit('toChangeCourse','');
		      					this.$message.success('保存成功!');
		      				}
						})
      					
					})
      			// }
      		}
      		
      	},
	    handleDelete(index,data){
	    	if(data.type=='add'){
	    		this.dataList.splice(index,1)
	    	}else{
	    		this.$confirm('确定删除此课程吗?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	this.loading = true;
		        	courseDelete(data).then((data) => {
		        		courseFind(this.listParam).then((data) => {
		        			this.loading = false;
							this.dataList = data.data.data.content;
							this.total = parseInt(data.data.data.totalElements);
							this.$message.success('删除成功!');
							this.course.$emit('toChangeCourse','');
						})
						
					})
		        }).catch(() => {
		                    
		        });
	    	}
			
	    },
      	handleAdd(){
	      	this.dataList.unshift({
	      		editStatus:true,
	      		type:'add',
	      		tcId:this.$route.params.id,
	      		content: '',
		        time: '',
		        assessmentMethod:'',
		        teacher:'',
		        title: ''
	      	})
      	},
      	handleCurrentChange(val){
      		this.listParam.page = val;
	      	courseFind(this.listParam).then((data) => {
				this.dataList = data.data.data.content;
				this.total = parseInt(data.data.data.totalElements);
			})
      	},
      	download(){
      		courseExportTemplate().then((data) => {
				var blob = data.data;
				if (blob instanceof Blob) { // 判断是否二进制
					var filename = "培训班课程内容.xlsx";
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
      	}
    },
	mounted(){
		courseFind(this.listParam).then((data) => {
			this.dataList = data.data.data.content;
			this.total = parseInt(data.data.data.totalElements)
		})
		
	},
	watch: {
	   
	}
}
</script>
<style scoped>

</style>
<style lang="less">
.cctable{
	tbody{
		tr{
			height:58px;
			line-height: 58px;
		}
	}
	tr{
		td,th{
			padding:8px;
		}
	}
}
.cc{
	.cc-upload{
		display:inline-block;
		.el-upload__input{
			display: none;
		}
		.el-upload-list__item{
			display:none;
		}
	}
	
}
</style>
<style>
.cc .el-input__inner{
	padding:0 5px;
}
</style>