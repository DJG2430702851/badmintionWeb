<template>
	<div class="index-wraper">
		<top></top>
		<div v-if="$route.name==='indexcontent'">
			<router-view></router-view>
		</div>
		<div v-else class="middle-bg">
	  		<div>
		  		<div class="clearfix contentwrap">
			  		<keep-alive>
					    <router-view :labelPosition="labelPosition" v-if="$route.meta.keepAlive"></router-view>
					</keep-alive>
					<router-view :labelPosition="labelPosition" v-if="!$route.meta.keepAlive"></router-view>
				</div>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
import top from '@/components/common/top.vue'
import bottom from '@/components/common/bottom.vue'
export default {
  	name: 'index',
  	data () {
    	return {
	      msg: '',
	      labelPosition:''
	    }
	},
  	components: {
	  top,bottom
	},
	methods:{
		mobileStyleSet(){
			if(document.body.clientWidth>=768){
	  			this.labelPosition = 'right';
	  			$('.xs-form .el-date-editor, .xs-form .el-input').css('width','70%');
	  		}else{
	  			this.labelPosition = 'top';
	  			$('.xs-form .el-date-editor, .xs-form .el-input').css('width','100%');
	  		}
		}
	},
	mounted(){
		this.mobileStyleSet();
	  	window.onresize = ()=>{
	  		this.mobileStyleSet();
	  	}

	}
}
</script>

