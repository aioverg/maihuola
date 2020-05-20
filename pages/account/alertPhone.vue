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
			<ai-input title="手机号码" @getInput="getPhone" placeholder="请输入新手机号码" ></ai-input>
		</view>
		<view class="code-num">
			<ai-input title="验证码" @getInput="getCode" @postCode="postCode" placeholder="请输入验证码" bt="true"></ai-input>
		</view>
		<view class="bt">
		    <ai-button btname="确定" @eventClick="navAlertPhone"></ai-button>
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
			postCode(){
				this.$refs.aiPopupMessage.open({
					type:'success',
					content:'验证码已发送',
					timeout: 2000,
					isClick: false
				})
				console.log("发送获取验证码地址")
				console.log("验证码手机", this.phone)
			},
			getPhone(res){
				this.phone = res
				console.log("获取手机号",res)
			},
			getCode(res){
				console.log("获取验证码",res)
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
