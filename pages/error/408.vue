<template>
	<view>
		<view class="img-box">
			<image class="img" src="/static/icon/err-02.png" mode="widthFix"></image>
		</view>
		<view class="error-title-one">哎呀！网络好像有点问题</view>
		<view class="error-title-two">请检查您的网络，重新加载</view>
		<view class="error-bt" @click="testNetwork">重试</view>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				
			}
		},
		methods: {
			testNetwork(){
				const _this = this
				uni.getNetworkType({
					success: function(res){
						if(res.networkType !== "none" /*|| res.networkType == "unknown"*/ ){
							_this.$aiRouter.navTabBar('/pages/index/index')
						}else{
							_this.$aiGlobal.aiPopupMessage.apply(_this,['err', '连接网络失败'])
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
	.img-box {
		margin: 100px 0 60px;
		.img {
			display: block;
			width: 456rpx;
			
			margin: 0 auto;
		}
	}
	.error-title-one {
		font-size: 18px;
		color: #333333;
		text-align: center;
	}
	.error-title-two {
		margin: 5px 0 45px;
		font-size: 15px;
		color: #666666;
		text-align: center;
	}
	.error-bt {
		width: 330rpx;
		height: 40px;
		margin: 0 auto;
		line-height: 40px;
		text-align: center;
		font-size: 15px;
		color: #FFFFFF;
		background: #F47A73;
		border-radius:45px;
	}
</style>
