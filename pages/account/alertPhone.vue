<template>
	<view>
		<ai-navbar title="修改手机号码"></ai-navbar>
		<hint-box content="请填写新的手机号并验证完成绑定"></hint-box>
		<view class="phone-num">
			<ai-input title="手机号码" content="17823456789" ></ai-input>
		</view>
		<view class="code-num">
			<ai-input title="验证码" placeholder="请输入验证码" tiemTitle="重新发送" time="60s"></ai-input>
		</view>
		<view class="bt">
		    <ai-button btname="确定" @eventClick="navAlertPhone"></ai-button>
		</view>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box';
	import aiInput from '@/components/ai-input';
	import aiButton from '@/components/ai-button';
	import aiNavbar from '@/components/ai-navbar.vue'
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
	}

</style>
