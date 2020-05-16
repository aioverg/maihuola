<template>
	<view class="ai-guess-card">
		<image class="zhutui" v-if="recommend" mode="widthFix" src='/static/icon/icon-zhutui.png'></image>
		<view class="ai-guess-image-box">
			<image class="ai-guess-image" mode="widthFix" :src="data.pic"></image>
		</view>
		<view class="ai-guess-info-fox">
			<view class="ai-guess-info">{{data.title}}</view>
			<view class="ai-guess-price-box">
				<view class="price">
					<view class="zb-price">￥直播价：{{data.price}}</view>
					<view class="sc-price">￥市场价：{{data.promotion_price}}</view>
				</view>
				<view class="rate">
					<view class="ck-earn">参考收益：{{data.commission}}</view>
					<view class="yj-rate">佣金比例：{{data.commission_rate}}%</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props: {
			data: Object,
			recommend: null
		}
	}
</script>

<style lang="scss">
	.ai-guess-card {
		width: 690rpx;
		height: 280rpx;
		background:rgba(255,255,255,1);
		border-radius:16px;
		display: flex;
		position: relative;
		.zhutui {
			position: absolute;
			z-index: 10;
			width: 90rpx;
		}
		.ai-guess-image-box {
			width: 220rpx;
			height: 220rpx;
			margin: 20rpx;
			.ai-guess-image {
				width: 220rpx;

				border-radius: 16rpx;
			}
		}
		.ai-guess-info-fox {
			width: 430rpx;
			height: 220rpx;
			margin: 20rpx 0;
			padding: 0 20rpx 0 0;
			.ai-guess-info {
				height: 120rpx;
				overflow: hidden;
				font-size: 15px;
				color:rgba(51,51,51,1);
			}
		}
		.ai-guess-price-box {
			display: flex;
			justify-content: space-between;
			height: 55rpx;
			margin: 28rpx 0 0 0;
			.zb-price {
				font-size:13px;
				color:rgba(255,51,51,1);
			}
			.sc-price {
				font-size:11px;
				color:rgba(153,153,153,1);
			}
			.ck-earn {
				font-size:13px;
				color:rgba(255,51,51,1);
			}
			.yj-rate {
				font-size:11px;
				color:rgba(153,153,153,1);
			}
		}
	}

</style>
