<template>
	<view>
		<ai-navbar
		    title="提现记录"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="withdraw-box">
			<view>
			    <view class="withdraw-list-head">
				    <text class="withdraw-list-head-time">时间</text>
				    <text class="withdraw-list-head-num">金额</text>
				    <text class="withdraw-list-head-status">状态</text>
			    </view>
			</view>
			<view>
				<view class="withdraw-list-item" :class="item.status ? null : 'withdraw-list-item-color'" v-for="(item, index) in recordData" :key="index">
					<text class="withdraw-list-item-time">{{item.time}}</text>
					<text class="withdraw-list-item-num">{{item.moeny}}</text>
					<text class="withdraw-list-item-staus">{{item.status ? "已到账" : "处理中"}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordData: [
					{
						time: "2019-10-10 21:21",
						moeny: "100.00",
						status: true
					},
					{
						time: "2019-10-10 21:21",
						moeny: "100.00",
						status: true
					},
					{
						time: "2019-10-10 21:21",
						moeny: "100.00",
						status: false
					},
					{
						time: "2019-10-10 21:21",
						moeny: "100.00",
						status: false
					}
				]
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
	.withdraw-box {
		border-radius: 16rpx;
		width: 686rpx;
		background: rgba(255,255,255,1);
		margin: 20rpx auto 0;
		.withdraw-list-head {
			height: 95rpx;
			line-height: 95rpx;
			margin: 0 28rpx;
			padding: 0 34rpx;
			font-size: 16px;
			display: flex;
			justify-content: space-between;
			border-bottom:1px solid rgba(229,229,229,1);
		}
		.withdraw-list-item {
			height: 85rpx;
			line-height: 85rpx;
			font-size: 13px;
			color:rgba(153,153,153,1);
			margin: 0 30rpx;
			.withdraw-list-item-time {
				display: inline-block;
				width: 270rpx;
			}
			.withdraw-list-item-num {
				display: inline-block;
				width: 250rpx;
			}
		}
		.withdraw-list-item-color {
			color: rgba(244,122,115,1);
		}
	}
</style>
