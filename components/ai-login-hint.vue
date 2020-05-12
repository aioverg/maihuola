<!--用户协议与隐私正提示组件-->
<template>
	<view class="ai-login-hint">
		<text class="note-text">登录即代表同意卖货啦账号</text>
		<text class="note-link" @click="natTo('?id=protocol')">《用户协议》</text>
		<text class="note-text">和</text>
		<text class="note-link" @click="natTo('?id=privacy')">《隐私政策》</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
		
			};
		},
		methods: {
			natTo(data){
				let url = '/pages/document/index'
				uni.navigateTo({
					url: url + data
				})
			}
		}
	}
</script>

<style lang="scss">
	.ai-login-hint {
		text-align: center;
		.note-text {
			font-size: 24rpx;
			color: #999999;
		}
		.note-link {
			color: #287EDA;
			text-decoration-line: underline;
		}
	}
</style>
