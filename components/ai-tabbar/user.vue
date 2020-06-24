<template>
	<view>
		<view v-if="false">
			<view class="img-box">
				<image class="img" src="/static/img/icon-mhl-01.png"></image>
			</view>
			<view @click="login">
				<ai-button btname="微信登录" iconSrc="/static/icon/icon-wx.png"></ai-button>
			</view>
			<view class="to-phone" @click="navTo('/pages/login/loginPhone')">
				或手机快速登录
			</view>
			<view class="note">
				<ai-login-hint></ai-login-hint>
			</view>
		</view>

		<view v-if="!loginState" class="loginmm">
			<view>
				<uni-nav-bar fixed="true">
					<block slot="left">
					    <view style="font-size: 20px; font-weight:bold;">登录</view>
					</block>
				</uni-nav-bar>
				<view class="img-box">
					<image class="img" src="/static/img/icon-mhl-01.png"></image>
				</view>
				<view>
					<view class="phone-box">
						<image class="phone-icon" mode="widthFix" src="/static/icon/icon-phone.png"></image>
						<view class="phone-area">+86</view>
						<input class="phone-input" type="number" v-model="phone" placeholder="请输入手机号码" />
					</view>
					<view class="code-box">
						<view class="code-input-box">
							<image class="code-icon" mode="widthFix" src="/static/icon/icon-dialog.png"></image>
							<input class="code-input" type="number" v-model="code" placeholder="请输入验证码" />
						</view>
						<view class="code-button" @click="getCode">{{times}}{{btName}}</view>
					</view>
					<view class="login-button">
						<ai-button btname="登录" @eventClick="login"></ai-button>
					</view>
				</view>
				<view class="note">
					<ai-login-hint></ai-login-hint>
				</view>
				<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
			</view>
		</view>

		<view v-if="loginState">
			<!--顶部-->
			<uni-nav-bar fixed="true" backgroundImg="/static/icon/navbar-bg-01.png">
				<block slot="right">
					<view class="message-box" style="width: 20px; position: relative;" >
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
				<!--<image class="bg" style="z-index: 1010;" src="/static/icon/bg-user-01.png" mode="widthFix"></image>-->
				<view class="user-info-box">
					<view class="portrait-box">
						<image class="portrait" :src="portrait"></image>
					</view>
					<view class="info-box">
						<view class="info-box-user-name">{{userName}}</view>
						<view class="info-box-user-id">{{userId}}</view>
					</view>
					<view class="info-user-mark">
						<image class="info-user-mark-icon" src="/static/icon/icon-mark-01.png"></image>
					</view>
				</view>
				<view class="estimate">
					<view class="estimate-item-box">
						<view class="num">{{curEar}}</view>
						<view class="title">今日预估（元）</view>
					</view>
					<view class="estimate-item-box">
						<view class="num">{{prevEar}}</view>
						<view class="title">昨日预估（元）</view>
					</view>
					<view class="estimate-item-box">
						<view class="num">{{prevEar}}</view>
						<view class="title">本月预估（元）</view>
					</view>
				</view>
				<view class="money-card">
					<image class="card-bg" src="/static/icon/bg-user-02.png"></image>
					<view class="balance">
						<view class="title">账户余额（元）：</view>
						<view class="num">{{blance}}</view>
						<view class="cash" @click="withdraw">
								提现
						</view>
					</view>
					<view class="money-hint">每月25号可提现上月结算收益</view>
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
						<ai-list-cell title="账户安全" dashed="dashed" message="手机号、微信号、淘宝授权"></ai-list-cell>
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
		<mix-loading v-show="refresh"></mix-loading>
	</view>
</template>

