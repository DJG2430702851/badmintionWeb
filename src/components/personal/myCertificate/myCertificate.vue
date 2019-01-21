<template>
	<div id="myce" class="myce">
  		<el-tabs class="xtab" v-model="activeName" type="card" @tab-click="goUrl">
			<el-tab-pane label="未领证书" name="/ceun">
		    	
		    </el-tab-pane>
		    <el-tab-pane label="已领证书" name="/ceha">
		    	
		    </el-tab-pane>
		</el-tabs>
		<div>
			<router-view></router-view>
		</div>
  	</div>
</template>
<script>
export default {
  	name: 'myce',
  	data () {
    	return {
    		activeName:'/ceun',
    		imgList:[
    			{url:'/static/img/cv2.jpg'}
    		],
    		dialogVisible:false,
    		dialogImageUrl:''
	    }
	},
	methods: {
		goUrl(tab){
			this.$router.push({path:tab.paneName});
		},
	    handlePictureCardPreview(file) {
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	    },
      
    },
	mounted(){

	},
	watch: {
	    
	}
}
</script>


<style lang="less">
.myce{
	.xtab{
		width: 300px;
	}
	.el-upload-list__item-delete{
		display: none !important;
	}
}
</style>