//商品展示卡片组件
<template>
	<view class="ai-goods-card">
		<image class="zhutui" v-if="data.tag == '主推'" mode="widthFix" src='/static/icon/icon-zhutui.png'></image>
		<view class="ai-goods-image-box">
			<image class="ai-goods-image" :src="data.pic"></image>
		</view>
		<view class="ai-goods-info-fox">
			<view class="ai-goods-info">{{data.title}}</view>
			<view class="ai-goods-price-box">
				<view class="price">
					<view class="zb-price">直播价：￥{{data.promotion_price}}</view>
					<view class="sc-price">市场价：￥{{data.price}}</view>
				</view>
				<view class="rate">
					<view class="ck-earn">收益：￥{{data.commission}}</view>
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
			data: null,
			recommend: null
		}
	}
</script>

<style lang="scss">
	.ai-goods-card {
		width: 690rpx;
		//height: 280rpx;
		background: #ffffff;
		border-radius:16px;
		display: flex;
		position: relative;
		.zhutui {
			position: absolute;
			z-index: 10;
			width: 90rpx;
		}
		.ai-goods-image-box {
			width: 220rpx;
			height: 220rpx;
			margin: 20rpx;
			.ai-goods-image {
				width: 220rpx;
				height: 220rpx;
				border-radius: 16rpx;
			}
		}
		.ai-goods-info-fox {
			width: 430rpx;
			height: 220rpx;
			margin: 20rpx 0;
			padding: 0 20rpx 0 0;
			.ai-goods-info {
				height: 60px;
				overflow: hidden;
				text-overflow: ellipsis;
				line-height: 20px;
				font-size: 15px;
				color: #333333;
			}
		}
		.ai-goods-price-box {
			display: flex;
			justify-content: space-between;
			height: 55rpx;
			margin: 28rpx 0 0 0;
			.zb-price {
				font-size: 13px;
				color: #ff3333;
			}
			.sc-price {
				font-size:11px;
				color: #999999;
			}
			.ck-earn {
				font-size:13px;
				color: #ff3333;
			}
			.yj-rate {
				font-size:11px;
				color: #999999;
			}
		}
	}

</style>
