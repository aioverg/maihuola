<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="商品详情" right-icon="help" @clickRight="navMessage"></uni-nav-bar>
		<view class="guess-img-box">
			<image mode="heightFix" class="guess-img" :src="guessDetailData.pic"></image>
		</view>
		<view class="guess-price-info">
			<view class="guess-title">{{guessDetailData.title}}</view>
			<view class="guess-price-info-one">
				<image class="guess-zbprice-icon" mode="widthFix" src="../../static/icon/icon-zbprice-01.png"></image>
				<view class="guess-zbprice">
					<text style="font-size: 23px;">¥</text>
					<text>{{guessDetailData.promotion_price}}</text>
				</view>
				<view class="guess-ckprice">
					<text>参考收益：</text>
					<text>¥{{guessDetailData.commission}}</text>
				</view>
			</view>
			<view class="guess-price-info-two">
				<view class="guess-scprice">
					<text>市场价：</text>
					<text>¥{{guessDetailData.price}}</text>
				</view>
				<view class="guess-rate">
					<text>佣金比例：</text>
					<text>{{guessDetailData.commission_rate}}</text>
					<text>%</text>
				</view>
			</view>
		</view>
		<view class="guess-nh">
			<view class="guess-nh-title">
				<view>商品卖点</view>
			    <image class="guess-nh-title-icon" mode="widthFix" src="/static/icon/icon-praise-01.png"></image>
			</view>
			<view class="guess-nh-content">
				{{guessDetailData.sell_point}}
			</view>
		</view>
		<view class="zb-script">
			<view class="zb-script-title">
				<view>直播脚本</view>
			    <image class="zb-script-title-icon" mode="widthFix" src="/static/icon/icon-video-01.png"></image>
			</view>
			<view class="zb-script-content">{{guessDetailData.live_script}}</view>
		</view>
		<view class="copy-box">
			<view class="collect">
				<image class="collect-icon" @click="collect()" :src="collectIcon"></image>
				<view class="collect-hint">{{collectTitle}}</view>
			</view>
			<view class="copy-bt">
				<ai-button btname="复制推广码" width="540" shadow-width="492" @eventClick="copyTKL" ></ai-button>
			</view>
		</view>
		<uni-popup ref="navBarHelp" type="dialog">
			<ai-popup-dialog type="dialog" :cancelShow="false" btname="我知道了" :message="navHelp" :before-close="true" @confirm="close"></ai-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupAiDialog" type="dialog">
			<ai-popup-dialog type="dialog" iconSrc="/static/icon/icon-taobao.png" btname="去授权" @close="close" @confirm="confirm">
				<block slot="message">
					<view style="font-size: 17px; text-align: center;">请完成淘宝授权</view>
					<view style="font-size: 14px; text-align: center; margin: 4px 0 0 0; color: #666666;">授权后方可获取该商品淘口令</view>
				</block>
			</ai-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupMessage">
			<uni-popup-message v-if="TKLBox" message="成功消息" type="success"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import aiNavbar from "@/components/ai-navbar/ai-navbar.vue"
	import aiButton from '@/components/ai-button/ai-button.vue'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import aiPopupDialog from '@/components/ai-popup/ai-popup-dialog.vue'
	//详情页
	export default {
		components: {
			aiNavbar,
			aiButton,
			uniPopUp,
			uniPopupMessage,
			aiPopupDialog
		},
		data(){
			return {
				goodsId: null,
				guessDetailData: Object,
				TKLBox: true,
				TKLMessage: null,
				popupDialogTitle: null,
				popupDialogContent: null,
				popupDialogBtName: null,
				popupMessages: null,
				aiDialogSrc: '/static/icon/icon-taobao.png',
				navigateFlag: false ,//解决快速点击跳转，页面跳转多次问题,
				taobao: 0,
				collectStatus: false,
				collectIcon: "/static/icon/start-01.png",
				collectTitle: "收藏",
				navHelp: [
					{
						title: "如何使用推广码？",
						content: "选好商品 — 查看商品详情 — 复制推广码 — 把推广码关联到您的直播间 — 用户成功购买 — 获取佣金"
					}
				]
			}
		},
		computed: {
			hasLogin(){
				return this.$store.state.hasLogin
			}
		},
		onLoad: function(obj){
			console.log(obj)
			this.goodsId = obj.goods_id
			if(this.hasLogin){
				this.$api.getGuessDetail({
					goods_id: obj.goods_id,
					user_id: this.$store.state.userInfo.id
				}).then( res => {
					this.guessDetailData = res.data.data
					if(res.data.data.collect){
						this.collectStatus = true
						this.collectIcon = "/static/icon/start-03.png",
						this.collectTitle = "已收藏"
					}
				})
				this.$api.getAuthInfo({
					code: "taobao"
				}).then( res => {
					this.taobao = res.data.data.status
				})
				if(obj.tb_auth == "fail"){
					this.aiDialogSrc = '/static/img/taobao-err.png'
					this.popupDialogTitle = "授权失败"
					this.popupDialogContent = "将无法通过分享商品获得收益"
					this.$refs.popupAiDialog.open()
				}
			}else{
				this.$api.getGuessDetail({
					goods_id: obj.goods_id
				}).then( res => {
					this.guessDetailData = res.data.data
				})
			}
		},
		onShow() {
			if(this.hasLogin){
				let bindTabBao = uni.getStorageSync('bindTaoBao')
				if(bindTabBao == 'bind'){
					this.$api.getAuthInfo({
						code: "taobao"
					}).then( res => {
						this.taobao = res.data.data.status
						uni.removeStorageSync('bindTaoBao')
					})
				}
			}
		},
		onReady(){
		},
		methods: {
			//导航栏帮助弹框
			navMessage(){
				this.$refs.navBarHelp.open()
			},
			//提示淘宝授权弹框
			confirm(done){
				uni.setStorageSync("bindTaoBao", "bind")
				this.$aiRouter.navTo('/pages/account/taobao?page_id=2&page_params=' + this.goodsId)
				done()
			},
			collect(){
				if(!this.hasLogin){
					this.$aiRouter.navTo('/pages/login/login?jumpUrl=/pages/detail/detail?goods_id=' + this.goodsId)
					return
				}
				if(this.collectStatus){
					this.$api.postGoodsUnCollect({
						user_id: this.$store.state.userInfo.id,
						item_id: this.goodsId
					}).then(res => {
						//console.log("已收藏")
						if(res.data.code == 0){
							this.collectStatus = false
							this.collectIcon = "/static/icon/start-01.png",
							this.collectTitle = "收藏"
						}
					})
				}else{
					this.$api.postGoodsCollect({
						user_id: this.$store.state.userInfo.id,
						item_id: this.goodsId
					}).then(res => {
						if(res.data.code == 0){
							this.collectStatus = true
							this.collectIcon = "/static/icon/start-03.png",
							this.collectTitle = "已收藏"
						}
						//console.log("收藏")
						
					})
				}
			},
			//复制推广码
			copyTKL(){
				if(!this.hasLogin){
					this.$aiRouter.navTo('/pages/login/login?jumpUrl=back')
					return
				}
				if(!this.taobao){
					this.popupDialogTitle = "请完成淘宝授权"
					this.popupDialogContent = "授权后方可获取该商品淘口令"
					this.popupDialogBtName = "现在去授权"
					this.$refs.popupAiDialog.open()
					return
				}
				this.$api.getTKL(this.goodsId).then(res => {
					if(res.data.code == 0){
						uni.setClipboardData({
							data: res.data.data.info,
							success: function () {
								uni.showToast({
									title: "复制成功"
								})
							}
						})
					}else{
						uni.showToast({
							icon: "none",
							title: res.data.msg
						})
					}
				})
			},
			//关闭弹窗按钮
			close(done){
			    done()
			},
			
		}
	}
