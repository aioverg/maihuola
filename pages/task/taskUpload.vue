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
				<view class="tub-upload-box">
					<view class="tub-upload-item" v-for="(item, index) in imgList" :key="index">
					    <view class="tu-img" @click="viewImg(item.exPic)">
					        <image :src="item.exPic" mode="widthFix"></image>
					    </view>
					    <view class="tu-img">
							<image class="tu-img-add" @click="chooseImg(index)" v-if="!item.uploadPic" :src="item.addPic"></image>
						    <image v-if="item.uploadPic" @click="viewImg(item.uploadPic)" :src="item.uploadPic" mode="widthFix"></image>
					    </view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="uniPopup"></uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [
					{
						id: 1,
						exPic: "/static/mock/mock-04.png",
						addPic: "/static/icon/add-01.png",
						uploadPic: null
					},
					{
						id: 2,
						exPic: "/static/mock/mock-04.png",
						addPic: "/static/icon/add-01.png",
						uploadPic: null
					}
				]
			}
		},
		methods: {
			navToBar(url){
				this.$aiRouter.navTabBar(url)
			},
			viewImg(pic){
				uni.previewImage({
					urls: [pic]
				})
			},
			chooseImg(index){
				const _this = this
				uni.chooseImage({
				    count: 1,
				    sizeType: ['compressed'],
					sourceType: ['album'],
				    success: function (res) {
						_this.imgList[index].uploadPic = res.tempFilePaths[0]
				    }
				});
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
			padding: 15px 40px 0;
			.tub-upload-item {
				display: flex;
				justify-content: space-between;
				margin: 0 0 15px;
				.tu-img {
					width: 240rpx;
					height: 175px;
					border: 2px solid #FFA570;
					border-radius: 8px;
				}
				image {
					width: 100%;
					border-radius: 8px;
				}
				.tu-img-add {
					width: 40px;
					height: 40px;
					margin: 66px 40px;
				}
			}
		}
	}
</style>
