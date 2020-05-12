<template>
	<view>
		<ai-navbar
		    title="帮助"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		
		<view class="docunemt">
			<view class="title">{{question}}</view>
			<view class="content">{{answer}}</view>
		</view>
	</view>
</template>

<script>
	import helpData from './helpData.js'
	export default {
		components: {
		},
		data() {
			return {
				question: null,
				answer: null
			}
		},
		onLoad: function(option){
			this.question = helpData[option.id].title
			this.answer = helpData[option.id].content
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