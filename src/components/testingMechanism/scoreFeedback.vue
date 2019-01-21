<template>
	<div id="sf" class="sf">
  		
		<el-row>
			<el-col :span="12">
					<el-form ref="sfform" :model="sfform" class="sf-form">
		            <el-form-item>
		                <el-upload 
	                        class="upload-demo"  
	                        action="https://jsonplaceholder.typicode.com/posts/" 
	                        :on-change="handleChange" 
	                        :on-remove="handleRemove"
	                        :on-success="handleSuccess"
	                        :file-list="fileList">
	                        <el-button class="el-button elbtn-red" style="padding:9px 20px;" type="primary">上传附件</el-button> 
		                </el-upload>  
		            </el-form-item>
		        </el-form>
		    </el-col>
		</el-row>
		<!-- <el-button type="primary" @click="importScore">导入成绩</el-button> -->
		<el-table :data="tableData" style="width: 100%" v-if="flag">
	      <el-table-column
	        prop="date"
	        label="日期"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="name"
	        label="姓名"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="type"
	        label="类别">
	      </el-table-column>
	      <el-table-column
	        prop="grade"
	        label="等级">
	      </el-table-column>
	      <el-table-column
	        prop="score"
	        label="分数">
	      </el-table-column>
	    </el-table>
  </div>
</template>
<script>
import side from '../common/side.vue'
export default {
  	name: 'taqa',
  	data () {
    	return {
    		sfform:{

    		},
    		tableData: '',
    		token:{},
    		fileList:[],
    		flag:false
	    }
	},
	components: {
	  side
	},
	methods: {
		importScore () {
			
			
		},
		handleChange () {

		},
		handleRemove () {

		},
		handleSuccess () {
			this.flag = true;
			this.tableData = [{
		        date: '2016-05-02',
		        name: '王小虎',
		        type:'羽毛球',
		        grade:'二级',
		        score: '100'
		      }, {
		        date: '2016-05-04',
		        name: '王小虎',
		        type:'羽毛球',
		        grade:'二级',
		        score: '80'
		      }, {
		        date: '2016-05-01',
		        name: '王小虎',
		        type:'羽毛球',
		        grade:'二级',
		        score: '80'
		      }, {
		        date: '2016-05-03',
		        name: '王小虎',
		        type:'羽毛球',
		        grade:'四级',
		        score: '80'
		    }];
		}
    },
	mounted(){
	  	
	},
	watch: {
	    
	}
}
</script>
<style scoped>
	
</style>
<style>
.sf-form .el-upload__input{
	display: none;
}
@media screen and (min-width: 1600px) {
.sf .x-section{
	min-height: 800px;
}
}

</style>