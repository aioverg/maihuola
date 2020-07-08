<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft">
			<block slot="left">
				<view style="font-size: 20px; font-weight: bold;">我的订单</view>
			</block>
			<block v-if="false">
				<view class="nav-sel">
					<view class="ns-my" @click="selCategory('my')" :class="selTag == 'my' ? 'sel-my' : ''">我的订单</view>
					<view class="ns-group" @click="selCategory('order')" :class="selTag == 'order' ? 'sel-group' : ''">团队定单</view>
				</view>
			</block>
			<block slot="right">
				<view style="width: 150rpx; padding: 0 10px 0 0; text-align: right;">
				    <image @click="navTo('/pages/search/orderSearch')" src="/static/icon/search-02.png" style="width: 20px; margin: 0 10px 0 0;" mode="widthFix"></image>
				    <uni-icons @click="help" type="help" color="#333333" size="24"></uni-icons>
				</view>
			</block>
		</uni-nav-bar>
		<view class="oder-body">
			<view class="status-box">
				<view :class="index == selStatusIndex ? 'sel-status' : ''" v-for="(item, index) in oderStatus" :key="item.id" @click="selStatus(item.id, index)">
					{{item.name}}
				</view>
			</view>
			<view class="oder-list">
				<view class="ol-item" v-for="(item, index) in oderData" :key="index">
					<ai-order-goods-card :data="item"></ai-order-goods-card>
				</view>
			</view>
			<view style="width: 690rpx; position: fixed; top: 35%;">
				<ai-no-content v-if="oderData.length == 0" describe="哎呀！暂时还没有订单哦！"></ai-no-content>
			</view>
		</view>
		<uni-popup ref="orderDetailHelp" type="dialog">
			<ai-popup-dialog :cancelShow="false" btname="我知道了" :message="HelpMessage" @confirm="close"></ai-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import aiOrderGoodsCard from '@/components/ai-card/ai-order-goods-card.vue'
	export default {
		components: {
			aiOrderGoodsCard,
		},
		data() {
			return {
				selTag: "my",
				HelpMessage: [
					{
						title: "已结算：",
						content: "即已收货的订单且没有产生售后维权的订单"
					},
					{
						title: "已失效：",
						content: "退款失效订单，订单系统会自动从余额 扣除佣金；"
					}
				],
				oderStatus: [
					{
						id: 1,
						name: "全部"
					},
					{
						id: 2,
						name: "已付款"
					},
					{
						id: 3,
						name: "已收货"
					},
					{
						id: 4,
						name: "已结算"
					},
					{
						id: 5,
						name: "已失效"
					},
				],
				selStatusIndex: 0,
				oderData: [
					{
						pic: "/static/mock/mock-01.png",
						title: "虎标冻干柠檬片70g*2组合 柠檬泡茶柠檬泡水喝的花茶…",
						oderNum: "202020202020220",
						oderMoney: "7.96",
						oderDate: "2020-04-09 11:29:28",
						oderStatus: "已付款"
					},
					{
						pic: "/static/mock/mock-01.png",
						title: "虎标冻干柠檬片70g*2组合 柠檬泡茶柠檬泡水喝的花茶…",
						oderNum: "202020202020220",
						oderMoney: "7.96",
						oderDate: "2020-04-09 11:29:28",
						oderStatus: "已收货"
					},
					{
						pic: "/static/mock/mock-01.png",
						title: "虎标冻干柠檬片70g*2组合 柠檬泡茶柠檬泡水喝的花茶…",
						oderNum: "202020202020220",
						oderMoney: "7.96",
						oderDate: "2020-04-09 11:29:28",
						oderStatus: "已结算"
					},
					{
						pic: "/static/mock/mock-01.png",
						title: "虎标冻干柠檬片70g*2组合 柠檬泡茶柠檬泡水喝的花茶…",
						oderNum: "202020202020220",
						oderMoney: "7.96",
						oderDate: "2020-04-09 11:29:28",
						oderStatus: "已失效"
					}
				]
			}
		},
		onShow() {
			this.oderData = []
		},
		methods: {
			//选择我的订单或团队订单
			selCategory(name){
				this.selTag = name
			},
			//选择订单状态
			selStatus(id, index){
				if(this.selStatusIndex != index){
					this.selStatusIndex = index
					this.oderData = []
				}
				console.log(this.selStatusIndex)
				console.log(id)
			},
			help(){
				this.$refs.orderDetailHelp.open()
			},
			close(done){
				done()
			},
			navBack(){
				uni.navigateBack()
			},
			navTo(url){
				this.$aiRouter.navTo(url)
			}
		}
	}
</script>

<style lang="scss">
	.oder-body {
		width: 750rpx;
		padding: 10px 30rpx 30px;
	}
	/*顶部tabbar*/
	.nav-sel {
		width: 380rpx;
		position: relative;
		height: 35px;
		line-height: 35px;
		border: 1px solid #FFA570;
		
		border-radius: 17px;
		.ns-my {
			position: absolute;
			display: inline-block;
			font-size: 15px;
			width: 200rpx;
			height: 33px;
			line-height: 33px;
			text-align: center;
			border-radius: 17px;
			color: #FFA570;
		}
		.ns-group {
			display: inline-block;
			position: absolute;
			background-color: #FFFFFF;
			font-size: 15px;
			width: 200rpx;
			height: 33px;
			line-height: 33px;
			text-align: center;
			right: 0;
			border-radius: 17px;
			color: #FFA570;
		}
		.sel-my {
			z-index: 100;
			background-color: #FFA570;
			color: #ffffff;
		}
		.sel-group {
			z-index: 100;
			background-color: #FFA570;
			color: #ffffff;
			
		}
	}
	/*订单状态选项，已付款、已收货等*/
	.status-box {
		height: 45px;
		padding: 0 14px;
		border-radius: 8px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 15px;
		color: #999999;
		.sel-status {
			color: #333333;
			font-weight: bold;
		}
	}
	
	/*订单列表*/
	.ol-item {
		width: 690rpx;
		margin: 10px 0 0 0;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
	}
</style>
