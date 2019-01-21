<template>
	<div class="sideIpad">
		
		<div class="x-left-menuwrap" draggable="true">
			<div class="lm-btn" @click="aa();"><span>展开</span></div>
			<div>
				<ul class="menuul" :class="{show:menuflag}">
					<li><a>协会新闻</a></li>
					<li><a>协会公告</a></li>
					<li><a>协会公告2</a></li>
				</ul>
			</div>
		</div>

	</div>
</template>
<script>
export default {
  	name: 'sideIpad',
  	// props: [''],
  	data () {
    	return {
    		menuflag:false
	    }

	},
	methods: {
      aa(){
      	this.menuflag = !this.menuflag;
      },
      drag(e){
      	// console.log(1111)
      }
    },
	mounted(){
	  	
	},
	
	watch: {
	    
	}
}
</script>
<style lang="less">
@colorRed:#e60010;
.sideIpad{
	.x-left-menuwrap{
		position:fixed;
		left:5%;
		top:20%;
		width: 40px;
		height:40px;
		line-height:40px;
		font-size:12px;
		text-align: center;
		.lm-btn{
			position: absolute;
			left: 0;
			top: 0;
			width:100%;
			height:100%;
			background-color:#cccccc;
			border-radius: 50%;
			opacity:0.6;
		}
		.menuul{
			// display: none;
			position: absolute;
			left:60px;
			top:-20px;
			opacity: 0;
			transition: opacity 1s;
			-moz-transition: opacity 1s;
			-webkit-transition: opacity 1s;
			li{
				text-align: left;
				height:30px;
				line-height:30px;
				width: 150px;
				background:rgba(0,0,0,.3);
				color:#FFFFFF;
				margin-top: 5px;
				padding-left: 20px;
				a{
					color:#ffffff;
				}
			}
		}
		.menuul.show{
			// display: block;
			opacity: 1;
		}
	}
}

</style>