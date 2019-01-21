<template>
	<div class="eid">
		<el-tabs class="xtab" v-model="activeName" type="card" @tab-click="goUrl">
			<el-tab-pane label="培训通知" name="/eitn">
		    	
		    </el-tab-pane>
		    <el-tab-pane label="基本信息" name="/eibi">
		    	
		    </el-tab-pane>
		    <el-tab-pane label="课程内容" name="/eicc">
				
		    </el-tab-pane>
		</el-tabs>
		<div class="">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
export default {
  	name: 'eid',
  	data () {
    	return {
    		activeName:'/eitn',
	        // tcId:this.$route.params.id,
	        classAll:{
	        	name:'A班',
	        	classRoomAddr:'上海市杨浦区',
	        	applyStartTime:'2018-10-15 08:00 至 2018-10-28 08:00',
	        	openingClassStartTime:'2018-11-10 08:00 至 2018-12-30 08:00'
	        },
	        dataList:[
	        	{
	        		content:'课程1',
	        		time:'8',
	        		assessmentMethod:'笔试',
	        		teacher:'王玲',
	        		title:'教授'
	        	},
	        	{
	        		content:'课程2',
	        		time:'8',
	        		assessmentMethod:'笔试',
	        		teacher:'王玲',
	        		title:'教授'
	        	},
	        	{
	        		content:'课程3',
	        		time:'8',
	        		assessmentMethod:'笔试',
	        		teacher:'王玲',
	        		title:'教授'
	        	},
	        	{
	        		content:'课程4',
	        		time:'8',
	        		assessmentMethod:'笔试',
	        		teacher:'王玲',
	        		title:'教授'
	        	}
	        ]
	    }
	},
	components: {
	  
	},
	methods: {
		goUrl(tab){
			this.$router.push({path:tab.paneName,query:{appraiserId:this.$route.query.appraiserId,signType:this.$route.query.signType}});
		},
		getActive(){
			this.activeName = this.$route.path;
		}
    },
	mounted(){
		this.getActive();
	},
	watch: {
	   
	}
}
</script>
<style lang="less">

</style>