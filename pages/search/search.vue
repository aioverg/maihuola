<template>
	<view>
		<uni-nav-bar fixed="true" leftClickTag="/pages/index/index" leftIcon="arrowleft" leftText="搜索"></uni-nav-bar>
		<view class="head">
			<view class="input-box">
				<image class="input-box-icon" src="/static/icon/search01.png"></image>
				<input class="input-box-input" v-model="inputValue" placeholder="搜索你需要的商品关键词" @confirm="navTo(inputValue)" />
				<view class="ib-cancel-box">
					<image @click="delInput" class="ib-cancel" :style="{visibility: errHidden}" src="/static/icon/err-01.png"></image>
				</view>
			</view>
		</view>
		<view class="history-box">
			<view class="history">搜索历史</view>
			<image v-if="delHint" class="delete-icon" src="/static/icon/icon-delete.png" @click="delHistory"></image>
		</view>
		<view class="history-label-box">
			<view class="history-label-no" v-if="!delHint">暂无搜索记录</view>
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
				errHidden: "hidden",
				inputValue: null,
				history: [],
				delHint: false,
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
			}
		},
		watch: {
			inputValue: function(){
				if(this.inputValue){
					this.errHidden = "visible"
				}else{
					this.errHidden = "hidden"
				}
			}
		},
		onLoad(res){
			if(res){
				this.inputValue = res.id
			}
			const _this = this
			//获取历史搜索的本地缓存
			uni.getStorage({
				key: "searchHistory",
				success: function(res){
					if(res.data){
						if(res.data.length == 0){
							_this.delHint = false
						}else{
							_this.delHint = true
							_this.history = res.data
						}
					}
				}
			})
		},
		methods: {
			navTo(obj){
				this.inputValue = obj.replace(/(^\s*)|(\s*$)/g, "")
				if(this.inputValue.length == 0){return}
				this.$aiRouter.navTo('/pages/search/searchResult?id=' + obj)
			},
			historyNavTo(obj){
				this.$aiRouter.navTo('/pages/search/searchResult?id=' + obj)
			},
			delInput(){
				this.inputValue = null
			},
			delHistory(){
				const _this = this
				_this.delHint = false
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
	.head {
		margin: 10px 15px 25px;
		display: flex;
		.input-box {
			width:690rpx;
			height: 45px;
			padding: 0 15px;
			background: #F5F5F5;
			border-radius: 23px;
			display: flex;
			align-items: center;
			.input-box-icon {
				display: inline-block;
				width: 20px;
				height: 20px;
				margin: 0 17px 0 0;
			}
			.input-box-input {
				display: inline-block;
				height: 35px;
			}
			.ib-cancel-box {
				flex-grow: 1;
				text-align: right;
				.ib-cancel {
					display: inline-block;
					right: 0px;
					width: 15px;
					height: 15px;
				}
			}
		}
		.input-bt {
			display: inline-block;
			width: 60px;
			height: 35px;
			background: #FFFFFF;
			box-shadow:0 0 13px 0 rgba(153,153,153,0.24);
			border-radius:17px;
			font-size: 15px;
			color: #333333;
			text-align: center;
			line-height: 35px;
		}
	}
	.history-box {
		width: 690rpx;
		height: 22px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.history {
			display: inline-block;
			font-size: 16px;
			font-weight: 600;
			color: #333333;
			
		}
		.delete-icon {
			display: inline-block;
			width: 15px;
			height: 15px;
			margin: 0 10px 0 0;
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
			background: #F2F2F2;
			border-radius: 16px;
		}
		.history-label-no {
			font-size: 14px;
			color: #CCCCCC;
		}
	}
</style>
