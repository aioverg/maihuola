<template>
	<view class="input-title">
		<view class="title">{{title}}</view>
		<view v-if="content" class="content">{{content}}</view>
		<view>
			<input class="input" :placeholder="placeholder"/>
		</view>
		<view class="bt" v-if="btname">{{btname}}</view>
		<view class="time-title" v-if="tiemTitle">{{time}}{{tiemTitle}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: null
			},
			placeholder: {
				type: String,
				default: null
			},
			btname: {
				type: String,
				default: null
			},
			time: {
				type: String,
				default: null
			},
			tiemTitle: {
				type: String,
				default: null
			},
			
			
		}
	}
</script>

<style lang="scss">
	.input-title {
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
		display: flex;
		background:rgba(255,255,255,1);
		border-radius:16rpx;
		margin: 0 auto;
		.title {
			margin: 0 30rpx;
			width: 160rpx;
			font-size:30rpx;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		.content {
			font-size:28rpx;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
		.input {
			display: inline-block;
			font-size: 28rpx;
		}
		.bt {
			font-size:28rpx;
			font-weight:400;
			color:rgba(244,122,115,1);
			text-decoration: underline;
		}
		.time-title {
			font-size:28rpx;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
		
	}
</style>
