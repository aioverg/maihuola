<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="卖货结算明细">
			<block slot="right">
				<image @click="datePicker" src="/static/icon/calendar-01.png" style="width: 20px; margin: 0 10px 0 0;" mode="widthFix"></image>
				<uni-icons @click="help" type="help" color="#333333" size="24"></uni-icons>
			</block>
		</uni-nav-bar>
		<view class="earn-detail-body">
			<view class="detail-item" v-for="(item, index) in detailList" :key="index">
				<image class="detail-item-img" :src="item.pic"></image>
				<view class="detail-item-info">
					<view class="detail-item-title">{{item.title}}</view>
					<view class="detail-item-one">
						<view class="oder-num">订单号：{{item.oderNum}}</view>
						<view class="oder-money">¥{{item.oderMoney}}</view>
					</view>
					<view class="detail-item-two">
						<view class="oder-date">{{item.oderDate}}</view>
						<view class="oder-status">{{item.oderStatus}}</view>
					</view>
				</view>
			</view>
		</view>
		<ai-date-picker ref="datePicker" @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate" :defaultValue="pickerDate"></ai-date-picker>
		<uni-popup ref="earnDetailHelp" type="dialog">
			<ai-popup-dialog :cancelShow="false" btname="我知道了" :message="HelpMessage" @confirm="close"></ai-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import aiDatePicker from '@/components/ai-picker/ai-date-picker.vue'
	export default {
		components: {
			aiDatePicker
		},
		onLoad() {
			this.nowDate()
		},
		data() {
			return {
				startDate: "2020-01-01",
				endDate: "2020-01-01",
				pickerDate: "2020-01-01",
				HelpMessage: [{
					title: "订单释义",
					content: "该订单是指当月确认收货的订单，如没有发起维权，次月可结算到余额，25号提现"
				}],
				detailList: [
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
						oderStatus: "已付款"
					},
					{
						pic: "/static/mock/mock-01.png",
						title: "虎标冻干柠檬片70g*2组合 柠檬泡茶柠檬泡水喝的花茶…",
						oderNum: "202020202020220",
						oderMoney: "7.96",
						oderDate: "2020-04-09 11:29:28",
						oderStatus: "已付款"
					}
				]
			}
		},
		methods: {
			datePicker(){
				this.$refs.datePicker.show()
			},
			onCancel(e){
				console.log(e);
			},
			onConfirm(e){
				this.pickerDate = e.dateValue;
				console.log(this.pickerDate)
			},
			nowDate(){
				// #ifdef H5
				let dateArray = new Date().toLocaleDateString().split('/')
				if(dateArray[1].length == 1){
					dateArray[1] = "0" + dateArray[1]
				}
				if(dateArray[1].length == 1){
					dateArray[2] = "0" + dateArray[2]
				}
				this.endDate = dateArray.join('-')
				this.pickerDate = dateArray.join('-')
				// #endif
				// #ifdef APP-PLUS
				let dateArray = new Date().toISOString().slice(0, 10)
				this.endDate = dateArray
				this.pickerDate = dateArray
				// #endif
			},
			help(){
				this.$refs.earnDetailHelp.open()
			},
			close(done){
				done()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	.earn-detail-body {
		width: 750rpx;
		padding: 0 15px 30px;
	}
	.detail-item {
		padding: 8px 15px 8px 8px;
		margin: 10px 0 0 0;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		display: flex;
		.detail-item-img {
			width: 73px;
			height: 73px;
			margin: 0 10rpx 0 0;
		}
		.detail-item-title {
			width: 480rpx;
			font-size: 13px;
			height: 34px;
			line-height: 17px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.detail-item-one {
			margin: 3px 0 0 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			line-height: 19px;
			.oder-num {
				font-size: 11px;
				color: #999999;
			}
			.oder-money {
				font-size: 15px;
				color: #FF716E;
			}
		}
		.detail-item-two {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.oder-date {
				font-size: 11px;
				color: #999999;
			}
			.oder-status {
				font-size: 11px;
				color: #999999;
			}
		}
	}
</style>
