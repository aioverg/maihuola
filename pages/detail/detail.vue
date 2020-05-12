<template>
	<view>
		<ai-navbar
		    title="商品详情"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="guess-img-box">
			<image mode="heightFix" class="guess-img" src="/static/temp/guess04.jpg"></image>
		</view>
		<view class="guess-title">液体坚果 荷乐士喝的每日坚果孕妇儿童零食礼盒混合干果仁饮料</view>
		<view class="guess-price-info">
			<view class="guess-price-info-one">
				<image class="guess-zbprice-icon" mode="widthFix" src="../../static/icon/ai-zbprice.png"></image>
				<view class="guess-zbprice">
					<text>¥</text>
					<text>39.9</text>
				</view>
				<view class="guess-ckprice">
					<text>参考收益：</text>
					<text>¥7.98</text>
				</view>
			</view>
			<view class="guess-price-info-two">
				<view class="guess-scprice">
					<text>市场价：¥</text>
					<text>0000000.00</text>
				</view>
				<view class="guess-rate">
					<text>佣金比例：</text>
					<text>20%</text>
				</view>
			</view>
		</view>
		<view class="guess-nh">
			<view class="guess-nh-title">
				<view>商品卖点</view>
			    <image class="guess-nh-title-icon" mode="widthFix" src="/static/icon/ai-praise.png"></image>
			</view>
			<view class="guess-nh-content">
				<view>
					1.好喝到直言再来一瓶，直播间立减20元！
				</view>
			</view>
		</view>
		<view class="zb-script">
			<view class="zb-script-title">
				<view>直播脚本</view>
			    <image class="zb-script-title-icon" mode="widthFix" src="/static/icon/ai-vidicon.png"></image>
			</view>
			<view class="zb-script-content">这里是直播脚本相关内容</view>
		</view>
		<view class="tkl-bt">
			<ai-button btname="复制淘口令"></ai-button>
		</view>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button.vue'
	//详情页
	export default {
		components: {
			aiButton
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
		}
	}

</script>

<style lang="scss">
	page {
		width: 750rpx;
		background:rgba(249,249,249,1);
	}
	.guess-img-box {
		width: 750rpx;
		height: 600rpx;
		background:rgba(255,255,255,1);
		.guess-img {
			height: 600rpx;
			display: block;
			margin: 0 auto;
		}
	}
	.guess-title {
		width: 750rpx;
		height: 106rpx;
		padding: 14rpx 30rpx 16rpx;
		background: rgba(255,255,255,1);
		font-size: 32rpx;
		color: rgba(51,51,51,1);
	}
	.guess-price-info {
		width: 750rpx;
		height: 154rpx;
		padding: 0 30rpx 0;
		background: rgba(244,122,115,1);
		.guess-price-info-one {
			height: 80rpx;
			display: flex;
			align-items: flex-end;
			.guess-zbprice-icon {
				display: inline-block;
				width: 120rpx;
				margin: 0 40rpx 0 0;
			}
			.guess-zbprice {
				display: inline-block;
				line-height: 55rpx;
				flex-grow: 1;
				font-size: 60rpx;
				color: rgba(255,255,255,1);
			}
			.guess-ckprice {
				display: inline-block;
				flex-grow: 1;
				font-size: 30rpx;
				color:rgba(255,255,255,1);
			}
		}
		.guess-price-info-two {
			height: 74rpx;
			line-height: 74rpx;
			.guess-scprice {
				display: inline-block;
				margin: 0 28rpx 0 0;
				font-size:26rpx;
				color: rgba(255,255,255,1);
			}
			.guess-rate {
				display: inline-block;
				font-size: 26rpx;
				color: rgba(255,255,255,1);
			}
		}
	}
	.guess-nh {
		width: 690rpx;
		min-height: 210rpx;
		margin: 20rpx auto;
		padding: 20rpx 30rpx 26rpx;
		background: rgba(255,255,255,1);
		border-radius: 16rpx;
		.guess-nh-title {
			display: flex;
			align-items: center;
			margin: 0 0 10rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: rgba(51,51,51,1);
			.guess-nh-title-icon {
				margin: 0 0 0 8rpx;
				width: 36rpx;
			}
		}
		.guess-nh-content {
			font-size:26rpx;
			color:rgba(102,102,102,1);
			font-weight:400;
		}
	}
	.zb-script {
		width: 690rpx;
		min-height: 210rpx;
		margin: 0 auto 50rpx;
		padding: 20rpx 30rpx 26rpx;
		background: rgba(255,255,255,1);
		border-radius: 16rpx;
		.zb-script-title {
			display: flex;
			align-items: center;
			margin: 0 0 10rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: rgba(51,51,51,1);
			.zb-script-title-icon {
				margin: 0 0 0 8rpx;
				width: 36rpx;
			}
		}
		.zb-script-content {
			font-size: 26rpx;
			color: rgba(102,102,102,1);
			font-weight:400;
		}
	}
	.tkl-bt {
		margin: 0 0 92rpx;
	}
</style>
