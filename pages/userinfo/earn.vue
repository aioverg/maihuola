<template>
	<view>
		<uni-nav-bar fixed="true" left-width="150" right-icon="help" @clickRight="navTo('/pages/help/earnRule')">
			<block slot="left">
				<image style="width: 10px; height: 17px; margin: 3px 10px 0 10px;" src="../../static/icon/left-arrow01.png"></image>
			    <view style="font-size: 20px; font-weight:bold;">我的收益</view>
			</block>
		</uni-nav-bar>
		<view class="earn-page-body">
			<view class="earn-blance">
				<image class="earn-blance-bg" src="../../static/icon/bg-earn-01.png"></image>
				<view class="earn-blance-title">账户余额（元）： </view>
				<view class="earn-blance-num">24320.28 </view>
			</view>
			<view class="earn-source">
				<view class="earn-source-overview">
					<view class="earn-source-overview-item">
						<view class="earn-source-overview-item-one">
							<view class="earn-source-overview-item-title">
								<view class="title-mark"></view>
								<view class="title-text">今日收益</view>
								<uni-icons class="title-help" @click="itemHelp('today')" type="help" color="#CCCCCC" size="19"></uni-icons>
							</view>
							<view class="earn-source-overview-item-earn">
								<view class="earn-sum">25456.80</view>
								<view class="earn-text">预估收益（元）</view>
							</view>
						</view>
						<view class="earn-source-overview-item-two"></view>
						<view class="earn-source-overview-item-thr">
							<view class="sale-money">
								<view class="sale-sum">34560.78</view>
								<view class="sale-text">销售额（元）</view>
							</view>
							<view class="sale-oder">
								<view class="sale-sum">264</view>
								<view class="sale-text">订单数（个）</view>
							</view>
						</view>
					</view>
					<view class="earn-source-overview-item">
						<view class="earn-source-overview-item-one">
							<view class="earn-source-overview-item-title">
								<view class="title-mark"></view>
								<view class="title-text">昨日收益</view>
								<uni-icons class="title-help" @click="itemHelp('yestoday')" type="help" color="#CCCCCC" size="19"></uni-icons>
							</view>
							<view class="earn-source-overview-item-earn">
								<view class="earn-sum">25456.80</view>
								<view class="earn-text">预估收益（元）</view>
							</view>
						</view>
						<view class="earn-source-overview-item-two"></view>
						<view class="earn-source-overview-item-thr">
							<view class="sale-money">
								<view class="sale-sum">34560.78</view>
								<view class="sale-text">销售额（元）</view>
							</view>
							<view class="sale-oder">
								<view class="sale-sum">264</view>
								<view class="sale-text">订单数（个）</view>
							</view>
						</view>
					</view>
					<view class="earn-source-overview-item">
						<view class="earn-source-overview-item-one">
							<view class="earn-source-overview-item-title">
								<view class="title-mark"></view>
								<view class="title-text">月度收益</view>
								<uni-icons class="title-help" @click="itemHelp('month')" type="help" color="#CCCCCC" size="19"></uni-icons>
							</view>
							<view class="earn-source-overview-item-earn">
								<view class="earn-sum">25456.80</view>
								<view class="earn-text">预估收益（元）</view>
							</view>
						</view>
						<view class="earn-source-overview-item-two"></view>
						<view class="earn-source-overview-item-thr">
							<view class="sale-money">
								<view class="sale-sum">34560.78</view>
								<view class="sale-text">销售额（元）</view>
							</view>
							<view class="sale-oder">
								<view class="sale-sum">264</view>
								<view class="sale-text">订单数（个）</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="earn-detail">
				<view class="earn-detail-item" @click="navTo('/pages/userinfo/earnDetail')">
					<ai-list-cell title="收益结算明细" dashed="dashed"></ai-list-cell>
				</view>
				<view class="earn-detail-item">
					<ai-list-cell title="提现记录"></ai-list-cell>
				</view>
			</view>
		</view>
		<uni-popup ref="earnItemHelp" type="dialog">
			<ai-popup-dialog type="dialog" :cancelShow="false" btname="我知道了" :message="HelpMessage" :before-close="true" @confirm="close"></ai-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import aiListCell from '@/components/ai-list-cell'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	import aiPopupDialog from '@/components/ai-popup/ai-popup-dialog.vue'
	export default {
		components:{
			aiListCell,
			uniPopUp,
			aiPopupDialog
		},
		data() {
			return {
				HelpMessage: []
			}
		},
		methods: {
			navTo(url){
				this.$aiRouter.navTo(url)
			},
			itemHelp(paras){
				if(paras == "today" || paras == "yestoday"){
					this.HelpMessage = [
						{
							title: "预估收益：",
							content: "付款订单的收益总和"
						},
						{
							title: "销售额：",
							content: "付款订单的实付金额总和"
						},
						{
							title: "订单数：",
							content: "付款的订单笔数，包括失效订单数"
						}
					]
					this.$refs.earnItemHelp.open()
					return
				}
				if(paras == "month"){
					this.HelpMessage = [
						{
							title: "预估收益：",
							content: "付款订单的收益总和"
						},
						{
							title: "结算收益：",
							content: "确认收货的订单收益总和，本月25日可提现"
						}
					]
					this.$refs.earnItemHelp.open()
					return
				}
			},
			close(done){
				done()
			}
		}
	}
