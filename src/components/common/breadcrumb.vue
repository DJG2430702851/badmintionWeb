<template>
	<div class="xbreadcrumb">
		<el-breadcrumb separator="/">
		  	<!-- <el-breadcrumb-item>您当前的位置:首页</el-breadcrumb-item>
		  	<el-breadcrumb-item>新闻公告</el-breadcrumb-item>
		  	<el-breadcrumb-item class="active">协会新闻</el-breadcrumb-item> -->

			<el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title" :class="{active:index==levelList.length-1}">
				<span v-if="index==0">您当前的位置:</span><router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script>
export default {
  	name: 'bc',
  	props: ['navtype','title'],
  	data () {
    	return {
    		levelList:null
	    }
	},
	methods: {
      	getBreadcrumb() {
      		
	      	let matched = this.$route.matched.filter(item => item.name)
	      	const first = matched[0]
	      	if (first && first.name !== '首页') {
	       		matched = [{path: '/', meta: { title: '首页' }}].concat(matched)
	      	}
	      	this.levelList = matched;
	    }
    },
	mounted(){
	  	this.getBreadcrumb();
	},
	watch: {
	    $route(to, from) {
	      	this.getBreadcrumb();
	    }
	}
}
</script>
<style lang="less">
.xbreadcrumb{
	height: 40px;
	font-size:14px;
	display: table-cell;
	vertical-align: bottom;
	.el-breadcrumb__inner{
		color:#999999;
		a{
			color:#999999;
			font-weight: 400;
		}
	}
	.active{
		.el-breadcrumb__inner{
			a{
				color:#e6000f;
				&:hover{
					color:#e6000f;
				}
			}
		}
	}
}
</style>