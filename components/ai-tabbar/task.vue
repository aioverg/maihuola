<template>
	<view>
		<uni-nav-bar fixed="true">
			<block slot="left">
				<view style="font-weight:bold; font-size: 20px; margin: 0 0 0 9px;">赚金</view>
			</block>
		</uni-nav-bar>
		<view class="task-body">
			<view class="tb-item" v-for="(item, index) in taskList" :key="index">
				<ai-title-list :title="item.title"></ai-title-list>
				<view class="tb-item-head">
					<view class="tb-ih-time">{{item.time}}</view>
					<view class="tb-ih-forms" v-if="item.past">查看报表</view>
				</view>
				<view class="tb-item-content" @click="navTo('/pages/task/taskDetail?id=1' + '&past=' + item.past)">
					<view class="tb-ic-shade" v-if="item.past">
						<view class="tb-ic-shade-describe">活动已结束</view>
					</view>
					<image class="tb-ic-img" :src="item.pic"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import aiTitleList from '@/components/ai-list/ai-title-list.vue'
	export default {
		components: {
			aiTitleList
		},
		data() {
			return {
				taskList: [{
						title: "支付宝扫码领福利",
						time: "2020.06.17-2020.06.30",
						past: false,
						pic: "/static/mock/mock-02.png"
					},
					{
						title: "支付宝扫码领福利",
						time: "2020.06.17-2020.06.30",
						past: true,
						pic: "/static/mock/mock-02.png"
					}
				]
			}
		},
		methods: {
			navTo(url) {
				this.$aiRouter.navTo(url)
			},
			ontrueGetList() {
				uni.showToast({
					title: '第1个页面'
				})
				console.log("加载了第一个页面3333333333，可以把网络请求放这里")
			},
			lower() {
				uni.showToast({
					title: 'scroll-view的加载更多'
				})
				console.log("分页数据可以放这里~~~~~~嘿嘿")
			}
		}
	}
</script>

<style lang="scss">
	.task-body {
		width: 750rpx;
		padding: 10px 30rpx 20px;
	}

	.tb-item {
		width: 690rpx;
		height: 200px;
		padding: 10px 10px 15px;
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
			margin: 10px 0 0 0;
			border-radius: 8px;
			position: relative;

			.tb-ic-img {
				width: 650rpx;
				height: 125px;
			}

			.tb-ic-shade {
				position: absolute;
				z-index: 10;
				background-color: #F8F8F8;
				opacity: 0.6;
				width: 650rpx;
				height: 125px;
				padding: 45px 215rpx;

				.tb-ic-shade-describe {
					position: relative;
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
