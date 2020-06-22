<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="上传截图" @clickRight="navToBar('/pages/tabbar/task')" rightText="关闭"></uni-nav-bar>
		<view class="task-upload-body">
			<view class="tub-user">
				<view class="tub-user-title">请输入用户信息</view>
				<input class="tub-user-tel" placeholder="请输入手机号" />
			</view>
			<view class="tub-upload">
				<view class="tub-upload-title">请按示例上传截图</view>
				<view class="tub-upload-box"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
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
	.task-upload-body {
		width: 750rpx;
		padding: 10px 30rpx 43px;
	}
	.tub-user {
		height: 45px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		padding: 0 15px;
		display: flex;
		align-items: center;
		.tub-user-title {
			font-size: 15px;
			margin: 0 15px 0 0;
		}
	}
	.tub-upload {
		width: 690rpx;
		margin: 10px 0 0 0;
		border-radius: 8px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		padding: 15px 0 30px;
		.tub-upload-title {
			font-size: 15px;
			padding: 0 0 0 15px;
		}
		.tub-upload-box {
			padding: 0 40px;
			height: 200px;
		}
	}
</style>
