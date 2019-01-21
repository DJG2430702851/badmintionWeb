<template>
	<div class="sue">
		<div class="text-right" style="margin:10px 20px;">
			<el-button size="small" type="primary" @click="opinionDialogShow">批量审核</el-button>
		</div>
		<el-table ref="multipleTable" :data="dataList" style="width: 100%" class="suetable" @selection-change="handleSelectionChange">
		  <el-table-column
		    type="selection"
		    :selectable='checkboxT'
		    width="55">
		  </el-table-column>
		  <el-table-column label="序号" type="index" width="60"></el-table-column>
		  <el-table-column
	        prop="personalRegistration.personalName"
	        label="姓名">
	      </el-table-column>
	      <el-table-column
	        prop="personalRegistration.certificatesNumber"
	        label="身份证号"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="coachTitle"
	        label="职称">
	      </el-table-column>
	      <el-table-column
	        prop="subordinateUnit"
	        label="所属单位">
	      </el-table-column>
	     <!-- <el-table-column
	      	prop="existingCertificateLevel"
	        label="等级">
	      </el-table-column>
	      <el-table-column
	        prop="existingCertificateNumber"
	        label="证书编号">
	      </el-table-column> -->
	      <el-table-column
	        label="报名状态"
	        align="center"
	        width="120">
	        <template slot-scope="scope">
	        	<span  class="reviewFeedback" :class="{'red':scope.row.registrationResultAudit==2,'green':scope.row.registrationResultAudit==1,'orange':scope.row.registrationResultAudit==0}">{{scope.row.registrationResultAudit | registrationResultAuditFormat }}</span>
		    </template>
	      </el-table-column>
	      <el-table-column label="操作" width="120" fixed="right" align="center">
		      <template slot-scope="scope">
		      	<span class="primary pointer" @click="dialog1Show(scope.row)"><!-- 查看 --><font title="查看" class="font18 el-icon-search"></font></span>&nbsp;&nbsp;
		      	<!-- <span v-if="scope.row.registrationResultAudit===0"> -->
		      	<!-- v-if="scope.row.registrationResultAudit===0" -->
		        	<span class="primary pointer"  @click="dialog2Show(scope.row.cteId)"><!-- 审核 <--><font title="审核" class="el-icon-ba-shenhe"></font></span>
		        <!-- </span> -->
		        <!-- <el-button v-else v-if="(scope.row.registrationResultAudit===0 || scope.row.registrationResultAudit===1) && !isOver(scope.row.openingClassEndTime)" @click="cancelSignUp(scope.row.cteId)" type="text" class="color-red" size="small">取消报名</el-button> -->
		        <!-- <span v-else></span> -->
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
	    <el-dialog
		  class="sue-dialog"
		  title="报名详情"
		  :visible.sync="dialogVisible"
		  width="80%"
		  :before-close="handleClose">
		  <div>
		  	<el-row :gutter="20">
					<el-col :span="12" :sm="12" :xs="24">
						<el-row style="margin-top:10px;">
							<el-col :span="8"><label>姓名:</label></el-col><el-col :span="16">{{dData.personalRegistration.personalName}}</el-col>
						</el-row>
						<el-row style="margin-top:10px;">
							<el-col :span="8"><label>身份证号:</label></el-col><el-col :span="16">{{dData.personalRegistration.certificatesNumber}}</el-col>
						</el-row>
						<el-row style="margin-top:10px;">
							<el-col :span="8"><label>职称:</label></el-col><el-col :span="16">{{dData.coachTitle}}</el-col>
						</el-row>
						<el-row style="margin-top:10px;">
							<el-col :span="8"><label>所属单位:</label></el-col><el-col :span="16">{{dData.subordinateUnit}}</el-col>
						</el-row>
						<el-row style="margin-top:10px;">
							<el-col :span="8"><label>现有证书等级:</label></el-col><el-col :span="16">{{dData.existingCertificateLevel}}</el-col>
						</el-row>
						<el-row style="margin-top:10px;">
							<el-col :span="8"><label>现有证书编号:</label></el-col><el-col :span="16">{{dData.existingCertificateNumber}}</el-col>
						</el-row>
					</el-col>
					<el-col :span="12" :sm="12" :xs="24">
						<el-row style="margin-top:5px;">
							<label>现有证书:</label>
							<div><img style="width:100%" :src="dData.attachments.filePath"></div>
						</el-row>
					</el-col>
			</el-row>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible=false">关 闭</el-button>
		    <el-button @click="dialog2Show(sueform.cteId)" v-if="registrationResultAudit===0" type="primary">去审核</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  class="sue-dialog"
		  title="报名审核"
		  :visible.sync="dialog2Visible"
		  width="80%"
		  :before-close="handleClose2">
		  <el-form ref="sueform" label-position="left" :rules="rules" :model="sueform">
		  	<el-form-item prop="registrationResultAudit" label="审核状态">
				<el-radio-group v-model="sueform.registrationResultAudit">
	  				<el-radio label="1">报名成功</el-radio>
					<el-radio label="2">报名失败</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="审核说明" prop="opinion" :class="{'not-required':sueform.registrationResultAudit==1}">
		    	<el-input :autosize="{ minRows: 4, maxRows: 6}" type="textarea" v-model="sueform.opinion"></el-input>
		  	</el-form-item>
		  	<el-form-item label="是否允许二次报名" prop="enrolmentAgain" v-if="sueform.registrationResultAudit==2">
		    	<el-radio-group v-model="sueform.enrolmentAgain">
	  				<el-radio label="0">否</el-radio>
					<el-radio label="1">是</el-radio>
				</el-radio-group>
		  	</el-form-item>
	      </el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialog2Visible = false">取消</el-button>
			   	<el-button type="primary" @click="formSubmit('sueform')">确定</el-button>
			</span>
		  
		</el-dialog>
  	</div>
