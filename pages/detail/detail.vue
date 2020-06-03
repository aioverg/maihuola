<template>
	<view>
		<ai-navbar
		    title="商品详情"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="guess-img-box">
			<image mode="heightFix" class="guess-img" :src="guessDetailData.pic"></image>
		</view>
		<view class="guess-title">{{guessDetailData.title}}</view>
		<view class="guess-price-info">
			<view class="guess-price-info-one">
				<image class="guess-zbprice-icon" mode="widthFix" src="../../static/icon/icon-zbprice-01.png"></image>
				<view class="guess-zbprice">
					<text>¥</text>
					<text>{{guessDetailData.promotion_price}}</text>
				</view>
				<view class="guess-ckprice">
					<text>参考收益：</text>
					<text>¥</text>
					<text>{{guessDetailData.commission}}</text>
				</view>
			</view>
			<view class="guess-price-info-two">
				<view class="guess-scprice">
					<text>市场价：</text>
					<text>¥</text>
					<text>{{guessDetailData.price}}</text>
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
		<view class="tkl-bt">
			<ai-button btname="复制推广码" @eventClick="copyTKL" ></ai-button>
		</view>
		<uni-popup ref="popupAiDialog" type="dialog">
		    <ai-popup-dialog type="dialog" :cancel-show="false" :src="aiDialogSrc" :btname="popupDialogBtName" :title="popupDialogTitle" :content="popupDialogContent" :before-close="true" @close="close" @confirm="confirm"></ai-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupMessage">
			<uni-popup-message v-if="TKLBox" message="成功消息" type="success"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button.vue'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import aiPopupDialog from '@/components/uni-popup/ai-popup-dialog.vue'
	//详情页
	export default {
		components: {
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
				taobao: 0
			}
		},
		computed: {
			hasLogin(){
				return this.$store.state.hasLogin
			}
		},
		onLoad: function(obj){
			this.goodsId = obj.goods_id
			this.$api.getGuessDetail(obj.goods_id).then( res => {
				this.guessDetailData = res.data.data
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
			
		},
		onReady(){
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			copyTKL(){
				if(!this.hasLogin){
					this.$aiRouter.navTo('/pages/login/loginPhone?page_id=2&page_params=' + this.goodsId)
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
			close(done){
			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
			    done()
				
			},
			confirm(done){
				this.$aiRouter.navTo('/pages/account/taobao?page_id=2&page_params=' + this.goodsId)
				done()
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 750rpx;
		background: #F9F9F9;
	}
	.guess-img-box {
		width: 750rpx;
		height: 600rpx;
		background: #FFFFFF;
		.guess-img {
			width: 750rpx;
			height: 600rpx;
			display: block;
			margin: 0 auto;
		}
	}
	.guess-title {
		width: 750rpx;
		padding: 7px 15px 8px;
		line-height: 20px;
		background: #FFFFFF;
		font-size: 16px;
		color: #333333;
	}
	.guess-price-info {
		width: 750rpx;
		height: 77px;
		padding: 0 15px 0;
		background: #F47A73;
		.guess-price-info-one {
			height: 40px;
			display: flex;
			align-items: flex-end;
			.guess-zbprice-icon {
				display: inline-block;
				width: 60px;
				margin: 0 20px 0 0;
			}
			.guess-zbprice {
				display: inline-block;
				line-height: 27.5px;
				flex-grow: 1;
				font-size: 30px;
				color: #FFFFFF;
			}
			.guess-ckprice {
				display: inline-block;
				flex-grow: 1;
				font-size: 15px;
				color:#FFFFFF;
			}
		}
		.guess-price-info-two {
			height: 37px;
			line-height: 37px;
			color: rgba(255,255,255,0.8);
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
	.guess-nh {
		width: 690rpx;
		min-height: 105px;
		margin: 10px auto;
		padding: 10px 15px 13px;
		background: #FFFFFF;
		border-radius: 8px;
		.guess-nh-title {
			display: flex;
			align-items: center;
			margin: 0 0 5px;
			font-size: 15px;
			font-weight: 600;
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
	.zb-script {
		width: 690rpx;
		min-height: 105px;
		margin: 0 auto 25px;
		padding: 10px 15px 13px;
		background: #FFFFFF;
		border-radius: 8px;
		.zb-script-title {
			display: flex;
			align-items: center;
			margin: 0 0 5px;
			font-size: 15px;
			font-weight: 600;
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
	.tkl-bt {
		margin: 0 0 46px;
	}
</style>
