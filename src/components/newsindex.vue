<template>
	<div class="index-wraper">
		<top></top>
		<div class="ncontent clearfix">
			<img class="banner" src="/static/images/n_01.jpg" alt="">
			<div class="mid">
				<side title="新闻公告"></side>
		  		<div class="content">
		  			<breadcrumb></breadcrumb>
					<div class="linew"><div class="line"></div></div>
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
import side from '@/components/common/side.vue'
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
	  top,bottom,side,breadcrumb
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
