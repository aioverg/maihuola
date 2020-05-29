<template>
	<view>
		<ai-navbar
		    title="选品"
			:fixed=true
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
		/>
		<view class="head">
			<image class="bg" src="/static/img/bg-02.png"></image>
			<view class="search">
				<view class="search-one" @click="navTo('/pages/search/search')">
					<image class="search-icon" src="../../static/icon/ai-search.png"></image>
					<view class="search-content">搜索你需要的商品关键词</view>
				</view>
				<view class="search-two" @click="navTo('/pages/search/search')">搜索</view>
			</view>

			<!-- 头部轮播 -->
			<view class="carousel-section">
				<swiper indicator-active-color="rgba(255,255,255,1)" autoplay="true" interval="5000" duration="1500" class="carousel" circular indicator-dots>
					<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToCarousel(item.link_goods_id, item.id)">
						<image :src="item.pic" class="bannar-image" />
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!--分类-->
		<view class="sort-section">
			<view class="sort-items">
				<scroll-view class="typetitleTab" scroll-x="true">
					<view class="sort-item-box" v-for="(item, index) in sortList" :key="index" @click="getGuess(item.id, index)">
					    <view class="sort-item" :class="sortIndex == index ? 'red' : ''">
							{{item.title}}
					    </view>
					    <view class="sort-item-line">|</view>
					</view>
				</scroll-view>
			</view>
			<view class="sort-rank">
				<view class="sort-rank-img-box" @click="hides()">
				    <image class="sort-rank-img" src="/static/icon/icon-rank.png"></image>
				</view>
				<view class="sort-rank-item" v-show="hide" >
					<image class="sort-rank-item-bg" src="/static/icon/sort-rank-bg.png"></image>
					<view class="sort-rank-item-box">
						<view class="sort-rank-list-item" :class="rankId==index?'blue':''" v-for="(item, index) in rankData" @click="selectRank(index)" :key="index">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="guess-section">
			<view class="guess-item" v-for="(item, index) in goodsList" :key="index" @click="navToDetail('/pages/detail/detail?goods_id=' + item.id)">
				<ai-gusee-card :recommend="item.is_recommend" :data="item"></ai-gusee-card>
			</view>
		</view>
		<view class="login-box" v-if="!loginBox">
			<ai-login></ai-login>
		</view>
		<uni-popup ref="popupAiDia" type="dialog">
		    <ai-popup-update :version="updateVersion" :content="updateContent" :progress="downloadPtogress"  popupbg="/static/img/bg-update.png" type="dialog" :cancel-show="true" :before-close="true" @close="close" @confirm="confirm"></ai-popup-update>
		</uni-popup>
		<uni-load-more :status="uniLoadMoreStatus"></uni-load-more>
		<mix-loading v-show="refresh"></mix-loading>
	</view>
</template>

