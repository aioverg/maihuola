<template>
	<view>
		<ai-navbar title="手机登录"></ai-navbar>
		<view class="img-box">
			<image class="img" src="/static/img/ai-maihuola1.png"></image>
		</view>
		<view>
			<ai-button btname="登录"></ai-button>
		</view>
		<view>或</view>
		<view>
			<image></image>
			<view>微信登录</view>
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

</style>
