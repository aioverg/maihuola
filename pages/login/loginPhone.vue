<template>
	<view>
		<uni-nav-bar fixed="true" :leftClickTag="leftClickTag" leftIcon="arrowleft" leftText="登录"></uni-nav-bar>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
		<ai-phone-login :jumpUrl="jumpUrl"></ai-phone-login>
	</view>
</template>

<script>
	import aiPhoneLogin from '@/components/ai-login/ai-phone-login.vue'
	export default {
		components: {
			aiPhoneLogin
		},
		data() {
			return {
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				phone: null,
				code: null,
				btName: "获取验证码",
				times: null,
				timeRun: false,
				leftClickTag: "back",
				jumpUrl: null
			}
		},
		onLoad(res) {
			this.leftClickTag = res.leftClickTag
			this.jumpUrl = res.jumpUrl
		},
		methods: {
		}
	}
</script>

<style lang="scss">
</style>
