//登录提醒组件
<template>
	<view class="ai-login-box">
		<image class="ai-login-box-logo" mode="widthFix" src="/static/img/maihuola.png"></image>
		<view class="ai-login-box-title">登录即可赚取佣金</view>
		<view class="ai-login-box-bt" @click="navToLogin()">登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			jumpUrl: {
			    type: String,
			    default: null,
			}
		},
		methods: {
			navToLogin(){
				uni.navigateTo({
					url: "/pages/login/loginPhone?jumpUrl=" + this.jumpUrl
				})
			}
		}
	}
</script>

<style lang="scss">
	.ai-login-box {
		height: 90rpx;
		display: flex;
		background: #FCAA7A;
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
			color: #ffffff;
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
			background: #ffffff;
			color: #FCAA7A;
		}
	}
</style>
