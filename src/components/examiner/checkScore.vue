<template>
	<div id="cs">
		<side navtype="coa" title="教练员"></side>
		<div class="col-md-9 col-lg-10 padding-top-20">
			<fieldset>
				<legend class="legend-title">查看成绩</legend>
				<router-view></router-view>
			</fieldset>
		</div>
  </div>
</template>
<script>
import side from '../common/side.vue'
export default {
  	name: 'cs',
  	data () {
    	return {
    		
	    }
	},
	components: {
	  side
	},
	methods: {
      
      
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

</style>