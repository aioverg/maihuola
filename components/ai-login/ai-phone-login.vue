<template>
	<view class="ai-phone-login">
		<view class="apl-img-box">
			<image class="apl-img" src="/static/img/maihuola-01.png"></image>
		</view>
		<view>
			<view class="apl-phone-box">
				<image class="apl-phone-icon" mode="widthFix" src="/static/icon/icon-phone.png"></image>
				<view class="apl-phone-area">+86</view>
				<input class="apl-phone-input" type="number" v-model="phone" placeholder="请输入手机号码" />
			</view>
			<view class="apl-code-box">
				<view class="apl-code-input-box">
					<image class="apl-code-icon" mode="widthFix" src="/static/icon/icon-dialog.png"></image>
					<input class="apl-code-input" type="number" v-model="code" placeholder="请输入验证码" />
				</view>
				<view class="apl-code-button" @click="getCode">{{times}}{{btName}}</view>
			</view>
			<view class="apl-login-button">
				<ai-button width="540" shadowWidth="482" btname="登录" @eventClick="login"></ai-button>
			</view>
		</view>
		<view class="apl-huo">或</view>
		<view class="apl-wx-box" @click="navTo('/pages/login/login')">
			<image class="apl-wx-icon" mode="widthFix" src="/static/img/img-wx.png"></image>
			<view class="apl-wx-bt">微信登录</view>
		</view>
		<view class="apl-note">
			<ai-login-hint></ai-login-hint>
		</view>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
	</view>
</template>

<script>
	import aiLoginHint from '@/components/ai-login/ai-login-hint.vue'
	export default {
		components: {
			aiLoginHint,
		},
		data() {
			return {
				phone: null,
				code: null,
				btName: "获取验证码",
				times: null,
				timeRun: false,
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				pageId: null,
				pageParams: null,
			}
		},
		onLoad(res) {
			this.pageId = res.page_id || null
			this.pageParams = res.page_params || null
		},
		methods: {
			getCode(){
				if(this.phone % 1 == 0 && this.phone.length == 11){
					this.$api.getPhoneCode({
						phone: this.phone
					}).then( res => {
						if(res.data.code !== 0){
							this.$aiGlobal.aiPopupMessage.apply(this,['err', '获取验证码过于频繁'])
							return
						}
						if(res.data.code == 0){
							if(this.timeRun){return}
							this.$aiGlobal.aiPopupMessage.apply(this,['success', '验证码已发送'])
							this.timeRun = true
							this.times = 60
							this.btName = "s重新发送"
							let timer = setInterval(()=>{
							    if(this.times == 1){
								    clearInterval(timer)
								    this.timeRun = false
								    this.times = null
								    this.btName = "获取验证码"
								    return
							    }
							    this.times -= 1
							},1000)
						}
					})
				}else{
					this.$aiGlobal.aiPopupMessage.apply(this,['err', '手机号码错误'])
				}
			},
			login(){
				if(this.phone % 1 !== 0 || this.phone.length !== 11){
					this.$aiGlobal.aiPopupMessage.apply(this,['err', '手机号码错误'])
					return
				}
				/*if(this.code & 1 !==0 || this.code.length !== 6){
					this.$refs.aiPopupMessage.open({
						type:'err',
						content:'验证码错误',
						timeout:2000,
						isClick:false
					})
					return
				}*/
				this.$api.getChecktPhoneCode({
					terminal: this.$store.state.systemType,
					phone: this.phone,
					code: this.code
				}).then( res => {
					console.log(res)
					if(res.data.code == 0){
						this.$store.commit("setUserInfo", res.data.data)
						if(this.pageId == 2){
							this.$aiRouter.navTo('/pages/detail/detail?goods_id=' + this.pageParams)
						}else{
							uni.reLaunch({
							    url: '/pages/index/index'
							});
							//this.$aiRouter.navTo('/pages/index/index')
						}
					}else{
						this.$aiGlobal.aiPopupMessage.apply(this,['err', '验证码错误'])
					}
				})
				return
			}
			,
			navTo(obj){
				this.$aiRouter.navTo(obj)
			},
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(255,255,255,0);
	}
	.apl-img-box {
		width: 750rpx;
		text-align: center;
		.apl-img {
			display: inline-block;
			width: 143px;
			height: 143px;
			margin: 38px auto 40px;
		}
	}
	.apl-phone-box {
		display: flex;
		align-items: center;
		height: 32px;
		width: 650rpx;
		margin: 0 auto;
		border-bottom: 1px solid rgba(204,204,204,1);
		.apl-phone-icon {
			width: 20px;
			display: inline-block;
		}
		.apl-phone-area {
			display: inline-block;
			margin: 0 0 0 35px;
		}
		.apl-phone-input {
			display: inline-block;
			margin: 0 0 0 13px;
			font-size: 17px;
		}
	}
	.apl-code-box {
		display: flex;
		align-items: center;
		height: 40px;
		width: 650rpx;
		margin: 16px auto 0;
		.apl-code-input-box {
			display: flex;
			height: 40px;
			align-items: center;
			border-bottom: 1px solid rgba(204,204,204,1);
			.apl-code-icon {
				width: 20px;
				display: inline-block;
			}
			.apl-code-input {
				display: inline-block;
				margin: 0 0 0 35px;
				font-size: 17px;
			}
		}
		.apl-code-button {
			display: inline-block;
			width: 100px;
			height: 40px;
			text-align: center;
			background:rgba(244,122,115,1);
			border-radius: 22px;
			line-height: 40px;
			font-size: 14px;
			color: rgba(255,255,255,1);
		}
	}
	.apl-login-button {
		margin: 50px 0 0 0;
	}
	.apl-huo {
		visibility:hidden;
		width: 100%;
		text-align: center;
		font-size: 13px;
		color: rgba(204,204,204,1);
		height: 28px;
		margin: 26px 0 15px 0;
	}
	.apl-wx-box {
		visibility:hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		.apl-wx-icon {
			display: inline-block;
			width: 35px;
		}
		.apl-wx-bt {
			display: inline-block;
			font-size: 13px;
			color: rgba(244,122,115,1);
			margin: 0 0 0 5px;
		}
	}
	.apl-note {
		position: absolute;
		left: 37px;
		bottom: 50px;
	}
</style>
