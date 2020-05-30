<template>
	<view class="ai-login-box">
		<image class="ai-login-box-logo" mode="widthFix" src="/static/img/maihuola.png"></image>
		<view class="ai-login-box-title">登录即可赚取佣金</view>
		<view class="ai-login-box-bt" @click="navToLogin()">注册/登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			navToLogin(){
				uni.navigateTo({
					url: '/pages/login/loginPhone'
				})
			}
		}
	}
</script>

<style lang="scss">
	.ai-login-box {
		height: 90rpx;
		display: flex;
		background: #F47A73;
		align-items: center;
		opacity: 0.95;
		.ai-login-box-logo {
			display: inline-block;
			width: 118rpx;
			margin: 0 20rpx 0 30rpx;
		}
		.ai-login-box-title {
			display: inline-block;
			font-size: 13px;
			color:rgba(255,255,255,1);
			margin: 0 198rpx 0 0;
			
		}
		.ai-login-box-bt {
			display: inline-block;
			font-size: 13px;
			width: 146rpx;
			height: 56rpx;
			line-height: 56rpx;
			text-align: center;
			border-radius: 28rpx;
			background: rgba(255,255,255,1);
			color: rgba(234,58,106,1);
		}
	}
</style>
