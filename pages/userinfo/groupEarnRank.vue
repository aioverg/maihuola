<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="收益排行" rightText="关闭" @clickRight="navBack(1)">
		</uni-nav-bar>
		<view class="group-body">
			<view class="group-search">
				<ai-search @confirm="confirm" placeHolder="请输入手机号查询"></ai-search>
			</view>
			<view class="gb-member">
				<image style="width: 3px;" src="/static/icon/cylinder-01.png" mode="widthFix"></image>
				<view class="gb-title">团队收益排行</view>
			</view>
			<view class="ger-item" v-for="(item, index) in data">
				<image style="width: 50px;" mode="widthFix" src="../../static/img/icon-portrait-01.png"></image>
				<view class="ger-two">
					<view class="ger-two-title">{{item.name}}</view>
					<view class="ger-two-tag">
						<view>{{item.tag}}</view>
						<image v-if="index == 0" style="width: 32px; margin: 0 0 0 5px;" mode="widthFix" src="/static/icon/cup-01.png"></image>
						<image v-if="index == 1" style="width: 32px; margin: 0 0 0 5px;" mode="widthFix" src="/static/icon/cup-02.png"></image>
						<image v-if="index == 2" style="width: 32px; margin: 0 0 0 5px;" mode="widthFix" src="/static/icon/cup-03.png"></image>
					</view>
				</view>
				<view class="ger-thr">
					<view class="ger-thr-title">总收益（元）</view>
					<view class="ger-thr-num">{{item.num}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import aiSearch from "@/components/ai-search/ai-search.vue"
	export default {
		components: {
			aiSearch
		},
		data() {
			return {
				data: [
					{
					    name: "MHL微信昵称",
					    tag: "经纪人",
					    num: "42860.64"
				    },
					{
					    name: "MHL微信昵",
					    tag: "经纪人",
					    num: "42860.64"
					},
					{
					    name: "MHL微信",
					    tag: "经纪人",
					    num: "42860.64"
					},
					{
					    name: "MHL微",
					    tag: "经纪人",
					    num: "42860.64"
					},
				]
			}
		},
		methods: {
			confirm(){
				console.log(999999)
			},
			navTo(url){
				this.$aiRouter.navTo(url)
			},
			navBack(delta){
				this.$aiRouter.navToBack(delta)
			}
		}
	}
</script>

<style lang="scss">
	.group-body {
		width: 750rpx;
		padding: 10px 30rpx 0;
	}
	.group-search {
		margin: 0 0 25px;
	}
	.gb-member {
		display: flex;
		align-items: center;
		.gb-title {
			margin: 0 0 0 5px;
			font-size: 16px;
			font-weight: bold;
		}
	}
	.ger-item {
		height: 70px;
		padding: 10px;
		margin: 10px 0 0 0;
		border-radius: 8px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		display: flex;
		align-items: center;
		.ger-two {
			width: 340rpx;
			padding: 0 0 0 20rpx;
			font-size: 13px;
			.ger-two-title {
				height: 22px;
				line-height: 22px;

			}
			.ger-two-tag {
				display: flex;
				height: 22px;
				line-height: 22px;
			}
		}
		.ger-thr {
			.ger-thr-title {
				font-size: 13px;
				height: 22px;
				line-height: 22px;
			}
			.ger-thr-num {
				font-size: 16px;
				height: 22px;
				line-height: 22px;
				color: #FF5350;
			}
		}
	}
</style>
