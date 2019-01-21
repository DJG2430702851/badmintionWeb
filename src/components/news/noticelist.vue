<template>
	<div id="noticelist" class="noticelist">
	    <div class="list">
			<ul>
				<li v-for="(item,index) in noticelist" keys="index">
					<router-link :to="'/nod/'+item.newsId">
						<div class="nrow">
							<el-row>
								<el-col :span="19">
									<div class="dv1">
										<p class="p1 ellipsis"><font class="dot">.</font>&nbsp;&nbsp;{{item.newsSubject}}</p>
									</div>
								</el-col>
								<el-col :span="5">
									<div class="dv2">
										<p class="p4">{{item.createdDate | createdDateFormat}}</p>
									</div>
								</el-col>
							</el-row>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="fy-dv">
	    	<el-pagination
			  background
			  layout="prev, pager, next"
			  @current-change="handleCurrentChange"
			  :page-size="listParam.size"
			  :total="total">
			</el-pagination>
	    </div>

  </div>
</template>
<script>
import {getNoticeList} from '@/service/newsData'
export default {
  	name: 'noticelist',
  	data () {
    	return {
	      listParam:{
	      	size:pageSize,
	      	page:1
	      },
	      total:0,
	      noticelist:[
	      	
	      ]
	    }
	},
	filters:{
		createdDateFormat(param){
			if(!param){
				return
			}
			return param.split(' ')[0]
		}
	},
	mounted(){
	  	this.getList();
	},
	methods:{
		handleCurrentChange(val){
			this.listParam.page = val;
	      	this.getList();
		},
		getList(){
		  	getNoticeList(this.listParam).then((data) => {
		  		this.noticelist = data.data;
		  		this.total = parseInt(data.recordsTotal);
		  	})
		}
	}
}
</script>
<style lang="less">
	.noticelist{
		margin-bottom: 50px;
		.list{
			font-size:14px;

			ul{
				li{
					cursor:pointer;
					&:hover{
						a{
							.p1{
								color:@colorRed;
							}
						}
					}
					a{
						color:#111111;
						.nrow{
							line-height: 1;
							padding-top:15px;
							padding-bottom: 15px;
							border-bottom:1px dotted #ddd;  
							.p1{
								.dot{
									position:relative;
									top:-4px;
									line-height: 0;
									font-size: 30px;
									color: #999999;
								}
							} 
							.p2{
								font-size:12px;
							}
							.dv2{
								text-align: right;
								font-size:12px;
								.p3{
									width: 60px;
									display: inline-block;
									text-align: center;
									margin-bottom:5px;
								}
								.p4{
									color:#999999;
								}
							}
						}
					}
				}
			}
		}
	}
</style>