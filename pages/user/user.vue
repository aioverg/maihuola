<template>  
    <view>
		<ai-navbar
		    :title="navTitle"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
		/>
		
		<view v-if="!loginState">
			<view class="img-box">
				<image class="img" src="/static/img/ai-maihuola1.png"></image>
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
		
		<view v-if="loginState">
		<view class="user-section">
			<image class="bg" src="/static/img/bg-02.png" mode="widthFix"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="portrait"></image>
				</view>
				<view class="info-box">
					<view class="info-box-user-name">{{userName}}</view>
					<view class="info-box-user-id">{{userId}}</view>
				</view>
			</view>
			<view class="money-card">
				<image class="card-bg" src="/static/img/bg-03.png"></image>
				<view class="card-info">
					<view class="balance">
						<image class="icon" src="/static/icon/ai-coin.png"></image>
						<text class="title">余额（元）：</text>
						<text class="num">{{blance}}</text>
						<view class="cash" @click="withdraw">
							提现
						</view>
					</view>
					<view class="estimate">
						<view class="last">
							<view class="num">{{curEar}}</view>
							<view class="title">本月预估收入（元）</view>
						</view>
						<view class="next">
							<view class="num">{{prevEar}}</view>
							<view class="title">上月预估收入（元）</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="list-card">
			<!--账户安全-->
			<view class="account-safe list-box" @click="navTo('/pages/account/index')" style="padding: 0 30rpx;">
				<ai-list-cell title="账户安全" message="手机号、微信号、淘宝授权"></ai-list-cell>
			</view>

			<!-- 其它 -->
			<view class="message">
				<view class="list-box" @click="navTo('/pages/help/index')">
					<ai-list-cell title="我要帮助" dashed="dashed"></ai-list-cell>
				</view>
				<view class="list-box" @click="navTo('/pages/feedback/feedback')">
					<ai-list-cell title="意见反馈" dashed="dashed"></ai-list-cell>
				</view>
				<view class="list-box" @click="navTo('/pages/about/index')">
					<ai-list-cell title="关于我们" dashed="dashed"></ai-list-cell>
				</view>
				<view class="list-box" @click="updateApp">
					<ai-list-cell title="版本号" :message="updateMessage" aimessagecolor="ai-list-cell-message-red"></ai-list-cell>
				</view>
			</view>
			<view class="account-safe list-box" @click="logout" style="padding: 0 30rpx;">
				<ai-list-cell title="退出账户"></ai-list-cell>
			</view>
		</view>
		<uni-popup ref="popupAiDia" type="dialog">
		    <ai-popup-update :version="updateVersion" :content="updateContent"  popupbg="/static/img/bg-update.png" type="dialog" :cancel-show="true" :before-close="true" @close="close" @confirm="confirm"></ai-popup-update>
		</uni-popup>
		</view>
		<mix-loading v-show="refresh"></mix-loading>
    </view>  
</template>  
<script>
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	import aiListCell from '@/components/ai-list-cell'
	import aiButton from '@/components/ai-button'
	import aiLoginHint from '@/components/ai-login-hint.vue'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	import aiPopupUpdate from '@/components/uni-popup/ai-popup-update.vue'
	import {apkDownload} from '@/static/js/apUpdate.js'
    export default {
		components: {
			mixLoading,
			aiListCell,
			aiButton,
			aiLoginHint,
			uniPopUp,
			aiPopupUpdate
		},
		data(){
			return {
				navigateFlag: false ,//解决快速点击跳转，页面跳转多次问题
				navTitle: null,
				portrait: '/static/img/ai-default-user-icon.png',
				userName: null,
				userId: null,
				blance: null,
				curEar: null,
				prevEar: null,
				noLogin: false,
				yesLogin: false,
				alipay: false,
				refresh: false
			}
		},
		computed: {
			loginState(){
				if(this.$store.state.hasLogin){
					this.navTitle = "微信登录"
				}else{
					this.navTitle = "我的"
				}
				return this.$store.state.hasLogin
			},
			updateMessage(){
				if(this.$store.state.appInfo.update){
					return "更新"
				}else{
					return this.$store.state.appInfo.localVersion
				}
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
			},
			
		},
		onShow() {
			this.getUserInfo()
		},
		onPullDownRefresh() {
			const _this = this
			_this.refresh = true
			uni.startPullDownRefresh({
				success: function(){
					_this.getUserInfo().then(res => {
						_this.refresh = false
						uni.stopPullDownRefresh()
					})
				}
			})
		},
        methods: {
			navTo(url){
				this.$aiRouter.navTo(url)
			},
			login(){console.log(微信登录)},
			getUserInfo(){
				return this.$api.getUserCenter().then( res => {
					this.blance = res.data.data.balance
					this.curEar = res.data.data.cur_month_commission
					this.prevEar = res.data.data.prev_month_commission
					this.userName = res.data.data.username
					this.userId = "账户ID:" + res.data.data.id
					this.alipay = res.data.data.alipay
					return true
				})
			},
			withdraw(){
				if(this.alipay){
					this.$aiRouter.navTo('/pages/withdraw/withdraw?total=' + this.blance)
				}
			},
			logout(){
				this.$store.commit("logout")
				this.$aiRouter.navTo("/pages/index/index")
			},
			updateApp(){
				if(this.$store.state.appInfo.update){
					this.$refs.popupAiDia.open()
				}
			},
			close(done){
			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框 
				done()
			},
			confirm(done){
				apkDownload(this.$store.state.appInfo.appLink)
				done()
			}
        }  
    }  
