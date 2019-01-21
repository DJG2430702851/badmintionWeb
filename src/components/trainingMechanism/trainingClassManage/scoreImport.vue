<template>
	<div class="si">
		<div class="text-right" style="margin:10px 20px;">
            <el-button size="small" @click="download" type="primary">导出成绩模板</el-button>
            <el-upload 
	            class="cc-upload"
	            action=""
	            :before-upload="beforeUpload"
	            :auto-upload="false"
	            :on-success="handleSuccess"
	            :on-change="handleChange"
	            accept=".xlsx">
	            <el-button size="small" type="primary">导入成绩</el-button>
	        </el-upload>
			<!-- <el-button size="small" @click="handleAdd" type="primary">新增成绩</el-button> -->
		</div>
			<el-table ref="multipleTable" v-loading="loading" :data="dataList" style="width: 100%" class="sitable" >
			<!-- <el-table-column
		    type="selection"
		    width="55">
		  </el-table-column> -->
		  <el-table-column label="序号" type="index" width="80"></el-table-column>
		  <el-table-column v-if="theadData.length==0" label=""></el-table-column>
		  <el-table-column v-else :key="index" v-for="(item,index) in theadData" align="center"
	        :label="item" :width="item=='身份证号码'?180:''">
	        <template slot-scope="scope">
	        	<div v-if="item=='成绩是否合格'">
			        <el-input v-if="scope.row.type=='add'" v-model="scope.row[item]"></el-input>
			        <span v-else>{{scope.row[item]}}</span>
		        </div>
		        <div v-else-if="item=='成绩考核意见'">
			        <el-button v-if="scope.row['成绩考核意见']!=0" class="pointer" @click="dialogVisible=true" type="text">详情</el-button>
		        </div>
		        <div v-else-if="item=='成绩考核状态'">
			        <!-- <span class="danger" type="text">{{scope.row[item] | scoreStatusFormat}}</span> -->
			        <span class="reviewFeedback" :class="{'red':scope.row[item]==2,'green':scope.row[item]==1,'orange':scope.row[item]==0}">{{scope.row[item] | scoreStatusFormat}}</span>
		        </div>
	        	<div v-else-if="index>1">
		        	<el-input v-if="scope.row.editStatus" v-model="scope.row[item]"></el-input>
			        <span v-else>{{scope.row[item]}}</span>
		        </div>
		        <div v-else><span>{{scope.row[item]}}</span></div>
		    </template>
	      </el-table-column>
	      <el-table-column label="操作" width="150" fixed="right" align="center">
		      <template slot-scope="scope">
		        <span class="primary pointer"><!-- <font v-if="scope.row.editStatus" @click="handleEditKeep(scope.$index, scope.row)">保存</font><font v-else @click="handleEdit(scope.$index, scope.row)">编辑</font> --><el-button :disabled="scope.row['成绩考核状态']==1" type="text" @click="handleEdit2(scope.row)"><!-- 编辑 --><em title="编辑" class="font18 el-icon-edit"></em></el-button></span>&nbsp;&nbsp;
		        <!-- <span class="danger pointer" @click="handleDelete(scope.$index, scope.row)">删除</span> -->
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
	   	<div><b>注:</b><br><p style="margin-top:10px;">1.出勤率统一填写百分数,例98%</p></div>
	   	<el-dialog
		  	title="成绩考核意见"
		  	:visible.sync="dialogVisible"
		  	:before-close="handleClose">
		  	<span>{{auditStatement}}</span>
		  	<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible=false">关 闭</el-button>
			</span>
		</el-dialog>
		<el-dialog
		  	title="修改成绩"
		  	:visible.sync="dialogVisible2"
		  	:before-close="handleClose2">
			<span><b>姓名</b>:&nbsp;&nbsp;{{scoreform['姓名']}}</span>
			<el-form ref="scoreform" :model="scoreform">
				<el-row :gutter="20">
					<el-col :span="12" v-for="(item,index) in scoreKey" :key="index">
						<el-form-item v-if="item=='成绩是否合格'" :prop="item"  :label="item" :rules="{ required: true, message: '请选择成绩是否合格', trigger: 'change' }">
			  				<el-select v-model="scoreform[item]" style="width:100%;">
			  					<el-option label="合格" value="合格"></el-option>
								<el-option label="不合格" value="不合格"></el-option>
			  				</el-select>
			  			</el-form-item>
			  			<el-form-item v-else-if="item=='出勤率'" :prop="item" :label="item" :rules="{ required: true, message: '请输入出勤率', trigger: 'blur' }">
			  				<el-input v-model="scoreform[item]"></el-input>
			  			</el-form-item>
						<el-form-item v-else :label="item" :prop="item" :rules="{ required: true, message: '请输入课程成绩', trigger: 'blur' }">
			  				<el-input v-model="scoreform[item]"></el-input>
			  			</el-form-item>
		  			</el-col>
		  		</el-row>
			</el-form>
		  	<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible2=false">取 消</el-button>
			    <el-button type="primary" @click="handleEdit2Keep('scoreform')">保 存</el-button>
			</span>
		</el-dialog>
  	</div>
