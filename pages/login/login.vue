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
			<text class="note-text">登录即代表同意卖货啦账号</text>
			<text class="note-link">《用户协议》</text>
			<text class="note-text">和</text>
			<text class="note-link">《隐私政策》</text>
		</view>
	</view>
</template>

<script>
	import aiNavbar from '@/components/ai-navbar'
	import aiButton from '@/components/ai-button'
	export default {
		components: {
			aiNavbar,
			aiButton
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
		text-align: center;
		margin: 0 0 100rpx 0;
		.note-text {
			font-size: 24rpx;
			color: #999999;
		}
		.note-link {
			color: #287EDA;
			text-decoration-line: underline;
		}
	}
</style>
