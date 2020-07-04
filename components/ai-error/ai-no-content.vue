//无内容时加载的组件
<template>
	<view class="ai-no-content">
		<image class="anc-img" src="/static/icon/err-03.png" mode="widthFix"></image>
		<view class="anc-describe">{{describe}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			describe: {
				type: String,
				default: null
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.ai-no-content {
		width: 100%;
		text-align: center;
	}
	.anc-img {
		width: 494rpx;
		margin: 0 auto;
	}
	.anc-describe {
		margin: 50px;
		font-size: 15px;
		color: #CCCCCC;
	}
</style>
