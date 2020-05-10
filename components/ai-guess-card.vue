<template>
	<view class="ai-guess-card">
		<view class="ai-guess-image-box">
			<image class="ai-guess-image" :src="data.image" mode="aspectFill"></image>
		</view>
		<view class="ai-guess-info-fox">
			<view class="ai-guess-info">{{data.title}}</view>
			<view class="ai-guess-price-box">
				<view class="price">
					<view class="zb-price">￥直播价：{{data.zbprice}}</view>
					<view class="sc-price">￥市场价：{{data.scprice}}</view>
				</view>
				<view class="rate">
					<view class="ck-earn">参考收益：{{data.earnings}}</view>
					<view class="yj-rate">佣金比例：{{data.ratio}}</view>
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
			default: {}
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
		.ai-guess-image-box {
			width: 240rpx;
			height: 240rpx;
			margin: 20rpx;
			.ai-guess-image {
				width: 240rpx;
				height: 240rpx;
				border-radius: 16rpx;
			}
		}
		.ai-guess-info-fox {
			width: 378rpx;
			height: 260rpx;
			margin: 20rpx 32rpx 40rpx 0;
			.ai-guess-info {
				width: 378rpx;
				height: 112rpx;
				overflow: hidden;
				font-size: 30rpx;
				color:rgba(51,51,51,1);
			}
		}
		.ai-guess-price-box {
			display: flex;
			justify-content: space-between;
			height: 55rpx;
			margin: 32rpx 0 0 0;
			.zb-price {
				font-size:26rpx;
				color:rgba(255,51,51,1);
			}
			.sc-price {
				font-size:22rpx;
				color:rgba(153,153,153,1);
			}
			.ck-earn {
				font-size:26rpx;
				color:rgba(255,51,51,1);
			}
			.yj-rate {
				font-size:22rpx;
				color:rgba(153,153,153,1);
			}
		}
	}

</style>
