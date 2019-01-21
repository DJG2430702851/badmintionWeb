<template>
	<div>
		<el-button :disabled="isDisabled(classAll.applyStartTime)" class="el-button el-button--primary" size="small" style="margin-top:10px;" @click="$router.push({path:'/su',query:{tcId:tcId,type:'signup'}})">立即报名</el-button>
		<div><h3 class="text-center">{{classAll.noticeTitle}}</h3></div>
        <div style="margin-top:20px;" v-html="classAll.noticeContent"></div>
        <!-- <el-button size="small" style="margin-top:10px;float:right;" @click="$router.push({path:'/su',query:{tcId:tcId}})" type="success">立即报名</el-button> -->
	</div>
</template>
<script>
export default {
  	name: 'nti',
  	props:['rdata','applyStartTime'],
  	data () {
    	return {
    		classAll:{
    			applyStartTime:this.applyStartTime
    		},
    		tcId:this.$route.query.tcId
	    }
	},
	methods: {
		isDisabled(time){
	      	return (new Date(time)).getTime() > new Date().getTime()
	    }
    },
	mounted(){
		this.rdata.applyStartTime = this.classAll.applyStartTime;
		this.classAll = this.rdata;
	},
	watch: {
	   
	}
}
</script>
<style scoped>

</style>
<style>

</style>