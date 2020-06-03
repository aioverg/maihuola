//顶部提示框组件
<template>
	<view class="caution">
		<image class="img" src="/static/icon/icon-caution.png"></image>
		<text class="note">{{content}}</text>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			content: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang='scss'>

	.caution {
		height: 70rpx;
		width: 750rpx;
		padding: 0 0 0 30rpx;
		background:rgba(234,58,106,0.1);
		display: flex;
		.img {
			width: 26rpx;
			height: 26rpx;
			margin: 22rpx 0;
		}
		.note {
			margin: 18rpx 0 18rpx 10rpx;
			color: #ea3a6a;
			font-size: 12px;
		}
	}
</style>
