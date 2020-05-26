<template>
	<view>
		<ai-navbar
		    title="提现记录"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="withdraw-box">
			<view>
			    <view class="withdraw-list-head">
				    <text class="withdraw-list-head-time">时间</text>
				    <text class="withdraw-list-head-num">金额</text>
				    <text class="withdraw-list-head-status">状态</text>
			    </view>
			</view>
			<view>
				<view class="withdraw-list-item" :class="item.status == '处理中' ? 'withdraw-list-item-color' : null" v-for="(item, index) in recordData" :key="index">
					<text class="withdraw-list-item-time">{{item.create_time}}</text>
					<text class="withdraw-list-item-num">￥{{item.cash}}</text>
					<text class="withdraw-list-item-staus">{{item.status}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				lastPage: 1,
				limit: 5,
				recordData: []
			}
		},
		onLoad() {
			this.getRecord()
		},
		onReachBottom(){
			this.getRecord()
		},
		methods: {
			getRecord(){
				
				if(this.page > this.lastPage){
					console.log("没有更多数据")
					return
				}
				this.$api.getWithdrawRecord({
					page: this.page,
					limit: this.limit,
					uid: this.$store.state.userInfo.id
				}).then(res => {
					this.page += 1
					this.lastPage = res.data.data.last_page
					//this.recordData = res.data.data.data
					for(let item of res.data.data.data){
						if(item.status == 0){
							item.status = "处理中"
						}
						if(item.status == 1){
							item.status = "通过"
						}
						if(item.status == 2){
							item.status = "未通过"
						}
						this.recordData.push(item)	
					}
				})
			}
		}
	}
</script>

<style lang="scss">
    page {
		background:rgba(249,249,249,1);
	}
	.withdraw-box {
		border-radius: 8px;
		width: 686rpx;
		background: rgba(255,255,255,1);
		margin: 10px auto 0;
		.withdraw-list-head {
			height: 47px;
			line-height: 47px;
			font-size: 16px;
			border-bottom:1px solid rgba(229,229,229,1);
			.withdraw-list-head-time {
				display: inline-block;
				width: 300rpx;
				padding: 0 0 0 30px;
			}
			.withdraw-list-head-num {
				display: inline-block;
				padding: 0 0 0 7px;
				width: 180rpx;
			}
			.withdraw-list-head-status {
				display: inline-block;
				padding: 0 0 0 7px;
				width: 200rpx;
			}
		}
		.withdraw-list-item {
			height: 42px;
			line-height: 42px;
			font-size: 26rpx;
			color:rgba(153,153,153,1);
			margin: 0 15px;
			.withdraw-list-item-time {
				display: inline-block;
				width: 285rpx;
			}
			.withdraw-list-item-num {
				display: inline-block;
				width: 180rpx;
			}
			.withdraw-list-item-staus {
				display: inline-block;
				width: 150rpx;
			}
		}
		.withdraw-list-item-color {
			color: rgba(244,122,115,1);
		}
	}
</style>
