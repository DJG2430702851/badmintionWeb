<template>
	<div id="tsu">
		<side navtype="coa" title="教练员"></side>
		<div class="col-md-9 col-lg-10 padding-top-20">
			<fieldset>
				<legend class="legend-title">培训班报名</legend>
				<router-view></router-view>
			</fieldset>
		</div>
  </div>
</template>
<script>
import side from '../common/side.vue'
export default {
  	name: 'tsu',
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