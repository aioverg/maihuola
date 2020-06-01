<!--用户协议与隐私正提示组件-->
<template>
	<view class="ai-login-hint">
		<text class="note-text">登录即代表同意卖货啦账号</text>
		<text class="note-link" @click="natTo('/pages/about/agreement')">《用户协议》</text>
		<text class="note-text">和</text>
		<text class="note-link" @click="natTo('/pages/about/privacy')">《隐私政策》</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
		
			};
		},
		methods: {
			natTo(url){
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.ai-login-hint {
		text-align: center;
		.note-text {
			font-size: 12px;
			color: #999999;
		}
		.note-link {
			color: #287EDA;
			text-decoration-line: underline;
			font-size: 12px;
		}
	}
</style>
