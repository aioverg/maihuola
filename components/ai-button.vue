<template>
	<view class="ai-button" @click="eventClick">
		<view class="img-box">
			<image v-if="iconSrc" class="img" mode="widthFix" :src="iconSrc"></image>
			<view class="btname">{{btname}}</view>
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
			btname: {
				type: String,
				default: null
			},
			iconSrc: {
				type: String,
				default: null
			}
		},
		methods: {
			eventClick(){
				this.$emit('eventClick');
			}
		}
	}
</script>

<style lang="scss">
	.ai-button {
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
		//text-align: center;
		margin: 0 auto;
		background: linear-gradient(135deg,rgba(252,170,122,1) 0%,rgba(234,58,106,1) 100%);
		color:rgba(255,255,255,1);
		border-radius: 45rpx;
		.img-box {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 6rpx 0 0;
			.img {
				display: inline-block;
				width: 40rpx;
				margin: 0 8rpx 0 0;
			}
			.btname {
				display: inline-block;
				font-weight: 500;
				font-size: 16px;
				color:rgba(255,255,255,1);
			}
		}
	}
</style>
