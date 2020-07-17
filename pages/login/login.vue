<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="登录"></uni-nav-bar>
		<view>
			<ai-login-wechat :jumpUrl="jumpUrl"></ai-login-wechat>
		</view>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button/ai-button.vue'
	import aiLoginHint from '@/components/ai-login-hint.vue'
	import aiLoginWechat from '@/components/ai-login/ai-login-wechat.vue'
	export default {
		components: {
			aiButton,
			aiLoginHint,
			aiLoginWechat
		},
		data() {
			return {
				jumpUrl: ""
			}
		},
		onLoad(res) {
			this.jumpUrl = res.jumpUrl
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
</style>
