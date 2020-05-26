<template>
	<view>
		<ai-navbar
		    :title="navBarTitle"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="phone-num">
			<ai-input title="真实姓名" placeholder="请输入真实姓名" @getInput="getUserName" ></ai-input>
		</view>
		<view class="phone-num">
			<ai-input title="支付宝账户" placeholder="请输入支付宝账户" @getInput="getAlipayAccount" ></ai-input>
		</view>
		<view class="bt">
		    <ai-button btname="确定" @eventClick="bindAlipay"></ai-button>
		</view>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
	</view>
</template>

<script>
	import aiInput from '@/components/ai-input';
	import aiButton from '@/components/ai-button';
	import aiLoginHint from '@/components/ai-login-hint.vue'
	export default {
		components: {
			aiInput,
			aiButton,
			aiLoginHint,
		},
		data() {
			return {
				navBarTitle: null,
				alipayAccount: "",
				userName: ""
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
					this.$refs.aiPopupMessage.open({
						type:'err',
						content:'支付宝账户错误',
						timeout:2000,
						isClick:false
					})
					return
				}
				if(this.userName.length == 0){
					this.$refs.aiPopupMessage.open({
						type:'err',
						content:'用户名错误',
						timeout:2000,
						isClick:false
					})
					return
				}
				this.$api.getAlipay({
					account: this.alipayAccount,
					real_name: this.userName
				}).then(res => {
					if(res.data.code == 0){
						this.$refs.aiPopupMessage.open({
							type:'err',
							content:'绑定成功',
							timeout:2000,
							isClick:false
						})
					}
				})
				console.log("接收：",this.alipayAccount,this.userName)
			}
		}
	}
</script>

<style lang="scss">
	page {
		height:667px;
		width:750rpx;
		background:rgba(249,249,249,1);
	}
	.phone-num {
		margin: 15px 0;
	}
	.bt {
		position: relative;
		top: 367px;
	}

</style>