</script>

<style lang="scss">
	page {
		width: 750rpx;
		background: #FFFFFF;
	}
	/*商品图片*/
	.guess-img-box {
		width: 750rpx;
		height: 750rpx;
		background: #FFFFFF;
		.guess-img {
			width: 750rpx;
			height: 750rpx;
			display: block;
			margin: 0 auto;
		}
	}
	/*商品信息*/
	.guess-price-info {
		width: 690rpx;
		padding: 10px 15px;
		margin: 20px auto 0;
		border-radius: 8px;
		background: #FFFFFF;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		.guess-title {
			font-size: 16px;
			margin: 0 0 5px 0;
		};
		.guess-price-info-one {
			height: 40px;
			display: flex;
			align-items: flex-end;
			.guess-zbprice-icon {
				display: inline-block;
				width: 60px;
				margin: 0 10px 0 0;
			}
			.guess-zbprice {
				display: inline-block;
				line-height: 27.5px;
				flex-grow: 1;
				font-size: 30px;
				font-weight: bold;
				color: #FF5350;
			}
			.guess-ckprice {
				display: inline-block;
				text-align: end;
				flex-grow: 1;
				font-size: 15px;
				color: #FF5350;
			}
		}
		.guess-price-info-two {
			height: 37px;
			line-height: 37px;
			color: #666666;
			.guess-scprice {
				display: inline-block;
				margin: 0 14px 0 0;
				font-size:13px;
			}
			.guess-rate {
				display: inline-block;
				font-size: 13px;
			}
		}
	}
	/*商品买点*/
	.guess-nh {
		width: 690rpx;
		min-height: 105px;
		margin: 10px auto;
		padding: 10px 15px 13px;
		background: #FFFFFF;
		border-radius: 8px;
		box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
		.guess-nh-title {
			display: flex;
			align-items: center;
			margin: 0 0 5px;
			font-size: 15px;
			font-weight: bold;
			color: #333333;
			.guess-nh-title-icon {
				margin: 0 0 0 4px;
				width: 18px;
			}
		}
		.guess-nh-content {
			font-size:13px;
			color: #666666;
		}
	}
	/*直播脚本*/
	.zb-script {
		width: 690rpx;
		min-height: 105px;
		margin: 0 auto 25px;
		padding: 10px 15px 13px;
		background: #FFFFFF;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		.zb-script-title {
			display: flex;
			align-items: center;
			margin: 0 0 5px;
			font-size: 15px;
			font-weight: bold;
			color: #333333;
			.zb-script-title-icon {
				margin: 0 0 0 4px;
				width: 18px;
			}
		}
		.zb-script-content {
			font-size: 13px;
			color: #666666;
		}
	}
	.copy-box {
		width: 750rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 19px;
		margin: 0 0 46px;
		.collect {
			height: 43px;
			width: 45px;
			margin: 0 0 10px 0;
			display: inline-block;
			text-align: center;
			.collect-icon {
				width: 19px;
				height: 18px;
				margin: 0 auto;
			}
			.collect-hint {
				font-size: 13.5px;
			}
		}
	}
</style>
