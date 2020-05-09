<template>
	<view>
		<view class="head">
			<image class="bg" src="/static/bg-06.png"></image>
			<view class="head-title">选品</view>
			<view class="search">
				<view class="search-one">
					<image class="search-icon" src="../../static/ai-search04.png"></image>
					
					<view class="search-content">搜索你需要的商品关键词</view>
				</view>
				<view class="search-two">搜索</view>
			</view>

			<!-- 头部轮播 -->
			<view class="carousel-section">
				<swiper indicator-active-color="rgba(255,255,255,1)" autoplay="true" interval="5000" duration="1500" class="carousel" circular indicator-dots>
					<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToSwiperPage">
						<image :src="item.src" class="bannar-image" />
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!--分类-->
		<view class="sort-section">
			<view class="sort-items">
				<scroll-view class="typetitleTab" scroll-x="true">
					<view class="sort-item" v-for="(item, index) in sortList" :key="index" @click="sortDetails">
						{{item}}
					</view>
				</scroll-view>
				<view class="sort-item" v-for="(item, index) in sortList" :key="index" @click="sortDetails">
				</view>
			</view>
		</view>
		<view class="guess-section">
			<view class="guess-item" v-for="(item, index) in goodsList" :key="index" @click="navToDetailPage(item)">
				<view class="guess-image-box">
					<image class="guess-image" :src="item.image" mode="aspectFill"></image>
				</view>
				<view class="guess-info-fox">
					<view class="info">{{item.title}}</view>
					<view class="price">
						<view class="zb-price">￥直播价：{{item.zbprice}}</view>
						<view class="sc-price">￥市场价：{{item.scprice}}</view>
					</view>
					<view class="rate">
						<view class="ck-earn">参考收益{{item.earnings}}</view>
						<view class="yj-rate">佣金比例{{item.ratio}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortList: ["推荐", "食品", "美妆", "母婴", "女装", "男装"],
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				background: {
				    background: 'url(/static/bg-01.png)',
				}
			};
		},

		onLoad() {
			this.loadData();
		},
		methods: {
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				let carouselList = await this.$api.json('carouselList');
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				let goodsList = await this.$api.json('goodsListOne');
				this.goodsList = goodsList || [];
			},
			async sortDetails() {
				this.goodsList = await this.$api.json('goodsListTwo');
				console.log(this.goodsList)
			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/detail/detail`
				})
			},
			//轮播图跳转
			navToSwiperPage() {
				uni.navigateTo({
					url: `/pages/detail/guessList`
				})
			},
			//详情页
			navToSearchPage() {
				uni.navigateTo({
					url: `/pages/search/search`
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: rgba(249, 249, 249, 1);
	}
	.head{
		height: 500rpx;
		padding: 30px 0 0 0;
		position: relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
		.head-title {
			position: relative;
			margin: 0 0 20px 0;
			z-index: 2;
			font-size: 36rpx;
			text-align: center;
			font-weight: 500;
			color: rgba(255,255,255,1);
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
					position: relative;
					margin: 0 20rpx 0 30rpx;
					z-index: 4;
					width: 24rpx;
					height: 24rpx;
				}
				.search-content {
					height: 70rpx;
					line-height: 70rpx;
					display: inline-block;
					font-size: 30rpx;
				}
			}
			.search-two {
				display: inline-block;
				width: 120rpx;
				height: 70rpx;
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
		margin-top: 90rpx;
		width: 100%;

		.sort-items {
			width: 100%;
			height: 90rpx;
			background: rgba(255, 255, 255, 1);

			.typetitleTab {
				width: 680rpx;
				white-space: nowrap;
				margin: 0 auto;
				text-align: center;
				.sort-item {
					display: inline-block;
					width: 124rpx;
					height: 90rpx;
					line-height: 90rpx;
					text-align: center;
					font-size: 36rpx;
				}
			}
		}
	}
	
	.guess-section {
		width: 690rpx;
		margin: 20rpx auto 0;
		.guess-item {
			display: flex;
			margin: 26rpx 0 0 0;
			width: 690rpx;
			height: 280rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 16rpx;
			.guess-image-box {
				width: 240rpx;
				height: 240rpx;
				margin: 20rpx;
				.guess-image {
					width: 240rpx;
					height: 240rpx;
					border-radius: 16rpx;
				}
			}
			.guess-info-fox {
				margin: 20rpx 32rpx 40rpx 0;
				.info {
					width:378rpx;
					height:130rpx;
					overflow: hidden;
					font-size:30rpx;
					overflow: hidden;
					color:rgba(51,51,51,1);
					
				}
				.price {
					width:200rpx;
					height: 210rpx;
					display: inline-block;
					.zb-price {
						display: inline-block;
						margin: 0 18rpx 0 0;
						font-size:26rpx;
						color:rgba(255,51,51,1);
					}
					.sc-price {
						display: inline-block;
						font-size:22rpx;
						color:rgba(153,153,153,1);
						
					}
				}
				.rate {
					width:170rpx;
					height: 210rpx;
					margin: 0 0 40rpx 0;
					display: inline-block;
					.ck-earn {
						display: inline-block;
						font-size:26rpx;
						color:rgba(255,51,51,1);
					}
					.yj-rate {
						display: inline-block;
						font-size:22rpx;
						color:rgba(153,153,153,1);
					}
				}
			}
		}
	}

</style>
