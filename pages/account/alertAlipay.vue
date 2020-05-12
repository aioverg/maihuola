<template>
	<view>
		<ai-navbar
		    title="修改支付宝绑定"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="phone-num">
			<ai-input title="真实姓名" content="17823456789" ></ai-input>
		</view>
		<view class="code-num">
			<ai-input title="支付宝账户" placeholder="请输入验证码"></ai-input>
		</view>
		<view class="bt">
		    <ai-button btname="确定" @eventClick="navAlertPhone"></ai-button>
		</view>
	</view>
</template>

<script>
	import aiInput from '@/components/ai-input';
	import aiButton from '@/components/ai-button';
	export default {
		components: {
			aiInput,
			aiButton
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