</template>
<script>
import {scoreAdd,scoreEdit,scoreDelete,scoreFindAll,scoreExportTemplate,scoreImport} from '../../../service/getData'
export default {
  	name: 'port',
  	props:['rdata'],
  	data () {
    	return {
	       	dataList: [],
	       	theadData:[],
    		token:{},
    		fileList:[],
    		flag:false,
    		onelineData:{},
    		listParam:{
    			tcId:this.$route.params.id,
    			size:pageSize,
    			page:1
    		},
    		total:0,
    		loading:false,
    		auditStatement:'',
    		dialogVisible:false,
    		dialogVisible2:false,
    		scoreform:{
    			// '折返跑':80
    		},
    		scoreKey:[],
    		scoreIsQualifiedRules:{ required: true, message: '请选择总成绩', trigger: 'change' },
    		attendanceRateRules:{ required: true, message: '请输入出勤率', trigger: 'blur' },
    		scoreRules:{ required: true, message: '请输入该课成绩', trigger: 'blur' }
	    }
	},
	filters:{
		scoreMap(val){
			return val==0?'':val
		},
		scoreStatusFormat:function(value){
			if(value===0){
				return '待审核'
			}else if(value===1){
				return '审核通过'
			}else if(value===2){
				return '审核驳回'
			}
		}
	},
	methods: {
      	beforeUpload () {
			
		},
		handleClose(done){
			done()
	  	},
	  	handleClose2(done){
	  		done()
	  	},
		handleRemove () {

		},
		handleSuccess () {
			this.flag = true;
			this.auditStatement = val;
			this.dialogVisible = true;
		},
		handleAdd(){
			if(this.theadData.length==0){
				this.$message.error('请先下载模板，获取课程信息并导入!');
				return false;
			}
      		var newScore = {
      			editStatus:true
      			// type:'add'
      		};
      		for(var i=0;i<this.theadData.length;i++){
      			newScore[this.theadData[i]]= '';
      		}
      		this.dataList.unshift(newScore)
      	},
		handleEdit(index,data){
   			if(data['成绩是否合格']){
   				this.$set(data, 'type', 'edit')
   			}else{
   				this.$set(data, 'type', 'add')
   			}
      		this.$set(data, 'editStatus', true)
	    },
	    handleEditKeep(index,data){
      		for(var k in data){
      			if(data[k]===''){
  					this.$message.error('保存失败,请填写完整!');
      				return false;
      			}
      		}
      		// data.editStatus = false
      		delete data.editStatus;
      		let dataObj = {};
      		dataObj.data = data;
      		dataObj.rdata = [];
      		dataObj.tcId = this.listParam.tcId;
      		
      			for(var k in dataObj.data){
	      			if(k!='出勤率' && k!='姓名' && k!='成绩是否合格' && k!='身份证号码' && k!='personalId'){
	      				dataObj.rdata.push({
	      					coach:dataObj.data['姓名'],
	      					certificateNumber:dataObj.data['身份证号码'],
	      					attendance:dataObj.data['出勤率'],
	      					isQualified:dataObj.data['成绩是否合格'],
	      					content:k,
	      					score:dataObj.data[k]
	      				})
	      			}
	      		}
	      		this.loading = true;
      			scoreAdd(dataObj).then((cdata) => {
					if(cdata.data.code==500){
      					this.$message.error(cdata.data.message);
      					this.$set(data, 'editStatus', true)
      					// this.$set(data, 'type', 'add')
      					this.loading = false;
      					return false;
      				}else{
      					this.$set(data, 'editStatus', false)
      					scoreFindAll(this.listParam).then((data) => {
      						this.loading = false;
	      					this.dataList = data.data.data;
							this.total = parseInt(data.data.recordsTotal);
	      					if(cdata.data.code!=500){
	      						this.$message.success('保存成功!');
	      					}
						})
      				}
				})
      		
      	},
      	handleEdit2(row){
      		let scoreIndex = 0;
      		this.scoreKey.length = Object.getOwnPropertyNames(row).length-6;
      		for(var k in row){
  				this.$set(this.scoreform, k, row[k])
  				if(k=='personalId' ||  k=='身份证号码' ||  k=='姓名' ||  k=='成绩考核状态' || k=='成绩考核意见'){

  				}else{
  					if(k=='成绩是否合格'){
  						this.scoreKey[this.scoreKey.length-1] = k;
  					}else if(k=='出勤率'){
  						this.scoreKey[this.scoreKey.length-2] = k;
  					}else{
  						this.scoreKey[scoreIndex] = k;
  						scoreIndex++
  					}
  				}
      		}
      		this.dialogVisible2 = true;
      		this.$refs['scoreform'].clearValidate();
      	},
      	handleEdit2Keep(formName){
      		this.$refs[formName].validate((valid) => {
      			if(valid){
      				let dataObj = {};
		      		dataObj.data = this.scoreform;
		      		dataObj.rdata = [];
		      		dataObj.tcId = this.listParam.tcId;
	      			for(var k in dataObj.data){
		      			if(k!='出勤率' && k!='姓名' && k!='成绩是否合格' && k!='身份证号码' && k!='personalId' && k!='成绩考核意见' && k!='成绩考核状态'){
		      				dataObj.rdata.push({
		      					coach:dataObj.data['姓名'],
		      					certificateNumber:dataObj.data['身份证号码'],
		      					attendance:dataObj.data['出勤率'],
		      					isQualified:dataObj.data['成绩是否合格'],
		      					performanceReview:dataObj.data['成绩考核状态'],
		      					content:k,
		      					score:dataObj.data[k]
		      				})
		      			}
		      		}
      				// this.loading = true;
	      			scoreAdd(dataObj).then((cdata) => {
						if(cdata.data.code==500){
	      					this.$message.error(cdata.data.message);
	      					// this.loading = false;
	      					return false;
	      				}else{
	      					scoreFindAll(this.listParam).then((data) => {
	      						// this.loading = false;
		      					this.dataList = data.data.data;
								this.total = parseInt(data.data.recordsTotal);
		      					if(cdata.data.code!=500){
		      						this.$message.success('保存成功!');
		      						this.dialogVisible2 = false;
		      					}
							})
	      				}
					})
      			}
      		})
      	},
	    handleSelectionChange(val) {

      	},
      	handleCurrentChange(val){
      		this.listParam.page = val;
		 	scoreFindAll(this.listParam).then((data) => {
				this.dataList = data.data.data;
				this.total = parseInt(data.data.recordsTotal);
			})
      	},
      	download(){
      		scoreExportTemplate(this.listParam).then((data) => {
				var blob = data.data;
				if (blob instanceof Blob) { // 判断是否二进制
					var filename = "培训班成绩模板.xlsx";
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
      	handleChange (file, fileList) {
			let formdata = new FormData();
   			formdata.append('scoreFile',file.raw);
   			let rdata = {
   				formdata:formdata,
   				tcId:this.listParam.tcId
   			}
			scoreImport(rdata).then((data) => {

				if(data.data.code==500){
					this.$message.error(data.data.message);
					return false;
				}
				if(data.data.code==0){
					this.$message.success('导入成功');
				}
				this.getAllscore();

			})
		},
		getAllscore(){
			this.dataList = [];
			this.theadData = [];
			scoreFindAll(this.listParam).then((data) => {
				if(data.data.code==500){
					return false;
				}
				this.dataList = data.data.data;
				this.total = parseInt(data.data.recordsTotal);
				if(this.dataList.length>0){
					this.theadData.length = 4;
					var indx = 2;
					for(var k in this.dataList[0]){
						if(k=='personalId' || k=='editStatus' || k=='type'){

						}else if(k=='姓名'){
							this.theadData[0] = k;
						}else if(k=='身份证号码'){
							this.theadData[1] = k;
						}else if(k=='成绩考核意见'){
							this.theadData[this.theadData.length-2] = k;
						}else if(k=='成绩考核状态'){
							this.theadData[this.theadData.length-1] = k;
						}else{
							// this.theadData[indx] = k;
							// indx++;
						}
					}
				}
				
			})
		}
      	
    },
	mounted(){
		this.getAllscore();
		let vthis = this;
		this.course.$off('toChangeCourse');
		this.course.$on('toChangeCourse', function (arg) {
            vthis.getAllscore();
        })
	},
	watch: {
	   
	}
}
</script>
<style scoped>

</style>
<style>
	.si .el-dialog__body{
		padding-top:0;
	}
</style>
<style lang="less">
.sitable{
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
.si .el-upload__input{
	display: none;
}
.si{
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