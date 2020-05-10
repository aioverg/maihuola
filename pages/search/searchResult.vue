<template>
	<view>
		<ai-navbar title="搜索结果"></ai-navbar>
		<view class="head">
			<view class="input-box">
				<image class="input-box-icon" src="/static/icon/ai-search01.png"></image>
				<input class="input-box-input" v-model="searchInput" @click="navTo('/pages/search/search')" disabled />
			</view>
			<view class="input-bt" @click="navTabBar('/pages/index/index')">取消</view>
		</view>
	</view>
</template>

<script>
	import aiNavbar from '@/components/ai-navbar'
	export default {
		components: {
			aiNavbar
		},
		data() {
			return {
				searchInput: null
			}
		},
		onLoad(res){
			this.searchInput = res.id
		},
		methods: {
			navTo(obj){
				this.$global.navTo(obj)
			},
			navTabBar(obj){
				this.$global.navTabBar(obj)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(249,249,249,1);
	}
	.head {
		margin: 20rpx 30rpx 50rpx;
		display: flex;
		.input-box {
			display: inline-block;
			width:550rpx;
			height: 70rpx;
			background:rgba(255,255,255,1);
			border-radius:35rpx;
			margin: 0 20rpx 0 0;
			box-shadow:0rpx 0rpx 26rpx 0rpx rgba(153,153,153,0.24);
			.input-box-icon {
				display: inline-block;
				width: 45rpx;
				height: 45rpx;
				margin: 15rpx 15rpx 15rpx 30rpx;
			}
			.input-box-input {
				display: inline-block;
				height: 70rpx;
			}
		}
		.input-bt {
			display: inline-block;
			width: 120rpx;
			height: 70rpx;
			background:rgba(255,255,255,1);
			box-shadow:0 0 26rpx 0 rgba(153,153,153,0.24);
			border-radius:35rpx;
			font-size: 30rpx;
			font-weight:400;
			color:rgba(51,51,51,1);
			text-align: center;
			line-height: 70rpx;
		}
	}
</style>
