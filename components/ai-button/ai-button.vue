//按钮组件
<template>
	<view class="ai-button" :style= "{width: width +'rpx'}" :class="buttonbg" @click="eventClick">
		<view class="ai-bt-img-box">
			<image v-if="iconSrc" class="ai-bt-img" mode="widthFix" :src="iconSrc"></image>
			<view class="ai-bt-name" :style="{color: color}">{{btname}}</view>
			<view class="ai-bt-shadow" :style= "{width: shadowWidth +'rpx'}"></view>
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
			},
			width: {
				type: String,
				default: "690"
			},
			shadowWidth: {
				type: String,
				default: "610"
			},
			color: {
				style: String,
				default: "#ffffff"
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
		background:linear-gradient(135deg,rgba(255,83,80,1) 0%,rgba(255,184,110,1) 100%);
		.ai-bt-shadow {
			height: 41px;
			position: absolute;
			top: 10px;
			background:linear-gradient(135deg,rgba(255,83,80,1) 0%,rgba(255,184,110,1) 100%);
			filter:blur(10px);
			border-radius:22px;
		}
	}
	.ai-button-graybg {
		background: #cccccc;
		.ai-bt-shadow {
			position: absolute;
		}
	}
	.ai-button {
		height: 45px;
		line-height: 45px;
		text-align: center;
		margin: 0 auto;
		border-radius: 22px;
		.ai-bt-img-box {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 3px 0 0;
			.ai-bt-img {
				z-index: 2;
				display: inline-block;
				width: 20px;
				margin: 0 5px 0 0;
			}
			.ai-bt-name {
				display: inline-block;
				z-index: 2;
				font-weight: 600;
				font-size: 16px;
			}
		}
	}
</style>
