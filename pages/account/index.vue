<template>
	<view>
		<ai-navbar title="账户安全"></ai-navbar>
	<view class="account-box">
		<view class="box-item-phone">
		    <view class="box-item">
			    <view class="item-title">手机号码</view>
			    <view class="item-status">未授权</view>
			    <view @click="navTo('/pages/account/oldPhone')">
				    <image class="item-img" src="../../static/icon_arrow.png"></image>
			    </view>
		    </view>
		</view>
		<view class="box-sofeitem">
			<view class="box-item box-item-wx">
				<view class="item-title">微信绑定</view>
				<view class="item-status">未授权</view>
				<view @click="navTo('/pages/account/wx')">
					<image class="item-img" src="../../static/icon_arrow.png"></image>
				</view>
			</view>
			<view class="box-item box-item-tb">
				<view class="item-title">淘宝授权</view>
				<view class="item-status">未授权</view>
				<view @click="navTo('/pages/account/taobao')">
					<image class="item-img" src="../../static/icon_arrow.png"></image>
				</view>
			</view>
			<view class="box-item">
				<view class="item-title">支付宝绑定</view>
				<view class="item-status">未授权</view>
				<view @click="navTo('/pages/account/oldAlipay')">
					<image class="item-img" src="../../static/icon_arrow.png"></image>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import listCells from '@/components/list-cell';
	import aiNavbar from '@/components/ai-navbar.vue'
	export default {
		components: {
			listCells,
			aiNavbar
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
	.box-item {
		width: 630rpx;
		height: 90rpx;
		margin: 0 auto;
		display: flex;
		.item-title {
			margin: 30rpx 0;
			width: 200rpx;
			font-size:30rpx;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.item-status {
			margin: 30rpx 0;
			width: 400rpx;
			text-align: right;
			font-size:26rpx;
			font-weight:400;
			color:rgba(234,58,106,1);
		}
		.item-img {
			margin: 38rpx 0 34rpx 20rpx;
			width: 12rpx;
			height: 21rpx;
		}
		
	}
	.box-item-phone {
		width: 690rpx;
		background: rgba(255,255,255,1);
		border-radius:16rpx;
		margin: 20rpx 0;
	}
	.box-sofeitem {
		width: 690rpx;
		height: 272rpx;
		background: rgba(255,255,255,1);
		border-radius: 16rpx;
	}
	.box-item-wx {
		border-bottom: 1px dashed rgba(229,229,229,1);
	}
	.box-item-tb {
		border-bottom: 1px dashed rgba(229,229,229,1);
	}
	

</style>
