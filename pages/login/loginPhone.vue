<template>
	<view>
		<ai-navbar title="手机登录"></ai-navbar>
		<view class="img-box">
			<image class="img" src="/static/img/ai-maihuola1.png"></image>
		</view>
		<view>
			<view class="phone-box">
				<image class="phone-icon" mode="widthFix" src="/static/icon/icon-phone.png"></image>
				<view class="phone-area">+86</view>
				<input class="phone-input" placeholder="请输入手机号码" />
			</view>
			<view class="code-box">
				<view class="code-input-box">
					<image class="code-icon" mode="widthFix" src="/static/icon/icon-dialog.png"></image>
					<input class="code-input" placeholder="请输入验证码" />
				</view>
				<view class="code-button">获取验证码</view>
			</view>
			<view class="login-button">
				<ai-button btname="登录"></ai-button>
			</view>
		</view>
		<view class="huo">或</view>
		<view class="wx-box">
			<image class="wx-icon" mode="widthFix" src="/static/img/img-wx.png"></image>
			<view class="wx-bt">微信登录</view>
		</view>
		<view class="note">
			<ai-login-hint></ai-login-hint>
		</view>
	</view>
</template>

<script>
	import aiNavbar from '@/components/ai-navbar'
	import aiButton from '@/components/ai-button'
	import aiLoginHint from '@/components/ai-login-hint.vue'
	export default {
		components: {
			aiNavbar,
			aiButton,
			aiLoginHint
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(255,255,255,1);
	}
	.img-box {
		width: 750rpx;
		height: 440rpx;
		text-align: center;
		.img {
			display: inline-block;
			width: 286rpx;
			height: 286rpx;
			margin: 77rpx auto 0;
		}
	}
	.phone-box {
		display: flex;
		align-items: center;
		height: 64rpx;
		width: 650rpx;
		margin: 0 auto;
		border-bottom: 1px solid rgba(204,204,204,1);
		.phone-icon {
			width: 40rpx;
			display: inline-block;
		}
		.phone-area {
			display: inline-block;
			margin: 0 0 0 70rpx;
		}
		.phone-input {
			display: inline-block;
			margin: 0 0 0 26rpx;
			font-size: 34rpx;
		}
	}
	.code-box {
		display: flex;
		align-items: center;
		height: 80rpx;
		width: 650rpx;
		margin: 33rpx auto 0;
		.code-input-box {
			display: flex;
			height: 80rpx;
			align-items: center;
			border-bottom: 1px solid rgba(204,204,204,1);
			.code-icon {
				width: 40rpx;
				display: inline-block;
			}
			.code-input {
				display: inline-block;
				margin: 0 0 0 70rpx;
				font-size: 34rpx;
			}
		}
		.code-button {
			display: inline-block;
			width: 200rpx;
			height: 80rpx;
			text-align: center;
			background:rgba(244,122,115,1);
			border-radius: 45rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			color: rgba(255,255,255,1);
		}
	}
	.login-button {
		margin: 80rpx 0 0 0;
	}
	.huo {
		width: 100%;
		text-align: center;
		font-size: 26rpx;
		color: rgba(204,204,204,1);
		height: 37rpx;
		margin: 52rpx 0 30rpx 0;
	}
	.wx-box {
		display: flex;
		align-items: center;
		justify-content: center;
		.wx-icon {
			display: inline-block;
			width: 70rpx;
		}
		.wx-bt {
			display: inline-block;
			font-size: 26rpx;
			color: rgba(244,122,115,1);
			margin: 0 0 0 10rpx;
		}
	}
	.note {
		margin: 100rpx 0 0 0;
	}
</style>