<script>
	
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	import aiListCell from '@/components/ai-list-cell'
	import aiLoginHint from '@/components/ai-login-hint.vue'
	import {apkDownload} from '@/static/js/appUpdate.js'
	export default{
		components: {
			
			mixLoading,
			aiListCell,
			aiLoginHint
		},
		data() {
			return {
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				navTitle: null,
				portrait: '/static/img/icon-portrait-01.png',
				userName: null,
				userId: null,
				blance: null,
				curEar: "null",
				prevEar: "null",
				noLogin: false,
				yesLogin: false,
				alipay: false,
				refresh: false,
		
		
				//登录登录录登录录登录
				phone: null,
				code: null,
				btName: "获取验证码",
				times: null,
				timeRun: false,
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				pageId: null,
				pageParams: null,
				run: true
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
		onPullDownRefresh() {
			const _this = this
			_this.refresh = true
			uni.startPullDownRefresh({
				success: function() {
					_this.getUserInfo().then(res => {
						_this.refresh = false
						uni.stopPullDownRefresh()
					})
				}
			})
		},
		methods: {
			navTo(url) {
				this.$aiRouter.navTo(url)
			},
			login() {
				console.log(微信登录)
			},
			getUserInfo() {
				return this.$api.getUserCenter().then(res => {
					this.blance = res.data.data.balance
					this.curEar = res.data.data.cur_month_commission
					this.prevEar = res.data.data.prev_month_commission
					this.userName = res.data.data.username
					this.userId = "账户ID:" + res.data.data.id
					this.alipay = res.data.data.alipay
					return true
				})
			},
			withdraw() {
				if (this.alipay) {
					this.$aiRouter.navTo('/pages/withdraw/withdraw?total=' + this.blance)
				} else {
					this.$aiRouter.navTo('/pages/account/bindAlipay?navbartitle=绑定支付宝')
				}
			},
			logout() {
				this.$store.commit("logout")
				this.$aiRouter.navTo("/pages/index/index")
			},
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框 
				done()
			},
			confirm(done) {
				apkDownload(this.$store.state.appInfo.appLink)
				done()
			},
			
			
			
			//登陆登录
			aiPopupMessage(type, content) {
				if (!this.run) {
					return
				}
				this.run = false
				this.$refs.aiPopupMessage.open({
					type: type,
					content: content,
					timeout: 1500,
					isClick: false
				})
				setTimeout(() => {
					this.run = true
				}, 2000)
			},
			getCode() {
				if (this.phone % 1 == 0 && this.phone.length == 11) {
					this.$api.getPhoneCode({
						phone: this.phone
					}).then(res => {
						if (res.data.code !== 0) {
							this.aiPopupMessage("err", "获取验证码过于频繁")
							return
						}
						if (res.data.code == 0) {
							if (this.timeRun) {
								return
							}
							this.aiPopupMessage("success", "验证码已发送")
							this.timeRun = true
							this.times = 60
							this.btName = "s重新发送"
							let timer = setInterval(() => {
								if (this.times == 1) {
									clearInterval(timer)
									this.timeRun = false
									this.times = null
									this.btName = "获取验证码"
									return
								}
								this.times -= 1
							}, 1000)
						}
					})
				} else {
					this.aiPopupMessage("err", "手机号码错误")
				}
			},
			login() {
				if (this.phone % 1 !== 0 || this.phone.length !== 11) {
					this.aiPopupMessage("err", "手机号码错误")
					return
				}
				/*if(this.code & 1 !==0 || this.code.length !== 6){
					console.log(888888)
					this.$refs.aiPopupMessage.open({
						type:'err',
						content:'验证码错误',
						timeout:2000,
						isClick:false
					})
					return
				}*/
				this.$api.getChecktPhoneCode({
					terminal: this.$store.state.systemType,
					phone: this.phone,
					code: this.code
				}).then(res => {
					if (res.data.code == 0) {
						this.$store.commit("setUserInfo", res.data.data)
						if (this.pageId == 2) {
							this.$aiRouter.navTo('/pages/detail/detail?goods_id=' + this.pageParams)
						} else {
							this.$aiRouter.navTabBar('/pages/index/index')
						}
					} else {
						this.aiPopupMessage("err", "验证码错误")
					}
				})
				return
			},
			//组件加载时运行的函数
			pageShow(){
				this.getUserInfo()
				console.log("加载 我的 页面，可以把网络请求放这里")
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
		top: 25px;
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
				width: 60px;
				height: 60px;
				margin: 0 0 0 50rpx;
				border: 1px solid #fff;
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
			.info-user-mark {
				height: 60px;
				/*  #ifdef  APP-PLUS  */
				margin: 0 0 0 120rpx;
				/*  #endif  */
				/*  #ifdef  H5  */
				margin: 0 0 0 60rpx;
				/*  #endif  */
				.info-user-mark-icon {
					width: 69px;
					height: 22px;
					margin: 30px 0 0 0;
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
					justify-content: space-between;
					padding: 0 30rpx;
					.title {
						display: inline-block;
						width: 130px;
						font-size: 15px;
						color: rgba(255,255,255,0.8);
					}
					.num {
						display: inline-block;
						overflow-x: hidden;
						text-overflow: ellipsis;
						height: 25px;
						font-size: 20px;
						font-weight: bold;
						color: rgba(255,255,255,0.9);
					}
					.cash {
						display: inline-block;
						width: 60px;
						height: 26px;
						border-radius: 14px;
						border: 1px solid rgba(255,255,255,0.7);
						line-height: 24px;
						text-align: center;
						font-size: 12px;
						color: rgba(255,255,255,0.7);
					}
			}
			.money-hint {
				position: relative;
				font-size: 12px;
				height: 19px;
				line-height: 30px;
				margin: 0 0 0 30rpx;
				color: rgba(255,255,255,0.6);
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
				box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
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
			box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
		}

		.loginout {
			margin: 10px 0 0 0;
			border-radius: 8px;
			background: #FFFFFF;
			box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
		}
	}





	///等路过路过路过
	.loginmm {
		.img-box {
			width: 750rpx;
			text-align: center;

			.img {
				display: inline-block;
				width: 143px;
				height: 143px;
				margin: 38px auto 40px;
			}
		}

		.phone-box {
			display: flex;
			align-items: center;
			height: 32px;
			width: 650rpx;
			margin: 0 auto;
			border-bottom: 1px solid #CCCCCC;

			.phone-icon {
				width: 20px;
				display: inline-block;
			}

			.phone-area {
				display: inline-block;
				margin: 0 0 0 35px;
			}

			.phone-input {
				display: inline-block;
				margin: 0 0 0 13px;
				font-size: 17px;
			}
		}

		.code-box {
			display: flex;
			align-items: center;
			height: 40px;
			width: 650rpx;
			margin: 16px auto 0;

			.code-input-box {
				display: flex;
				height: 40px;
				align-items: center;
				border-bottom: 1px solid #CCCCCC;

				.code-icon {
					width: 20px;
					display: inline-block;
				}

				.code-input {
					display: inline-block;
					margin: 0 0 0 35px;
					font-size: 17px;
				}
			}

			.code-button {
				display: inline-block;
				width: 100px;
				height: 40px;
				text-align: center;
				background: #F47A73;
				border-radius: 22px;
				line-height: 40px;
				font-size: 14px;
				color: #FFFFFF;
			}
		}

		.login-button {
			margin: 40px 0 0 0;
		}

		.huo {
			visibility: hidden;
			width: 100%;
			text-align: center;
			font-size: 13px;
			color: #CCCCCC;
			height: 28px;
			margin: 26px 0 15px 0;
		}

		.wx-box {
			visibility: hidden;
			display: flex;
			align-items: center;
			justify-content: center;

			.wx-icon {
				display: inline-block;
				width: 35px;
			}

			.wx-bt {
				display: inline-block;
				font-size: 13px;
				color: #F47A73;
				margin: 0 0 0 5px;
			}
		}

		.note {
			margin: 50px 0 0 0;
		}
	}
</style>
