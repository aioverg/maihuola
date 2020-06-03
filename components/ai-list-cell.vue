<template>
	<view class="ai-list-cell" :class="dashed">
		<view class="ai-list-cell-title">{{title}}</view>
		<view class="ai-list-cell-message" :class="aimessagecolor" v-if="message">{{message}}</view>
		<image class="ai-list-cell-icon" src="/static/icon/icon-right-arrow-01.png"></image>
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
			},
			message: {
				type: String,
				default: null
			},
			dashed: {
				type: String,
				default: null
			},
			aimessagecolor: {
				type: String,
				default: null
			}
		}
	}
</script>

<style lang="scss">
	.dashed {
		border-bottom: 1px dashed #e5e5e5;
	}
	.ai-list-cell {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.ai-list-cell-title {
			display: inline-block;
			flex-grow: 1;
			font-size: 15px;
		}
		.ai-list-cell-icon {
			display: inline-block;
			width: 12rpx;
			height: 21rpx;
			flex-grow: 0;
		}
		.ai-list-cell-message {
			flex-grow: 0;
			margin: 0 20rpx 0 0;
			color: #cccccc;
			font-size: 14px;
		}
		.ai-list-cell-message-red {
			color: #F47A73;
		}
	}
</style>
