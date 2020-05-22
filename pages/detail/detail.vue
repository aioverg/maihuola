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
				<image class="guess-zbprice-icon" mode="widthFix" src="../../static/icon/ai-zbprice.png"></image>
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
			    <image class="guess-nh-title-icon" mode="widthFix" src="/static/icon/ai-praise.png"></image>
			</view>
			<view class="guess-nh-content">
				<view>
					{{guessDetailData.sell_point}}
				</view>
			</view>
		</view>
		<view class="zb-script">
			<view class="zb-script-title">
				<view>直播脚本</view>
			    <image class="zb-script-title-icon" mode="widthFix" src="/static/icon/ai-vidicon.png"></image>
			</view>
			<view class="zb-script-content">这里是直播脚本相关内容</view>
		</view>
		<view class="tkl-bt" @click="copyTKL">
			<ai-button btname="复制推广码" ></ai-button>
		</view>
		<uni-popup ref="popupDialog" type="dialog">
		    <uni-popup-dialog type="dialog" :title="popupDialogTitle" :content="popupDialogContent" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupAiDialog" type="dialog">
		    <ai-popup-dialog type="dialog" :src="aiDialogSrc" :title="popupDialogTitle" :content="popupDialogContent" :before-close="true" @close="close" @confirm="confirm"></ai-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupMessage">
			<uni-popup-message v-if="TKLBox" message="成功消息" type="success"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button.vue'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import aiPopupDialog from '@/components/uni-popup/ai-popup-dialog.vue'
	//详情页
	export default {
		components: {
			aiButton,
			uniPopUp,
			uniPopupDialog,
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
				popupMessages: null,
				confirmValue: null,
				aiDialogSrc: '/static/img/ai-taobao.png',
				taobaoAuth: "aa",
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
			}
		},
		computed: {
			hasLogin(){
				return this.$store.state.hasLogin
			},
			taobao(){
				return this.$store.state.userInfo.taobao
			}
			
		},
		onLoad: function(obj){
			this.taobaoAuth = obj.auth
			this.goodsId = obj.goods_id
			this.$api.getGuessDetail(obj.goods_id).then( res => {
				this.guessDetailData = res.data.data
				console.log("商品详情",this.guessDetailData)
			})
		},
		onReady(){
			if(this.taobaoAuth == "true"){
				console.log("11111111111111授权成功")
			}
			if(this.taobaoAuth == "false"){
				console.log("111111111111授权失败")
				this.aiDialogSrc = '/static/img/taobao-err.png'
				this.popupDialogTitle = "授权失败"
				this.popupDialogContent = "授权失败将无法通过分享商品获得收益"
				this.confirmValue = "taobao"
				console.log(this.aiDialogSrc)
				this.$refs.popupAiDialog.open()
			}
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			copyTKL(){
				if(!this.hasLogin){
					console.log("loginm")
					this.popupDialogTitle = "没有登录"
					this.popupDialogContent = "现在去登录"
					this.confirmValue = "login"
					this.$refs.popupDialog.open()
					return
				}
				if(!this.taobao){
					console.log("taobao")
					this.popupDialogTitle = "需要淘宝授权"
					this.popupDialogContent = "是否授权"
					this.confirmValue = "taobao"
					this.$refs.popupAiDialog.open()
					return
				}
			},
			close(done){
			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
			    done()
				
			},
			confirm(done){
				if(this.confirmValue == "login"){
					this.$global.navTo('/pages/login/login')
					done()
					return
				}
				if(this.confirmValue == "taobao"){
					this.$global.navTo('/pages/account/taobao?goods_id=' + this.goodsId)
					done()
					return
				}
			}
		}
	}

</script>

<style lang="scss">
	page {
		width: 750rpx;
		background:rgba(249,249,249,1);
	}
	.guess-img-box {
		width: 750rpx;
		height: 600rpx;
		background:rgba(255,255,255,1);
		.guess-img {
			height: 600rpx;
			display: block;
			margin: 0 auto;
		}
	}
	.guess-title {
		width: 750rpx;
		height: 53px;
		padding: 7px 15px 8px;
		background: rgba(255,255,255,1);
		font-size: 16px;
		color: rgba(51,51,51,1);
	}
	.guess-price-info {
		width: 750rpx;
		height: 77px;
		padding: 0 15px 0;
		background: rgba(244,122,115,1);
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
				color: rgba(255,255,255,1);
			}
			.guess-ckprice {
				display: inline-block;
				flex-grow: 1;
				font-size: 15px;
				color:rgba(255,255,255,1);
			}
		}
		.guess-price-info-two {
			height: 37px;
			line-height: 37px;
			.guess-scprice {
				display: inline-block;
				margin: 0 14px 0 0;
				font-size:13px;
				color: rgba(255,255,255,1);
			}
			.guess-rate {
				display: inline-block;
				font-size: 13px;
				color: rgba(255,255,255,1);
			}
		}
	}
	.guess-nh {
		width: 690rpx;
		min-height: 105px;
		margin: 10px auto;
		padding: 10px 15px 13px;
		background: rgba(255,255,255,1);
		border-radius: 8px;
		.guess-nh-title {
			display: flex;
			align-items: center;
			margin: 0 0 5px;
			font-size: 15px;
			font-weight: 500;
			color: rgba(51,51,51,1);
			.guess-nh-title-icon {
				margin: 0 0 0 4px;
				width: 18px;
			}
		}
		.guess-nh-content {
			font-size:13px;
			color:rgba(102,102,102,1);
		}
	}
	.zb-script {
		width: 690rpx;
		min-height: 105px;
		margin: 0 auto 25px;
		padding: 10px 15px 13px;
		background: rgba(255,255,255,1);
		border-radius: 8px;
		.zb-script-title {
			display: flex;
			align-items: center;
			margin: 0 0 5px;
			font-size: 15px;
			font-weight: 500;
			color: rgba(51,51,51,1);
			.zb-script-title-icon {
				margin: 0 0 0 4px;
				width: 18px;
			}
		}
		.zb-script-content {
			font-size: 13px;
			color: rgba(102,102,102,1);
		}
	}
	.tkl-bt {
		margin: 0 0 46px;
	}
</style>
