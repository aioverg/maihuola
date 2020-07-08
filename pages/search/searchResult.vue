<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="搜索结果"></uni-nav-bar>
		<view class="head">
			<view class="input-box">
				<image class="input-box-icon" src="/static/icon/search01.png"></image>
				<input class="input-box-input" v-model="searchInput" @click="redirect('/pages/search/search?id=' + searchInput + '&router=redirect')" disabled />
			</view>
		</view>
		<view class="search-result">
			<view v-if="searchResult.length == 0" style="width: 690rpx; position: fixed; top: 35%;">
				<ai-no-content describe="哎呀！竟然没有匹配的宝贝"></ai-no-content>
			</view>
			<view v-if="searchResult.length !== 0" class="yes-result">
				<view class="guess-item" v-for="(item, index) in searchResult" :key="index" @click="navTo('/pages/detail/detail?goods_id=' + item.id)">
					<ai-goods-card :recommend="item.tag" :data="item"></ai-goods-card>
				</view>
				<uni-load-more :status="uniLoadMoreStatus"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import aiGoodsCard from '@/components/ai-card/ai-goods-card.vue'
	export default {
		components: {
			aiGoodsCard
		},
		data() {
			return {
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				searchInput: null,
				page: 1,
				lastPage: 1,
				limit: 5,
				searchResult: [],
				history: [],
				uniLoadMoreStatus: "more"
			}
		},
		onLoad(res){
			this.searchInput = res.id
			this.getSearch()
			let searchHistory = uni.getStorageSync("searchHistory")
			if(searchHistory){
				if(!searchHistory.includes(this.searchInput)){
					this.history = searchHistory
					this.history.push(this.searchInput)
					uni.setStorageSync("searchHistory", this.history)
				}
			}else{
				this.history.push(this.searchInput)
				uni.setStorageSync("searchHistory", this.history)
			}
		},
		onReachBottom(){
			this.getSearch()
		},
		methods: {
			redirect(url){
				this.$aiRouter.redirect(url)
			},
			navTo(obj){
				this.$aiRouter.navTo(obj)
			},
			backPage(){
				uni.navigateBack()
			},
			getSearch(){
				if(this.page > this.lastPage){
					this.uniLoadMoreStatus = "noMore"
					return
				}
				this.uniLoadMoreStatus = "loading"
				this.$api.getSearchGuess({
					q: this.searchInput,
					size: this.limit,
					page: this.page
				}).then(res => {
					this.lastPage = res.data.pagination.pages
					for(let i of res.data.data){
						this.searchResult.push(i)
					}
					this.page += 1
					if(this.page > this.lastPage){
						this.uniLoadMoreStatus = "noMore"
						return
					}else{
						this.uniLoadMoreStatus = "more"
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
	.head {
		margin: 10px 15px 25px;
		display: flex;
		.input-box {
			display: flex;
			align-items: center;
			width: 690rpx;
			height: 45px;
			background: #F5F5F5;
			border-radius: 23px;
			.input-box-icon {
				display: inline-block;
				width: 20px;
				height: 20px;
				margin: 7px 7px 7px 15px;
			}
			.input-box-input {
				display: inline-block;
				color: #333333;
				font-size: 15px;
				height: 35px;
			}
		}
	}
	.search-result {
		width: 690rpx;
		margin: 10px auto 0;
		.yes-result {
			.guess-item {
				margin: 0 auto 13px;
				box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
				border-radius: 8px;
			}
		}
		
	}
</style>
