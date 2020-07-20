<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="活动详情">
			<block slot="right">
				<view style="font-size: 15px;" @click="navTo('/pages/task/taskUpload?type=union&id=' + taskId)">上传截图</view>
			</block>
		</uni-nav-bar>
		<hint-box v-if="taskStatus == '0'" content="我们会在2 - 6个工作日完成审核，请您耐心等待..."></hint-box>
		<view class="task-detail-body">
			<view class="task-title">
				<view class="tt-title">{{taskContent.title}}</view>
				<view class="tt-time">（{{taskContent.start_time}}-{{taskContent.end_time}}）</view>
			</view>
			<view class="task-hint">请阅读知悉活动规则后进行任务</view>
			<view class="task-cash">
				<view class="task-cash-one">
					<view class="tc-title">赏金收益（元）：</view>
					<view class="tc-num">{{taskContent.commission}}</view>
					<view class="tc-status">待审核</view>
				</view>
			</view>
			<view class="task-rule">
				<view class="task-rule-title">规则标题规则标题</view>
				<view class="task-rule-content">
					<jyf-parser :html="taskContent.rule"></jyf-parser>
				</view>
			</view>
		</view>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box'
	import jyfParser from "@/components/jyf-parser/jyf-parser"
	import mixLoading from '@/components/mix-loading/mix-loading.vue'
	export default {
		components: {
			hintBox,
			jyfParser,
			mixLoading
		},
		data() {
			return {
				taskId: 0, //任务ID
				taskStatus: "0", //任务是否过期
				taskContent: {
					title: "加入公会赚赏金",
					start_time: "0000.00.00",
					end_time: "0000.00.00",
					commission: "0",
					rule: "555555"
					
				},
				routerKind: "navTo",
				showFlag: true,
				downRefreshFlag: true,
			}
		},
		onLoad(res) {
			// this.showFlag = false
			// this.taskId = res.id
			// this.taskStatus = res.is_end
			// if(res.router){
			// 	this.routerKind = res.router
			// }
			// this.getTaskDetail(res.id)
		},
		onShow() {
			/*if(this.showFlag){
				this.getTaskDetail(this.taskId)
			}*/
		},
		//滑动到底部时请求操作
		onPullDownRefresh() {
			const _this = this
			if(!_this.downRefreshFlag){return}
			_this.downRefreshFlag = false
			uni.startPullDownRefresh({
				success: function() {
					_this.getTaskDetail(_this.taskId).then(res => {
						if(res){
							_this.downRefreshFlag = true
							uni.stopPullDownRefresh()
						}
					})
				},
			})
		},
		methods: {
			navTo(url){
				if(this.routerKind == "navTo"){
					this.$aiRouter.navTo(url)
					return
				}
				if(this.routerKind == "redirect"){
					this.$aiRouter.redirect(url)
					return
				}
			},
			//获取任务信息
			getTaskDetail(id){
				return this.$api.postTaskDetail({
					id: id
				}).then( res => {
					res.data.data.start_time = res.data.data.start_time.replace(/-/g, '.')
					res.data.data.end_time = res.data.data.end_time.replace(/-/g, '.')
					this.taskContent = res.data.data
					this.showFlag = true
					return true
				})
			}
		}
	}
</script>

<style lang="scss">
	.task-detail-body {
		width: 750rpx;
		padding: 10px 30rpx 50px;
	}
	/*任务标题及时间*/
	.task-title {
		display: flex;
		align-items: center;
		position: relative;
		.tt-title {
			font-size: 16px;
			font-weight: bold;
		}
		.tt-time {
			font-size: 12px;
			color: #999999;
		}
		
	}
	/*推广提示*/
	.task-hint {
		margin: 2px 0 10px 0;
		font-size: 12px;
		color: #666666;
	}
	/*结算金额*/
	.task-cash {
		position: relative;
		padding: 0 20rpx;
		margin: 0 0 10px;
		border-radius: 8px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		.task-cash-one {
			display: flex;
			align-items: center;
			height: 49px;
			padding: 0 24rpx;
			.tc-title {
				font-size: 13px;
			}
			.tc-num {
				flex-grow: 1;
				font-size: 20px;
				color: #FF716E;
				font-weight: bold;
			}
			.tc-status {
				font-size: 13px;
				color: #FFA570;
			}
		}
	}
	/*任务内容*/
	.task-rule {
		width: 690rpx;
		min-height: 300px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		padding: 15px 5px 15px 15px;
		.task-rule-title {
			font-size: 16px;
			font-weight: bold;
			padding: 0 0 10px 0;
			margin: 0 0 10px 0;
			border-bottom: 1px solid #E5E5E5;
		}
		.task-rule-content {
			padding: 0 10px 0 0;
		}
	}

</style>
