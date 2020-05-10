<template>
	<view class="ai-navbar">
		<image class="ai-navbar-img" src="/static/img/bg-01.png"></image>
		<view class="ai-navbar-title" v-if="title">{{title}}</view>
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
	.ai-navbar {
		width: 100%;
		height: 128rpx;
		position: relative;
		.ai-navbar-img {
			width: 100%;
			height: 128rpx;
			position: absolute;
		}
		.ai-navbar-title {
			position: relative;
			z-index: 1;
			font-size: 36rpx;
			font-weight: 500;
			color: rgba(255,255,255,1);
			text-align: center;
			padding: 26px 0 0 0;
		}
	}

</style>