</script>  
<style lang='scss'>
	/*定义css变量，暂时没有用到*/
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	page {
		background:rgba(249,249,249,1);
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
			color:rgba(204,204,204,1);
			height:37px;
			text-decoration-line: underline;
		}
		.note {
			margin: 0 0 50px 0;
		}
		
	
	.user-section{
		height: 205px;
		
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
		}
	}
	.user-info-box{
		height: 70px;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 60px;
			height: 60px;
			margin: 0 0 0 25px;
			border:1px solid #fff;
			border-radius: 50%;
		}
		.info-box {
			margin: 0 0 0 15px;
		}
		.info-box-user-name{
			font-size: 17px;
			color:rgba(255,255,255,1);
			margin: 0 0 5px 0;
		}
		.info-box-user-id {
			font-size: 14px;
			color:rgba(255,255,255,1);
		}
	}
	.money-card {
		width: 690rpx;
		height: 130px;
		margin: 5px auto 0;
		position: relative;
		.card-bg {
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
		.card-info {
			position:relative;
			z-index: 1;
			.balance {
				height: 65px;
				width: 690rpx;
				display: flex;
				align-items: flex-end;
				.icon {
					width: 17px;
					height: 16px;
					margin: 24px 5px 24px 15px;
					display: inline-block;
				}
				.title {
					display: inline-block;
					width: 95px;
					height: 19px;
					margin: 23px 0;
					font-size:15px;
					color:rgba(51,51,51,1);
				}
				.num {
					display: inline-block;
					overflow-x: hidden;
					text-overflow: ellipsis;
					height: 25px;
					width: 225rpx;
					font-size:21px;
					font-weight:600;
					color:rgba(51,51,51,1);
					margin: 20px 0;
				}
				.cash {
					display: inline-block;
					width: 142rpx;
					height: 27px;
					margin: 19px;
					border-radius:13px;
					background:rgba(244,122,115,1);
					line-height:27px;
					text-align: center;
					font-size:15px;
					color:rgba(255,255,255,1);
				}
			}
		}
		.estimate {
			height: 65px;
			width: 690rpx;
			display: flex;
			.last {
				margin: 0 0 0 25px;
				.num {
					width: 125px;
					overflow-x: hidden;
					text-overflow: ellipsis;
					font-size:18px;
					font-weight:600;
					color:rgba(51,51,51,1);
				}
				.title {
					margin: 6px 0 0 0;
					font-size:13px;
					color:rgba(102,102,102,1);
				}
			}
			.next {
				margin: 0 0 0 55px;
				.num {
					width: 125px;
					overflow-x: hidden;
					text-overflow: ellipsis;
					font-size:18px;
					font-weight:600;
					color:rgba(51,51,51,1);
				}
				.title {
					margin: 6px 0 0 0;
					font-size:13px;
					color:rgba(102,102,102,1);
				}
			}
		}
	}
	.list-card {
		height: 350px;
		width: 690rpx;
		margin: 0 auto;
		.list-box {
			font-size: 15px;
			height: 45px;
			padding: 0 15px;
		}
		.account-safe {
			margin: 10px 0 0 0;
			border-radius:8px;
			background:rgba(255,255,255,1);
		}
		.message {
			margin: 10px 0 0 0;
			border-radius: 8px;
			background:rgba(255,255,255,1);
		}
		.logout {
			margin: 10px 0 0 0;
			border-radius:8px;
			background:rgba(255,255,255,1);
		}
	}

	
</style>