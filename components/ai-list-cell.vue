<template>
	<view class="ai-list-cell">
		<view class="ai-list-cell-title">{{title}}</view>
		<view class="ai-list-cell-icon-box">
			<image class="ai-list-cell-icon" src="/static/ai-right-arrow.png"></image>
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
			title: {
				type: String,
				default: null
			}
		}
	}
</script>

<style lang="scss">
	.ai-list-cell {
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: rgba(255,255,255,1);
		padding: 0 30rpx;
		border-radius: 16rpx;
		display: flex;
		justify-content: space-between;
		.ai-list-cell-title {
			display: inline-block;
		}
		.ai-list-cell-icon-box {
			display: inline-block;
			.ai-list-cell-icon {
				width: 12rpx;
				height: 21rpx;
			}
		}
	}
</style>
