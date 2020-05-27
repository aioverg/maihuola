<template>
	<view>
		<ai-navbar
		    title="修改手机号码"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<hint-box content="为了您的账户安全需要对原手机号码进行验证"></hint-box>
		<view class="phone-num">
			<ai-input title="手机号码" :content="phone" ></ai-input>
		</view>
		<view class="code-num">
			<ai-input title="验证码" @getInput="getIput" @postCode="postCode" placeholder="请输入验证码" bt="true"></ai-input>
		</view>
		<view class="bt">
		    <ai-button btname="下一步" @eventClick="checkPhoneCode"></ai-button>
		</view>
		<ai-popup-message ref="aiPopupMessage"></ai-popup-message>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box'
	import aiInput from '@/components/ai-input'
	import aiButton from '@/components/ai-button'
	export default {
		components: {
			hintBox,
			aiInput,
			aiButton
		},
		data() {
			return {
				phone: "13750892614",
				phoneCode: null
			}
		},
		methods: {
			
		},
		methods: {
			getIput(res){
				this.phoneCode = res
			},
			postCode(){
				this.$api.getPhoneCode({
					phone: this.phone
				}).then( res => {
					if(res.statusCode !== 200){
						this.$refs.aiPopupMessage.open({
							type:'err',
							content:'验证码发送失败',
							timeout: 2000,
							isClick: false
						})
					}else{
						this.$refs.aiPopupMessage.open({
							type:'success',
							content:'验证码已发送',
							timeout: 2000,
							isClick: false
						})
					}
				})
				console.log("发送获取验证码地址", this.phone)
			},
			checkPhoneCode(){
				if(!Number(this.phoneCode) || Number(this.phoneCode) % 1 !== 0 || this.phoneCode.length !== 6){
					this.$refs.aiPopupMessage.open({
						type:'err',
						content:'验证码错误',
						timeout: 2000,
						isClick: false
					})
					return
				}
				this.$api.getChecktOldPhoneCode({
					phone: this.phone,
					code: this.phoneCode
				}).then( res => {
					console.log(res)
					if(res.statusCode !== 200){
						this.$refs.aiPopupMessage.open({
							type:'err',
							content:'验证码错误',
							timeout: 2000,
							isClick: false
						})
					}else{
						uni.navigateTo({
							url: '/pages/account/alertPhone'
						})
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		height:667px;
		width:750rpx;
		background:rgba(249,249,249,0);
	}
	.phone-num {
		margin: 15px 0;
	}
	.code-num {
		width: 750rpx;
	}
	.bt {
		position: relative;
		top: 367px;
		font-size:16px;
		font-weight:500;
		color:rgba(255,255,255,1);
	}

</style>
