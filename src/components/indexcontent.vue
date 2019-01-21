<template>
	<div id="indexcontent">
	  	<div class="middle-bg">
			<section>
			    <div class="banner" id="banner">
					<div class="swiper-container banner-container">
					    <div class="swiper-wrapper">
					      	<div class="swiper-slide"  v-for="(item,index) in bannerList" :key="index">
						      	<a style="width:100%" :href="item.linkUrl?item.linkUrl:'#'">
						      		<img :src="item.url" :onerror="defaultImg">
						      	</a>	
					      	</div>
					    </div>
					    <div class="swiper-pagination"></div>
					</div>
			    </div>
			</section>
		  	
			<section class="x-section xn">
			    <div>
			    	<el-row>
					  	<el-col :lg="12" :sm="24" class="xndvw">
					  		<div>
					  			<el-row class="xit-wraper1">
					  				<el-col :span="12">
					  					<div class="txtw">
					  						<img src="/static/iconimg/i_01.png" alt="">
					  						<span class="txt">协会公告</span>
					  					</div>
					  				</el-col>
					  				<el-col :span="12">
					  					<div class="morew">
					  						<span class="more"><router-link class="textBtn" to="/nol">+&nbsp;更多</router-link></span>
					  					</div>
					  				</el-col>
					  			</el-row>
					  		</div>
					  		<div class="xn-first">
					  				<router-link :to="'/nod/'+firstNotice.newsId">
						  				<img  class="sm-banner" :src="firstNotice.url" :onerror="defaultImg2" alt="">
							  			<p class="clearfix">
							  				<el-col :span="18" class="xn-tit ellipsis" :title="firstNotice.newsSubject">
						  						{{firstNotice.newsSubject}}
						  					</el-col>
						  					<el-col :span="6" class="ndate">
						  						{{firstNotice.createdDate | createdDateFormat}}
						  					</el-col>
							  			</p>
						  			</router-link>
					  		</div>
					  		<div class="xn-list">
					  			<ul>
					  				<li class="clearfix"  v-for="(item,index) in indexNoticeList" :key="index">
					  					<router-link :to="'/nod/'+item.newsId">
						  					<el-col :span="18" class="xn-tit ellipsis" :title="item.newsSubject">
						  						<font>.</font>{{item.newsSubject}}
						  					</el-col>
						  					<el-col :span="6" class="ndate">
						  						{{item.createdDate | createdDateFormat}}
						  					</el-col>
										</router-link>
					  				</li>
					  			</ul>
					  		</div>
					  	</el-col>
					  	<el-col :lg="12" :sm="24" class="xndvw">
					  		<div class="xndv1">
					  			<el-row class="xit-wraper1">
					  				<el-col :span="12">
					  					<div class="txtw">
					  						<img src="/static/iconimg/i_02.png" alt="">
					  						<span class="txt">考点分布</span>
					  					</div>
					  				</el-col>
					  				<el-col :span="12">
					  					<div class="morew">
					  						<span class="more"><router-link class="textBtn" to="/eplist">+&nbsp;更多</router-link></span>
					  					</div>
					  				</el-col>
					  			</el-row>
					  			<div>
					  				<el-table class="eptable"
								      	:data="indexExaminationPointList"
								      	style="width: 100%">
								      	<el-table-column
								      		prop="index"
								        	label="序号"
								        	align="center"
								        	width="120">
								      	</el-table-column>
								      	<el-table-column
								        	prop="mechanismFullname"
								        	label="新增考点"
								        	align="center"
								        	width="300">
								      	</el-table-column>
								      	<el-table-column
								        	prop="createdDate"
								        	className="edate"
								        	label="日期"
								        	align="center">
								      	</el-table-column>
								    </el-table>
					  			</div>
					  		</div>
					  	</el-col>
					</el-row>
			    </div>
			</section>
			<section class="nwrap" style="background-color:#FFFFFF;">
				<div class="mid">
					<div class="ntwrap">
						<img src="/static/iconimg/i_02.png" alt="">&nbsp;&nbsp;协会新闻
					</div>
					<div class="nimgwrap">
						<div class="swiper-container img-container">
						    <div class="swiper-wrapper">
						      	<div class="swiper-slide" v-for="(item,index) in indexImagesNewsList" :key="item.newsId">
					      			<router-link :to="'/ned/'+item.newsId">
							      		<img :src="item.url" :onerror="defaultImg">
							      		<div class="ncwrap">
											<p class="ncp1">{{item.newsSubject}}</p>
							      		</div>
							      	</router-link>
						      	</div>
							</div>
						    
						</div>
						<!-- <div class="swiper-button-next"></div>
						<div class="swiper-button-prev"></div> -->
					</div>
					<div class="n2wrap">
						<el-row>
							<el-col :lg="12" :sm="24" class="n2cwrap" v-for="(item,index) in indexNewsList" :key="index">
								<div class="n2cdw clearfix">
									<router-link :to="'/ned/'+item.newsId">
										<div class="n2cd1">
											<p class="p1">{{item.createdDate | newsCreatedDateFormatD}}</p>
											<p class="p2">{{item.createdDate | newsCreatedDateFormatYM}}</p>
										</div>
										<div class="n2cd2">
											<p class="p1">{{item.newsSubject}}</p>
											<p class="p2">{{item.synopsis | twolineEllipsis}}</p>
										</div>
									</router-link>
								</div>
							</el-col>
						</el-row>
						<div class="more"><el-button class="elbtn-red btn-more" @click="goUrl('/nel')">+&nbsp;更多</el-button></div>
					</div>
				</div>
			</section>
	  </div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import { getImageNoToken,getNewsImage } from '@/service/commonData'
