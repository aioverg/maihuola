<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="修改手机号码"></uni-nav-bar>
		<hint-box content="为了您的账户安全需要对原手机号码进行验证"></hint-box>
		<view class="old-phone-body">
			<view class="phone-num">
				<ai-input title="手机号码" :content="phone"></ai-input>
			</view>
			<view class="code-num">
				<ai-input title="验证码" type="number" @getInput="getIput" @postCode="postCode" placeholder="请输入验证码" bt="true"></ai-input>
			</view>
			<view class="bt">
				<ai-button btname="下一步" :buttonbg="aiButtonBg" @eventClick="checkPhoneCode"></ai-button>
			</view>
			<ai-popup-message ref="aiPopupMessage"></ai-popup-message>
		</view>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box'
	import aiInput from '@/components/ai-input'
	export default {
		components: {
			hintBox,
			aiInput
		},
		data() {
			return {
				phoneCode: null,
				aiButtonBg: "ai-button-graybg"
			}
		},
		computed: {
			phone() {
				return this.$store.state.userInfo.tel
			}
		},
		watch: {
			phoneCode: function() {
				if (0 < this.phoneCode.length && this.phoneCode.length <= 6) {
					this.aiButtonBg = "ai-button-redbg"
				} else {
					this.aiButtonBg = "ai-button-graybg"
				}
			}
		},
		methods: {
			getIput(res) {
				this.phoneCode = res
			},
			postCode() {
				this.$api.getPhoneCode({
					phone: this.phone
				}).then(res => {
					if (res.statusCode !== 200) {
						this.$aiGlobal.aiPopupMessage.apply(this, ['success', '验证码发送失败'])
					} else {
						this.$aiGlobal.aiPopupMessage.apply(this, ['success', '验证码已发送'])
					}
				})
			},
			checkPhoneCode() {
				if (this.phoneCode % 1 !== 0 || this.phoneCode.length !== 6) {
					this.$aiGlobal.aiPopupMessage.apply(this, ['err', '验证码错误'])
					return
				}
				this.$api.getChecktOldPhoneCode({
					phone: this.phone,
					code: this.phoneCode
				}).then(res => {
					if (res.statusCode !== 200) {
						this.$aiGlobal.aiPopupMessage.apply(this, ['err', '验证码错误'])
					} else {
						this.$aiRouter.redirect('/pages/account/bindPhone?type=alert')
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.old-phone-body {
		width: 750rpx;
		padding: 10px 30rpx 0;
	}

	.phone-num {
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;

	}

	.code-num {
		margin: 10px 0 0 0;
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
	}

	.bt {
		position: fixed;
		bottom: 46px;
	}
</style>
