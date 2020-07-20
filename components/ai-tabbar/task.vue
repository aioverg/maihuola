<template>
	<view style="padding: 0 0 50px;">
		<uni-nav-bar fixed="true">
			<block slot="left">
				<view style="margin: 0 0 0 5px; position: relative;" :class="taskKind == 'union' ? 'bar-title-sel' : 'bar-title'"
				 @click="selTaskKind('union')">
					<text style="display: inline-block">公会</text>
					<text class="under-line" style="display: inline-block; position: absolute; left: 0; bottom: -4px; width: 20px;"></text>
				</view>
				<view style="margin: 0 0 0 20px; position: relative;" :class="taskKind == 'newcomer' ? 'bar-title-sel' : 'bar-title'"
				 @click="selTaskKind('newcomer')">
					<text style="display: inline-block">拉新</text>
					<text class="under-line" style="display: inline-block; position: absolute; left: 0; bottom: -4px; width: 20px;"></text>
				</view>
			</block>
		</uni-nav-bar>
		<view class="task-body">
			<view class="task-status task-status-having">
				<image class="task-status-icon" src="/static/icon/cylinder-01.png" mode="widthFix"></image>
				<view class="task-status-title">火热进行中</view>
			</view>
			<view class="tb-item" v-for="(item, index) in taskList" :key="index">
				<view class="tb-item-content" @click="navTo('id=' + item.id + '&is_end=' + item.is_end)">
					<view class="tb-ic-shade" v-if="item.is_end">
						<view class="tb-ic-lock">
							<image src="/static/icon/lock-01.png" style="width: 15px; margin: 0 5px 0 0;" mode="widthFix"></image>
							<text>加入工会解锁</text>
						</view>
					</view>
					<image class="tb-ic-img" :src="item.pic"></image>
				</view>
				<ai-title-list :title="item.title"></ai-title-list>
				<view class="tb-item-head">
					<view class="tb-ih-time">{{item.start_time}}-{{item.end_time}}</view>
					<view class="tb-ih-forms" v-if="item.is_end" @click="navTo('id=' + item.id + '&is_end=' + item.is_end)">查看报表</view>
				</view>
			</view>
			<view class="task-status task-status-past">
				<image class="task-status-icon" src="/static/icon/cylinder-01.png" mode="widthFix"></image>
				<view class="task-status-title">往期活动</view>
			</view>
		</view>
		<!--下拉加载提示-->
		<uni-load-more :status="uniLoadMoreStatus"></uni-load-more>
		<mix-loading v-show="refresh"></mix-loading>
		<uni-popup ref="popup">
			<ai-popup-dialog :message="dialogMessage" btname="我知道了" @confirm="close" :cancelShow="false"></ai-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import aiTitleList from '@/components/ai-list/ai-title-list.vue'
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	import aiPopupDialog from '@/components/ai-popup/ai-popup-dialog.vue'
	export default {
		components: {
			aiTitleList,
			mixLoading,
			aiPopupDialog
		},
		data() {
			return {
				taskKind: "union",
				unionTask: [{
					id: 0,
					title: "加入公会赚赏金",
					is_end: true,
					pic: '/static/mock/mock-02.png',
					start_time: "0000.00.00",
					end_time: "0000.00.00"
				}],
				taskList: [],
				//下拉加载提示类型
				uniLoadMoreStatus: "noMore",
				refresh: false,
				dialogMessage: [{
					title: "温馨提醒",
					content: "很抱歉！您暂不符合活动推广要求，请关注「爱小兔」微信公众号购买相关服务后领取赚金任务"
				}]
			}
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
				if (tag == "union") {
					this.taskList = this.unionTask
				}
				if (tag == "newcomer") {
					this.getTaskList()
				}
			},
			navTo(paras) {
				console.log(paras)
				if (!this.$store.state.hasLogin) {
					this.$aiRouter.navTo('/pages/login/loginPhone?jumpUrl=/pages/index/index?tabId=1')
					return
				}
				if (this.$store.state.userInfo.level == "3" || this.$store.state.userInfo.level == "4" || this.$store.state.userInfo.level == "8") {
					if(this.taskKind == "union"){
						this.$aiRouter.navTo("/pages/task/unionTaskDetail?" + paras)
					}
					if(this.taskKind == "newcomer"){
						this.$aiRouter.navTo("/pages/task/taskDetail?" + paras)
					}
					
					return
				}
				this.$refs.popup.open()



			},
			getTaskList() {
				return this.$api.postTaskList().then(res => {
					for (let item of res.data.data.data) {
						item.start_time = item.start_time.replace(/-/g, '.')
						item.end_time = item.end_time.replace(/-/g, '.')
						this.taskList.push(item)
					}
					return true
				})
			},
			//组件加载时运行的函数
			pageOnload() {
				this.taskKind = "union"
				this.taskList = this.unionTask
				console.log("加载 赚金 页面，可以把网络请求放这里")
			},
			//页面下拉时刷新组件
			pageRefresh() {
				const _this = this
				_this.refresh = true
				if (_this.taskKind == "union") {

				}
				if (_this.taskKind == "newcomer") {
					_this.taskList = []
					uni.startPullDownRefresh({
						success: function() {
							_this.getTaskList().then(res => {
								if (res) {
									_this.refresh = false
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
		color: #FF716E;

		.under-line {
			border-bottom: 2px solid #FF716E;
		}
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

		.tb-ih-forms {
			position: absolute;
			top: -10px;
			right: 0;
			font-size: 14px;
			color: #FF716E;
			text-decoration-line: underline;
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
				background-color: #F8F8F8;
				opacity: 0.6;
				width: 650rpx;
				height: 125px;
				padding: 45px 0rpx;

				.tb-ic-lock {
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 280rpx;
					height: 35px;
					font-size: 15px;
					border-radius: 20px;
					margin: 0 auto;
					background-color: #000000;
					opacity: 0.5;
					color: rgba(255, 255, 255, 1);
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
					opacity: 0.5;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
	}
</style>
