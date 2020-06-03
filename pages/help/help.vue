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
		background: #FFFFFF;
	}
	.docunemt {
		width: 650rpx;
		margin: 0 auto;
		.title {
			line-height: 20px;
			padding: 15px 0;
			border-bottom: 1px solid #E5E5E5;
			font-size: 16px;
			font-weight: 600;
			color: #333333;
		}
		.content {
			line-height: 19px;
			margin: 10px 0 0 0;
			font-size: 13px;
			color: #999999;
		}
	}

</style>