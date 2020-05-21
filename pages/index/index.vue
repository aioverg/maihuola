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
					<view class="sort-item-box" v-for="(item, index) in sortList" :key="index" @click="getGuess(item.id)">
					    <view class="sort-item" :class="sortId-1 ==index?'red':''">
						    <view class="sort-item-bottom" :class="sortId-1 ==index?'sort-bottom':''"></view>
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
				<view class="sort-rank-item" :class="hide">
					<image class="sort-rank-item-bg" mode="widthFix" src="/static/icon/sort-rank-bg.png"></image>
					<view class="sort-rank-item-box">
						<view class="sort-rank-list-item" :class="rankId==index?'blue':''" v-for="(item, index) in rankData" @click="selectRank(index)" :key="index">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="guess-section">
			<view class="guess-item" v-for="(item, index) in goodsList" :key="index" @click="navTo('/pages/detail/detail?goods_id=' + item.id)">
				<ai-gusee-card :recommend="item.is_recommend" :data="item"></ai-gusee-card>
			</view>
		</view>
		<!--登录过期提示，需要时再加
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog type="input" title="登录过期" content="请重新登录" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		-->
		<view class="login-box" v-if="loginBox">
			<ai-login></ai-login>
		</view>
		<uni-load-more :status="uniLoadMoreStatus"></uni-load-more>
	</view>
</template>

<script>
	import aiGuseeCard from '@/components/ai-guess-card.vue'
	//import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	//import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import aiLogin from '@/components/ai-login.vue'
	export default {
		components: {
			aiGuseeCard,
			//uniPopUp,
			//uniPopupDialog,
			aiLogin
		},
		data() {
			return {
				sortList: ["推荐", "食品", "美妆", "母婴", "女装", "男装"],
				sortId: 1,
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
				rankId: 0,
				carouselList: [],
				goodsList: [],
				goodsListPage: 1,
				goodsListLastPage: 1,
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				hide: null,
				blue: null,
				loginBox: false,
				id: 1,
				uniLoadMoreStatus: "more",
				current: 0,
			};
		},
		onLoad() {
			this.getCarousel()
			this.getGuessSort()
			this.getGuess(this.sortId)
		},
		onReady(){
			
		},
		onShow(){
			this.login()
		},
		onReachBottom(){
			this.getGuess(this.sortId)
		},
		methods: {
			change(e) {
			            this.current = e.detail.current;
			        },
			//获取轮播图数据
			getCarousel(){
				console.log("轮播图")
				this.$api.getCarousel({
					code: "Index.Banner"
				}).then( res => {
					this.carouselList = res.data.data
				})
			},
			//轮播图跳转
			navToCarousel(typeId, id){
				if(typeId.indexOf(",") == -1){
					this.$global.navTo('/pages/detail/detail?goods_id=' + id)
				}else{
					this.$global.navTo('/pages/detail/guessList?goods_id=' + id)
				}
			},
			
			//获取商品分类列表
			getGuessSort(){
				this.$api.getGuessSort().then( res =>
				    this.sortList = res.data.data
				)
			},
			//获取商品
			getGuess(id){
				console.log(8888)
				if(this.sortId != id){
					this.goodsList = []
					this.sortId = id
					this.goodsListPage = 1
				}
				if(this.goodsListPage > this.goodsListLastPage){
					this.uniLoadMoreStatus = "noMore"
					return
				}
				this.uniLoadMoreStatus = "loading"
				this.$api.getSearchGuess({
					category_id: id,
					limit: 5,
					page: this.goodsListPage
				}).then( res => {
					if(res.data.data.last_page <= 0){
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
			},
			//跳转
			navTo(url) {
				this.$global.navTo(url)
			},
			hides(){
				if(this.hide == "show"){
					this.hide = "null"
				}else {
					this.hide = "show"
				}
			},
			selectRank(index) {
			    this.rankId = index;
				this.hide = "null"
			},
			login(){
				if(!this.$store.state.hasLogin){
					this.loginBox = true
				}
			}
			/*登录过期提示框的选择函数，需要时再加
			async reLogin() { //进入页面检查token，token过期弹出重新登录
				//let userInfo = uni.getStorageSync('userInfo') || '';
				//this.$store.commit()
				if(!this.$store.state.usertoken){
					this.loginBox = true
					return
				}
			},
			confirm(done,value){
			    this.$global.navTo('/pages/login/login')
			},
			close(done){
			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
			    uni.removeStorage({
					key: 'token',
					success: function () {
					    this.loginBox = true
					}
				})
			    done() 
			},
			*/
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
				background:rgba(255,255,255,1);
				box-shadow:0px 4px 15px 0px rgba(153,153,153,0.24);
				border-radius:35px;
				opacity:0.19;
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
				}
			}
			.search-two {
				display: inline-block;
				width: 60px;
				height: 35px;
				font-size: 15px;
				margin: 0 0 0 10px;
				line-height: 35px;
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
				padding: 0 5px 0 25px;
				white-space: nowrap;
				margin: 0 auto;
				text-align: center;
				.sort-item-box {
					display: inline-block;
					.sort-item {
						position: relative;
						display: inline-block;
						width: 120rpx;
						height: 45px;
						line-height: 45px;
						text-align: center;
						font-size: 16px;
						.sort-item-bottom {
							position: absolute;
							
							width: 20px;
							left: 12px;
							height: 36px;
						}
					}
					.sort-bottom {
						border-bottom: 2px solid rgba(244,122,115,1);
					}
					.red {
						color:rgba(244,122,115,1);
						font-weight: 500;
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
				display: none;
				right: -2px;
				top: 12px;
				.sort-rank-item-bg {
					width: 120px;
					position: absolute !important;
				}
				.sort-rank-item-box {
					position: relative;
					z-index: 0;
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
