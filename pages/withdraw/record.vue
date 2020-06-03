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
				<view v-if="listPlaceHolder" class="withdraw-list-item">
					<view style="text-align: center;">没有提现记录</view>
				</view>
				<view class="withdraw-list-item" :class="item.status == '处理中' ? 'withdraw-list-item-color' : null" v-for="(item, index) in recordData" :key="index">
					<text class="withdraw-list-item-time">{{item.create_time}}</text>
					<text class="withdraw-list-item-num">￥{{item.cash}}</text>
					<text class="withdraw-list-item-staus">{{item.status}}</text>
				</view>
				<uni-load-more v-if="!listPlaceHolder" :status="uniLoadMoreStatus"></uni-load-more>
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
				limit: 50,
				recordData: [],
				listPlaceHolder: true,
				uniLoadMoreStatus: "more",
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
					this.uniLoadMoreStatus = "noMore"
					return
				}
				this.$api.getWithdrawRecord({
					page: this.page,
					limit: this.limit,
					uid: this.$store.state.userInfo.id
				}).then(res => {
					if(res.data.data.total = 0){
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
		background: #F9F9F9;
	}
	.withdraw-box {
		border-radius: 8px;
		width: 686rpx;
		background: #FFFFFF;
		margin: 10px auto 0;
		.withdraw-list-head {
			height: 47px;
			line-height: 47px;
			font-size: 16px;
			border-bottom:1px solid #E5E5E5;
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
			color: #999999;
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
			color: #F47A73;
		}
	}
</style>
