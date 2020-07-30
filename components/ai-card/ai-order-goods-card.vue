<template>
	<view class="ai-order-goods-card">
		<image class="ao-gc-img" :src="data.pic"></image>
		<view class="ao-gc-info">
			<view class="ao-gc-title">{{data.title}}</view>
			<view class="ao-gc-title-one">
				<view class="oder-num">订单号：{{data.oderNum}}</view>
				<view class="oder-money" :class="data.oderStatus ? '' : 'oder-no-status' ">¥{{data.oderMoney}}</view>
			</view>
			<view class="ao-gc-title-two">
				<view class="oder-date">{{data.oderDate}}</view>
				<view :class="data.oderStatus == '已失效' ? 'oder-status-color' : 'oder-status-default' ">{{data.oderStatus}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			data: {
				type: Object,
				default: {}
			}
		}
	}
</script>

<style lang="scss">
	.ai-order-goods-card {
		width: 100%;
		padding: 8px 15px 8px 8px;
		border-radius: 8px;
		display: flex;
		.ao-gc-img {
			width: 73px;
			height: 73px;
			margin: 0 5px 0 0;
		}
		.ao-gc-title {
			width: 480rpx;
			font-size: 13px;
			height: 34px;
			line-height: 17px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.ao-gc-title-one {
			margin: 3px 0 0 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			line-height: 19px;
			.oder-num {
				font-size: 11px;
				color: #999999;
			}
			.oder-money {
				font-size: 15px;
				color: #FF5350;
			}
			.oder-no-status {
				position: relative;
				top: 10px;
			}
		}
		.ao-gc-title-two {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 11px;
			.oder-date {
				color: #999999;
			}
			.oder-status-default {
				color: #999999;
			}
			.oder-status-color {
				color: #FF1968;
			}
		}
	}
</style>
