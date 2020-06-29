<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="活动详情" @clickRight="navTo('/pages/task/taskUpload')">
			<block slot="right">
				<view style="font-size: 15px;">上传截图</view>
			</block>
		</uni-nav-bar>
		<hint-box v-if="checkHint" content="我们会在2 - 3个工作日完成审核，请您耐心等待.."></hint-box>
		<view class="task-detail-body">
			<view class="task-title">
				<view class="tt-title">支付宝扫码领福利</view>
				<view class="tt-time">（2020.06.17-2020.06.30）</view>
			</view>
			<view class="task-hint">请阅读知悉活动规则后进行推广</view>
			<view class="task-cash">
				<image class="tc-bg" src="/static/icon/bg-earn-01.png"></image>
			    <view class="tc-title">当前实际结算（元）：</view>
				<view class="tc-num">243.28</view>
			</view>
			<view class="task-detail">
				<view>
					<view class="td-titme">预估收益（元）</view>
					<view class="td-num">652.78</view>
				</view>
				<view>
					<view class="td-titme">提交数量</view>
					<view class="td-num td-num-center">98</view>
				</view>
				<view>
					<view class="td-titme">过审数量</view>
					<view class="td-num td-num-center">86</view>
				</view>
			</view>
			<view class="task-check-history" @click="navTo('/pages/task/checkHistory')">审核记录</view>
			<view class="task-past" v-if="taskPsat == 'true'">活动已结束</view>
			<view class="qr-bt" v-if="!qrContent" @click="getQrContent">获取推广码</view>
			<view class="qr-content" v-if="qrContent">
				<image class="qr-img" src="/static/mock/mock-03.png" mode="widthFix"></image>
				<view class="qr-one">支付宝拉新二维码</view>
				<view class="qr-two">打开支付宝 扫一扫</view>
				<view class="qr-save" @click="saveQr()">保存图片</view>
			</view>
			<view class="task-content">
				
			</view>
		</view>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box';
	export default {
		components: {
			hintBox
		},
		onLoad(res) {
			this.taskPsat = res.past
			console.log(res)
		},
		data() {
			return {
				taskPsat: "false",
				checkHint: true, //有提交数量不为零时显示
				qrContent: false
			}
		},
		methods: {
			navTo(url){
				this.$aiRouter.navTo(url)
			},
			getQrContent(){
				this.qrContent = true
			},
			/*保存推广码到本地相册*/
			saveQr(){
				const _this = this
				uni.downloadFile({
				    url: 'http://static.adesk.com/wallpaper?imgid=5880a6b4e7bce7751fc433df&reso=1200x800', 
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
		padding: 15px 30rpx 50px;
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
		display: flex;
		height: 49px;
		align-items: center;
		padding: 0 0 0 30rpx;
		.tc-bg {
			position: absolute;
			width: 750rpx;
			height: 99px;
			left: -30rpx;
			top: -25px;
		}
		.tc-title {
			position: relative;
			z-index: 10;
			font-size: 12px;
			color: #FFFFFF;
			opacity: 0.8;
		}
		.tc-num {
			position: relative;
			z-index: 10;
			font-size: 27px;
			color: #FFFFFF;
			opacity: 0.9;
			font-weight: bold;
		}
		
	}
	/*预估收益*/
	.task-detail {
		width: 690rpx;
		height: 80px;
		margin: 10px 0 15px 0;
		padding: 18px 64rpx;
		display: flex;
		justify-content: space-between;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		.td-titme {
			font-size: 12px;
		}
		.td-num {
			font-size: 20px;
			color: #FFA570;
			font-weight: bold;
		}
		.td-num-center {
			text-align: center;
		}
	}
	/*审核记录*/
	.task-check-history {
		height: 50px;
		padding: 0 0 30px;
		font-size: 14px;
		color: #999999;
		text-decoration-line: underline;
		text-align: right;
	}
	/*活动已结束提示*/
	.task-past {
		margin: 0 auto;
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
		.qr-one {
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
		}
		.qr-save {
			width: 250px;
			height: 45px;
			line-height: 45px;
			margin: 0 auto;
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
	}

</style>
