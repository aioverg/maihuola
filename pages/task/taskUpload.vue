<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="上传截图" @clickLeft="navTo('/pages/task/taskDetail')"
		 @clickRight="redirect('/pages/index/index?tabId=1')" rightText="关闭"></uni-nav-bar>
		<view class="task-upload-body">
			<view class="tub-user">
				<view class="tub-user-title">请输入用户信息</view>
				<input class="tub-user-tel" v-model="phone" type="number" placeholder="请输入对方手机号" />
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
							<image class="tu-img-add" @click="chooseImg(index)" v-if="!item.uploadPic" src="/static/icon/add-01.png"></image>
							<image v-if="item.uploadPic" @click="viewImg(item.uploadPic)" :src="item.uploadPic"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="upload-button">
				<ai-button :buttonbg="buttonbg" @eventClick="submit()" btname="提交审核"></ai-button>
			</view>
		</view>
		<uni-popup ref="popup">
			<ai-popup-dialog :message='message' btname="继续提交" @confirm="redirect('/pages/task/taskUpload?id=' + taskId)"
			 :cancelShow="false">
				<block slot="button">
					<!--
					<view @click="redirect('/pages/task/taskDetail?is_end=0&id=' + taskId + '&router=redirect')" style="width: 165px; height: 40px; text-align: center; margin: 15px auto 0; font-size: 15px; border: 1px solid rgba(255,165,112,1); border-radius: 23px; color: #FFA570; line-height: 40px;">
						完成
					</view>
					-->
					<view @click="navToback(1)" style="width: 165px; height: 40px; text-align: center; margin: 15px auto 0; font-size: 15px; border: 1px solid rgba(255,165,112,1); border-radius: 23px; color: #FFA570; line-height: 40px;">
						完成
					</view>
				</block>
			</ai-popup-dialog>
		</uni-popup>
		<ai-popup-message ref="aiPopupMessage"></ai-popup-message>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taskId: 0,
				phone: "",
				message: [{
					title: "已提交审核",
					content: "我们会在2-3个工作日完成审核，请您耐 心等待"
				}],
				imgList: [{
					id: 0,
					exPic: "/static/mock/mock-04.png",
					uploadPic: null //图片的本地地址
				}],
				uploadImg: [], //上传到服务器的图片网络地址列表
				buttonbg: "ai-button-graybg",
				submitFlag: false,
			}
		},
		watch: {
			phone() {
				if (this.phone.length !== 11 || this.imgList.every(item => {
						return item.uploadPic == null
					})) {
					this.buttonbg = "ai-button-graybg"
				} else {
					this.buttonbg = "ai-button-redbg"
				}
			}
		},
		onLoad(res) {
			this.taskId = res.id
			this.getTaskDetail(res.id)
		},
		methods: {
			navToBar(url) {
				this.$aiRouter.navTabBar(url)
			},
			viewImg(pic) {
				uni.previewImage({
					urls: [pic]
				})
			},
			chooseImg(index) {
				const _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: function(res) {
						_this.imgList[index].uploadPic = res.tempFilePaths[0]
						_this.$api.postImg(res.tempFilePaths[0]).then(ress => {
							_this.uploadImg[index] = JSON.parse(ress.data).data.info
						})
						//改变按钮颜色
						if (_this.imgList.every(item => {
								return item.uploadPic == null
							})) {
							_this.buttonbg = "ai-button-graybg"
						} else {
							if (_this.phone.length == 11) {
								_this.buttonbg = "ai-button-redbg"
								_this.submitFlag = true
							} else {
								_this.buttonbg = "ai-button-graybg"
							}
						}
					}
				});
			},
			cancelImg(index) {
				this.imgList[index].uploadPic = null
				this.uploadImg[index] = ""
				if (this.imgList.every(item => {
						return item.uploadPic == null
					})) {
					this.buttonbg = "ai-button-graybg"
				}else{
					this.buttonbg = "ai-button-redbg"
				}
				this.submitFlag = false
			},
			getTaskDetail(id) {
				this.$api.postTaskDetail({
					id: id
				}).then(res => {
					this.imgList[0].exPic = res.data.data.pic_case
					for (let i = 1; i <= 5; i++) {
						if (res.data.data["pic_case" + i].length !== 0) {
							this.imgList.push({
								id: i,
								exPic: res.data.data["pic_case" + i],
								uploadPic: null
							})
						}
					}
				})
			},
			submit() {
				if (this.phone.length != 11) {
					this.$aiGlobal.aiPopupMessage.apply(this, ['err', '手机号码错误'])
					return
				}
				if (this.uploadImg.length == 0) {
					this.$aiGlobal.aiPopupMessage.apply(this, ['err', '至少上传一张截图'])
					return
				}
				if (this.uploadImg.every(item => {
						return item == ""
					})) {
					this.$aiGlobal.aiPopupMessage.apply(this, ['err', '至少上传一张截图'])
					return
				}
				this.$api.postTaskUpload({
					user_id: this.$store.state.userInfo.id,
					mission_id: this.taskId,
					pic: this.uploadImg,
					mobile: this.phone
				}).then(res => {
					if (res.data.code == 0) {
						this.$refs.popup.open()
					} else {
						this.$aiGlobal.aiPopupMessage.apply(this, ['err', res.data.msg])
					}
				})
			},
			navTo(url) {
				this.$aiRouter.navTo(url)
			},
			redirect(url) {
				this.$aiRouter.redirect(url)
			},
			navToback(delta) {
				console.log(66666)
				this.$aiRouter.navToBack(delta)
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
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
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
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
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
					height: 100%;
					border-radius: 5px;
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
