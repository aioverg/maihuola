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
					<view class="ted-sel-title">支付宝扫码领福利</view>
					<image @click="showSelBox()" class="ted-sel-icon" src="/static/icon/rank-01.png"></image>
				</view>
				<view class="ted-sel-item-box" v-show="selBox">
					<view class="ted-sel-item">
						<uni-icons type="checkmarkempty" color="#FFA570" size="18"></uni-icons>
						<view class="ted-sel-item-name">全部</view>
					</view>
					<view class="ted-sel-item">
						<uni-icons type="checkmarkempty" color="#FFA570" size="18"></uni-icons>
						<view class="ted-sel-item-name">支付宝扫码领福利</view>
					</view>
				</view>
			</view>
			<view class="ted-item">
				<view class="ted-item-one">
					<view class="ted-item-title">支付宝扫码领福利</view>
					<view class="ted-item-num">¥7.96</view>
				</view>
				<view class="ted-item-two">
					<view>178****6789</view>
					<view>2020-04-09 11:29:28</view>
				</view>
			</view>
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
				selBox: false
			}
		},
		onLoad() {
			this.nowDate()
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
			showSelBox(){
				this.selBox = !this.selBox
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
