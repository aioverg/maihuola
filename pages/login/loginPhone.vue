<template>
	<view>
		<uni-nav-bar fixed="true" left-width="150" right-icon="help" @clickRight="navMessage">
			<block slot="left">
				<image @click="navBarBack" style="width: 10px; height: 17px; margin: 3px 10px 0 10px;" src="../../static/icon/left-arrow01.png"></image>
			    <view style="font-size: 20px; font-weight:bold;">登录</view>
			</block>
		</uni-nav-bar>
		<view class="img-box">
			<image class="img" src="/static/img/icon-mhl-01.png"></image>
		</view>
		<view>
			<view class="phone-box">
				<image class="phone-icon" mode="widthFix" src="/static/icon/icon-phone.png"></image>
				<view class="phone-area">+86</view>
				<input class="phone-input" type="number" v-model="phone" placeholder="请输入手机号码" />
			</view>
			<view class="code-box">
				<view class="code-input-box">
					<image class="code-icon" mode="widthFix" src="/static/icon/icon-dialog.png"></image>
					<input class="code-input" type="number" v-model="code" placeholder="请输入验证码" />
				</view>
				<view class="code-button" @click="getCode">{{times}}{{btName}}</view>
			</view>
			<view class="login-button">
				<ai-button btname="登录" @eventClick="login"></ai-button>
			</view>
		</view>
		<view class="huo">或</view>
		<view class="wx-box" @click="navTo('/pages/login/login')">
			<image class="wx-icon" mode="widthFix" src="/static/img/img-wx.png"></image>
			<view class="wx-bt">微信登录</view>
		</view>
		<view class="note">
			<ai-login-hint></ai-login-hint>
		</view>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
	</view>
</template>

<script>
	import aiLoginHint from '@/components/ai-login-hint.vue'
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
							this.$aiRouter.navTo('/pages/index/index')
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
	.img-box {
		width: 750rpx;
		text-align: center;
		.img {
			display: inline-block;
			width: 143px;
			height: 143px;
			margin: 38px auto 40px;
		}
	}
	.phone-box {
		display: flex;
		align-items: center;
		height: 32px;
		width: 650rpx;
		margin: 0 auto;
		border-bottom: 1px solid rgba(204,204,204,1);
		.phone-icon {
			width: 20px;
			display: inline-block;
		}
		.phone-area {
			display: inline-block;
			margin: 0 0 0 35px;
		}
		.phone-input {
			display: inline-block;
			margin: 0 0 0 13px;
			font-size: 17px;
		}
	}
	.code-box {
		display: flex;
		align-items: center;
		height: 40px;
		width: 650rpx;
		margin: 16px auto 0;
		.code-input-box {
			display: flex;
			height: 40px;
			align-items: center;
			border-bottom: 1px solid rgba(204,204,204,1);
			.code-icon {
				width: 20px;
				display: inline-block;
			}
			.code-input {
				display: inline-block;
				margin: 0 0 0 35px;
				font-size: 17px;
			}
		}
		.code-button {
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
	.login-button {
		margin: 50px 0 0 0;
	}
	.huo {
		visibility:hidden;
		width: 100%;
		text-align: center;
		font-size: 13px;
		color: rgba(204,204,204,1);
		height: 28px;
		margin: 26px 0 15px 0;
	}
	.wx-box {
		visibility:hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		.wx-icon {
			display: inline-block;
			width: 35px;
		}
		.wx-bt {
			display: inline-block;
			font-size: 13px;
			color: rgba(244,122,115,1);
			margin: 0 0 0 5px;
		}
	}
	.note {
		position: absolute;
		left: 37px;
		bottom: 50px;
	}
</style>
