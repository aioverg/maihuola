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
			<view class="history-label" v-for="(value, index) in history" :key="index" @click="historyNavTo(value)">{{value}}</view>
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
				history: [],
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
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
				this.$global.navTo('/pages/search/searchResult?id=' + obj)
			},
			historyNavTo(obj){
				this.$global.navTo('/pages/search/searchResult?id=' + obj)
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
		margin: 10px 15px 25px;
		display: flex;
		.input-box {
			display: inline-block;
			width:550rpx;
			height: 35px;
			background:rgba(255,255,255,1);
			border-radius:17px;
			margin: 0 10px 0 0;
			box-shadow:0rpx 0rpx 13px 0rpx rgba(153,153,153,0.24);
			.input-box-icon {
				display: inline-block;
				width: 22px;
				height: 22px;
				margin: 7px 7px 7px 15px;
			}
			.input-box-input {
				display: inline-block;
				height: 35px;
			}
		}
		.input-bt {
			display: inline-block;
			width: 60px;
			height: 35px;
			background:rgba(255,255,255,1);
			box-shadow:0 0 13px 0 rgba(153,153,153,0.24);
			border-radius:17px;
			font-size: 15px;
			color:rgba(51,51,51,1);
			text-align: center;
			line-height: 35px;
		}
	}
	.history-box {
		width: 690rpx;
		height: 22px;
		margin: 0 auto;
		.history {
			display: inline-block;
			font-size: 16px;
			font-weight: 600;
			color:rgba(51,51,51,1);
			margin-right: 246px;
		}
		.delete-icon {
			display: inline-block;
			width: 15px;
			height: 15px;
		}
	}
	.history-label-box {
		width: 690rpx;
		margin: 16px auto 0;
		.history-label {
			display: inline-block;
			height: 32px;
			margin: 0 10px 10px 0;
			line-height: 32px;
			font-size: 14px;
			padding: 0 12px;
			background: rgba(242,242,242,1);
			border-radius: 16px;
		}
	}
</style>
