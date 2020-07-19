<template>
	<view class="ai-phone-login">
		<view class="apl-img-box">
			<image class="apl-img" src="/static/icon/maihuola-01.png" mode="widthFix"></image>
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
					<view class="apl-code-button" :style="{color: btNameColor, textDecorationLine: btNameUnderline}" @click="getCode">{{times}}{{btName}}</view>
				</view>
			</view>
			<view class="apl-login-button">
				<ai-button width="540" shadowWidth="482" btname="登录" @eventClick="login"></ai-button>
			</view>
		</view>
		<view class="apl-other">
			<text class="apl-other-one">或</text>
			<image class="apl-other-two" mode="widthFix" @click="navToBack()" src="/static/icon/wechat-01.png"></image>
			<text class="apl-other-thr" @click="navToBack()">微信登录</text>
		</view>
		<view class="apl-note" :style="{bottom:hintBottom + 'px'}">
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
				btNameColor: "#CCCCCC",
				btNameUnderline: "underline",
				times: null,
				timeRun: false,
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
			}
		},
		props: {
			jumpUrl: {
				type: String,
				default: null
			},
			hintBottom: {
				type: String,
				default: "50"
			},
			unionid: {
				type: String,
				default: ""
			},
			openid: {
				type: String,
				default: ""
			},
			nickname: {
				type: String,
				default: ""
			},
			avatarUrl: {
				type: String,
				default: ""
			}
			
		},
		watch: {
			phone(){
				if(this.phone.length !== 11 || this.phone == null){
					this.btNameColor = "#CCCCCC"
				}else{
					if(this.timeRun){return}
					this.btNameColor = "#FF716E"
				}
			}
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
							this.btNameUnderline = "none"
							this.btNameColor = "#CCCCCC"
							let timer = setInterval(()=>{
							    if(this.times == 1){
								    clearInterval(timer)
								    this.timeRun = false
								    this.times = null
								    this.btName = "获取验证码"
									this.btNameUnderline = "underline"
									this.btNameColor = "#FF716E"
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
				this.$api.getChecktPhoneCode({
					terminal: this.$store.state.systemType,
					phone: this.phone,
					code: this.code,
					terminal: 1,
					unionid: this.unionid,
					openid: this.openid,
					nickname: this.nickname,
					avatarUrl: this.avatarUrl
				}).then( res => {
					console.log("手机登录返回",this.jumpUrl, res)
					if(res.data.code == 0){
						this.$store.commit("setToken", {token: res.data.data.access_token, id: res.data.data.client.id})
						if(res.data.data.client.kuaishou_id == ""){
							this.$aiRouter.navTo("/pages/login/loginInput?jumpUrl=" + this.jumpUrl)
						}else{
							this.$store.commit("setUserInfoES", res.data.data.client)
							console.log("手机登录JUMPURL", this.jumpUrl)
							if(this.jumpUrl == "back"){//当入口页面不是主页面时跳回
								this.$aiRouter.navToBack(2)
							}else{//当入口页是主页面时关闭所有页面重新跳转
								this.$aiRouter.launch(this.jumpUrl)
							}
						}
						return
					}
					if(res.data.code == 500){
						this.$aiGlobal.aiPopupMessage.apply(this,['err', '验证码错误'])
						return
					}
					this.$aiGlobal.aiPopupMessage.apply(this,['err', '登录失败'])
					
				})
				return
			}
			,
			navTo(obj){
				this.$aiRouter.navTo(obj)
			},
			navToBack(){
				this.$aiRouter.navToBack()
			}
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
			width: 224px;
			margin: 70px auto 65px;
		}
	}
	.apl-phone-box {
		display: flex;
		align-items: center;
		height: 40px;
		width: 650rpx;
		margin: 0 auto;
		border-bottom: 1px solid rgba(204,204,204,1);
		.apl-phone-icon {
			width: 20px;
			margin: 0 0 0 8px;
			display: inline-block;
		}
		.apl-phone-area {
			display: inline-block;
			margin: 0 0 0 31px;
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
		margin: 22px auto 0;
		.apl-code-input-box {
			display: flex;
			height: 40px;
			align-items: center;
			border-bottom: 1px solid rgba(204,204,204,1);
			.apl-code-icon {
				width: 22px;
				display: inline-block;
				margin: 0 0 0 8px;
			}
			.apl-code-input {
				display: inline-block;
				margin: 0 0 0 35px;
				font-size: 17px;
			}
		}
		.apl-code-button {
			display: inline-block;
			//text-decoration-line: underline;
			width: 100px;
			height: 40px;
			text-align: center;
			border-radius: 22px;
			line-height: 40px;
			font-size: 14px;
		}
	}
	.apl-login-button {
		margin: 50px 0 0 0;
	}
	.apl-other {
		margin: 21px 0 0 0;
		display: flex;
		align-items: center;
		justify-content: center;
		.apl-other-one {
			font-size: 13px;
			color: #CCCCCC;
		}
		.apl-other-two {
			width: 35px;
			margin: 0 5px 0 10px;
		}
		.apl-other-thr {
			font-size: 13px;
			color: #FFA570;
		}
	}

	.apl-note {
		position: fixed;
		width: 750rpx;
		text-align: center;
	}
</style>
