<template>
	<view>
		<uni-nav-bar fixed="true" left-width="150" right-icon="help" @clickRight="navTo('/pages/help/earnRule')">
			<block slot="left">
				<image style="width: 10px; height: 17px; margin: 3px 10px 0 10px;" src="../../static/icon/left-arrow01.png"></image>
			    <view style="font-size: 20px; font-weight:bold;">结算明细</view>
			</block>
		</uni-nav-bar>
		<view class="earn-detail-body">
			<view class="detail-item">
				<image class="detail-item-img" src="/static/mock/mock-01.png"></image>
				<view class="detail-item-info">
					<view class="detail-item-title">虎标冻干柠檬片70g*2组合 柠檬泡茶柠檬泡水喝的花茶虎标冻干柠檬片70g*2组合 柠檬泡茶柠檬泡水喝的花茶巴萨的表达式…</view>
					<view class="detail-item-one">
						<view class="oder-num">订单号：202020202020220</view>
						<view class="oder-money">¥7.96</view>
					</view>
					<view class="detail-item-two">
						<view class="oder-date">2020-04-09 11:29:28</view>
						<view class="oder-status">已付款</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.earn-detail-body {
		width: 750rpx;
		padding: 10px 15px 30px;
	}
	.detail-item {
		padding: 8px 15px 8px 8px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		.detail-item-img {
			width: 73px;
			height: 73px;
		}
		.detail-item-title {
			font-size: 13px;
			height: 34px;
			line-height: 17px;
			overflow: hidden;
		}
		.detail-item-one {
			.oder-num {
				font-size: 11px;
				color: #999999;
			}
			.oder-money {
				font-size: 15px;
				color: #FF716E;
			}
		}
		.detail-item-two {
			.oder-date {
				font-size: 11px;
				color: #999999;
			}
			.oder-status {
				font-size: 11px;
				color: #999999;
			}
		}
	}
</style>
