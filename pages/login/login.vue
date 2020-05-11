<template>
	<view>
		<ai-navbar title="微信登录"></ai-navbar>
		<view class="img-box">
			<image class="img" src="/static/img/ai-maihuola1.png"></image>
		</view>
		<view>
			<ai-button btname="微信登录" iconSrc="/static/icon/icon-wx.png"></ai-button>
		</view>
		<view class="to-phone" @click="navTo('/pages/login/loginPhone')">
			或手机快速登录
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
			navTo(obj){
				this.$global.navTo(obj)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(255,255,255,1);
	}
	.img-box {
		width: 750rpx;
		height: 690rpx;
		text-align: center;
		.img {
			display: inline-block;
			width: 286rpx;
			height: 286rpx;
			margin: 177rpx auto;
		}
	}
	.to-phone {
		margin: 52rpx 0 203rpx 0;
		text-align: center;
		font-size: 26rpx;
		color:rgba(204,204,204,1);
		height:37px;
		text-decoration-line: underline;
	}
	.note {
		margin: 0 0 100rpx 0;
	}
</style>
