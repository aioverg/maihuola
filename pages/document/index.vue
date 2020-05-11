<template>
	<view>
		<ai-navbar title="关于我们"></ai-navbar>
		<view class="docunemt">
			<view class="title">{{title}}</view>
			<view class="content">{{content}}</view>
		</view>
	</view>
</template>

<script>
	import aiNavbar from '@/components/ai-navbar.vue'
	import documentData from './data.js'
	export default {
		components: {
			aiNavbar
		},
		data() {
			return {
				title: null,
				content: null
			}
		},
		onLoad: function(option){
			console.log(documentData[option.id].title)
			console.log(option.id)
			this.title = documentData[option.id].title
			this.content = documentData[option.id].content
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(255,255,255,1);
	}
	.docunemt {
		width: 650rpx;
		margin: 0 auto;
		.title {
			height: 78rpx;
			line-height: 78rpx;
			margin: 10rpx 0 0 0;
			border-bottom: 1px solid rgba(229,229,229,1);;
			font-size: 32rpx;
			font-weight: 500;
			color: rgba(51,51,51,1);
		}
		.content {
			line-height: 38rpx;
			margin: 20rpx 0 0 0;
			font-size: 26rpx;
			color: rgba(153,153,153,1);
		}
	}
</style>
