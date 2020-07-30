<template>
	<view style="padding: 0 0 50px;">
		<!--登录-->
		<view v-if="!loginState" class="loginmm" style="padding: 80px 0 0 0;">
			<ai-login-wechat noteBottom="60px" jumpUrl="/pages/index/index?tabId=1"></ai-login-wechat>
		</view>
		
		<!--赚金页面-->
		<view v-if="loginState">
			<uni-nav-bar fixed="true">
				<block slot="left">
					<view style="margin: 0 0 0 5px; position: relative;" :class="taskKind == 'union' ? 'bar-title-sel' : 'bar-title'"
					 @click="selTaskKind('union')">
						<text style="display: inline-block">公会</text>
						<view v-show="taskKind =='union'" style="position: absolute; display: inline-block; left: 0; bottom: -7px;">
							<image style="width: 20px;" src="/static/icon/across-ling-01.png" mode="widthFix"></image>
						</view>
					</view>
					<view style="margin: 0 0 0 20px; position: relative;" :class="taskKind == 'newcomer' ? 'bar-title-sel' : 'bar-title'"
					 @click="selTaskKind('newcomer')">
						<text style="display: inline-block">拉新</text>
						<view v-show="taskKind =='newcomer'" style="position: absolute; display: inline-block; left: 0; bottom: -7px;">
							<image style="width: 20px;" src="/static/icon/across-ling-01.png" mode="widthFix"></image>
						</view>
					</view>
				</block>
			</uni-nav-bar>
			<view class="task-body">
				<view class="task-status task-status-having" v-if="taskList.length != 0">
					<image class="task-status-icon" src="/static/icon/cylinder-01.png" mode="widthFix"></image>
					<view class="task-status-title">火热进行中</view>
				</view>
				<view class="tb-item" v-for="(item, index) in taskList" :key="index" v-if="taskList.length != 0">
					<view class="tb-item-content" @click="navToDetail({jumpara:'id=' + item.id + '&is_end=' + item.is_end, lock: item.is_lock})">
						<view class="tb-ic-shade" v-if="item.is_lock">
							<view class="tb-ic-lock">
								<image class="tb-ic-lock-icon" src="/static/icon/lock-01.png" mode="widthFix"></image>
								<text>完成{{item.parent}}解锁</text>
							</view>
						</view>
						<image class="tb-ic-img" :src="item.pic"></image>
					</view>
					<ai-title-list :title="item.title"></ai-title-list>
					<view class="tb-item-head">
						<view class="tb-ih-time">{{item.start_time}}-{{item.end_time}}</view>
					</view>
				</view>
				<view class="task-status task-status-past" v-if="pastTaskList.length != 0">
					<image class="task-status-icon" src="/static/icon/cylinder-01.png" mode="widthFix"></image>
					<view class="task-status-title">往期活动</view>
				</view>
				<view v-if="pastTaskList.length != 0" class="tb-item" v-for="(item, index) in pastTaskList" :key="index">
					<view class="tb-item-content" @click="navToDetail({jumpara:'id=' + item.id + '&is_end=' + item.is_end, lock: item.is_lock})">
						<view class="tb-ic-shade">
							<view class="tb-ic-lock-past">活动已结束</view>
						</view>
						<image class="tb-ic-img" :src="item.pic"></image>
					</view>
					<ai-title-list :title="item.title"></ai-title-list>
					<view class="tb-item-head">
						<view class="tb-ih-time">{{item.start_time}}-{{item.end_time}}</view>
					</view>
				</view>
			</view>
			<!--下拉加载提示-->
			<uni-load-more :status="uniLoadMoreStatus"></uni-load-more>
			<uni-popup ref="popup">
				<ai-popup-dialog :message="dialogMessage" btname="我知道了" @confirm="close" :cancelShow="false"></ai-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import aiTitleList from '@/components/ai-list/ai-title-list.vue'
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	import aiPopupDialog from '@/components/ai-popup/ai-popup-dialog.vue'
	import aiLoginWechat from '@/components/ai-login/ai-login-wechat.vue'
	export default {
		components: {
			aiTitleList,
			mixLoading,
			aiPopupDialog,
			aiLoginWechat
		},
		data() {
			return {
				taskKind: "union",
				taskListFlag: true,
				unionTask: [/*{
					id: 0,
					title: "加入公会赚赏金",
					is_end: true,
					pic: '/static/mock/mock-02.png',
					start_time: "0000.00.00",
					end_time: "0000.00.00"
				}*/],
				taskList: [],
				pastTaskList: [],
				nextPage: true,
				//下拉加载提示类型
				uniLoadMoreStatus: "noMore",
				dialogMessage: [{
					title: "温馨提醒",
					content: "很抱歉！您暂不符合活动推广要求，请关注「爱小兔」微信公众号购买相关服务后领取赚金任务"
				}]
			}
		},
		computed:{
			loginState() {
				return this.$store.state.hasLogin
			},
		},
		methods: {
			close(done) {
				done()
			},
			selTaskKind(tag) {
				if (this.taskKind == tag) {
					return
				}
				this.taskKind = tag
				this.taskList = []
				this.pastTaskList = []
				this.nextPage = true
				if (tag == "union") {
					this.getUnionList()
				}
				if (tag == "newcomer") {
					this.getTaskList()
				}
			},
			navToDetail(paras) {
				if (!this.$store.state.hasLogin) {
					this.$aiRouter.navTo('/pages/login/loginPhone?jumpUrl=/pages/index/index?tabId=1')
					return
				}
				if (this.$store.state.userInfo.level == "3" || this.$store.state.userInfo.level == "4" || this.$store.state.userInfo
					.level == "8") {
					if (this.taskKind == "union") {
						if (paras.lock == 0) {
							this.$aiRouter.navTo("/pages/task/unionTaskDetail?" + paras.jumpara)
						} else {
							return
						}
					}
					if (this.taskKind == "newcomer") {
						this.$aiRouter.navTo("/pages/task/taskDetail?" + paras.jumpara)
					}
					return
				}
				this.$refs.popup.open()
			},
			getTaskList() {
				if(!this.nextPage){
					return true
				}
				this.uniLoadMoreStatus = "loading"
				return this.$api.postTaskList().then(res => {
					for (let item of res.data.data.data) {
						item.start_time = item.start_time.replace(/-/g, '.')
						item.end_time = item.end_time.replace(/-/g, '.')
						if (item.is_end == 0) {
							this.taskList.push(item)
						} else {
							this.pastTaskList.push(item)
						}
					}
					if(res.data.data.current_page >= res.data.data.last_page){
						this.uniLoadMoreStatus = "noMore"
						this.nextPage = false
					}else{
						this.uniLoadMoreStatus = "more"
					}
					return true
				})
			},
			getUnionList() {
				if(!this.nextPage){
					true
				}
				this.uniLoadMoreStatus = "loading"
				return this.$api.postTaskList({
					type: 2
				}).then(res => {
					for (let item of res.data.data.data) {
						item.start_time = item.start_time.replace(/-/g, '.')
						item.end_time = item.end_time.replace(/-/g, '.')
						if (item.is_end == 0) {
							this.taskList.push(item)
						} else {
							this.pastTaskList.push(item)
						}
					}
					if(res.data.data.current_page >= res.data.data.last_page){
						this.uniLoadMoreStatus = "noMore"
						this.nextPage = false
					}else{
						this.uniLoadMoreStatus = "more"
					}
					return true
				})
			},
			//组件加载时运行的函数
			pageOnload() {
				// this.taskKind = "union"
				// //this.taskList = this.unionTask
				if(this.taskListFlag){
					this.getUnionList()
					this.taskListFlag = false
				}
				// console.log("加载 赚金 页面，可以把网络请求放这里")
			},
			//页面下拉时刷新组件
			pageRefresh() {
				const _this = this
				_this.nextPage = true
				_this.taskList = []
				_this.pastTaskList = []
				if (_this.taskKind == "union") {
					uni.startPullDownRefresh({
						success: function() {
							_this.getUnionList().then(res => {
								if (res) {
									uni.stopPullDownRefresh()
								}
							})
						}
					})
				}
				if (_this.taskKind == "newcomer") {
					uni.startPullDownRefresh({
						success: function() {
							_this.getTaskList().then(res => {
								if (res) {
									uni.stopPullDownRefresh()
								}
							})
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.bar-title {
		font-size: 15px;
		font-weight: 400;
		color: #333333;
	}

	.bar-title-sel {
		font-size: 20px;
		font-weight: bold;
		color: #FF5350;
	}


	.task-body {
		width: 750rpx;
		padding: 10px 30rpx 0;

		.task-status {
			display: flex;
			align-items: center;

			.task-status-icon {
				width: 3px;
			}

			.task-status-title {
				font-size: 16px;
				font-weight: bold;
				margin: 0 0 0 5px;
			}
		}

		.task-status-having {
			margin: 0 0 10px;
		}

		.task-status-past {
			margin: 20px 0 10px;
		}
	}

	.tb-item {
		width: 690rpx;
		padding: 10px;
		margin: 0 0 10px 0;
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;

		.tb-item-head {
			height: 20px;
			line-height: 20px;
			position: relative;
		}

		.tb-ih-time {
			font-size: 12px;
			color: #999999;
		}

		.tb-item-content {

			border-radius: 8px;
			position: relative;

			.tb-ic-img {
				width: 650rpx;
				height: 125px;
				border-radius: 8px;
			}

			.tb-ic-shade {
				position: absolute;
				z-index: 10;
				background-color: rgba(255, 215, 215, 0.6);
				width: 650rpx;
				height: 125px;
				text-align: center;
				padding: 45px 0rpx;

				.tb-ic-lock-past {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 340rpx;
					height: 35px;
					font-size: 15px;
					border-radius: 20px;
					margin: 0 auto;
					background-color: #F47A73;
					color: #FFFFFF;
					opacity: 0.8;
				}

				.tb-ic-lock {
					position: relative;
					display: inline-block;
					padding: 0 35rpx;
					min-width: 340rpx;
					max-width: 500rpx;
					height: 35px;
					line-height: 35px;
					font-size: 15px;
					border-radius: 20px;
					background-color: #FF5350;
					color: #FFFFFF;

					.tb-ic-lock-icon {
						width: 15px;
						margin: 0 5px 0 0;
						position: relative;
						top: 3px;
					}
				}

				.tb-ic-shade-describe {
					position: relative;
					margin: 0 auto;
					width: 220rpx;
					height: 35px;
					line-height: 35px;
					font-size: 15px;
					border-radius: 20px;
					text-align: center;
					background-color: #000000;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
</style>