</script>

<style lang="scss">
	.earn-page-body {
		width: 750rpx;
		padding: 0 30rpx;
	}
	
	/*账户余额*/
	.earn-blance {
		width: 690rpx;
		height: 49px;
		position: relative;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		display: flex;
		align-items: center;
		.earn-blance-bg {
			position: absolute;
			width: 750rpx;
			left: -30rpx;
			height: 99px;
		}
		.earn-blance-title {
			position: relative;
			display: inline-block;
			width: 100px;
			margin: 0 0 0 35rpx;
			font-size: 12px;
			color:rgba(255,255,255,0.8);
		}
		.earn-blance-num {
			position: relative;
			display: inline-block;
			font-size: 26px;
			color:rgba(255,255,255,0.9);
		}
	}
	
	/*昨日今日月度收益来源详情*/
	.earn-source {
		.earn-source-overview-item {
			height: 130px;
			padding: 12px 0 15px 15px;
			margin: 10px 0 0 0;
			border-radius: 8px;
			box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
			display: flex;
			.earn-source-overview-item-one {
				display: inline-block;
				width: 290rpx;
				.earn-source-overview-item-title {
					margin: 0 0 20px 0;
					display: flex;
					align-items: center;
					.title-mark {
						width: 3px;
						height: 14px;
						border-radius: 2px;
						background-color: #FF716E;
					}
					.title-text {
						font-size: 16px;
						font-weight: bold;
						margin: 0 5px;
					}
				}
				.earn-source-overview-item-earn {
					margin: 0 0 0 8px;
					.earn-sum {
						font-size: 20px;
						font-weight: bold;
						color: #FF716E;
					}
					.earn-text {
						font-size: 12px;
						color: #666666;
					}
					
				}
			}
			.earn-source-overview-item-two {
				display: inline-block;
				width: 1px;
				height: 50px;
				margin: 35px 0 0 0;
				background-color: #E5E5E5;
			}
			.earn-source-overview-item-thr {
				display: inline-block;
				margin: 4px 0 0 34px;
				.sale-oder {
					margin: 15px 0 0 0;
				}
				.sale-sum {
					font-size: 20px;
					font-weight: bold;
					color: #FFA570;
				}
				.sale-text {
					font-size: 12px;
					color: #666666;
				}
			}
		}
	}
	/*收益结算明细，提现记录*/
	.earn-detail {
		margin: 10px 0 60px 0;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		.earn-detail-item {
			font-size: 15px;
			height: 45px;
			padding: 0 15px;
		}
	}
	
</style>
