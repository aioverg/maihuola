<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="活动详情" @clickRight="navTo('/pages/task/taskRule')" rightText="活动规则"></uni-nav-bar>
		<hint-box content="我们会在2 - 3个工作日完成审核，请您耐心等待.."></hint-box>
		<view class="task-detail-body">
			<view class="task-title">
				<view class="tt-title">支付宝扫码领福利</view>
				<view class="tt-time">（2020.06.17-2020.06.30）</view>
			</view>
			<view class="task-hint">请阅读知悉活动规则后进行推广</view>
			<view class="task-cash">
				<image class="tc-bg" src="/static/icon/bg-earn-01.png"></image>
			    <view class="tc-title">当前实际结算（元）：</view>
				<view class="tc-num">243.28</view>
			</view>
			<view class="task-detail">
				<view>
					<view class="td-titme">预估收益（元）</view>
					<view class="td-num">652.78</view>
				</view>
				<view>
					<view class="td-titme">提交数量</view>
					<view class="td-num td-num-center">98</view>
				</view>
				<view>
					<view class="td-titme">过审数量</view>
					<view class="td-num td-num-center">86</view>
				</view>
			</view>
			<view class="task-check-history" @click="navTo('/pages/task/checkHistory')">审核记录</view>
		</view>
		<view class="task-past" v-if="taskPsat == 'true'">活动已结束</view>
		<view class="task-detail-foot" v-if="taskPsat == 'false'">
			<ai-button @eventClick="navTo('/pages/task/taskUpload')" btname="上传推广截图"></ai-button>
		</view>
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box';
	export default {
		components: {
			hintBox
		},
		onLoad(res) {
			this.taskPsat = res.past
			console.log(res)
		},
		data() {
			return {
				taskPsat: "false"
			}
		},
		methods: {
			navTo(url){
				this.$aiRouter.navTo(url)
			}
		}
	}
</script>

<style lang="scss">
	.task-detail-body {
		width: 750rpx;
		padding: 15px 30rpx;
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
		display: flex;
		height: 49px;
		align-items: center;
		padding: 0 0 0 30rpx;
		.tc-bg {
			position: absolute;
			width: 750rpx;
			height: 99px;
			left: -30rpx;
			top: -25px;
		}
		.tc-title {
			position: relative;
			z-index: 10;
			font-size: 12px;
			color: #FFFFFF;
			opacity: 0.8;
		}
		.tc-num {
			position: relative;
			z-index: 10;
			font-size: 27px;
			color: #FFFFFF;
			opacity: 0.9;
		}
		
	}
	/*预估收益*/
	.task-detail {
		width: 690rpx;
		height: 80px;
		margin: 10px 0 15px 0;
		padding: 18px 64rpx;
		display: flex;
		justify-content: space-between;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		.td-titme {
			font-size: 12px;
		}
		.td-num {
			font-size: 20px;
			color: #FFA570;
		}
		.td-num-center {
			text-align: center;
		}
	}
	/*审核记录*/
	.task-check-history {
		font-size: 1px;
		color: #999999;
		text-decoration-line: underline;
		text-align: right;
	}
	/*活动已结束提示*/
	.task-past {
		margin: 0 auto;
		width: 110px;
		height: 35px;
		line-height: 35px;
		background: rgba(0,0,0,0.15);
		border-radius: 20px;
		text-align: center;
		font-size: 15px;
		color: rgba(255,255,255,0.8);
	}
		
	/*底部按钮*/
	.task-detail-foot {
		position: absolute;
		bottom: 45px;
		left: 30rpx;
	}

</style>
