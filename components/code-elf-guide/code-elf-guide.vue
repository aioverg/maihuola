<template>
	<view class="launch">
		<view class="launch-bg">
			<image class="launch-img" mode="widthFix" src="../../static/icon/bg-launch01.png"></image>
		</view>
		<view class="launch-shade"></view>
		<view class="launch-content">
			<view class="launch-content-box">
				<view class="launch-content-title">用户协议及隐私政策</view>
				<view class="launch-content-item">亲，感谢您对卖货啦一直以来对信任！我们依据最新的监管要求更新了
				    <text class="launch-link" @click="navTo('/pages/about/agreement')">《用户协议》</text>
					和
					<text class="launch-link" @click="navTo('/pages/about/privacy')">《隐私协议》</text>
					，特向您说明如下：
				</view>
				<view class="launch-content-item">1、为向您提供选品相关基本功能，我们会收集、使用必要对信息；</view>
				<view class="launch-content-item">2、基于您的授权，我们可能会获取您的位置等信息，您有权拒绝或取消授权；</view>
				<view class="launch-content-item">3、我们会采取业界先进的安全措施保护您的信息安全；</view>
				<view class="launch-content-item">4、未经您同意，我们不会从第三方处获取、共享或向其提供您的信息；</view>
			</view>
			<view class="launch-bt-box">
				<view class="launch-bt-no" @click="refuse">不同意</view>
				<view class="launch-bt-yes" @click="launchFlag">同意</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
						key: 'launchFlag',
						data: true,
				});
				uni.reLaunch({
					url: "/pages/login/loginPhone?leftClickTag=/pages/index/index?tabId=0&jumpUrl=/pages/index/index?tabId=0"
				})
			},
			navTo(url){
				this.$aiRouter.navTo(url)
			},
			refuse(){
				// #ifdef APP-PLUS
				plus.runtime.quit();
				// #endif
			}
		}
	}
	//background-color: rgba(0, 0, 0, .4);
</script>
<style>
	.launch {
		width: 100%;
		height: 100%;
		position: relative;
		background-color: rgba(0, 0, 0, .4);
	}
	.launch-bg {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.launch-img {
		width: 750rpx;
	}
	.launch-shade {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background-color: rgba(0, 0, 0, .4);
	}
	.launch-content {
		position: absolute;
		padding: 25px;
		width: 80%;
		left: 10%;
		border-radius: 10px;
		top: 20%;
		background-color: #ffffff;
	}
	.launch-content-title {
		font-weight: 700;
		text-align: center;
		margin: 0 0 20px;
	}
	.launch-content-item {
		font-size: 14px;
		line-height: 26px;
	}
	.launch-link {
		color: #075db3;
		text-decoration: underline;
	}
	.launch-bt-box {
		font-size: 16px;
		margin: 20px 0 0;
	}
	.launch-bt-no {
		display: inline-block;
		color: #DCDFE6;
	}
	.launch-bt-yes {
		display: inline-block;
		float: right;
		color: #DD524D;
	}
</style>
