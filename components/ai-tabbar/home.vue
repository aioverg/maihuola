<template>
	<view style="padding: 0 0 50px;">
		<!--顶部导航栏-->
		<uni-nav-bar fixed="true">
		    <block slot="left">
			    <image class="input-left" mode="widthFix" src="/static/icon/maihuola02.png"></image>
		    </block>
			<view class="input-view" @click="navTo('/pages/search/search')">
				<image class="input-uni-icon"  mode="widthFix" src="../../static/icon/search01.png"></image>
				<text class="input-placeholder">搜索你需要的商品关键词</text>
			</view>
			<block slot="right">
				<view class="message-box" v-if="false">
					<image class="input-right" mode="widthFix" src="../../static/icon/message01.png"></image>
					<text class="message-hint"></text>
				</view>
			</block>
		</uni-nav-bar>
		<!-- 轮播图 -->
		<view class="banner-box">
			<uni-swiper-dot :info="carouselList" :current="current" mode="round" :dots-styles="dotsStyles">
				<swiper class="banner-carousel" @change="change" autoplay="true" circular="true">
					<swiper-item v-for="(item, index) in carouselList" :key="index" class="banner-item" @click="navToCarousel(item)">
						<image :src="item.pic" class="banner-image" :class="current == index ? 'banner-img-show' : 'banner-img-hidden'" />
						<view class="banner-shadow"></view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<!--分类-->
		<view class="sort-section" :class="sortFixed">
			<!--分类菜单-->
			<view class="sort-items">
				<scroll-view class="typetitleTab" scroll-x="true">
					<view class="sort-item-box" v-for="(item, index) in sortList" :key="index" @click="getGuess(/*item.ids,*/ index)">
					    <view class="sort-item" :class="sortIndex == index ? 'red' : ''">
							<text>{{item.title}}</text>
							<!-- <view v-show="sortIndex == index" style="position: absolute; display: inline-block; left: 0; bottom: -7px;">
								<image style="width: 20px;" src="/static/icon/across-ling-01.png" mode="widthFix"></image>
							</view> -->
					    </view>
					</view>
				</scroll-view>
			</view>
			<!--排序菜单-->
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
		<!--商品列表-->
		<view class="guess-section">
			<view class="guess-item" v-for="(item, index) in goodsList" :key="index" @click="navToDetail('/pages/detail/detail?goods_id=' + item.id)">
				<ai-goods-card :recommend="item.tag" :data="item"></ai-goods-card>
			</view>
		</view>
		<!--登录提示横条-->
		<view class="login-box" v-if="!loginBox">
			<ai-login jumpUrl="/pages/index/index?tabId=0"></ai-login>
		</view>
		<!--更新弹窗-->
		<uni-popup ref="popupAiDia" type="dialog" zIndex="10000">
		    <ai-popup-update :updateBt="updateBt" :version="updateVersion" :content="updateContent" :prgShow="prgShow" :prg="prg" type="dialog" :cancel-show="!updataType" @close="close" @confirm="confirm"></ai-popup-update>
		</uni-popup>
		<!--下拉加载提示-->
		<uni-load-more :status="uniLoadMoreStatus"></uni-load-more>
		<!--刷新等待图标-->
		<mix-loading v-show="refresh"></mix-loading>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	import aiGoodsCard from '@/components/ai-card/ai-goods-card.vue'
	import aiPopupUpdate from '@/components/uni-popup/ai-popup-update.vue'
	import aiLogin from '@/components/ai-login/ai-login.vue'
	// #ifdef APP-PLUS
	import {apkDownload} from '@/static/js/appUpdate.js'
	import {getServerNo} from "@/static/js/appUpdate.js";
	// #endif
	export default {
		components: {
			uniSwiperDot,
			mixLoading,
			aiGoodsCard,
			aiPopupUpdate,
			aiLogin,
		},
		data() {
			return {
				//解决快速点击跳转，页面跳转多次问题
				navigateFlag: false,
				//判断是否请求菜单栏
				menuFlag: true,
				//轮播图当前显示图片标志
				current: 0,
				//轮播图指示点样式
				dotsStyles: {
					bottom: 0,
					width: 5,
					height: 5,
					backgroundColor: "rgba(244,122,115,0.49)",
					border: "none",
					selectedBackgroundColor: "#FF5350",
					selectedBorder: "none"
				},
				//轮播图数据列表
				carouselList: [],
				//商品分类菜单
				sortList: [],
				sortIndex: 0,
				sortId: 1,
				//排序菜单
				rankData: [
					{
						id: "default",
						title: "默认排序",
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
				//商品列表
				goodsList: [],
				//当前显示的商品页数
				goodsListPage: 1,
				//商品总页数
				goodsListLastPage: 1,
				//是否显示排序列表
				hide: false,
				//下拉加载提示类型
				uniLoadMoreStatus: "more",
				//是否显示下载进度
				prgShow: false,
				//下载进度
				prg: 0,
				//是否显示刷新等待图标
				refresh: false,
				//将分类列表吸顶
				sortFixed: "sort-relative",
				//更新弹窗按钮
				updateBt: "立即升级"
				
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
			navToCarousel(item){
				if(item.link_type == 1){//商品页面
					if(item.link_goods_id.indexOf(",") == -1){//商品详情
						this.$aiRouter.navTo('/pages/detail/detail?goods_id=' + item.link_goods_id)
					}else{//商品列表
						this.$aiRouter.navTo('/pages/detail/guessList?goods_id=' + item.id)
					}
					return
				}
				if(item.link_type == 2){//tab页面
					this.$aiRouter.navTo(item.link_url)
					return
				}
				if(item.link_type == 3){//app内其他页面
					this.$aiRouter.navTo(item.link_url)
					return
				}
				if(item.link_type == 4){//外部H5页面
					this.$aiRouter.navTo(item.link_url)
					return
				}
			},
			//获取分类菜单
			getGuessSort(){
				if(!this.menuFlag){
					return
				}
				this.$api.getSearchGuess({
					is_recommend: 1,
				}).then(res => {
					this.menuFlag = false
					if(res.data.data.length !== 0){
						this.sortList.push({
							id: -100,
							ids: 0,
							title: "推荐",
							pid: "推荐",
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
				if(this.hide){
					this.hide = false
				}
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
			//跳转到商品详情
			navToDetail(url){
				if(this.hide){
					this.hide = false
					return
				}else{
					this.$aiRouter.navTo(url)
				}
			},
			//跳转
			navTo(url) {
				this.$aiRouter.navTo(url)
			},
			//展示\隐藏排序菜单
			hides(){
				if(this.hide){
					this.hide = false
				} else {
					this.hide = true
				}
			},
			//排序
			selectRank(index) {
			    this.rankId = index;
				this.rankValue = this.rankData[index].rank
				this.rankType = this.rankData[index].rankType
				this.goodsList = []
				this.goodsListPage = 1
				this.hide = false
				this.getGuess(this.sortIndex)
			},
			//将分类列表吸顶
			sortCeil(value){
				this.sortFixed = value
			},
			//弹窗关闭
			close(done){
				this.$store.commit("setUpdatePopup", false)
				done()
			},
			//弹窗确认
			confirm(done){
				apkDownload(this)
				//done()
			},
			//组件加载时运行的函数
			pageOnload() {
				
				this.getGuessSort()
				this.getCarousel()
				// #ifdef APP-PLUS
				if(this.$store.state.appInfo.updatePopup){
					getServerNo(this)
				}
				// #endif
				console.log("加载 首页，可以把网络请求放这里")
			},
			//页面下拉时刷新组件
			pageRefresh() {
				const _this = this
				uni.startPullDownRefresh({
					success: function() {
						_this.menuFlag = true
						_this.getCarousel()
						_this.getGuessSort()
						_this.goodsList = []
						_this.sortList = []
						_this.goodsListPage = 1
						_this.hide = false
						_this.getGuess(_this.sortIndex)
						setTimeout(() => {
							uni.stopPullDownRefresh()
						},1500)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F9F9F9;
	}
	/*顶部tabbar，搜索栏*/
	.input-left {
		width: 70px
	}
	.input-right {
		width: 20px;
	}
	.message-box {
		width: 15px;
		position: relative;
		margin: 0 10rpx 0 0;
	}
	.message-hint {
		width: 8px;
		height: 8px;
		line-height: 15px;
		border-radius: 50%;
		background-color: #FFD83A;
		position: absolute;
		top: -2px;
		left: 15px;
	}
	.input-view {
		display: flex;
		flex-direction: row;
		width: 500rpx;
		flex: 1;
		background-color: #f8f8f8;
		height: 35px;
		border-radius: 15px;
		padding: 0 15px;
		margin: 0 20px 0 0;
		flex-wrap: nowrap;
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
	
	/*轮播图*/
	.banner-box {
		height: 200px;
		width: 100%;
		background-color: #FFFFFF;
		padding: 10px 0;
		.banner-carousel {
		    width: 100%;
			height: 180px;
			margin: 0 10rpx 0 0;
			.banner-item {
				width: 690rpx;
				.banner-image {
					width: 690rpx;
					height: 160px;
					border-radius: 15px;
					display: block;
					z-index: 1;
				}
				.banner-shadow {
					width: 640rpx;
					height: 35px;
					filter:blur(10px);
					background-color: #FF716E;
					margin: 0 0 0 55rpx;
					position: absolute;
					bottom: 23px;
					z-index: 0;
				}
				.banner-img-show {
					margin: 0 0 0 30rpx;
				}
				.banner-img-hidden {
					margin: 0 0 0 20rpx;
				}
			}
		}
	}
	/*分类*/
	.sort-relative {
		position: relative;
		height: 36px;
	}
	.sort-fixed {
		position: fixed;
		height: 46px;
		top: 80px;
	}
	.sort-section {
		width: 100%;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		z-index: 10;
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
						color: #FF5350;
						font-size: 20px;
						font-weight: bold;
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
						color: #FF5350;
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
			border-radius: 8px;
			box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		}
	}
</style>