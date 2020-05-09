<template>
	<view>
		<ai-navbar title="修改手机号码"></ai-navbar>
		<hint-box content="为了您的账户安全需要对原手机号码进行验证"></hint-box>
		<view class="phone-num">
			<ai-input title="手机号码" content="178****6789" ></ai-input>
		</view>
		<view class="code-num">
			<ai-input title="验证码" placeholder="请输入验证码" btname="获取验证码"></ai-input>
		</view>
		<view class="bt">
		    <ai-button btname="下一步" @eventClick="navAlertPhone"></ai-button>
		</view>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box';
	import aiInput from '@/components/ai-input';
	import aiButton from '@/components/ai-button';
	import aiNavbar from '@/components/ai-navbar'
	export default {
		components: {
			hintBox,
			aiInput,
			aiButton,
			aiNavbar
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		methods: {
			navAlertPhone(){
				uni.navigateTo({
					url: '/pages/account/alertPhone'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height:1334rpx;
		width:750rpx;
		background:rgba(249,249,249,1);
	}
	.phone-num {
		margin: 30rpx 0;
	}
	.bt {
		position: relative;
		top: 734rpx;
		font-size:32rpx;
		font-weight:500;
		color:rgba(255,255,255,1);
	}

</style>
