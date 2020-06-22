<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="审核记录"></uni-nav-bar>
		<view class="task-check-body">
			<view class="tcb-item" v-for="(item, index) in dataList" :key="index">
				<view class="tcb-item-one">
					<view class="tcb-io-title">{{item.title}}</view>
					<view class="tcb-io-status" :class="item.status == '审核通过' ? 'tcb-io-status-pass' : (item.status == '未通过') ? 'tcb-io-status-fail' : 'tcb-io-status-load' ">
					    {{item.describe}}{{item.status}}
					</view>
				</view>
				<view class="tcb-item-two">
					<view>{{item.time}}</view>
					<view>{{item.tel}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [
					{
						title: "支付宝扫码领福利",
						status: "待审核",
						time: "2020-04-09 11:29:28",
						tel: "178****6789"
					},
					{
						title: "支付宝扫码领福利",
						status: "未通过",
						describe: "（刷单现象）",
						time: "2020-04-09 11:29:28",
						tel: "178****6789"
					},
					{
						title: "支付宝扫码领福利",
						status: "审核通过",
						time: "2020-04-09 11:29:28",
						tel: "178****6789"
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.task-check-body {
		width: 750rpx;
		padding: 10px 30rpx 15px;
	}
	.tcb-item {
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		margin: 0 0 10px;
		padding: 10px 30rpx;
		height: 57px;
		.tcb-item-one {
			display: flex;
			justify-content: space-between;
			
			.tcb-io-title {
				font-size: 13px;
			}
			.tcb-io-status {
				font-size: 15px;
			}
			.tcb-io-status-pass {
				color: #FF716E;
			}
			.tcb-io-status-fail {
				color: #666666;
			}
			.tcb-io-status-load {
				color: #FFA570;
			}
		}
		.tcb-item-two {
			display: flex;
			justify-content: space-between;
			margin: 5px 0 0 0;
			font-size: 12px;
			color: #999999;
		}
	}
</style>
