<template>
	<view>
		<ai-navbar
		    title="手机登录"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="img-box">
			<image class="img" src="/static/img/ai-maihuola1.png"></image>
		</view>
		<view>
			<view class="phone-box">
				<image class="phone-icon" mode="widthFix" src="/static/icon/icon-phone.png"></image>
				<view class="phone-area">+86</view>
				<input class="phone-input" v-model="phone" placeholder="请输入手机号码" />
			</view>
			<view class="code-box">
				<view class="code-input-box">
					<image class="code-icon" mode="widthFix" src="/static/icon/icon-dialog.png"></image>
					<input class="code-input" v-model="code" placeholder="请输入验证码" />
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
	import aiButton from '@/components/ai-button'
	import aiLoginHint from '@/components/ai-login-hint.vue'
	export default {
		components: {
			aiButton,
			aiLoginHint,
		},
		data() {
			return {
				phone: null,
				code: null,
				btName: "获取验证码",
				times: null,
				timeRun: false,
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
			}
		},
		methods: {
			getCode(){
				this.$api.getPhoneCode({
					phone: this.phone
				}).then( res => {
					if(res.data.code !== 0){
						this.$refs.aiPopupMessage.open({
							type:'err',
							content:'获取验证码失败',
							timeout:2000,
							isClick:false
						})
						return
					}
					if(res.data.code == 0){
						if(this.timeRun){return}
						this.$refs.aiPopupMessage.open({
							type:'success',
							content:'验证码正在发送',
							timeout:2000,
							isClick:false
						})
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
			},
			login(){
				this.$api.getChecktPhoneCode({
					phone: this.phone,
					code: this.code
				}).then( res => {
					if(res.data.code == 200){
						console.log("登录成功")
					}else{
						this.$refs.aiPopupMessage.open({
							type:'err',
							content:'登录失败',
							timeout:2000,
							isClick:false
						})
					}
				})
			}
			,
			navTo(obj){
				this.$global.navTo(obj)
			},
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(255,255,255,1);
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
		margin: 40px 0 0 0;
	}
	.huo {
		width: 100%;
		text-align: center;
		font-size: 13px;
		color: rgba(204,204,204,1);
		height: 28px;
		margin: 26px 0 15px 0;
	}
	.wx-box {
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
		margin: 50px 0 0 0;
	}
</style>
