<template>
	<view class="ai-null">
		<view class="ai-null-box">
			<image class="ai-null-img" mode="widthFix" src="/static/error/ai-error02.png"></image>
		</view>
		<view class="ai-null-text">{{explain}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			explain: {
				type: String,
				default: "什么都没有"
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.ai-null {
		text-align: center;
		width: 750rpx;
	}
	.ai-null-img {
		width: 494rpx;
	}
	.ai-null-text {
		margin: 50px;
		font-size: 15px;
		color: #CCCCCC;
		text-align: center;
	}

</style>
