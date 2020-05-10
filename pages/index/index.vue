<template>
	<view>
		<view class="head">
			<image class="bg" src="/static/img/bg-06.png"></image>
			<view class="head-title">选品</view>
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
					<view class="sort-item" v-for="(item, index) in sortList" :key="index" @click="sortDetails">
						{{item}}
					</view>
				</scroll-view>
				<view class="sort-item" v-for="(item, index) in sortList" :key="index" @click="sortDetails">
				</view>
			</view>
		</view>
		<view class="guess-section">
			<view class="guess-item" v-for="(item, index) in goodsList" :key="index" @click="navTo('/pages/detail/detail')">
				 <ai-gusee-card :data="item"></ai-gusee-card>
			</view>
		</view>
		<u-modal v-model="show" show-cancel-button @confirm="navToLogin"></u-modal>
	</view>
</template>

<script>
	import aiGuseeCard from '@/components/ai-guess-card.vue'
	export default {
		components: {
			aiGuseeCard
		},
		data() {
			return {
				sortList: ["推荐", "食品", "美妆", "母婴", "女装", "男装"],
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				show: false,
				background: {
				    background: 'url(/static/img/bg-01.png)',
				}
			};
		},

		onLoad() {
			this.loadData();
		},
		onReady(){
			this.open()
		},
		methods: {
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				let carouselList = await this.$deleteApi.json('carouselList');
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				let goodsList = await this.$deleteApi.json('goodsListOne');
				this.goodsList = goodsList || [];
			},
			async sortDetails() {
				this.goodsList = await this.$deleteApi.json('goodsListTwo');
				console.log(this.goodsList)
			},
			//跳转
			navTo(obj) {
				this.$global.navTo(obj)
			},
			async open() {
					//let userInfo = uni.getStorageSync('userInfo') || '';
				let userToken = uni.getStorageSync('token')
				let checkToken = await this.$api.checkToken(userToken)
				console.log("true", checkToken)
				if(checkToken){
					//this.$store.commit('tokenDue')
					//console.log("false",this.$store.state.tokenDue)
					this.show = false;
				}
			},
			navToLogin(){
				console.log(6666666)
				this.$global.navTo('/pages/login/login')
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
			margin: 26rpx 0 0 0;
		}
	}

</style>