import { getBannerList,getIndexNewsList,getIndexImagesNewsList,getIndexNoticeList,getExaminationPointList } from '@/service/indexData'
import 'swiper/dist/css/swiper.min.css';
export default {
  	name: 'indexcontent',
  	data () {
    	return {
	      	API_ROOT: API_ROOT,
	      	d:{

	      	},
	      	bannerList:JSON.parse(localStorage.getItem('banner'))?JSON.parse(localStorage.getItem('banner')):[
	      		// {linkUrl:'',url:'/static/images/banner1.jpg'},
	      		// {linkUrl:'',url:'/static/images/banner2.jpg'},
	      		// {linkUrl:'',url:'/static/images/banner3.jpg'}
	      	],
	      	newsList:[],
	      	indexExaminationPointList:[],
	      	examinationPointData:[],
	      	indexNewsList:[],
	      	indexImagesNewsList:[],
	      	indexNoticeList:[],
	      	firstNotice:{},
	      	defaultImg: 'this.src="/static/images/default.jpg"',
	      	defaultImg2: 'this.src="/static/images/default2.jpg"',
	      	swiperObj:'',
	      	swiperObj2:''
	    }
	},
	filters:{
		formatDate(param) {
			if(!param){
				return
			}
		    let date = new Date(param);
		    let Y = date.getFullYear() + '-';
		    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
		    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
		    let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
		    let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
		    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		    return Y + M + D;
		},
		createdDateFormat(param){
			if(!param){
				return
			}
			return param.split(' ')[0]
		},
		newsCreatedDateFormatD(param){
			if(!param){
				return
			}
			return param.split(' ')[0].split('-')[2]
		},
		newsCreatedDateFormatYM(param){
			if(!param){
				return
			}
			return param.split(' ')[0].split('-')[0]+'-'+param.split(' ')[0].split('-')[1]
		},
		twolineEllipsis(param){
			if(!param){
				return
			}
			if(param.length>75){
				return param.substr(0,73)+' ...'
			}else{
				return param;
			}
		}
	},
	mounted(){
		let vthis = this;
		this.swiperInit();
		getBannerList().then((data) => {
			let cdata = data.data;
			if(cdata.length==0){
				this.bannerList = [{url:'/static/images/banner1.jpg'}];
				return false;
			}
			let len = this.bannerList.length;
			if(len>cdata.length){
				this.bannerList.splice(cdata.length,len-cdata.length)
			}else if(len<cdata.length){
				for(var i=0;i<cdata.length-len;i++){
					this.bannerList.push(cdata[i])
				}
			}
			let parr = [];
			for(let i=0;i<cdata.length;i++){
				parr[i] = getImageNoToken(cdata[i].attachments.imageUrl).then((data) => {
					vthis.$set(vthis.bannerList[i], 'url', URL.createObjectURL(data))
			
				});
			}
			Promise.all(parr).then((result)=>{
				vthis.$nextTick(function () {
					this.swiperObj.destroy(false);
					vthis.swiperInit();
					localStorage.setItem('banner',JSON.stringify(vthis.bannerList))
				})
			})
		});
		getIndexNewsList().then((data) => {
			this.indexNewsList = data;
			console.log(this.indexNewsList)
		});
		getIndexImagesNewsList().then((data) => {
			// let parr = [];
			this.indexImagesNewsList = data;
			for(let i =0;i<this.indexImagesNewsList.length;i++){
				this.$set(this.indexImagesNewsList[i], 'url', '')
				getNewsImage(this.indexImagesNewsList[i].attachmentsList[0].filePath).then((data) => {
					this.$set(this.indexImagesNewsList[i], 'url', URL.createObjectURL(data))
				})
			}
			// Promise.all(parr).then((result)=>{
			// 	this.$nextTick(function () {
			// 		this.swiperInit2();
			// 	})
			// })
		});
		getIndexNoticeList().then((data) => {
			this.indexNoticeList = data;
			this.indexNoticeList.length = 5;
			this.firstNotice = this.indexNoticeList.splice(0,1)[0];
			getNewsImage(vthis.firstNotice.attachmentsList[0].filePath).then((data) => {
				vthis.$set(vthis.firstNotice, 'url', URL.createObjectURL(data))
			})
			for(var i =0;i<this.indexNoticeList.length;i++){
				if(!this.indexNoticeList[i]){
					this.indexNoticeList[i] = {
						newsSubject:'',
						createdDate:''
					}
				}
			}
		});
		getExaminationPointList().then((data)=> {
			this.indexExaminationPointList = data.data;
			let len = this.indexExaminationPointList.length;
			this.indexExaminationPointList.length = len>8?8:len;
			this.indexExaminationPointList.forEach(function(item,index){
				item.index = index+1
			});
		});
	  	// window.onresize = ()=>{
	  	// 	this.swiperInit2();
	  	// }
	},
	methods:{
		swiperInit(){
			this.swiperObj = new Swiper('.banner-container', {
		        loop: true,
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        autoplay: 3000
		    });
		    
		},
		// swiperInit2(){
		// 	this.swiperObj2 = new Swiper('.img-container', {
		//         loop: true,
		//         slidesPerView: 3,
		//         slidesPerGroup: 2,
		//         spaceBetween: '4.615%',
		//         paginationClickable: true,
		// 	    navigation: {
		// 	        nextEl: '.nimgwrap .swiper-button-next',
		// 	        prevEl: '.nimgwrap .swiper-button-prev'
		// 	    },
		// 	    prevButton:'.nimgwrap .swiper-button-prev',
		// 		nextButton:'.nimgwrap .swiper-button-next'
		//     });
		// },
		newsLink(item){
			if(item.newsId){
				this.$router.push('/news/newsdetail/'+item.newsId)
			}
		},
		noticeLink(item){
			if(item.newsId){
				this.$router.push('/news/noticedetail/'+item.newsId)
			}
		},
		goUrl(path){
			this.$router.push(path);
		}
	}
}
</script>
