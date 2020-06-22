<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" :leftText="navBarTitle"></uni-nav-bar>
		<view class="bind-alipay">
		<view class="phone-name">
			<ai-input title="真实姓名" placeholder="请输入真实姓名" @getInput="getUserName" ></ai-input>
		</view>
		<view class="phone-num">
			<ai-input title="支付宝账户" placeholder="请输入支付宝账户" @getInput="getAlipayAccount" ></ai-input>
		</view>
		<view class="bt">
		    <ai-button btname="确定" @eventClick="bindAlipay"></ai-button>
		</view>
		</view>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
	</view>
</template>

<script>
	import aiInput from '@/components/ai-input';
	import aiLoginHint from '@/components/ai-login-hint.vue'
	export default {
		components: {
			aiInput,
			aiLoginHint,
		},
		data() {
			return {
				navBarTitle: null,
				alipayAccount: "",
				userName: "",
				navigateFlag: false
			}
		},
		onLoad(res) {
			this.navBarTitle = res.navbartitle
		},
		methods: {
			getAlipayAccount(value){
				this.alipayAccount = value.replace(/\s*/g,"")
			},
			getUserName(value){
				this.userName = value.replace(/\s*/g,"")
			},
			bindAlipay(){
				//发送给数据库的接口
				if(this.alipayAccount.length == 0){
					this.$aiGlobal.aiPopupMessage.apply(this,['err','支付宝账户错误'])
					return
				}
				if(this.userName.length == 0){
					this.$aiGlobal.aiPopupMessage.apply(this,['err','用户名错误'])
					return
				}
				this.$api.getAuthBind({
					account: this.alipayAccount,
					real_name: this.userName,
					nickname: "",
					type: 1
				}).then(res => {
					if(res.data.code == 0){
						this.$aiGlobal.aiPopupMessage.apply(this,['success','绑定成功'])
						this.$store.commit('setAlipay', 1)
						setTimeout(() => {
							this.$aiRouter.navTabBar('/pages/tabbar/user')
						},2000)
					}else{
						this.$aiGlobal.aiPopupMessage.apply(this,['err','绑定失败'])
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.bind-alipay {
		width: 750rpx;
		padding: 10px 30rpx 0;
	}
	.phone-name {
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
	}
	.phone-num {
		margin: 10px 0 0 0;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
	}
	.bt {
		position: fixed;
		bottom: 46px;
	}

</style>