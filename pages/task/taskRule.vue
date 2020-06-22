<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="活动规则" @clickRight="navToBar('/pages/tabbar/task')" rightText="关闭"></uni-nav-bar>
		<view class="task-rule-body">
			<view class="task-rule-box">
			    <view class="trb-title">
				    <aiTitleList title="活动标题"></aiTitleList>
			    </view>
			    <view class="trb-content">活动内容大撒大撒即可打开就是打开数据的访问热负荷啊打发法还是卡夫卡健身房和哈维回复即可</view>
			</view>
		</view>
	</view>
</template>

<script>
	import aiTitleList from "@/components/ai-list/ai-title-list.vue"
	export default {
		components: {
			aiTitleList
		},
		data() {
			return {
				
			}
		},
		methods: {
			navToBar(url){
				this.$aiRouter.navTabBar(url)
			}
		}
	}
</script>

<style lang="scss">
	.task-rule-body {
		width: 750rpx;
		padding: 10px 30rpx 0;
		box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
	}
	.task-rule-box {
		box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		min-height: 300px;
		padding: 5px 0 20px 15px;
		.trb-title {
			height: 39px;
			line-height: 39px;
			border-bottom: 1px solid #E5E5E5;
			margin: 0 5px 0 0;
		}
		.trb-content {
			padding: 10px 15px 0 0;
			text-align: justify;
			font-size: 13px;
			color: #999999;
		}
	}
</style>
