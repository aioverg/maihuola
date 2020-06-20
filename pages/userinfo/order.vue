<template>
	<view>
		<uni-nav-bar fixed="true">
			<block slot="left">
				<view style="width: 150rpx;">
					<uni-icons  type="arrowleft" size="24"></uni-icons>
				</view>
			</block>
			<block>
				<view class="nav-sel">
					<view class="ns-my" @click="selCategory('my')" :class="selTag == 'my' ? 'sel-my' : ''">我的订单</view>
					<view class="ns-group" @click="selCategory('order')" :class="selTag == 'order' ? 'sel-group' : ''">团队定单</view>
				</view>
			</block>
			<block slot="right">
				<view style="width: 150rpx; padding: 0 10px 0 0; text-align: right;">
				    <image src="/static/icon/search-02.png" style="width: 20px; margin: 0 10px 0 0;" mode="widthFix"></image>
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
				<view class="ol-item" v-for="(item, index) in olList" :key="index">
					<image class="ol-item-img" :src="item.pic"></image>
					<view class="ol-item-info">
						<view class="ol-item-title">{{item.title}}</view>
						<view class="ol-item-one">
							<view class="ol-num">订单号：{{item.oderNum}}</view>
							<view class="ol-money">¥{{item.oderMoney}}</view>
						</view>
						<view class="ol-item-two">
							<view class="ol-date">{{item.oderDate}}</view>
							<view class="ol-status" :class="item.oderStatus == '已失效' ? 'ol-status-color' : '' ">{{item.oderStatus}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="orderDetailHelp" type="dialog">
			<ai-popup-dialog :cancelShow="false" btname="我知道了" :message="HelpMessage" @confirm="close"></ai-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
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
				olList: [
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
		methods: {
			//选择我的订单或团队订单
			selCategory(name){
				this.selTag = name
			},
			//选择订单状态
			selStatus(id, index){
				this.selStatusIndex = index
				console.log(id)
			},
			help(){
				this.$refs.orderDetailHelp.open()
			},
			close(done){
				done()
			}
		}
	}
</script>

<style lang="scss">
	.oder-body {
		width: 750rpx;
		padding: 10px 15px 30px 15px;
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
		}
		.sel-my {
			z-index: 100;
			font-weight: bold;
			background-color: #FFA570;
		}
		.sel-group {
			z-index: 100;
			font-weight: bold;
			background-color: #FFA570;
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
		padding: 8px 15px 8px 8px;
		margin: 10px 0 0 0;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		display: flex;
		.ol-item-img {
			width: 73px;
			height: 73px;
			margin: 0 10rpx 0 0;
		}
		.ol-item-title {
			width: 480rpx;
			font-size: 13px;
			height: 34px;
			line-height: 17px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.ol-item-one {
			margin: 3px 0 0 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			line-height: 19px;
			.ol-num {
				font-size: 11px;
				color: #999999;
			}
			.ol-money {
				font-size: 15px;
				color: #FF716E;
			}
		}
		.ol-item-two {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.ol-date {
				font-size: 11px;
				color: #999999;
			}
			.ol-status {
				font-size: 11px;
				color: #999999;
			}
			.ol-status-color {
				color: #FF1968;
			}
		}
	}
</style>
