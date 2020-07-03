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
						<view>{{item.mobile}}</view>
					</view>
				</view>
				<view class="tcb-item-hidden" v-show="iconType[index] == 'arrowdown'">{{item.remark}}</view>
			</view>

			<uni-load-more v-if="!aiNoContent" :status="uniLoadMoreStatus"></uni-load-more>
		</view>
		<view style="position: fixed; top: 30% ;">
			<ai-null v-if="aiNoContent" explain="哎呀！暂时还没有记录哦！"></ai-null>
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
				iconType: []
			}
		},
		onLoad(res) {
			this.taskId = res.id
			this.taskTitle = res.tasktitle
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
				let userId = uni.getStorageSync("userInfo").client.id
				this.$api.postTaskCheckHistory({
					user_id: userId,
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
						this.iconType.push("arrowup")
					}
				})
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
					color: #FF716E;
				}
			
				.tcb-io-status-fail {
					color: #666666;
				}
			
				.tcb-io-status-load {
					color: #FFA570;
				}
			}
			
			.tcb-item-two {
				display: flex;
				justify-content: space-between;
				margin: 3px 0 0 0;
				font-size: 12px;
				color: #999999;
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
