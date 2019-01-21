<template>
	<div class="eibi">
        <!-- <div class="dvrow">
            <label>机构名称:</label>
            <span>{{}}</span>
        </div> -->
		<div class="dvrow">
            <label>培训班名称:</label>
            <span>{{basicInformation.appraiserName}}</span>
        </div>
		<div class="dvrow">
            <label>办班地址:</label>
            <span>{{basicInformation.classAddress}}  {{basicInformation.classAddressDetail}}</span>
        </div>
		<div class="dvrow">
            <label>报名时间范围:</label>
            <span>{{basicInformation.registrationStartTime}} 至 {{basicInformation.registrationEndTime}}</span>
        </div>
		<div class="dvrow">
            <label>培训时间:</label>
            <span>{{basicInformation.trainingStartTime}} 至 {{basicInformation.trainingEndTime}}</span>
        </div>
	</div>
</template>
<script>
import {getClassDetail} from '@/service/eiData'
export default {
  	name: 'eibi',
    // props:['rdata'],
  	data () {
    	return {
            basicInformation:{
                
            },
            appraiserId:this.$route.query.appraiserId
	    }
	},
	methods: {

    },
	mounted(){
        getClassDetail(this.appraiserId).then((data)=>{
            this.basicInformation = data.data
        })
	},
	watch: {
	   
	}
}
</script>
<style lang="less">
.eibi{
    // padding-left: 120px;
    .dvrow{
        margin-top: 30px;
        text-align:center;
        label{
            // width: 200px;
            // text-align: right;
        }
    } 
}
</style>