</template>
<script>
import {coachFindAll,coachDetailFind,coachExamine,coachMultipleExamine,getImage} from '../../../service/getData'
export default {
  	name: 'mine',
  	data () {
    	return {
    		API_ROOT:API_ROOT,
    		dialogVisible:false,
    		dialog2Visible:false,
    		dData:{
    			attachments:{
    				filePath:''
    			},
    			personalRegistration:{
    				personalName:'',
    				certificatesNumber:''
    			}
    		},
    		listParam:{
    			tcId:this.$route.params.id,
    			size:pageSize,
    			page:1
    		},
    		total:0,
    		dataList:[],
		    sueform:{
		    	cteId:'',
		    	registrationResultAudit:'',
		    	opinion:'',
		    	enrolmentAgain:'',
		    	ptId:this.$route.params.id
		    },
		    cteIds:[],
		    multipleSelection: [],
		    multipleSelectionFlag:false,
		   	registrationResultAudit:0,
		   	defaultImg: 'this.src="/static/img/default.jpg"',
		    rules:{
	      		registrationResultAudit:[
		        	{ required: true, message: '请选择审核状态', trigger: 'change' }
		        ],
		        opinion:[
		        	{ required: true, message: '请输入审核说明', trigger: 'blur' }
		        ],
		        enrolmentAgain:[
		        	{ required: true, message: '请选择是否允许二次报名', trigger: 'change' }
		        ]
	      	}
	    }
	},
	filters:{
		sexFormat(val){
			if(val==1){
				return '男'
			}else if(val==2){
				return '女'
			}
		},
		registrationResultAuditFormat:function(value){
			if(value===null){
				return '未报名'
			}else if(value===0){
				return '待审核'
			}else if(value===1){
				return '审核通过'
			}else{
				return '审核驳回'
			}
		}
	},
	methods: {
		checkboxT(row,index){
    		if(row.registrationResultAudit===0){
    			return 1;
    		}else{
    			return 0;
    		}
    	},
		handleClose(done){
			done();
		},
		handleClose2(done){
			this.multipleSelectionFlag = false;
			this.cteIds = [];
			done();
		},
      	formSubmit(formName) {
      		this.$refs[formName].validateField('registrationResultAudit',(validMessage)=>{
	      		if(validMessage !=''){
	      			return false;
	      		}
	      		if(this.multipleSelectionFlag){
	      			// var formData = {
	      			// 	tcId:this.$route.params.id,
	      			// 	cteDto:this.sueform,
	      			// 	list:this.cteIds
	      			// }
	      			var formData = {
	      				tcId:this.$route.params.id,
	      				coachList:this.cteIds,
	      				registrationResultAudit:this.sueform.registrationResultAudit,
	      				opinion:this.sueform.opinion,
	      				enrolmentAgain:this.sueform.enrolmentAgain,
	      				cteDto:this.sueform
	      			}
	      			formData.cteDto['coachList'] = this.cteIds;
	      			formData.cteDto['registrationResultAudit'] = this.sueform.registrationResultAudit;
	      			formData.cteDto['opinion'] = this.sueform.opinion;
	      			formData.cteDto['enrolmentAgain'] = this.sueform.enrolmentAgain;
	      			coachMultipleExamine(formData).then((data) => {console.log(data.data)
	      				if(data.data.code==0){
							this.dialog2Visible = false;
							this.$message({
					          message: '保存成功',
					          type: 'success'
					        });
					        this.course.$emit('toChangeCourse','');
					        coachFindAll(this.listParam).then((data) => {
								this.dataList = data.data.data.content;
								this.total = parseInt(data.data.data.totalElements);
							})
						}else if(data.data.code==202){
							this.$message({
					          message: data.data.message,
					          type: 'error'
					        });
						}
					})
	      		}else{
	      			if(this.sueform.registrationResultAudit==1){
		      			coachExamine(this.sueform).then((data) => {
		      				if(data.data.code==0){
								this.dialog2Visible = false;
								this.$message({
						          message: '保存成功',
						          type: 'success'
						        });
						        this.course.$emit('toChangeCourse','');
						        coachFindAll(this.listParam).then((data) => {
									this.dataList = data.data.data.content;
									this.total = parseInt(data.data.data.totalElements);
								})
							}else if(data.data.code==202){
								this.$message({
						          message: data.data.message,
						          type: 'error'
						        });
							}
						})
		      		}else if(this.sueform.registrationResultAudit==2){
		      			this.$refs[formName].validate((valid) => {
				      		if(valid){
				      			coachExamine(this.sueform).then((data) => {
				      				if(data.data.code==0){
										this.dialog2Visible = false;
										this.$message({
								          message: '保存成功',
								          type: 'success'
								        });
								        this.course.$emit('toChangeCourse','');
								        coachFindAll(this.listParam).then((data) => {
											this.dataList = data.data.data.content;
											this.total = parseInt(data.data.data.totalElements);
										})
									}else if(data.data.code==202){
										this.$message({
								          message: data.data.message,
								          type: 'error'
								        });
									}
								})
				      		}
				      	})
		      		}
	      		}
      		});
      	},
      	toggleSelection(rows) {
	        if (rows) {
	          	rows.forEach(row => {
	            	this.$refs.multipleTable.toggleRowSelection(row);
	          	});
	        } else {
	          	this.$refs.multipleTable.clearSelection();
	        }
	    },
      	handleSelectionChange(val) {
        	this.multipleSelection = val;
      	},
      	handleCurrentChange(val){
	      	this.listParam.page = val;
	      	coachFindAll(this.listParam).then((data) => {
				this.dataList = data.data.data.content;
				this.total = parseInt(data.data.data.totalElements);
			})
	    },
      	opinionDialogShow(){
      		if(this.multipleSelection.length>0){
      			this.dialog2Visible = true;
      			this.multipleSelectionFlag = true;
      			for(var i=0;i<this.multipleSelection.length;i++){
      				this.cteIds.push(this.multipleSelection[i].cteId)
      			}
      		}else{
      			this.$message({
		          message: '请选择教练',
		          type: 'error'
		        });
      		}
      	},
      	dialog1Show(row){
      		this.dData.attachments.filePath = '';
      		this.registrationResultAudit = row.registrationResultAudit;
      		this.dialogVisible = true;
      		var rdata = {
      			tcId:this.listParam.tcId,
      			pcId:row.pcId
      		}
      		coachDetailFind(rdata).then((data) => {
				this.dData = data.data;
				this.dData.personalName = row.personalRegistration.personalName;
				this.dData.certificatesNumber = row.personalRegistration.certificatesNumber;
				getImage(this.dData.attachments.imageUrl).then((data) => {
					this.dData.attachments.filePath = URL.createObjectURL(data.data)
				})
			})
			this.sueform.cteId = row.cteId;
      	},
      	dialog2Show(cteId){
      		this.dialogVisible = false;
      		this.dialog2Visible = true;
      		this.sueform.cteId = cteId;
      	}
    },
	mounted(){
		coachFindAll(this.listParam).then((data) => {
			this.dataList = data.data.data.content;
			this.total = parseInt(data.data.data.totalElements);
		})
	},
	watch: {
	   'sueform.registrationResultAudit':function(){
	   		if(this.sueform.registrationResultAudit==1){
	   			this.$refs['sueform'].clearValidate();
	   		}
	   }
	}
}
</script>
<style scoped>

</style>
<style>
	.sue .color-red{
		color:#d23023;
	}
	.sue-dialog .el-dialog{
		max-width:768px;
	}
	.sue .el-dialog .el-form-item{
		margin-bottom: 10px;
	}
	.sue .el-dialog__body{
		padding-top: 0;
	}
</style>