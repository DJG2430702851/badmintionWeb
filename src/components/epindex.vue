<template>
	<div class="index-wraper">
		<top></top>
		<div class="lcontent clearfix">
			<img class="banner" src="/static/images/ep_banner.jpg" alt="">
			<div class="mid">
		  		<div class="content">
		  			<breadcrumb></breadcrumb>
					<div class="line"></div>
					<router-view v-if="isRouterAlive"></router-view>
				</div>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
import top from '@/components/common/top.vue'
import bottom from '@/components/common/bottom.vue'
import breadcrumb from '@/components/common/breadcrumb.vue'
export default {
	name: 'newsindex',
	provide(){
		return{
			reload:this.reload
		}
	},
  	data () {
    	return {
	      msg: '',
	      labelPosition:'',
	      isRouterAlive: true
	    }
	},
  	components: {
	  top,bottom,breadcrumb
	},
	methods:{
		reload () {
		    this.isRouterAlive = false
		    this.$nextTick(() => (this.isRouterAlive = true))
		}  
	},
	mounted(){
		

	}
}
</script>

