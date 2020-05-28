<template>
	<view>
		<ai-navbar
		    title="搜索结果"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="head">
			<view class="input-box">
				<image class="input-box-icon" src="/static/icon/ai-search01.png"></image>
				<input class="input-box-input" v-model="searchInput" @click="navTo('/pages/search/search?id=' + searchInput)" disabled />
			</view>
			<view class="input-bt" @click="navTabBar('/pages/index/index')">取消</view>
		</view>
		<view class="search-result">
			<view v-if="searchResult.length == 0" class="no-result">
				<image class="no-result-img" src="/static/error/ai-error02.png" mode="widthFix"></image>
				<view class="no-describe">哎呀！竟然没有匹配的宝贝</view>
			</view>
			<view v-if="searchResult.length !== 0" class="yes-result">
				<view class="guess-item" v-for="(item, index) in searchResult" :key="index" @click="navTo('/pages/detail/detail?goods_id=' + item.id)">
					<ai-gusee-card recommend="true" :data="item"></ai-gusee-card>
				</view>
				<uni-load-more :status="uniLoadMoreStatus"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import aiGuseeCard from "@/components/ai-guess-card"
	export default {
		components: {
			aiGuseeCard
		},
		data() {
			return {
				searchInput: null,
				page: 1,
				lastPage: 1,
				limit: 5,
				searchResult: [],
				history: [],
				uniLoadMoreStatus: "more",
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
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
			navTo(obj){
				this.$aiRouter.navTo(obj)
			},
			navTabBar(obj){
				this.$aiRouter.navTabBar(obj)
			},
			getSearch(){
				if(this.page > this.lastPage){
					this.uniLoadMoreStatus = "noMore"
					return
				}
				this.uniLoadMoreStatus = "loading"
				this.$api.getSearchGuess({
					keywords: this.searchInput,
					limit: this.limit,
					page: this.page
				}).then(res => {
					this.lastPage = res.data.data.last_page
					for(let i of res.data.data.data){
						this.searchResult.push(i)
					}
					this.page += 1
					this.uniLoadMoreStatus = "more"
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
			width: 120rpx;
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
	.search-result {
		width: 690rpx;
		margin: 10px auto 0;
		.no-result {
			width: 100%;
			margin: 100px 0 0 0;
			text-align: center;
			.no-result-img {
				width: 494rpx;
			}
			.no-describe {
				margin: 50px 0 0 0;
				font-size: 15px;
				color: rgba(204,204,204,1);
			}
		}
		.yes-result {
			.guess-item {
				margin: 0 auto 13px;
			}
		}
		
	}
</style>
