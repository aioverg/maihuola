<template>
	<view>
		<!--登录-->
		<view v-if="!loginState" class="loginmm" style="padding: 80px 0 0 0;">
			<ai-phone-login hintBottom="80" jumpUrl="/pages/index/index?tabId=2"></ai-phone-login>
		</view>
		
		<!--我的-->
		<view v-if="loginState">
			<!--顶部-->
			<uni-nav-bar fixed="true" backgroundImg="/static/icon/navbar-bg-01.png">
				<block slot="right">
					<view v-if="false" class="message-box" style="width: 20px; position: relative;">
						<image style="width: 20px;" mode="widthFix" src="/static/icon/message01.png"></image>
						<text class="message-hint"></text>
					</view>
				</block>
			</uni-nav-bar>
			<view style="position: absolute;">
				<image class="" style="position: fixed; width: 750rpx;" class="bg" src="/static/icon/bg-user-01.png" mode="widthFix"></image>
			</view>
			<!--账户信息账户余额-->
			<view class="user-section">
				<view class="user-info-box">
					<view class="portrait-box">
						<image class="portrait" :src="portrait"></image>
					</view>
					<view class="info-box">
						<view class="info-box-user-name">{{userInfo.username}}</view>
						<view class="info-box-user-id">账户ID:{{userInfo.id}}</view>
					</view>
					<image :src="userMark" style="height: 20px; margin: 32px 0 0; opacity: 1; padding: 0 20px 0 0;" mode="aspectFit"></image>
				</view>
			
				<view class="estimate">
					<view class="estimate-item-box">
						<view class="num">{{userInfo.today_commission}}</view>
						<!-- <view class="num">{{curEar}}</view> -->
						<view class="title">今日预估（元）</view>
					</view>
					<view class="estimate-item-box">
						<view class="num">{{userInfo.yestoday_commission}}</view>
						<!-- <view class="num">{{prevEar}}</view> -->
						<view class="title">昨日预估（元）</view>
					</view>
					<view class="estimate-item-box">
						<view class="num">{{userInfo.cur_month_commission}}</view>
						<!-- <view class="num">{{prevEar}}</view> -->
						<view class="title">本月预估（元）</view>
					</view>
				</view>
				<view class="money-card">
					<image class="card-bg" src="/static/icon/bg-user-02.png"></image>
					<view class="balance">
						<view class="title">账户余额（元）：</view>
						<view class="num">{{userInfo.balance}}</view>
						<!-- <view class="num">{{blance}}</view> -->
						<view class="cash" @click="withdraw">提现</view>
					</view>
					<view class="money-hint">每月25号可提现上月订单结算收益</view>
				</view>
			</view>

			<!--藏品收益订单团队-->
			<view class="project">
				<view style="position: absolute;">
					<image class="project-bg" src="/static/icon/bg-user-03.png" mode="widthFix"></image>
				</view>
				<view class="project-box">
					<view class="project-item" @click="navTo('/pages/detail/collect')">
						<image class="project-item-icon" src="/static/icon/start-02.png"></image>
						<view class="project-item-name">藏品</view>
					</view>
					<view class="project-item" @click="navTo('/pages/userinfo/earn')">
						<image class="project-item-icon" src="/static/icon/coin-01.png"></image>
						<view class="project-item-name">收益</view>
					</view>
					<view class="project-item" @click="navTo('/pages/userinfo/order')">
						<image class="project-item-icon" src="/static/icon/text-01.png"></image>
						<view class="project-item-name">订单</view>
					</view>
					<!--下一版本内容
					<view class="project-item">
						<image class="project-item-icon" src="/static/icon/people-01.png"></image>
						<view class="project-item-name">团队</view>
					</view>
					-->
				</view>
			</view>

			<view class="list-card">
				<view class="message">
					<view class="list-box" @click="navTo('/pages/account/index')" style="padding: 0 30rpx;">
						<ai-list-cell title="账户安全" dashed="dashed" message="手机号、淘宝授权"></ai-list-cell>
					</view>
					<view class="list-box" @click="navTo('/pages/help/index')">
						<ai-list-cell title="我要帮助" dashed="dashed"></ai-list-cell>
					</view>
					<view class="list-box" @click="navTo('/pages/feedback/feedback')">
						<ai-list-cell title="意见反馈" dashed="dashed"></ai-list-cell>
					</view>
					<view class="list-box" @click="navTo('/pages/about/index')">
						<ai-list-cell title="关于我们"></ai-list-cell>
					</view>
				</view>
				<view class="loginout">
					<view class="list-box" @click="logout" style="padding: 0 30rpx;">
						<ai-list-cell title="退出账户"></ai-list-cell>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popupDialog" type="dialog">
		    <uni-popup-dialog type="err" title="退出账户" content="退出后不会删除任何历史数据，下次登录依然可以使用本账号"  @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<!-- <mix-loading v-show="refresh"></mix-loading> -->
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	import aiListCell from '@/components/ai-list-cell'
	import aiPhoneLogin from '@/components/ai-login/ai-phone-login.vue'
	import {apkDownload} from '@/static/js/appUpdate.js'
	export default {
		components: {
			uniPopupDialog,
			mixLoading,
			aiListCell,
			aiPhoneLogin
		},
		data() {
			return {
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				navTitle: null,
				portrait: '/static/img/icon-portrait-01.png',
				userMark: null,
				// refresh: false,
				downRefreshFlag: true,
				userInfo: {}
			}
		},
		computed: {
			loginState() {
				if (this.$store.state.hasLogin) {
					this.navTitle = "我的"
				} else {
					this.navTitle = "手机登录"
				}
				return this.$store.state.hasLogin
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			navTo(url) {
				this.$aiRouter.navTo(url)
			},
			login() {
				//console.log(微信登录)
			},
			getUserInfo() {
				return this.$api.getUserCenter().then(res => {
					this.userInfo = res.data.data
					if(res.data.data.level == 3){
						this.userMark = '/static/icon/user-mark-03.png'
					}else if(res.data.data.level == 4){
						this.userMark = '/static/icon/user-mark-04.png'
					}else if(res.data.data.level == 8){
						this.userMark = '/static/icon/user-mark-08.png'
					}else{
						this.userMark = null
					}
					this.$store.commit("setUserInfoES", res.data.data)
					return true
				})
			},
			withdraw() {
				if (this.userInfo.alipay) {
					this.$aiRouter.navTo('/pages/withdraw/withdraw?total=' + this.userInfo.balance)
				} else {
					this.$aiRouter.navTo('/pages/account/bindAlipay?navbartitle=绑定支付宝')
				}
			},
			logout() {
				this.$refs.popupDialog.open()
			},
			close(done) {
				done()
			},
			confirm(done) {
				this.$store.commit("logout")
				this.$emit("changeTabbar", 0)
				done()
			},

			//组件加载时运行的函数
			pageOnload() {
				this.getUserInfo()
				console.log("加载 我的 页面，可以把网络请求放这里")
			},
			//页面下拉时刷新组件
			pageRefresh() {
				const _this = this
				// _this.refresh = true
				if(!_this.downRefreshFlag){return}
				_this.downRefreshFlag = false
				uni.startPullDownRefresh({
					success: function() {
						_this.getUserInfo().then(res => {
							if(res){
								// _this.refresh = false
								_this.downRefreshFlag = true
								uni.stopPullDownRefresh()
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	/*定义css变量，暂时没有用到*/
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	page {
		background: #FFFFFF;
	}

	/*顶部导航栏*/
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

	.img-box {
		width: 750rpx;
		text-align: center;

		.img {
			display: inline-block;
			width: 286rpx;
			height: 286rpx;
			margin: 88px auto;
		}
	}

	.to-phone {
		margin: 26px 0 101rpx 0;
		text-align: center;
		font-size: 13px;
		color: #CCCCCC;
		height: 37px;
		text-decoration-line: underline;
	}

	.note {
		margin: 0 0 50px 0;
	}


	/*账户信息、账户余额*/
	.user-section {
		height: 178px;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: -80px;
			width: 100%;

		}

		.user-info-box {
			height: 70px;
			display: flex;
			align-items: center;
			position: relative;
			z-index: 1;

			.portrait {
				width: 70px;
				height: 70px;
				margin: 0 0 0 50rpx;
				border-radius: 50%;
			}

			.info-box {
				margin: 0 0 0 30rpx;

				.info-box-user-name {
					font-size: 17px;
					margin: 0 0 5px 0;
				}

				.info-box-user-id {
					font-size: 14px;
				}
			}
		}

		.estimate {
			position: relative;
			height: 65px;
			width: 750rpx;
			padding: 0 15px;
			margin: 5px 0 0;
			display: flex;
			justify-content: space-around;

			.estimate-item-box {
				.num {
					overflow-x: hidden;
					text-overflow: ellipsis;
					font-size: 16px;
					font-weight: 600;
					color: #333333;
					text-align: center;
				}

				.title {
					margin: 6px 0 0 0;
					font-size: 12px;
					color: #666666;
				}
			}
		}

		.money-card {
			width: 750rpx;
			height: 49px;
			padding: 5px 15px 0;
			position: relative;

			.card-bg {
				position: absolute;
				width: 750rpx;
				height: 148px;
				top: -30px;
				left: 0;
			}

			.balance {
				position: relative;
				display: flex;
				align-items: center;
				padding: 0 30rpx;

				.title {
					min-width: 120px;
					font-size: 15px;
					color: rgba(255, 255, 255, 0.8);
				}

				.num {
					flex-grow: 1;
					overflow-x: hidden;
					min-width: 100px;
					margin: 0 10px 0 0;
					text-overflow: ellipsis;
					font-size: 20px;
					font-weight: bold;
					color: rgba(255, 255, 255, 0.8);
				}

				.cash {
					display: inline-block;
					width: 60px;
					height: 26px;
					border-radius: 14px;
					border: 1px solid rgba(255, 255, 255, 0.8);
					line-height: 24px;
					text-align: center;
					font-size: 12px;
					color: rgba(255, 255, 255, 0.8);
					position: relative;
					top: 10px;

				}
			}

			.money-hint {
				position: relative;
				font-size: 12px;
				height: 19px;
				line-height: 20px;
				margin: 0 0 0 30rpx;
				color: rgba(255, 255, 255, 0.6);
			}
		}
	}

	/*藏品 收益订单团队*/
	.project {
		position: relative;
		width: 750rpx;
		height: 110px;
		margin: 5px 0 0 0;

		.project-bg {
			position: absolute;
			width: 750rpx
		}

		.project-box {
			position: relative;
			top: 45px;
			width: 750rpx;
			padding: 0 100rpx;
			display: flex;
			justify-content: space-between;

			.project-item {
				position: relative;
				width: 67px;
				height: 75px;
				background-color: #FFFFFF;
				box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
				border-radius: 8px;

				.project-item-icon {
					width: 27px;
					height: 26px;
					margin: 15px 20px 0;
				}

				.project-item-name {
					font-size: 12px;
					text-align: center;
				}
			}
		}
	}





	.list-card {
		height: 350px;
		width: 690rpx;
		margin: 0 auto;
		position: relative;

		.list-box {
			font-size: 15px;
			height: 45px;
			padding: 0 15px;
		}

		.message {
			margin: 30px 0 0 0;
			border-radius: 8px;
			background: #FFFFFF;
			box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		}

		.loginout {
			margin: 10px 0 0 0;
			border-radius: 8px;
			background: #FFFFFF;
			box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		}
	}
</style>
