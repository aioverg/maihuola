<template>
	<view>
		<ai-navbar
		    title="卖货啦"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="img-box">
			<image class="img" src="/static/error/ai-error01.png"></image>
		</view>
		<view class="error-title-one">哎呀！网络好像有点问题</view>
		<view class="error-title-two">请检查您的网络，重新加载</view>
		<view class="error-bt" @click="testNetwork">重试</view>
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
							_this.$aiRouter.navTabBar(_this.$basePath + '/pages/index/index')
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(255,255,255,1);
	}
	.img-box {
		margin: 100px 0 60px 0;
		.img {
			display: block;
			width: 456rpx;
			height: 314rpx;
			margin: 0 auto;
		}
	}
	.error-title-one {
		font-size: 18px;
		color: rgba(51,51,51,1);
		text-align: center;
	}
	.error-title-two {
		margin: 5px 0 45px;
		font-size: 15px;
		color:rgba(102,102,102,1);
		text-align: center;
	}
	.error-bt {
		width: 330rpx;
		height: 40px;
		margin: 0 auto;
		line-height: 40px;
		text-align: center;
		font-size: 15px;
		color: rgba(255,255,255,1);
		background: rgba(244,122,115,1);
		border-radius:45px;
	}
</style>
