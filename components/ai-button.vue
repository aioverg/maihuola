//按钮组件
<template>
	<view class="ai-button" :class="buttonbg" @click="eventClick">
		<view class="img-box">
			<image v-if="iconSrc" class="img" mode="widthFix" :src="iconSrc"></image>
			<view class="btname">{{btname}}</view>
			<view class="btshadow"></view>
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
			},
			buttonbg: {
				type: String,
				default: "ai-button-redbg"
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
	.ai-button-redbg {
		background: linear-gradient(135deg,rgba(252,170,122,1) 0%,rgba(234,58,106,1) 100%);
		.btshadow {
			width: 610rpx;
			height: 41px;
			position: absolute;
			top: 10px;
			background:linear-gradient(135deg,rgba(252,170,122,1) 0%,rgba(234,58,106,1) 100%);
			filter:blur(10px);
			border-radius:22px;
		}
	}
	.ai-button-graybg {
		background: #cccccc;
	}
	.ai-button {
		width: 690rpx;
		height: 45px;
		line-height: 45px;
		//text-align: center;
		margin: 0 auto;
		color: #ffffff;
		border-radius: 22px;
		.img-box {
			width: 690rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 3px 0 0;
			.img {
				z-index: 2;
				display: inline-block;
				width: 20px;
				margin: 0 4px 0 0;
			}
			.btname {
				display: inline-block;
				z-index: 2;
				font-weight: 600;
				font-size: 16px;
				color: #ffffff;
			}
		}
	}
</style>
