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
		<hint-box content="请填写新的手机号并验证完成绑定"></hint-box>
		<view class="phone-num">
			<ai-input title="手机号码" type="number" @getInput="getPhone" placeholder="请输入新手机号码" ></ai-input>
		</view>
		<view class="code-num">
			<ai-input title="验证码" type="number" @getInput="getCode" @postCode="postCode" placeholder="请输入验证码" bt="true"></ai-input>
		</view>
		<view class="bt">
		    <ai-button btname="确定" @eventClick="alertPhone"></ai-button>
		</view>
		<ai-popup-message ref="aiPopupMessage"></ai-popup-message>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box';
	import aiInput from '@/components/ai-input';
	import aiButton from '@/components/ai-button';
	export default {
		components: {
			hintBox,
			aiInput,
			aiButton
		},
		data() {
			return {
				phone: null,
				code: null
			}
		},
		methods: {
			getPhone(res){
				this.phone = res
			},
			getCode(res){
				this.code = res
			},
			postCode(){
				if(this.phone % 1 !== 0 || this.phone.length !== 11){
					this.$aiGlobal.aiPopupMessage.apply(this,['err','手机号码错误'])
					return
				}
				this.$api.getPhoneCode({
					phone: this.phone
				}).then( res => {
					if(res.statusCode !== 200){
						this.$aiGlobal.aiPopupMessage.apply(this,['err','验证码发送失败'])
					}else{
						this.$aiGlobal.aiPopupMessage.apply(this,['success','验证码已发送'])
					}
				})
			},
			alertPhone(){
				if(this.phone % 1 !== 0 || this.phone.length !== 11){
					this.$aiGlobal.aiPopupMessage.apply(this,['err','手机号码错误'])
					return
				}
				if(this.code % 1 !== 0 || this.code.length !== 6){
					this.$aiGlobal.aiPopupMessage.apply(this,['err','验证码错误'])
					return
				}
				this.$api.getAlertPhone({
					phone: this.phone,
					code: this.code
				}).then(res => {
					if(res.data.code == 500){
						this.$aiGlobal.aiPopupMessage.apply(this,['err','手机号码已被注册'])
						return
					}else{
						this.$aiGlobal.aiPopupMessage.apply(this,['success','修改成功'])
						uni.switchTab({
						    url: '/pages/user/user'
						});
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
