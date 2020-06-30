<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="上传截图" @clickLeft="navTo('/pages/task/taskDetail')" @clickRight="navTo('/pages/index/index?tabId=1')" rightText="关闭"></uni-nav-bar>
		<view class="task-upload-body">
			<view class="tub-user">
				<view class="tub-user-title">请输入用户信息</view>
				<input class="tub-user-tel" placeholder="请输入手机号" />
			</view>
			<view class="tub-upload">
				<view class="tub-upload-title">请按示例上传截图</view>
				<view class="tub-upload-box">
					<view class="tub-upload-item" v-for="(item, index) in imgList" :key="index">
						<view class="tu-cancel" @click="cancelImg(index)" v-if="item.uploadPic">
							<image class="tu-cancel-img" src="/static/icon/err-01.png"></image>
						</view>
					    <view class="tu-img" @click="viewImg(item.exPic)">
					        <image :src="item.exPic"></image>
					    </view>
					    <view class="tu-img">
							<image class="tu-img-add" @click="chooseImg(index)" v-if="!item.uploadPic" :src="item.addPic"></image>
						    <image v-if="item.uploadPic" @click="viewImg(item.uploadPic)" :src="item.uploadPic"></image>
					    </view>
					</view>
				</view>
			</view>
			<view class="upload-button">
				<ai-button :buttonbg="buttonbg" @eventClick="submit()" btname="提交审核" ></ai-button>
			</view>
		</view>
		<uni-popup ref="popup">
			<ai-popup-dialog :message='message' btname="继续提交" @confirm="navTo('/pages/task/taskUpload')" :cancelShow="false">
				<block slot="button">
					<view @click="navTo('/pages/task/taskDetail')" style="width: 165px; height: 40px; text-align: center; margin: 15px auto 0; font-size: 15px; border: 1px solid rgba(255,165,112,1); border-radius: 23px; color: #FFA570; line-height: 40px;">
						完成
					</view>
				</block>
			</ai-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message: [{
					title: "已提交审核",
					content: "我们会在2-3个工作日完成审核，请您耐 心等待"
				}],
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
				],
				buttonbg: "ai-button-graybg",
				submitFlag: false,
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
				    success: function (res) {
						_this.imgList[index].uploadPic = res.tempFilePaths[0]
						if(_this.imgList.some( res => { return res.uploadPic == null})){
						}else{
							_this.buttonbg = "ai-button-redbg"
							_this.submitFlag = true
						}
				    }
				});
			},
			cancelImg(index){
				this.imgList[index].uploadPic = null
				this.buttonbg = "ai-button-graybg"
				this.submitFlag = false
			},
			submit(){
				this.$refs.popup.open()
			},
			navTo(url){
				this.$aiRouter.navTo(url)
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
				position: relative;
				display: flex;
				justify-content: space-between;
				margin: 0 0 15px;
				.tu-cancel {
					height: 15px;
					position: absolute;
					right: -20rpx;
					top: -20px;
					.tu-cancel-img {
						width: 15px;
						height: 15px;
					}
				}
				.tu-img {
					width: 240rpx;
					height: 175px;
					border: 2px solid #FFA570;
					border-radius: 8px;

				}
				image {
					width: 100%;
					height: 170px;
					border-radius: 8px;
				}
				.tu-img-add {
					width: 40px;
					height: 40px;
					display: block;
					margin: 66px auto;
				}
			}
		}
	}
	.upload-button {
		width: 690rpx;
		margin: 43px 0 0 0;
	}
</style>
