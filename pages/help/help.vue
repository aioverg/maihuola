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
			height: 39px;
			line-height: 39px;
			margin: 5px 0 0 0;
			border-bottom: 1px solid rgba(229,229,229,1);;
			font-size: 16px;
			font-weight: 600;
			color: rgba(51,51,51,1);
		}
		.content {
			line-height: 19px;
			margin: 10px 0 0 0;
			font-size: 13px;
			color: rgba(153,153,153,1);
		}
	}

</style>