<script>
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	import aiGuseeCard from '@/components/ai-guess-card.vue'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	import aiPopupUpdate from '@/components/uni-popup/ai-popup-update.vue'
	import aiLogin from '@/components/ai-login.vue'
	import {apkDownload} from '@/static/js/apUpdate.js'
	export default {
		components: {
			mixLoading,
			aiGuseeCard,
			uniPopUp,
			aiPopupUpdate,
			aiLogin
		},
		data() {
			return {
				sortList: [],
				sortIndex: 0,
				sortId: 1,
				rankData: [
					{
						id: "update",
						title: "上新排序",
						key: "new"
					},
					/*{
						id: "brokerage",
						title: "佣金排序",
						key: "new"
					},*/
					{
						id: "priceUp",
						title: "价格升序",
						key: "+price"
					},
					{
						id: "priceDown",
						title: "价格降序",
						key: "-price"
					}
				],
				rankId: 0,
				rankValue: "id",
				rankType: "DESC",
				carouselList: [],
				goodsList: [],
				goodsListPage: 1,
				goodsListLastPage: 1,
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				hide: false,
				blue: null,
				//id: 1,
				uniLoadMoreStatus: "more",
				current: 0,
				downloadPtogress: false,
				refresh: false
				
			};
		},
		computed: {
			loginBox(){
				return this.$store.state.hasLogin
			},
			updateVersion(){
				return this.$store.state.appInfo.appVersion
			},
			updateContent(){
				return this.$store.state.appInfo.appNote
			},
			updataLink(){
				return this.$store.state.appInfo.appLink
			},
			updataType(){
				return this.$store.state.appInfo.require
			}
		},
		onLoad() {
			this.getGuessSort()
			//console.log(6666)
			//this.getCarousel()
		},
		onShow() {
			//this.getRecommend()
		},
		onReady(){
			// #ifdef APP-PLUS
			this.appUpdate()
			// #endif
			
		},
		onPullDownRefresh() {
			const _this = this
		    _this.refresh = true
			this.getCarousel()
			this.getGuessSort()
		    setTimeout(() => {
				_this.refresh = false
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onReachBottom(){
			this.getGuess(this.sortId, this.sortIndex)
		},
		methods: {
			change(e) {
			    this.current = e.detail.current;
			},
			//获取轮播图数据
			getCarousel(){
				this.$api.getCarousel({
					code: "Index.Banner"
				}).then( res => {
					this.carouselList = res.data.data
				})
			},
			//轮播图跳转
			navToCarousel(typeId, id){
				if(typeId.indexOf(",") == -1){
					this.$aiRouter.navTo('/pages/detail/detail?goods_id=' + id)
				}else{
					this.$aiRouter.navTo('/pages/detail/guessList?goods_id=' + id)
				}
			},
			//获取商品分类列表
			/*getGuessSort(){
				this.$api.getGuessSort().then( res =>{
				    this.sortList = res.data.data
					this.sortId = res.data.data[0].id
				}).then(res => {
					this.getGuess(this.sortId, 0)
				})
			},*/
			//获取推荐商品
			getGuessSort(){
				this.$api.getSearchGuess({
					is_recommend: 1,
				}).then(res => {
					if(res.data.data.length !== 0){
						this.sortList.push({
							id: "推荐",
							title: "推荐",
							pid: "推荐"
						})
						this.$api.getGuessSort().then( res =>{
							console.log(res.data.data)
							for(let item of res.data.data){
								this.sortList.push(item)
							}
						})
						for(let item of res.data.data){
							this.goodsList.push(item)
						}
					}else{
						this.$api.getGuessSort().then( res =>{
							console.log(res.data.data)
							for(let item of res.data.data){
								this.sortList.push(item)
							}
						})
					}
				})
			},
			getGuess(sortId, index){
				if(this.hide){
					this.hide = false
					return
				}else{
					if(this.sortIndex != index){
						this.sortIndex = index
						this.sortId = sortId
						this.goodsList = []
						this.goodsListPage = 1
						this.rankValue = "id"
						this.rankId = 0
					}
					if(this.goodsListPage > this.goodsListLastPage){
						this.uniLoadMoreStatus = "noMore"
						return
					}
					this.uniLoadMoreStatus = "loading"
					this.$api.getSearchGuess({
						category_id: sortId,
						sort: this.rankValue,
						is_recommend: 0,
						sort_type: this.rankType,
						page: this.goodsListPage,
						size: 10
					}).then( res => {
						if(res.data.pagination.pages <= 0){
							this.uniLoadMoreStatus = "noMore"
							return
						}
						if(res.data.pagination.pages = 1){
							this.goodsListLastPage = res.data.pagination.pages
							this.goodsListPage += 1
							for(let i of res.data.data.data){
								this.goodsList.push(i)
							}
							this.uniLoadMoreStatus = "noMore"
							return
						}
						this.goodsListLastPage = res.data.pagination.pages
						this.goodsListPage += 1
						for(let i of res.data.data.data){
							this.goodsList.push(i)
						}
						this.uniLoadMoreStatus = "more"
					})
				}
			},
			//获取商品
			/*getGuess(sortId, index){
				if(this.hide){
					this.hide = false
					return
				}else{
					if(this.sortIndex != index){
						this.sortIndex = index
						this.sortId = sortId
						this.goodsList = []
						this.goodsListPage = 1
						this.rankValue = "id"
						this.rankId = 0
					}
					if(this.goodsListPage > this.goodsListLastPage){
						this.uniLoadMoreStatus = "noMore"
						return
					}
					this.uniLoadMoreStatus = "loading"
					this.$api.getSearchGuess({
						category_id: sortId,
						sort: this.rankValue,
						is_recommend: 0,
						sort_type: this.rankType,
						page: this.goodsListPage,
						size: 10
					}).then( res => {
						console.log(res)
						if(res.data.data.last_page <= 0){
							this.uniLoadMoreStatus = "noMore"
							return
						}
						if(res.data.data.last_page = 1){
							this.goodsListLastPage = res.data.data.last_page
							this.goodsListPage += 1
							for(let i of res.data.data.data){
								this.goodsList.push(i)
							}
							this.uniLoadMoreStatus = "noMore"
							return
						}
						this.goodsListLastPage = res.data.data.last_page
						this.goodsListPage += 1
						for(let i of res.data.data.data){
							this.goodsList.push(i)
						}
						this.uniLoadMoreStatus = "more"
					})
				}
			},*/
			//跳转
			navToDetail(url){
				if(this.hide){
					this.hide = false
					return
				}else{
					this.$aiRouter.navTo(url)
				}
			},
			navTo(url) {
				this.$aiRouter.navTo(url)
			},
			hides(){
				if(this.hide){
					this.hide = false
				} else {
					this.hide = true
				}
			},
			selectRank(index) {
				console.log(999)
			    this.rankId = index;
				this.rankValue = this.rankData[index].key
				this.goodsList = []
				this.goodsListPage = 1
				this.hide = false
				this.getGuess(this.sortId, this.sortIndex)
			},
			appUpdate(){
				if(this.$store.state.appInfo.update){
					this.$refs.popupAiDia.open()
				}
			},
			close(done){
			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				done()
			},
			confirm(done){
				//this.downloadPtogress = true
				apkDownload(this.updataLink)
				done()
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: rgba(249, 249, 249, 1);
	}
	.login-box {
		width: 750rpx;
		position: fixed;
		bottom: 50px;
		z-index: 30;
	}
	/* #ifdef APP-PLUS */
	.login-box {
		bottom: 0;
	}
	/* #endif */
	.head{
		height: 215px;
		padding: 20px 0 0 0;
		position: relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
		.search {
			position: relative;
			z-index: 3;
			height: 45px;
			width: 690rpx;
			margin: 0 auto;
			.search-one {
				display: inline-block;
				position: relative;
				z-index: 4;
				width: 550rpx;
				height: 35px;
				background:rgba(255,255,255,0.19);
				box-shadow:0px 4px 15px 0px rgba(153,153,153,0.24);
				border-radius:35px;
				.search-icon {
					display: inline-block;
					margin: 0 10px 0 15px;
					width: 12px;
					height: 12px;
				}
				.search-content {
					height: 35px;
					line-height: 35px;
					display: inline-block;
					font-size: 15px;
					z-index: 10;
					color: rgba(255,255,255,0.5);
					
				}
			}
			.search-two {
				display: inline-block;
				width: 120rpx;
				height: 35px;
				font-size: 15px;
				margin: 0 0 0 10px;
				line-height: 35px;
				text-align: center;
				border-radius:35px;
				box-shadow:0px 4px 15px 0px rgba(153,153,153,0.24);
				background:rgba(255,255,255,0.19);
				color: rgba(255,255,255,0.5);
			}
		}
	}

	.carousel-section {
		clear: both;
		width: 100%;
		margin-top: 10px;
		height: 150px;

		.carousel {
			width: 100% !important;
			height: 150px !important;

			.swiper-item {
				width: 100% !important;
				height: 150px !important;
				border-radius: 8px;

			}
		}

		/deep/ .bannar-image {
			width: 92% !important;
			height: 150px !important;
			border-radius: 8px;
			margin: 0 auto;
			display: block;
		}

	}

	.sort-section {
		margin-top: 20px;
		width: 100%;
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 1);
		.sort-items {
			height: 45px;
			flex-grow: 1;
			display: inline-block;
			.typetitleTab {
				width: 670rpx;
				padding: 0 5px 0 15px;
				white-space: nowrap;
				margin: 0 auto;
				text-align: center;
				.sort-item-box {
					display: inline-block;
					.sort-item {
						position: relative;
						display: inline-block;
						margin: 0 15px;
						height: 45px;
						line-height: 45px;
						text-align: center;
						font-size: 16px;
					}
					.red {
						color:rgba(244,122,115,1);
						font-weight: 600;
					}
					.sort-item-line {
						display: inline-block;
						color: #EEEEEE;
						font-size: 14px;
					}
				}
				.sort-item-box:last-child .sort-item-line {
					display: none;
				}
			}
		}
		.sort-rank {
			display: inline-block;
			position: relative;
			.sort-rank-img-box {
				width: 40px;
				padding: 0 15px 0 0;
				text-align: center;
				.sort-rank-img {
					width: 9px;
					height: 14px;
				}
			}
			.sort-rank-item {
				position: absolute;
				width: 120px;
				height: 175px;
				z-index: 25;
				//display: none;
				right: -2px;
				top: 12px;
				.sort-rank-item-bg {
					width: 120px;
					height: 150px;
					position: absolute !important;
				}
				.sort-rank-item-box {
					position: relative;
					z-index: 25;
					width: 120rpx;
					margin: 40px auto 0;
					.sort-rank-list-item {
						width: 54px;
						text-align: center;
						font-size: 12px;
						color:rgba(51,51,51,1);
						padding: 0px 0 4px 0;
						margin: 9px 0 0 0;
					}
					.blue {
						color:rgba(244,122,115,1);
					}
				}
			}
			.show {
				display: inline-block;
				z-index: 25;
			}
		}
	}
	
	.guess-section {
		width: 690rpx;
		margin: 10px auto 0;
		.guess-item {
			margin: 13px 0 0 0;
		}
	}

</style>
