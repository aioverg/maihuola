<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="审核记录"></uni-nav-bar>
		<view class="task-check-body">
			<view class="tcb-item" v-for="(item, index) in dataList" :key="index">
				<view class="tcb-item-show">
					<view class="tcb-item-one">
						<view class="tcb-io-title">{{item.title}}</view>
						<view class="tcb-io-status" :class="item.status == '审核通过' ? 'tcb-io-status-pass' : (item.status == '未通过') ? 'tcb-io-status-fail' : 'tcb-io-status-load' ">{{item.status}}</view>
						<uni-icons v-if="item.status == '未通过'" :type="iconType[index]" @click="showCause(index)" size="10" style="margin: 4px 0 0 4px;"></uni-icons>
					</view>
					<view class="tcb-item-two">
						<view>{{item.time}}</view>
						<view v-if="type == 1">{{item.mobile}}</view>
						<view v-if="type == 3" :class="item.status == '审核通过' ? 'tcb-io-status-pass-num' : (item.status == '未通过') ? 'tcb-io-status-fail-num' : 'tcb-io-status-load-num' ">¥{{item.amount}}</view>
					</view>
				</view>
				<view class="tcb-item-hidden" v-show="iconType[index] == 'arrowup'">{{item.remark}}</view>
			</view>
			
			<view style="width: 690rpx; position: fixed; top: 30% ;">
				<ai-no-content v-if="aiNoContent" describe="哎呀！暂时还没有记录哦！"></ai-no-content>
			</view>
			<uni-load-more v-if="!aiNoContent" :status="uniLoadMoreStatus"></uni-load-more>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taskId: 0,
				taskTitle: null,
				dataList: [],
				aiNoContent: false,
				//下拉加载提示类型
				uniLoadMoreStatus: "more",
				page: 1,
				lastPage: 1,
				type: "",
				iconType: []
			}
		},
		onLoad(res) {
			this.taskId = res.id
			this.taskTitle = res.tasktitle
			this.type = res.type
			this.getDataList()
		},
		onReachBottom() {
			this.getDataList()
		},
		methods: {
			showCause(index){
				//this.iconType[index] = "arrowdown"
				if(this.iconType[index] == "arrowup"){
					this.iconType.splice(index, 1, "arrowdown")
				}else{
					this.iconType.splice(index, 1, "arrowup")
				}
			},
			getDataList() {
				if (this.page > this.lastPage) {
					this.uniLoadMoreStatus = "noMore"
					return
				}
				if(this.type == 1){
					this.$api.postTaskCheckHistory({
						user_id: this.$store.state.userInfo.id,
						mission_id: this.taskId,
						page: this.page,
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
							item.title = this.taskTitle
							if (item.status == 0) {
								item.status = "未通过"
							}
							if (item.status == 1) {
								item.status = "审核通过"
							}
							if (item.status == 2 || item.status == 3) {
								item.status = "待审核"
							}
							this.dataList.push(item)
							this.iconType.push("arrowdown")
						}
					})
				}
				if(this.type == 3){
					this.$api.postTaskCheckHistory({
						user_id: this.$store.state.userInfo.id,
						mission_id: this.taskId,
						page: this.page,
						type: 3,
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
							item.title = this.taskTitle
							if (item.status == 0) {
								item.status = "未通过"
							}
							if (item.status == 1) {
								item.status = "审核通过"
							}
							if (item.status == 2 || item.status == 3) {
								item.status = "待审核"
							}
							this.dataList.push(item)
							this.iconType.push("arrowdown")
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.task-check-body {
		width: 750rpx;
		padding: 10px 30rpx 15px;
	}

	.tcb-item {
		margin: 0 0 10px;
		width: 690rpx;
		position: relative;
		.tcb-item-show {
			height: 57px;
			width: 690rpx;
			padding: 10px 30rpx;
			border-radius: 8px;
			box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
			.tcb-item-one {
				height: 17px;
				line-height: 17px;
				display: flex;
				justify-content: space-between;
			
				.tcb-io-title {
					font-size: 13px;
					flex-grow: 1;
					padding: 0 5px 0 0;
				}
			
				.tcb-io-status {
					font-size: 15px;
				}
			
				.tcb-io-status-pass {
					color: #FF5350;
				}
			
				.tcb-io-status-fail {
					color: #666666;
				}
			
				.tcb-io-status-load {
					color: #FFA570;
				}
			}
			
			.tcb-item-two {
				height: 17px;
				line-height: 17px;
				display: flex;
				justify-content: space-between;
				margin: 3px 0 0 0;
				font-size: 12px;
				color: #999999;
				.tcb-io-status-pass-num {
					color: #FF5350;
				}
							
				.tcb-io-status-fail-num {
					color: #999999;
				}
							
				.tcb-io-status-load-num {
					color: #FF716E;
				}
			}
		}
		.tcb-item-hidden {
			width: 650rpx;
			padding: 6px 30rpx;
			margin: 0 auto;
			box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
			border-radius: 8px;
			color: #999999;
			font-size: 12px;
		}
		
	}
</style>
