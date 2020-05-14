<template>
	<view>
		<ai-navbar
		    title="搜索"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="head">
			<view class="input-box">
				<image class="input-box-icon" src="/static/icon/ai-search01.png"></image>
				<input class="input-box-input" v-model="inputValue" placeholder="搜索你需要的商品关键词" @confirm="navTo(inputValue)" />
			</view>
			<view class="input-bt" @click="navTabBar('/pages/index/index')">取消</view>
		</view>
		<view class="history-box">
			<view class="history">搜索历史</view>
			<image class="delete-icon" src="/static/icon/ai-delete.png" @click="delHistory"></image>
		</view>
		<view class="history-label-box">
			<view class="history-label" v-for="(value, index) in history" :key="index" @click="navTo('/pages/search/searchResult?id=' + value)">{{value}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				inputValue: null,
				history: []
			}
		},
		onLoad(){
			const _this = this
			//获取历史搜索的本地缓存
			uni.getStorage({
				key: "searchHistory",
				success: function(res){
					_this.history = res.data
				}
			})
		},
		methods: {
			navTo(obj){
				this.inputValue = obj.replace(/(^\s*)|(\s*$)/g, "")
				if(this.inputValue.length == 0){return}
				this.history.push(this.inputValue)
				//将搜索缓存入本地
				uni.setStorage({
				    key: 'searchHistory',
				    data: this.history,
				})
				this.$global.navTo('/pages/search/searchResult?id=' + this.inputValue)
			},
			navTabBar(obj){
				this.$global.navTabBar(obj)
			},
			delHistory(){
				const _this = this
				uni.removeStorage({
				    key: 'searchHistory',
					success: function(){
						_this.history = []
					}
				})
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
			font-size: 15px;
			color:rgba(51,51,51,1);
			text-align: center;
			line-height: 70rpx;
		}
	}
	.history-box {
		width: 690rpx;
		height: 45rpx;
		margin: 0 auto;
		.history {
			display: inline-block;
			font-size: 16px;
			font-weight: 500;
			color:rgba(51,51,51,1);
			margin-right: 493rpx;
		}
		.delete-icon {
			display: inline-block;
			width: 30rpx;
			height: 31rpx;
		}
	}
	.history-label-box {
		width: 690rpx;
		margin: 32rpx auto 0;
		.history-label {
			display: inline-block;
			height: 64rpx;
			margin: 0 20rpx 20rpx 0;
			line-height: 64rpx;
			font-size: 14px;
			padding: 0 24rpx;
			background: rgba(242,242,242,1);
			border-radius: 32rpx;
		}
	}
</style>
