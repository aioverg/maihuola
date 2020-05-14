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
					<image class="search-icon" src="../../static/icon/ai-search04.png"></image>
					<view class="search-content">搜索你需要的商品关键词</view>
				</view>
				<view class="search-two" @click="navTo('/pages/search/search')">搜索</view>
			</view>

			<!-- 头部轮播 -->
			<view class="carousel-section">
				<swiper indicator-active-color="rgba(255,255,255,1)" autoplay="true" interval="5000" duration="1500" class="carousel" circular indicator-dots>
					<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navTo('/pages/detail/guessList')">
						<image :src="item.src" class="bannar-image" />
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!--分类-->
		<view class="sort-section">
			<view class="sort-items">
				<scroll-view class="typetitleTab" scroll-x="true">
					<view class="sort-item-box" v-for="(item, index) in sortList" :key="index">
					    <view class="sort-item" @click="sortDetails">
						    {{item}}
					    </view>
					    <view class="sort-item-line">|</view>
					</view>
				</scroll-view>
			</view>
			<view class="sort-rank">
				<view class="sort-rank-img-box" @click="hides()">
				    <image class="sort-rank-img" src="/static/icon/icon-rank.png"></image>
				</view>
				<view class="sort-rank-item" :class="hide">
					<image class="sort-rank-item-bg" mode="widthFix" src="/static/icon/sort-rank-bg.png"></image>
					<view class="sort-rank-item-box">
						<view class="sort-rank-list-item" v-for="(item, index) in rankData" :key="index">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="guess-section">
			<view class="guess-item" v-for="(item, index) in goodsList" :key="index" @click="navTo('/pages/detail/detail')">
				 <ai-gusee-card :data="item"></ai-gusee-card>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog type="input" title="登录过期" content="请重新登录" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import aiGuseeCard from '@/components/ai-guess-card.vue'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			aiGuseeCard,
			uniPopUp,
			uniPopupDialog
		},
		data() {
			return {
				sortList: ["推荐", "食品", "美妆", "母婴", "女装", "男装"],
				rankData: [
					{
						id: "update",
						title: "上新排序",
					},
					{
						id: "brokerage",
						title: "佣金排序"
					},
					{
						id: "priceUp",
						title: "价格升序"
					},
					{
						id: "priceDown",
						title: "价格降序"
					}
				],
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				background: {
				    background: 'url(/static/img/bg-01.png)',
				},
				navigateFlag: false,
				hide: null,
			};
		},

		onLoad() {
			this.loadData();
		},
		onReady(){
			this.reLogin()
		},
		methods: {
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			close(done){
			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
			    done() 
			},
			confirm(done,value){
			    this.$global.navTo('/pages/login/login')
			},
			//推荐栏请求，用于模拟数据，可以删除
			async loadData() {
				let carouselList = await this.$deleteApi.json('carouselList');
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				let goodsList = await this.$deleteApi.json('goodsListOne');
				this.goodsList = goodsList || [];
			},
			
			//其他栏请求，用于模拟数据，可以删除
			async sortDetails() {
				this.goodsList = await this.$deleteApi.json('goodsListTwo');
				console.log(this.goodsList)
			},
			
			//跳转
			navTo(url) {
				this.$global.navTo(url)
			},
			
			//进入页面检查token，token过期弹出重新登录
			async reLogin() {
					//let userInfo = uni.getStorageSync('userInfo') || '';
				let userToken = uni.getStorageSync('token')
				let checkToken = await this.$api.checkToken(userToken)
				if(checkToken){
					this.$refs.popup.open()
				}
			},
			hides(){
				if(this.hide == "show"){
					this.hide = "null"
					console.log(1, this.hide)
				}else {
					this.hide = "show"
					console.log(2, this.hide)
				}
				console.log(this.hide)
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: rgba(249, 249, 249, 1);
	}
	.head{
		height: 430rpx;
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
			height: 90rpx;
			width: 690rpx;
			margin: 0 auto;
			.search-one {
				display: inline-block;
				position: relative;
				z-index: 4;
				width: 550rpx;
				height: 70rpx;
				background:rgba(255,255,255,1);
				box-shadow:0px 4px 15px 0px rgba(153,153,153,0.24);
				border-radius:35px;
				opacity:0.19;
				.search-icon {
					display: inline-block;
					margin: 0 20rpx 0 30rpx;
					width: 24rpx;
					height: 24rpx;
				}
				.search-content {
					height: 70rpx;
					line-height: 70rpx;
					display: inline-block;
					font-size: 15px;
				}
			}
			.search-two {
				display: inline-block;
				width: 120rpx;
				height: 70rpx;
				font-size: 15px;
				margin: 0 0 0 20rpx;
				line-height: 70rpx;
				text-align: center;
				border-radius:35px;
				box-shadow:0px 4px 15px 0px rgba(153,153,153,0.24);
				background:rgba(255,255,255,1);
				opacity:0.19;
			}
		}
	}

	.carousel-section {
		clear: both;
		width: 100%;
		margin-top: 20rpx;
		height: 300rpx;

		.carousel {
			width: 100% !important;
			height: 300rpx !important;

			.swiper-item {
				width: 100% !important;
				height: 300rpx !important;
				border-radius: 16rpx;

			}
		}

		/deep/ .bannar-image {
			width: 92% !important;
			height: 300rpx !important;
			border-radius: 16rpx;
			margin: 0 auto;
			display: block;
		}

	}

	.sort-section {
		margin-top: 40rpx;
		width: 100%;
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 1);
		.sort-items {
			height: 90rpx;
			flex-grow: 1;
			display: inline-block;
			.typetitleTab {
				width: 670rpx;
				padding: 0 10rpx 0 50rpx;
				white-space: nowrap;
				margin: 0 auto;
				text-align: center;
				.sort-item-box {
					display: inline-block;
					.sort-item {
						display: inline-block;
						width: 120rpx;
						height: 90rpx;
						line-height: 90rpx;
						text-align: center;
						font-size: 16px;
					}
					.sort-item-line {
						display: inline-block;
						color: rgba(229,229,229,1);
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
				width: 80rpx;
				padding: 0 30rpx 0 0;
				text-align: center;
				.sort-rank-img {
					width: 19rpx;
					height: 28rpx;
				}
			}
			.sort-rank-item {
				position: absolute;
				width: 240rpx;
				height: 350rpx;
				display: none;
				right: -5rpx;
				top: 25rpx;
				.sort-rank-item-bg {
					width: 240rpx;
					position: absolute !important;
				}
				.sort-rank-item-box {
					position: relative;
					z-index: 10;
					width: 120rpx;
					margin: 80rpx auto 0;
					.sort-rank-list-item {
						width: 104rpx;
						text-align: center;
						font-size: 12px;
						color:rgba(51,51,51,1);
						padding: 0rpx 0 9rpx 0;
						margin: 18rpx 0 0 0;
					}
				}
			}
			.show {
				display: inline-block;
			}
		}
	}
	
	.guess-section {
		width: 690rpx;
		margin: 20rpx auto 0;
		.guess-item {
			margin: 26rpx 0 0 0;
		}
	}

</style>
