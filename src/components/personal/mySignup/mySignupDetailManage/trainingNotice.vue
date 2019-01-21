<template>
	<div>
		<div><h3 class="text-center">{{classAll.noticeTitle}}</h3></div>
        <div style="margin-top:20px;" v-html="classAll.noticeContent"></div>
	</div>
</template>
<script>
export default {
  	name: 'nti',
  	props:['rdata'],
  	data () {
    	return {
    		classAll:{},
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