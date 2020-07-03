<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="赚金结算明细">
			<block slot="right">
				<image @click="datePicker" src="/static/icon/calendar-01.png" style="width: 20px; margin: 0 10px 0 0;" mode="widthFix"></image>
			</block>
		</uni-nav-bar>
		<view class="task-earn-detail">
			<view class="ted-sel">
				<view class="ted-sel-box">
					<view class="ted-sel-title">{{selTaskTitle}}</view>
					<image @click="showSelBox()" class="ted-sel-icon" src="/static/icon/rank-01.png"></image>
				</view>
				<view class="ted-sel-item-box" v-show="selBox">
					<view class="ted-sel-item" v-for="(item, index) of taskList" :key="index" @click="selTask(index)">
						<view style="width: 18px; height: 18px;">
							<uni-icons type="checkmarkempty" v-show="selTaskIndex == index" color="#FFA570" size="18"></uni-icons>
						</view>
						<view class="ted-sel-item-name" :class="selTaskIndex == index ? 'ted-sel-item-name-color' : ''">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view @click="hiddenSelBox()" class="ted-item" v-for="(item, index) in EarnDetailList" :key="index">
				<view class="ted-item-one">
					<view class="ted-item-title">{{item.mission}}</view>
					<view class="ted-item-num">¥{{item.amount}}</view>
				</view>
				<view class="ted-item-two">
					<view>{{item.mobile}}</view>
					<view>{{item.review_time}}</view>
				</view>
			</view>
			<uni-load-more v-if="!aiNoContent" :status="uniLoadMoreStatus"></uni-load-more>
		</view>
		<view style="position: fixed; top: 30% ;">
			<ai-null v-if="aiNoContent" explain="哎呀！暂时还没有记录哦！"></ai-null>
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
				aiNoContent: false,
				uniLoadMoreStatus: "more",
				time: 0,
				selBox: false,
				taskList: [],
				selTaskIndex: 0,
				selTaskId: 0,
				selTaskTitle: "全部",
				EarnDetailList: [],
				page: 1,
				lastPage: 1
			}
		},
		onLoad() {
			this.nowDate()
			this.getTaskList()
			this.getTaskEarnDetail()
		},
		onReachBottom() {
			this.getTaskEarnDetail()
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
				this.page = 1
				this.lastPage = 1
				this.EarnDetailList = []
				this.getTaskEarnDetail(this.selTaskId, e.dateValue)
				
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
			showSelBox(){
				this.selBox = !this.selBox
			},
			hiddenSelBox(){
				if(this.selBox){
					this.selBox = !this.selBox
				}
			},
			selTask(index){
				this.selTaskIndex = index
				this.selTaskId = this.taskList[index].id
				this.selBox = !this.selBox
				this.selTaskTitle = this.taskList[index].title
				this.page = 1
				this.lastPage = 1
				this.EarnDetailList = []
				this.getTaskEarnDetail(this.taskList[index].id)
			},
			getTaskList(){
				this.$api.postTaskList().then(res => {
					res.data.data.data.unshift({
						id: 0,
						title: "全部"
					})
					this.taskList = res.data.data.data
					
					console.log(res.data.data.data)
				})
			},
			getTaskEarnDetail(taskId=0, time=0 ){
				if (this.page > this.lastPage) {
					this.uniLoadMoreStatus = "noMore"
					return
				}
				this.$api.postTaskEarnDetail({
					user_id: this.$store.state.userInfo.id,
					mission_id: taskId,
					time: time,
					page: this.page
				}).then(res => {
					if (res.data.data.total == 0) {
						this.aiNoContent = true
						return
					} else {
						this.aiNoContent = false
					}
					this.page += 1
					this.lastPage = res.data.data.last_page
					if (this.page > this.lastPage) {
						this.uniLoadMoreStatus = "noMore"
					} else {
						this.uniLoadMoreStatus = "more"
					}
					for (let item of res.data.data.data) {
						this.EarnDetailList.push(item)
					}
					console.log(res.data.data.data)
				})
			}
		}
	}
</script>

<style lang="scss">
	.task-earn-detail {
		width: 750rpx;
		padding: 10px 30rpx 78px;
	}
	.ted-sel {
		position: relative;
	}
	.ted-sel-box {
		width: 690rpx;
		height: 45px;
		border-radius: 8px;
		box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.ted-sel-title {
			font-size: 15px;
			font-weight:bold;
		}
		.ted-sel-icon {
			width: 10px;
			height: 14px;
		}
	}
	.ted-sel-item-box {
		width: 630rpx;
		min-height: 20px;
		padding: 5px 100rpx 10px 20rpx;
		border-radius: 8px;
		box-shadow: 0px 0px 20px 0px rgba(255,0,71,0.16);
		position: absolute;
		left: -10rpx;
		top: 10px;
		background-color: #FFFFFF;
		z-index: 20;
		.ted-sel-item {
			display: flex;
			align-items: center;
			padding: 5px 0 0 0;
			.ted-sel-item-name {
				height: 31px;
				width: 465rpx;
				font-size: 15px;
				line-height: 31px;
				margin: 0 0 0 20rpx;
				border-bottom: 1px dashed #E5E5E5;
			}
			.ted-sel-item-name-color {
				color: #FFA570;
			}
		}
		.ted-sel-item:last-of-type .ted-sel-item-name {
			border-bottom: none;
		}
	}
	.ted-item {
		width: 690rpx;
		height: 57px;
		padding: 10px 30rpx;
		margin: 10px 0 0 0;
		border-radius: 8px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		.ted-item-one {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.ted-item-title {
				font-size: 13px;
			}
			.ted-item-num {
				font-size: 15px;
				color: #FF716E;
			}
		}
		.ted-item-two {
			display: flex;
			margin: 5px 0 0 0;
			justify-content: space-between;
			align-items: center;
			color: #999999;
			font-size: 11px;
		}
	}
</style>
