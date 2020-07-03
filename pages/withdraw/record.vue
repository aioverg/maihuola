<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="结算明细">
			<block slot="right">
				<image @click="datePicker" src="/static/icon/calendar-01.png" style="width: 20px; margin: 0 10px 0 0;" mode="widthFix"></image>
			</block>
		</uni-nav-bar>
		<view class="withdraw-box">
			<view class="wb-item" v-for="(item, index) in recordData" :key="index">
				<view class="wb-one" :class="item.status == '处理中' ? 'wb-status-loading' : (item.status == '审核失败' ? 'wb-status-fail' : null)">
					<view class="wb-status">{{item.status}}</view>
					<view class="wb-num">-¥{{item.cash}}</view>
				</view>
				<view class="wb-time">{{item.create_time}}</view>
			</view>
			<uni-load-more v-if="!listPlaceHolder" :status="uniLoadMoreStatus"></uni-load-more>
		</view>
		<view v-if="listPlaceHolder" class="withdraw-list-item">
			<ai-no-content describe="哎呀！暂时还没有记录哦！"></ai-no-content>
		</view>
		<ai-date-picker ref="datePicker" @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate" :defaultValue="pickerDate"></ai-date-picker>
	</view>
</template>

<script>
	import aiDatePicker from '@/components/ai-picker/ai-date-picker.vue'
	export default {
		components: {
			aiDatePicker
		},
		data() {
			return {
				startDate: "2020-01-01",
				endDate: "2020-01-01",
				pickerDate: "2020-01-01",
				page: 1,
				lastPage: 1,
				limit: 50,
				recordData: [],
				listPlaceHolder: true,
				uniLoadMoreStatus: "more",
			}
		},
		onLoad() {
			this.getRecord()
			this.nowDate()
		},
		onReachBottom(){
			this.getRecord()
		},
		methods: {
			getRecord(){
				if(this.page > this.lastPage){
					this.uniLoadMoreStatus = "noMore"
					return
				}
				this.$api.getWithdrawRecord({
					page: this.page,
					limit: this.limit,
					uid: this.$store.state.userInfo.id
				}).then(res => {
					if(res.data.data.total == 0){
						this.listPlaceHolder = true
						return
					}else{
						this.listPlaceHolder = false
					}
					this.page += 1
					this.lastPage = res.data.data.last_page
					if(this.page > this.lastPage){
						this.uniLoadMoreStatus = "noMore"
					}else{
						this.uniLoadMoreStatus = "more"
					}
					
					for(let item of res.data.data.data){
						if(item.status == 0){
							item.status = "处理中"
						}
						if(item.status == 1){
							item.status = "提现成功"
						}
						if(item.status == 2){
							item.status = "审核失败"
						}
						this.recordData.push(item)
					}
				})
			},
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
				let dateArray = new Date().toLocaleDateString().split('/')
				if(dateArray[1].length == 1){
					dateArray[1] = "0" + dateArray[1]
				}
				if(dateArray[1].length == 1){
					dateArray[2] = "0" + dateArray[2]
				}
				this.endDate = dateArray.join('-')
				this.pickerDate = dateArray.join('-')
			},
		}
	}
</script>

<style lang="scss">
	.withdraw-box {
		width: 750rpx;
		padding: 30rpx;
		background: #FFFFFF;
		margin: 10px auto 0;
		.wb-item {
			height: 57px;
			padding: 10px 15px;
			margin: 0 0 10px;
			border-radius: 8px;
			box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
			.wb-one {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.wb-status {
					font-size: 13px;
				}
				.wb-num {
					font-size: 15px;
					color: #FF716E;
				}
			}
			.wb-status-fail {
				color: #999999;
			}
			.wb-status-loading {
				color: #FFA570;
			}
			.wb-time {
				font-size: 12px;
				color: #999999;
				margin: 5px 0 0;
			}
		}
	}
</style>
