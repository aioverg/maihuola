<template>
	<view>
		<uni-nav-bar fixed="true">
		    <block slot="left">
			    <image class="input-left" mode="widthFix" src="../../static/icon/maihuola02.png"></image>
		    </block>
			<view class="input-view" @click="navTo('/pages/search/search')">
				<image class="input-uni-icon" mode="widthFix" src="../../static/icon/search01.png"></image>
				<text class="input-placeholder">搜索你需要的商品关键词</text>
			</view>
			<block slot="right">
				<view class="message-box">
					<image class="input-right" mode="widthFix" src="../../static/icon/message01.png"></image>
					<text class="message-hint"></text>
				</view>
			</block>
		</uni-nav-bar>
		<!-- 轮播图 -->
		<view class="banner-box">
			<uni-swiper-dot :info="carouselList" :current="current" mode="round" :dots-styles="dotsStyles">
				<swiper autoplay="true" class="banner-carousel" @change="change">
					<swiper-item v-for="(item, index) in carouselList" :key="index" class="banner-item" @click="navToCarousel(item.link_goods_id, item.id)">
						<image :src="item.pic" class="banner-image" />
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>

		<!--分类-->
		<view class="sort-section">
			<view class="sort-items">
				<scroll-view class="typetitleTab" scroll-x="true">
					<view class="sort-item-box" v-for="(item, index) in sortList" :key="index" @click="getGuess(/*item.ids,*/ index)">
					    <view class="sort-item" :class="sortIndex == index ? 'red' : ''">
							<text>{{item.title}}</text>
							<view class="sort-underline"></view>
					    </view>
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
				<ai-gusee-card :recommend="item.tag" :data="item"></ai-gusee-card>
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
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	import aiGuseeCard from '@/components/ai-guess-card.vue'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	import aiPopupUpdate from '@/components/uni-popup/ai-popup-update.vue'
	import aiLogin from '@/components/ai-login.vue'
	import {apkDownload} from '@/static/js/appUpdate.js'
	export default {
		components: {
			uniNavBar,
			uniSwiperDot,
			mixLoading,
			aiGuseeCard,
			uniPopUp,
			aiPopupUpdate,
			aiLogin,
		},
		data() {
			return {
				current: 0,
				dotsStyles: {
					bottom: 0,
					width: 5,
					height: 5,
					backgroundColor: "rgba(244,122,115,0.49)",
					border: "none",
					selectedBackgroundColor: "#F47A73",
					selectedBorder: "none"
				},
				sortList: [],
				sortIndex: 0,
				sortId: 1,
				sortIds: 0,
				rankData: [
					{
						id: "default",
						title: "默认",
						key: null,
						rankType: null
					},
					{
						id: "update",
						title: "上新排序",
						rank: "id",
						rankType: "DESC"
					},
					{
						id: "priceUp",
						title: "价格升序",
						rank: "promotion_price",
						rankType: "ASC"
					},
					{
						id: "priceDown",
						title: "价格降序",
						rank: "promotion_price",
						rankType: "DESC"
					}
				],
				rankId: 0,
				rankValue: null,
				rankType: null,
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
			this.getCarousel()
		},
		onShow() {
		},
		onHide() {
		},
		onReady(){
			// #ifdef APP-PLUS
			this.appUpdate()
			// #endif
			
		},
		onPullDownRefresh() {
			const _this = this
			uni.startPullDownRefresh({
				success: function() {
					_this.getCarousel()
					_this.getGuessSort()
					_this.goodsList = []
					_this.sortList = []
					_this.goodsListPage = 1
					_this.hide = false
					this.getGuess(this.sortIndex)
					setTimeout(() => {
						uni.stopPullDownRefresh()
					},1500)
				}
			})
		},
		onReachBottom(){
			this.getGuess(this.sortIndex)
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
					this.$aiRouter.navTo('/pages/detail/detail?goods_id=' + typeId)
				}else{
					this.$aiRouter.navTo('/pages/detail/guessList?goods_id=' + typeId)
				}
			},
			//获取分类菜单
			getGuessSort(){
				this.$api.getSearchGuess({
					is_recommend: 1,
				}).then(res => {
					if(res.data.data.length !== 0){
						this.sortList.push({
							id: -100,
							ids: 0,
							title: "推荐",
							pid: "推荐"
						})
						this.$api.getGuessSort().then( res =>{
							if(res.data.data){
								for(let item of res.data.data){
									this.sortList.push(item)
								}
							}
							this.getGuess(this.sortIndex)
						})
					}else{
						this.$api.getGuessSort().then( res =>{
							for(let item of res.data.data){
								this.sortList.push(item)
							}
						})
					}
				})
			},
			//获取菜单商品
			getGuess(index){
				if(this.sortIndex !== index){
					this.sortIndex = index
					this.sortId = this.sortList[index].id
					this.goodsList = []
					this.goodsListPage = 1
				}
				if(this.sortList[index].id == -100){
					if(this.goodsListPage > this.goodsListLastPage){
						this.uniLoadMoreStatus = "noMore"
						return
					}
					this.uniLoadMoreStatus = "loading"
					this.$api.getSearchGuess({
						sort: this.rankValue,
						is_recommend: 1,
						sort_type: this.rankType,
						page: this.goodsListPage,
						size: 10
					}).then(res => {
						if(res.data.pagination.pages <= 0){
							this.uniLoadMoreStatus = "noMore"
							return
						}
						if(res.data.pagination.pages == 1){
							this.goodsListLastPage = res.data.pagination.pages
							this.goodsListPage += 1
							for(let i of res.data.data){
								this.goodsList.push(i)
							}
							this.uniLoadMoreStatus = "noMore"
							return
						}
						this.goodsListLastPage = res.data.pagination.pages
						this.goodsListPage += 1
						for(let item of res.data.data){
							this.goodsList.push(item)
						}
						this.uniLoadMoreStatus = "more"
					})
				}else{
					if(this.goodsListPage > this.goodsListLastPage){
						this.uniLoadMoreStatus = "noMore"
						return
					}
					this.uniLoadMoreStatus = "loading"
					this.$api.getSearchGuess({
						category_id: this.sortId,
						sort: this.rankValue,
						is_recommend: this.recommend,
						sort_type: this.rankType,
						page: this.goodsListPage,
						size: 10
					}).then(res => {
						if(res.data.pagination.pages <= 0){
							this.uniLoadMoreStatus = "noMore"
							return
						}
						if(res.data.pagination.pages == 1){
							this.goodsListLastPage = res.data.pagination.pages
							this.goodsListPage += 1
							for(let i of res.data.data){
								this.goodsList.push(i)
							}
							this.uniLoadMoreStatus = "noMore"
							return
						}
						this.goodsListLastPage = res.data.pagination.pages
						this.goodsListPage += 1
						for(let item of res.data.data){
							this.goodsList.push(item)
						}
						this.uniLoadMoreStatus = "more"
					})
				}
			},
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
			    this.rankId = index;
				this.rankValue = this.rankData[index].rank
				this.rankType = this.rankData[index].rankType
				this.goodsList = []
				this.goodsListPage = 1
				this.hide = false
				this.getGuess(this.sortIndex)
			},
			appUpdate(){
				if(this.$store.state.appInfo.update){
					this.$refs.popupAiDia.open()
				}
			},
			close(done){
				done()
			},
			confirm(done){
				apkDownload(this.updataLink)
				done()
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #F9F9F9;
	}
	/*顶部tabbar，搜索栏*/
	.input-left {
		width: 138px
	}
	.input-right {
		width: 20px;
	}
	.message-box {
		width: 15px;
		position: relative;
	}
	.message-hint {
		width: 8px;
		height: 8px;
		line-height: 15px;
		border-radius: 50%;
		background-color: #FFD83A;
		position: absolute;
		top: 24px;
		left: 15px;
	}
	.input-view {
		display: flex;
		flex-direction: row;
		width: 460rpx;
		flex: 1;
		background-color: #f8f8f8;
		height: 35px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 35px;
	}
	.input-uni-icon {
		width: 14px;
		height: 14px;
		margin: 10.5px 10px 0 5px;
	}
	.input-placeholder {
		color: #CCCCCC;
		font-size: 15px;
	}
	
	
	
	/*底部登录提示栏*/
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
	
	/*轮播图*/
	.banner-box {
		height: 200px;
		width: 100%;
		background-color: #FFFFFF;
		padding: 10px 0;
		.banner-carousel {
		    width: 100%;
			height: 180px;
			.banner-item {
				.banner-image {
					width: 640rpx;
					height: 160px;
					border-radius: 15px;
					margin: 0 auto;
					display: block;
				}
			}
		}
	}
	.sort-section {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		background: #FFFFFF;
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
						.sort-underline {
							position: absolute;
							display: none;
							left: 0px;
							height: 2px;
							bottom: 3px;
							width: 1.2em;
							border-radius: 3px;
							background-color: #F47A73;
						}
					}
					.red {
						color: #F47A73;
						font-size: 20px;
						font-weight: bold;
						.sort-underline {
							display: inline-block;
						}
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
				width: 110px;
				height: 175px;
				z-index: 25;
				//display: none;
				right: -2px;
				top: 12px;
				.sort-rank-item-bg {
					width: 110px;
					height: 170px;
					position: absolute !important;
				}
				.sort-rank-item-box {
					position: relative;
					z-index: 25;
					width: 110rpx;
					margin: 40px auto 0;
					.sort-rank-list-item {
						width: 52px;
						text-align-last: justify;
						text-align: center;
						font-size: 12px;
						padding: 0px 0 4px 0;
						margin: 8px 0 0 0;
					}
					.blue {
						color: #F47A73;
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
