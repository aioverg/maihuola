<template>
	<view>
		<ai-navbar
		    title="提现"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<hint-box content="每月25号可提现上个月内确认收货的订单收益"></hint-box>
		<view class="tx-box">
			<view class="tx-account">
				<text class="title">到账支付宝</text>
				<text class="name">张**</text>
				<text class="phone">17823456789</text>
			</view>
			<view class="tx-input">
				<view class="title">提现金额</view>
				<view class="input-box">
					<text class="icon">¥</text>
					<input placeholder="请输入提现金额" class="input" />
					<text class="note">（不小于1元）</text>
				</view>
				<view class="tx-upper">可提现金额¥560.92</view>
				<view class="tx-upperbt">全部提现</view>
			</view>
		</view>
		<view class="tx-history">
			提现记录
		</view>
		<view class="tx-bt">
			提交
		</view>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box'
	export default {
		components: {
			hintBox
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang='scss'>
	page {
		background:rgba(249,249,249,1);
	}
	.tx-box {
		width: 690rpx;
		height:416rpx;
		background:rgba(255,255,255,1);
		margin: 15rpx auto 0;
		border-radius:16px;
		.tx-account {
			margin: 0 0 0 30rpx;
			padding: 30rpx 0 30rpx 0;
			border-bottom: 1px dashed rgba(229,229,229,1);
			.title {
				font-size: 16px;
				color: rgba(51,51,51,1);
			}
			.name {
				display: inline-block;
				font-size:14px;
				color:rgba(102,102,102,1);
				margin: 0 30rpx 0 50rpx;
			}
			.phone {
				font-size:14px;
				color:rgba(102,102,102,1);
			}
		}
		.tx-input {
			margin: 20rpx 0 0 30rpx;
			.title {
				font-size:16px;
				color:rgba(51,51,51,1);
			}
			.input-box {
				height: 144rpx;
				display: flex;
				align-items: baseline;
				padding: 30rpx 0 0 0;
				border-bottom: 1px dashed rgba(229,229,229,1);
				.icon {
					display: inline-block;
					height: 84rpx;
					width: 37rpx;
					font-weight:500;
					color:rgba(51,51,51,1);
					font-size:30px;
				}
				.input {
					display: inline-block;
					margin: 0 0 0 20rpx;
					height: 56rpx;
					width: 285rpx;
					font-size:20px;
				}
				.note {
					display: inline-block;
					font-size:13px;
					color:rgba(204,204,204,1);
				}
			}
			.tx-upper {
				display: inline-block;
				margin: 30rpx 0;
				font-size:14px;
				color:rgba(51,51,51,1);
			}
			.tx-upperbt {
				display: inline-block;
				margin: 30rpx 0 30rpx 50rpx;
				width: 114rpx;
				height: 20px;
				font-size: 14px;
				color:rgba(252,170,122,1);
			}
		}
	}
	.tx-history {
		margin: 30rpx 32rpx 0 606rpx;
		font-size:14px;
		text-decoration: underline;
		color:rgba(153,153,153,1);
	}
	.tx-bt {
		margin: 453rpx auto;
		width: 690rpx;
		height: 90rpx;
		line-height:  90rpx;
		text-align: center;
		background:rgba(204,204,204,1);
		border-radius:45rpx;
		font-size:16px;
		font-weight:500;
		color:rgba(255,255,255,1);
	}

</style>
