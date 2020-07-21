<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="活动详情">
			<block slot="right">
				<view v-if="taskUploadFlag" style="font-size: 15px;" @click="navTo('/pages/task/taskUpload?type=union&id=' + taskId + '&parent=' + parent)">上传截图</view>
			</block>
		</uni-nav-bar>
		<hint-box v-if="taskStatus == '0'" content="我们会在2 - 6个工作日完成审核，请您耐心等待..."></hint-box>
		<view class="task-detail-body">
			<view class="task-title">
				<view class="tt-title">{{taskContent.title}}</view>
				<view class="tt-time">（{{taskContent.start_time}}-{{taskContent.end_time}}）</view>
			</view>
			<view class="task-hint">请阅读知悉活动规则后进行任务</view>
			<view class="task-cash">
				<view class="task-cash-one">
					<view class="tc-title">赏金收益（元）：</view>
					<view class="tc-num">{{taskContent.amount}}</view>
					<view v-if="taskContent.is_single" class="tc-status" :style="{color: statusColor}">{{taskContent.record_status}}</view>
					<image v-if="!taskContent.is_single" src="/static/icon/icon-right-arrow-01.png" style="width:6px;" mode="widthFix"></image>
				</view>
				<view class="task-cash-two" v-if="taskContent.record_status == '未通过'">失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因</view>
			</view>
			<view class="qr-content">
				<image class="qr-img" :src="taskContent.spread_qrcode" mode="widthFix"></image>
				<view class="qr-save" @click="saveQr(taskContent.spread_qrcode)">保存推广码</view>
			</view>
			<view class="task-rule">
				<jyf-parser :html="taskContent.rule"></jyf-parser>
			</view>
		</view>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box'
	import jyfParser from "@/components/jyf-parser/jyf-parser"
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	export default {
		components: {
			hintBox,
			jyfParser,
			mixLoading
		},
		data() {
			return {
				taskUploadFlag: true,
				statusColor: "#666666" ,//审核状态字体颜色
				taskId: 0, //任务ID
				parent: "yes",
				taskStatus: "0", //任务是否过期
				taskContent: {
					title: "加入公会赚赏金",
					start_time: "0000.00.00",
					end_time: "0000.00.00",
					commission: "0",
					rule: "555555",
					spread_qrcode: "/static/mock/mock-03.png"
					
				},
				routerKind: "navTo",
				showFlag: true,
				downRefreshFlag: true,
			}
		},
		onLoad(res) {
			this.showFlag = false
			this.taskId = res.id
			this.taskStatus = res.is_end
			if(res.router){
				this.routerKind = res.router
			}
			this.getTaskDetail(res.id)
		},
		onShow() {
			if(this.showFlag){
				this.getTaskDetail(this.taskId)
			}
		},
		//上划刷新
		onPullDownRefresh() {
			const _this = this
			if(!_this.downRefreshFlag){return}
			_this.downRefreshFlag = false
			uni.startPullDownRefresh({
				success: function() {
					_this.getTaskDetail(_this.taskId).then(res => {
						if(res){
							_this.downRefreshFlag = true
							uni.stopPullDownRefresh()
						}
					})
				},
			})
		},
		methods: {
			navTo(url){
				if(this.routerKind == "navTo"){
					this.$aiRouter.navTo(url)
					return
				}
				if(this.routerKind == "redirect"){
					this.$aiRouter.redirect(url)
					return
				}
			},
			//获取任务信息
			getTaskDetail(id){
				return this.$api.postTaskDetail({
					id: id
				}).then( res => {
					res.data.data.start_time = res.data.data.start_time.replace(/-/g, '.')
					res.data.data.end_time = res.data.data.end_time.replace(/-/g, '.')
					if(res.data.data.record_status == -1){
						res.data.data.record_status = ""
					}else if(res.data.data.record_status == 0){
						res.data.data.record_status = "未通过"
					}else if(res.data.data.record_status == 1){
						res.data.data.record_status = "审核通过"
						this.statusColor = "#FF716E"
					}else{
						res.data.data.record_status = "待审核"
						this.statusColor = "#FFA570"
					}
					if(res.data.data.is_single == 1){
						if(res.data.data.record_status == -1 || res.data.data.record_status){
							this.taskUploadFlag = false
						}
					}
					if(res.data.data.parent_id == 0){
						this.parent = "no"
					}else{
						this.parent = "yes"
					}
					this.taskContent = res.data.data
					this.showFlag = true
					return true
				})
			},
			//保存推广码到本地相册
			saveQr(url){
				const _this = this
				uni.downloadFile({
				    url: url, 
				    success: (res) => {
				        if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
							    filePath: res.tempFilePath,
							    success: function () {
							        _this.$aiGlobal.aiPopupMessage.apply(_this,['success', '保存成功'])
							    },
								fail: function(){
									_this.$aiGlobal.aiPopupMessage.apply(_this,['err', '保存失败'])
								}
							});
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.task-detail-body {
		width: 750rpx;
		padding: 10px 30rpx 50px;
	}
	/*任务标题及时间*/
	.task-title {
		display: flex;
		align-items: center;
		position: relative;
		.tt-title {
			font-size: 16px;
			font-weight: bold;
		}
		.tt-time {
			font-size: 12px;
			color: #999999;
		}
		
	}
	/*推广提示*/
	.task-hint {
		margin: 2px 0 10px 0;
		font-size: 12px;
		color: #666666;
	}
	/*结算金额*/
	.task-cash {
		position: relative;
		margin: 0 0 10px;
		width: 690rpx;
		.task-cash-one {
			display: flex;
			align-items: center;
			height: 49px;
			padding: 0 24rpx;
			border-radius: 8px;
			box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
			.tc-title {
				font-size: 13px;
			}
			.tc-num {
				flex-grow: 1;
				font-size: 20px;
				color: #FF716E;
				font-weight: bold;
			}
			.tc-status {
				font-size: 13px;
				color: #FFA570;
			}
		}
		.task-cash-two {
			width: 650rpx;
			font-size: 12px;
			color: #999999;
			margin: 0 auto;
			padding: 5px 30rpx;
			box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
			border-radius: 8px;
		}
	}
	/*推广码内容*/
	.qr-content {
		width: 690rpx;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		padding: 15px 15px 40px;
		margin: 0 0 10px 0;
		.qr-img {
			width: 630rpx;
		}
		.qr-save {
			width: 250px;
			height: 45px;
			line-height: 45px;
			margin: 25px auto 0;
			border-radius: 23px;
			border: 1px solid #FFA570;
			font-size: 16px;
			color: #FFA570;
			text-align: center;
		}
	}
	
	/*任务内容*/
	.task-rule {
		width: 690rpx;
		min-height: 300px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		padding: 15px 15px 15px 15px;
	}

</style>
