<template>
	<view>
		<ai-navbar title="账户安全"></ai-navbar>
	<view class="account-box">
		<view class="box-item-phone" @click="navTo('/pages/account/oldPhone')">
			<ai-list-cell title="手机号码" message="178****6789"></ai-list-cell>
		</view>
		<view class="box-sofeitem">
			<view class="box-item" @click="navTo('/pages/account/oldPhone')">
				<ai-list-cell title="微信绑定" message="未授权" dashed="dashed"></ai-list-cell>
			</view>
			<view class="box-item" @click="navTo('/pages/account/alertAlipay')">
				<ai-list-cell title="淘宝授权" message="未授权" dashed="dashed"></ai-list-cell>
			</view>
			<view class="box-item" @click="navTo('/pages/account/oldPhone')">
				<ai-list-cell title="支付宝绑定" message="未授权"></ai-list-cell>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import listCells from '@/components/list-cell';
	import aiNavbar from '@/components/ai-navbar.vue'
	import aiListCell from '@/components/ai-list-cell'
	export default {
		components: {
			listCells,
			aiNavbar,
			aiListCell
		},
		data() {
			return {
				
			}
		},
		methods: {
			/*跳转统一接口*/
			navTo(url){
				uni.navigateTo({  
					url: url
				})  
			},
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(249,249,249,1);
	}
	.account-box {
		width: 690rpx;
		margin: 0 auto;
	}
	.box-item-phone {
		width: 690rpx;
		height: 90rpx;
		background: rgba(255,255,255,1);
		border-radius:16rpx;
		margin: 20rpx 0;
		padding: 0 30rpx;
	}
	.box-sofeitem {
		width: 690rpx;
		padding: 0 30rpx;
		background: rgba(255,255,255,1);
		border-radius: 16rpx;
		.box-item {
		    height: 90rpx;
		}
	}
	

</style>
