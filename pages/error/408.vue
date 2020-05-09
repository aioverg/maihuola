<template>
	<view>
		<ai-navbar title="卖货啦"></ai-navbar>
		<view class="img-box">
			<image class="img" src="/static/error/ai-error01.png"></image>
		</view>
		<view class="error-title-one">哎呀！网络好像有点问题</view>
		<view class="error-title-two">请检查您的网络，重新加载</view>
		<view class="error-bt">重试</view>
	</view>
</template>

<script>
	import aiNavbar from '@/components/ai-navbar'
	export default {
		components: {
			aiNavbar
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
		margin: 200rpx 0 120rpx 0;
		.img {
			display: block;
			width: 456rpx;
			height: 314rpx;
			margin: 0 auto;
		}
	}
	.error-title-one {
		font-size: 36rpx;
		color: rgba(51,51,51,1);
		text-align: center;
	}
	.error-title-two {
		margin: 10rpx 0 90rpx;
		font-size: 30rpx;
		color:rgba(102,102,102,1);
		text-align: center;
	}
	.error-bt {
		width: 330rpx;
		height: 80rpx;
		margin: 0 auto;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
		color: rgba(255,255,255,1);
		background: rgba(244,122,115,1);
		border-radius:45px;
	}
</style>
