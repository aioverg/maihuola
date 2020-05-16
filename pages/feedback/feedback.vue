<template>
	<view>
		<ai-navbar
		    title="意见反馈"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="feedback-box">
			<textarea class="feedback-area" placeholder="请留下你的意见..."></textarea>
		</view>
		<view class="feedback-bt">
			<ai-button btname="提交"></ai-button>
		</view>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button.vue'
	export default {
		components: {
			aiButton
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
    page {
		background:rgba(255,255,255,1);
	}
	.feedback-box {
		width: 750rpx;
		padding: 30rpx 50rpx;
		.feedback-area {
			width: 650rpx;
			height: 910rpx;
		}
	}
	.feedback-bt {
		margin: 84rpx 0 0 0;
	}
</style>
