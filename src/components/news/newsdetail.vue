<template>
	<div id="newsdetail" class="newsdetail">
		<div class="detail">
			<div class="title">
				<h3>{{deData.newsSubject}}</h3>
				<p class="p1">创建时间：{{deData.createdDate}}</p>
			</div>
			<div class="dcontent" v-html="deData.newsContent"></div>
			<div class="attachment" v-if="attachmentsList.length>0 && deData.newsContent">
				<p>附件下载</p>
				<ul v-for="(item,index) in attachmentsList">
					<li @click="download(item.filePath,item.fileSrcName)">{{item.fileSrcName}}</li>
				</ul>
			</div>
		</div>
		<div class="pn clearfix">
			<div class="prev"><上一篇:<span v-if="prevData.newsId" @click="goUrl('/ned/'+prevData.newsId)">{{prevData.newsSubject}}</span><font v-else>无</font></div>
			<div class="next">>下一篇:<span v-if="nextData.newsId" @click="goUrl('/ned/'+nextData.newsId)">{{nextData.newsSubject}}</span><font v-else>无</font></div>
		</div>
  </div>
</template>
<script>
import {getNewsDetail,getNewsLastAndNext} from '@/service/newsData'
import {getFile,getNewsImage} from '@/service/commonData'
export default {
	inject:['reload'],
  	name: 'newsdetail',
  	data () {
    	return {
	      	listParam:{
				id: this.$route.params.id
			},
			deData:{},
			attachmentsList:[],
			imgArr:[],
			prevData:{},
			nextData:{}
	    }
	},
	mounted(){
		let vthis = this;
	  	getNewsDetail(this.listParam.id).then((data) => {
	  		this.deData = data.data;
	  		for(let i=0;i<this.deData.attachmentsList.length;i++){
	  			if(this.deData.attachmentsList[i].fileType==1){
	  				this.attachmentsList.push(this.deData.attachmentsList[i]);
	  			}
	  		}
  			if(!this.deData.newsContent){
	  			return false;
	  		}
	  		this.$nextTick(function () {
		  		for(let i=0;i<$('.dcontent img').length;i++){
		  			this.imgArr.push($('.dcontent img').eq(i).attr('src')); 
		  		}
				if(this.imgArr.length>0) {
					for(let i=0; i<this.imgArr.length; i++) {
						getNewsImage(vthis.imgArr[i]).then((data) => {
							vthis.deData.newsContent = vthis.deData.newsContent.replace(new RegExp(vthis.imgArr[i], "g"), URL.createObjectURL(data));
						})
					}
				}
			})
	  	});
	  	getNewsLastAndNext(this.listParam.id).then((data) =>{
	  		[this.prevData,this.nextData] = data.data;
	  	})
	},
	methods:{
		download(url,filename){
			getFile(url).then((data) => {
				var blob = data;
				if (blob instanceof Blob) { // 判断是否二进制
					var a = document.createElement("a");
					document.body.appendChild(a);
					// 创建URL对象
					var url = window.URL.createObjectURL(blob);
					a.href = url;
					a.download = filename;
					a.click();
					// 移除URL对象
					window.URL.revokeObjectURL(url);
				}
			})
		},
		goUrl(path){
			this.$router.push(path);
			this.reload();
		}
	}
}
</script>
<style lang="less">
	.newsdetail{
		.detail{
			font-size:14px;
			margin-top:30px;
			.title{
				text-align: center;
				padding-bottom: 30px;
				border-bottom:1px dotted #ddd;
				h3{
					width:80%;
					line-height: 1.4;
					margin: 0 auto 10px;
				}
				.p1{
					font-size: 12px;
					color:#999999;
				}
			}
			.dcontent{
				padding:30px 0;
				line-height: 26px; 
				text-align: justify; 
				color: #444;
			}
			.attachment{
				margin-top: 70px;
				margin-bottom:32px;
				p{
					font-size:16px;
					font-weight: bold;
					margin-bottom: 5px;
				}
				ul{
					li{
						cursor:pointer;
						font-size: 14px;
						color:#0066CC;
						&:hover{
							color:@colorRed;
						}
					}
				}
			}
			border-bottom:1px dotted #ddd;
		}
		.pn{
			color:#999999;
			font-size:14px;
			margin: 15px 0 100px;
			.prev,.next{
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
				width: 50%;
				font-size:12px;
				color:#666;
				span{
					cursor:pointer;
					&:hover{
						color:#444;
					}
				}
				font{
					color:#999999;
				}
			}
			.prev{
				float: left;
			}
			.next{
				float: right;
				text-align: right;
			}
			a{
				color:#999999;
			}
		}
	}
</style>