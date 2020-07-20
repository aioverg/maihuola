<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="活动详情">
			<block slot="right">
				<view style="font-size: 15px;" @click="navTo('/pages/task/taskUpload?id=' + taskId)" v-if="taskStatus == '0'">上传截图</view>
			</block>
		</uni-nav-bar>
		<hint-box v-if="taskStatus == '0'" content="我们会在2 - 6个工作日完成审核，请您耐心等待..."></hint-box>
		<view class="task-detail-body">
			<view class="task-title">
				<view class="tt-title">{{taskContent.title}}</view>
				<view class="tt-time">（{{taskContent.start_time}}-{{taskContent.end_time}}）</view>
			</view>
			<view class="task-hint">请阅读知悉活动规则后进行推广</view>
			<view class="task-cash-box">
				<view class="task-cash">
					<view>
						<view class="task-cash-num">{{taskContent.commission}}</view>
						<view class="task-cash-des">累计收益（元）</view>
					</view>
					<view>
						<view class="task-cash-num">{{taskContent.predict}}</view>
						<view class="task-cash-des">预估收益（元）</view>
					</view>
				</view>
				<view class="task-upload">
					<view class="task-upload-com">
						<text class="task-upload-des">过审数量（个）：</text>
						<text class="task-upload-num">{{taskContent.com_num}}</text>
					</view>
					<view>
						<text class="task-upload-des">提交数量（个）：</text>
						<text class="task-upload-num">{{taskContent.total_num}}</text>
					</view>
				</view>
			</view>
			<view class="task-check-history" @click="navTo('/pages/task/checkHistory?id=' + taskId + '&tasktitle=' + taskContent.title)">
				<view class="tch-des">查看审核记录</view>
				<image class="tch-icon" mode="widthFix" src="/static/icon/icon-right-arrow-01.png"></image>
			</view>
			<view class="task-past" v-if="taskStatus == '1'">活动已结束</view>
			<!--
			<view class="qr-bt" v-if="qrCodeBt" @click="getqrCode">获取推广码</view>
			-->
			<view class="qr-content" v-if="qrCode">
				<image class="qr-img" :src="taskContent.spread_qrcode" mode="widthFix"></image>
				<!--
				<view class="qr-one">支付宝拉新二维码</view>
				<view class="qr-two">打开支付宝 扫一扫</view>
				-->
				<view class="qr-save" @click="saveQr(taskContent.spread_qrcode)">保存推广码</view>
			</view>
			<view class="task-content" v-if="qrContent">
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
				taskId: 0, //任务ID
				taskStatus: "0", //任务是否过期
				taskContent: {},
				qrCodeBt: true, //是否显示获取推广码按钮
				qrCode: true, //是否显示推广码
				qrContent: true,
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
			if(res.is_end == "1"){
				this.qrCodeBt = false
				this.qrCode = false
				this.qrContent = false
			}
			this.getTaskDetail(res.id)
		},
		onShow() {
			if(this.showFlag){
				this.getTaskDetail(this.taskId)
			}
		},
		//滑动到底部时请求操作
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
			/*
			//显示推广码
			getqrCode(){
				this.qrCode = true
			},*/
			//获取任务信息
			getTaskDetail(id){
				return this.$api.postTaskDetail({
					id: id
				}).then( res => {
					res.data.data.start_time = res.data.data.start_time.replace(/-/g, '.')
					res.data.data.end_time = res.data.data.end_time.replace(/-/g, '.')
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
	/*结算金额和过审数量*/
	.task-cash-box {
		height: 110px;
		padding: 15px 15rpx 10px;
		border-radius: 8px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		.task-cash {
			display: flex;
			border-bottom: 1px dashed #E5E5E5;
			padding: 0 0 13px 20rpx;
			.task-cash-num {
				width: 330rpx;
				font-size: 20px;
				color: #FF716E;
				font-weight: bold;
			}
			.task-cash-des {
				font-size: 13px;
				color: #666666;
			}
		}
		.task-upload {
			display: flex;
			align-items: center;
			padding: 4px 0 0 20rpx;
			.task-upload-com {
				width: 330rpx;
			}
			.task-upload-des {
				font-size: 12px;
				color: #999999;
			}
			.task-upload-num {
				font-size: 13px;
				color: #FFA570;
			}
			
		}
	}
	/*审核记录*/
	.task-check-history {
		height: 40px;
		border-radius: 8px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		padding: 0 30rpx 0 70rpx;
		margin: 10px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.tch-des {
			font-size: 13px;
			color: #666666;
		}
		.tch-icon {
			width: 6px;
		}
	}
	/*活动已结束提示*/
	.task-past {
		margin: 0 auto 57px;
		width: 110px;
		height: 35px;
		line-height: 35px;
		background: rgba(0,0,0,0.15);
		border-radius: 20px;
		text-align: center;
		font-size: 15px;
		color: rgba(255,255,255,0.8);
	}
	/*获取推广码按钮*/
	.qr-bt {
		width: 250px;
		height: 45px;
		line-height: 45px;
		border-radius: 23px;
		border: 1px solid #FFA570;
		text-align: center;
		font-size: 16px;
		color: #FFA570;
		margin: 0 auto 20px;
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
		/*.qr-one {
			font-size: 20px;
			font-weight: bold;
			color: #FFA570;
			text-align: center;
			margin: 25px 0 8px;
		}
		.qr-two {
			font-size: 14px;
			color: #999999;
			text-align: center;
			margin: 0 0 30px;
		}*/
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
	.task-content {
		width: 690rpx;
		min-height: 300px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		padding: 15px;
	}

</style>
