<template>  
    <view>
		<ai-navbar
		    title="我的"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
		/>
		<view class="user-section">
			<image class="bg" src="/static/img/bg-02.png" mode="widthFix"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.portrait || '/static/img/ai-default-user-icon.png'"></image>
				</view>
				<view class="info-box" @click="login()">
					<text class="username">{{userInfo.nickname || '点击登录'}}</text>
				</view>
			</view>
			<view class="money-card">
				<image class="card-bg" src="/static/img/bg-03.png"></image>
				<view class="card-info">
					<view class="balance">
						<image class="icon" src="/static/icon/ai-coin.png"></image>
						<text class="title">余额（元）：</text>
						<text class="num">0000000000000000.00</text>
						<view class="cash" @click="navTo('/pages/withdrawDeposit/withdrawDeposit')">
							提现
						</view>
					</view>
					<view class="estimate">
						<view class="last">
							<view class="num">000000000000.00</view>
							<view class="title">本月预估收入（元）</view>
						</view>
						<view class="next">
							<view class="num">000000000000000.00</view>
							<view class="title">上月预估收入（元）</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="list-card">
			<!--账户安全-->
			<view class="account-safe list-box" @click="navTo('/pages/account/index')" style="padding: 0 30rpx;">
				<ai-list-cell title="手机 | 微信号 | 淘宝授权"></ai-list-cell>
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
					<ai-list-cell title="关于我们"></ai-list-cell>
				</view>
			</view>
			
			<!--退出账号-->
			<view class="logout list-box" @click="logino()">
				<ai-list-cell title="退出账号"></ai-list-cell>
				<ai-list-cell title="初始化"></ai-list-cell>
			</view>
		</view>
    </view>  
</template>  
<script>
	import aiListCell from '@/components/ai-list-cell'
	const plug= uni.requireNativePlugin('UZK-Alibcsdk');
    import {  
        mapState 
    } from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			aiListCell
		},
		data(){
			return {
			}
		},
		onLoad(){
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
        methods: {

			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				/*if(!this.hasLogin){
					url = '/pages/public/login';
				}*/
				uni.navigateTo({  
					url
				})  
			},
			login(){
				this.$api.login({
				})
			},
			logino(){
				plug.init(result=>{
				console.log(result)
				    });
			},
			init(){
				plug.login(result=>{
					console.log(result)
				    });  
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
	.user-section{
		height: 410rpx;
		
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
		}
	}
	.user-info-box{
		height: 140rpx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 120rpx;
			height: 120rpx;
			margin: 0 0 0 50rpx;
			border:1px solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: 17px;
			color: rgba(255,255,255,1);
			margin-left: 30rpx;
		}
	}
	.money-card {
		width: 690rpx;
		height: 260rpx;
		margin: 10rpx auto 0;
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
				height: 130rpx;
				width: 690rpx;
				display: flex;
				.icon {
					width: 34rpx;
					height: 33rpx;
					margin: 48rpx 10rpx 49rpx 30rpx;
					display: inline-block;
				}
				.title {
					display: inline-block;
					width: 190rpx;
					height: 38rpx;
					margin: 46rpx 0;
					font-size:15px;
					color:rgba(51,51,51,1);
				}
				.num {
					display: inline-block;
					overflow-x: hidden;
					text-overflow: ellipsis;
					height: 50rpx;
					width: 225rpx;
					font-size:21px;
					font-weight:500;
					color:rgba(51,51,51,1);
					margin: 40rpx 0;
				}
				.cash {
					display: inline-block;
					width: 142rpx;
					height: 54rpx;
					margin: 38rpx;
					border-radius:27rpx;
					background:rgba(244,122,115,1);
					line-height:54rpx;
					text-align: center;
					font-size:15px;
					color:rgba(255,255,255,1);
				}
			}
		}
		.estimate {
			height: 130rpx;
			width: 690rpx;
			display: flex;
			.last {
				margin: 0 0 0 50rpx;
				.num {
					width: 250rpx;
					overflow-x: hidden;
					text-overflow: ellipsis;
					font-size:18px;
					font-weight:600;
					color:rgba(51,51,51,1);
				}
				.title {
					margin: 12rpx 0 0 0;
					font-size:13px;
					color:rgba(102,102,102,1);
				}
			}
			.next {
				margin: 0 0 0 110rpx;
				.num {
					width: 250rpx;
					overflow-x: hidden;
					text-overflow: ellipsis;
					font-size:18px;
					font-weight:600;
					color:rgba(51,51,51,1);
				}
				.title {
					margin: 12rpx 0 0 0;
					font-size:13px;
					color:rgba(102,102,102,1);
				}
			}
		}
	}
	.list-card {
		height: 700rpx;
		width: 690rpx;
		margin: 0 auto;
		.list-box {
			font-size: 15px;
			height: 90rpx;
			padding: 0 30rpx;
		}
		.account-safe {
			margin: 20rpx 0 0 0;
			border-radius:16rpx;
			background:rgba(255,255,255,1);
		}
		.message {
			margin: 20rpx 0 0 0;
			border-radius: 16rpx;
			background:rgba(255,255,255,1);
		}
		.logout {
			margin: 20rpx 0 0 0;
			border-radius:16rpx;
			background:rgba(255,255,255,1);
		}
	}

	
</style>