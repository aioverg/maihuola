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
				<ai-order-goods-card :data="item"></ai-order-goods-card>
			</view>
		</view>
		<view style="width: 750rpx; padding: 10px 30rpx 0; position: fixed; top: 30% ;">
			<ai-no-content describe="哎呀！暂时还没有记录哦！"></ai-no-content>
		</view>
		<ai-date-picker ref="datePicker" @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate" :defaultValue="pickerDate"></ai-date-picker>
		<uni-popup ref="earnDetailHelp" type="dialog">
			<ai-popup-dialog :cancelShow="false" btname="我知道了" :message="HelpMessage" @confirm="close"></ai-popup-dialog>
		</uni-popup>
		
	</view>
</template>

<script>
	import aiDatePicker from '@/components/ai-picker/ai-date-picker.vue'
	import aiOrderGoodsCard from '@/components/ai-card/ai-order-goods-card.vue'
	export default {
		components: {
			aiOrderGoodsCard,
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
					/*
					{
						pic: "/static/mock/mock-01.png",
						title: "虎标冻干柠檬片70g*2组合 柠檬泡茶柠檬泡水喝的花茶…",
						oderNum: "202020202020220",
						oderMoney: "7.96",
						oderDate: "2020-04-09 11:29:28",
					},
					{
						pic: "/static/mock/mock-01.png",
						title: "虎标冻干柠檬片70g*2组合 柠檬泡茶柠檬泡水喝的花茶…",
						oderNum: "202020202020220",
						oderMoney: "7.96",
						oderDate: "2020-04-09 11:29:28",
					},
					{
						pic: "/static/mock/mock-01.png",
						title: "虎标冻干柠檬片70g*2组合 柠檬泡茶柠檬泡水喝的花茶…",
						oderNum: "202020202020220",
						oderMoney: "7.96",
						oderDate: "2020-04-09 11:29:28",
					}
					*/
				]
			}
		},
		methods: {
			datePicker(){
				this.$refs.datePicker.show()
			},
			onCancel(e){
				//console.log(e);
			},
			onConfirm(e){
				this.pickerDate = e.dateValue;
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
		margin: 10px 0 0 0;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
	}
</style>
