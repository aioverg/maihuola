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
			<view class="ger-item">
				<image style="width: 50px;" mode="widthFix" src="../../static/img/icon-portrait-01.png"></image>
				<view class="ger-two">
					<view class="ger-two-title">MHL微信昵称</view>
					<view class="ger-two-tag">经纪人</view>
				</view>
				<view class="ger-thr">
					<view class="ger-thr-title">总收益（元）</view>
					<view class="ger-thr-num">42860.64</view>
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
				height: 20px;
				line-height: 20px;

			}
			.ger-two-tag {
				height: 20px;
				line-height: 20px;
			}
		}
		.ger-thr {
			.ger-thr-title {
				font-size: 13px;
				height: 20px;
				line-height: 20px;
			}
			.ger-thr-num {
				font-size: 16px;
				color: #FF5350;
			}
		}
	}
</style>
