<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" :leftText="tabBarTitle"></uni-nav-bar>
		<hint-box :content="hintContent"></hint-box>
		<view class="alter-phone-body">
			<view class="phone-num">
				<ai-input inputWidth="390rpx" titleWidth="130rpx" :del="true" title="手机号码" type="number" @getInput="getPhone" :placeholder="phonePlaceHolder"></ai-input>
			</view>
			<view class="code-num">
				<ai-input inputWidth="300rpx" titleWidth="130rpx" title="验证码" type="number" @getInput="getCode" @postCode="postCode" placeholder="请输入验证码" bt="true"></ai-input>
			</view>
			<view class="bt">
				<ai-button :btname="btName" :buttonbg="aiButtonBg" @eventClick="alertPhone"></ai-button>
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
				phone: "",
				code: "",
				aiButtonBg: "ai-button-graybg",
				tabBarTitle: "修改手机号码",
				phonePlaceHolder: "请输入新手机号码",
				hintContent: "请填写新的手机号并验证完成绑定",
				btName: "确定",
				jumpUrl: ""
			}
		},
		watch: {
			phone(){
				if(this.phone.length == 11 && this.code.length == 6){
					this.aiButtonBg = "ai-button-redbg"
				}else{
					this.aiButtonBg = "ai-button-graybg"
				}
			},
			code(){
				if(this.phone.length == 11 && this.code.length == 6){
					this.aiButtonBg = "ai-button-redbg"
				}else{
					this.aiButtonBg = "ai-button-graybg"
				}
			}
		},
		onLoad(res) {
			if(res.type == "alert"){
				this.tabBarTitle = "修改手机号码"
				this.phonePlaceHolder = "请输入新手机号码"
				this.hintContent = "请填写新的手机号并验证完成绑定"
				return
			}
			if(res.type == "bind"){
				this.tabBarTitle = "绑定手机号码"
				this.phonePlaceHolder = "请输入手机号码"
				this.hintContent = "为了您的账户安全需要绑定手机号码"
			}
			if(res.btname == "next"){
				this.btName = "下一步"
			}
			if(res.jumpUrl){
				this.jumpUrl = res.jumpUrl
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
				if(res.type == "bind"){
					if(res.btname == "next"){
						this.$aiRouter.navTo("/pages/login/loginInput?jumpUrl=" + this.jumpUrl)
					}else{
						if(this.jumpUrl == "back"){
							this.$store.commit("setUserInfoES", res.data.data)
							this.$aiRouter.navToBack(2)
						}else{
							this.$store.commit("setUserInfoES", res.data.data)
							this.$aiRouter.launch(this.jumpUrl)
						}
					}
					return
				}
				if(res.type == "alert"){
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
					return
				}
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
