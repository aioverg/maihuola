<template>
	<view>
	    <ai-navbar title="绑定支付宝授权"></ai-navbar>
	<view class="icon-card">
		<image class="box-bg" src="/static/img/ai-tb-bg.png"></image>
		<view class="icon-box">
			<view class="icon-box-item">
				<view class="icon">
					<image class="img" src="/static/img/ai-taobao.png"></image>
				</view>
				<view class="icon-title">手机淘宝</view>
			</view>
			<view class="icon-box-item">
			    <view class="icon">
					<image class="img" src="/static/img/ai-maihuo.png"></image>
				</view>
				<view class="icon-title">卖货啦</view>
			</view>
		</view>
		<view class="icon-box-describe">
			<view class="icon-box-describe-one">同意将淘宝账户的以下信息授权给</view>
			<view class="icon-box-describe-one">卖货啦官方app</view>
			<view class="icon-box-describe-two"><view class="dot"></view>使用你的公开信息（昵称、头像等）</view>
		</view>
	</view>
	<view class="bt">
		<ai-button btname="确认授权"></ai-button>
	</view>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button.vue';
	import aiNavbar from '@/components/ai-navbar'
	export default {
		components: {
			aiButton,
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
		background:rgba(249,249,249,1);
	}
	.icon-card {
		width: 690rpx;
		height: 924rpx;
		margin: 20rpx auto 0;
		background:rgba(255,255,255,1);
		position: relative;
		.box-bg {
			width: 100%;
			height: 396rpx;
			position: absolute;
		}
		.icon-box {
			width: 490rpx;
			margin: 0 auto;
			height: 396rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icon-box-item {
				position: relative;
				z-index: 1;
				width: 152rpx;
				height: 152rpx;
				display: inline-block;
				.icon {
					position: relative;
					width: 152rpx;
					height: 152rpx;
					background:rgba(255,255,255,1);
					box-shadow:0px 0px 30px 0px rgba(205,59,51,0.5);
					opacity:0.9;
					filter:blur(0px);
					border-radius: 152rpx;
					.img {
						position: relative;
						width: 140rpx;
						height: 140rpx;
						top: 6rpx;
						left: 6rpx;
					}
				}
				.icon-title {
					font-size: 26rpx;
					width: 152rpx;
					margin: 12rpx 0 0;
					text-align: center;
					color:rgba(255,255,255,1);
				}
			}
		}
		.icon-box-describe {
			margin: 30rpx 0 0 50rpx;
			.icon-box-describe-one {
				font-size:32rpx;
				color:rgba(51,51,51,1);
			}
			.icon-box-describe-two {
				margin: 30rpx 0 0;
				font-size:28rpx;
				color:rgba(153,153,153,1);
				.dot {
					width: 6rpx;
					height: 6rpx;
					background:rgba(153,153,153,1);
					display: inline-block;
					margin: 8rpx 20rpx 8rpx 0;
				}
			}
		}
	}
	.bt {
		position: relative;
		top: 80rpx;
	}
</style>
