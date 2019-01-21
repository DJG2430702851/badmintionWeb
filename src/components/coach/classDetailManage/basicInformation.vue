<template>
	<div>
        <div style="margin-top:20px;">
            <label style="width:120px" for="">机构名称:</label>
            <span>{{classAll.testMechanism.mechanismFullname}}</span>
        </div>
		<div style="margin-top:20px;">
            <label style="width:120px" for="">培训班名称:</label>
            <span>{{classAll.name}}</span>
        </div>
		<div style="margin-top:20px;">
            <label style="width:120px" for="">办班地址:</label>
            <span>{{classAll.classRoomAddr}}  {{classAll.detailAddr}}</span>
        </div>
		<div style="margin-top:20px;">
            <label style="width:120px" for="">报名时间范围:</label>
            <span>{{classAll.applyStartTime}} 至 {{classAll.applyEndTime}}</span>
        </div>
		<div style="margin-top:20px;">
            <label style="width:120px" for="">培训时间:</label>
            <span>{{classAll.openingClassStartTime}} 至 {{classAll.openingClassEndTime}}</span>
        </div>
	</div>
</template>
<script>
// import {classListXQ} from '../../service/getData'
export default {
  	name: 'bf',
    props:['rdata'],
  	data () {
    	return {
            // tcId:this.$route.params.id
            classAll:{
                testMechanism:''
            }
	    }
	},
	methods: {

    },
	mounted(){
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