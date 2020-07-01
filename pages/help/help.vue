<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="返回" rightText="关闭" @clickRight="navTo('/pages/index/index?tabId=2')" ></uni-nav-bar>
		<view class="help-body">
		<view class="docunemt">
			<view class="title">
				<view class="long-string"></view>
			    <view>{{question}}</view>
			</view>
			<view class="content">{{answer}}</view>
		</view>
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
			navTo(url){
				this.$store.commit("setTabId", 2)
				this.$aiRouter.navTo(url)
			},
			navTabBar(url){
				this.$aiRouter.navTabBar(url)
			}
			
		}
	}
</script>

<style lang="scss">
	.help-body {
		width: 750rpx;
		padding: 0 30rpx;
	}
	.docunemt {
		width: 690rpx;
		padding: 0 10rpx 20px 25rpx;
		margin: 10px 0 0 0;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		.title {
			display: flex;
			align-items: center;
			line-height: 20px;
			padding: 15px 0;
			border-bottom: 1px solid #E5E5E5;
			font-size: 16px;
			font-weight: bold;
			.long-string {
				width: 3px;
				height: 15px;
				background-color: #FF716E;
				border-radius: 30%;
				margin: 0 5px 0 5px;
			}
		}
		.content {
			line-height: 19px;
			margin: 10px 0 0 5px;
			font-size: 13px;
			color: #999999;
		}
	}

</style>