<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="修改手机号码"></uni-nav-bar>
		<hint-box content="请填写新的手机号并验证完成绑定"></hint-box>
		<view class="alter-phone-body">
			<view class="phone-num">
				<ai-input inputWidth="390rpx" :del="true" title="手机号码" type="number" @getInput="getPhone" placeholder="请输入新手机号码"></ai-input>
			</view>
			<view class="code-num">
				<ai-input inputWidth="280rpx" title="验证码" type="number" @getInput="getCode" @postCode="postCode" placeholder="请输入验证码" bt="true"></ai-input>
			</view>
			<view class="bt">
				<ai-button btname="确定" @eventClick="alertPhone"></ai-button>
			</view>
		</view>
		<ai-popup-message ref="aiPopupMessage"></ai-popup-message>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box';
	import aiInput from '@/components/ai-input';
	export default {
		components: {
			hintBox,
			aiInput
		},
		data() {
			return {
				phone: null,
				code: null
			}
		},
		methods: {
			getPhone(res) {
				this.phone = res
			},
			getCode(res) {
				this.code = res
			},
			postCode() {
				if (this.phone % 1 !== 0 || this.phone.length !== 11) {
					this.$aiGlobal.aiPopupMessage.apply(this, ['err', '手机号码错误'])
					return
				}
				this.$api.getPhoneCode({
					phone: this.phone
				}).then(res => {
					if (res.statusCode !== 200) {
						this.$aiGlobal.aiPopupMessage.apply(this, ['err', '验证码发送失败'])
					} else {
						this.$aiGlobal.aiPopupMessage.apply(this, ['success', '验证码已发送'])
					}
				})
			},
			alertPhone() {
				if (this.phone % 1 !== 0 || this.phone.length !== 11) {
					this.$aiGlobal.aiPopupMessage.apply(this, ['err', '手机号码错误'])
					return
				}
				if (this.code % 1 !== 0 || this.code.length !== 6) {
					this.$aiGlobal.aiPopupMessage.apply(this, ['err', '验证码错误'])
					return
				}
				this.$api.getAlertPhone({
					phone: this.phone,
					code: this.code
				}).then(res => {
					if (res.data.code == 500) {
						this.$aiGlobal.aiPopupMessage.apply(this, ['err', '手机号码已被注册'])
						return
					} else {
						this.$aiRouter.redirect('/pages/index/index?tabId=2')
						this.$aiGlobal.aiPopupMessage.apply(this, ['success', '修改成功'])
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.alter-phone-body {
		width: 750rpx;
		padding: 10px 30rpx 0;
	}

	.phone-num {
		width: 690rpx;
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
	}

	.code-num {
		width: 690rpx;
		margin: 10px 0 0 0;
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
	}

	.bt {
		position: fixed;
		bottom: 46px;
	}
</style>
