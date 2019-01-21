<template>
	<div class="index-wraper">
		<top></top>
		<div class="ccontent clearfix">
			<div class="mid">
				<side style="margin-top:90px;" title="运动员"></side>
				<div class="content">
		  			<breadcrumb></breadcrumb>
					<div class="linew"><div class="line"></div></div>
					<router-view></router-view>
				</div>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
import top from '@/components/common/top.vue'
import bottom from '@/components/common/bottom.vue'
import side from '@/components/common/side.vue'
import breadcrumb from '@/components/common/breadcrumb.vue'
export default {
  	name: 'index',
  	data () {
    	return {
	      msg: ''
	    }
	},
  	components: {
	  top,bottom,side,breadcrumb
	},
	methods:{
		
	},
	mounted(){
		

	}
}
</script>

