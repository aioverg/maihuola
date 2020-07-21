<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="上传截图"
		 @clickRight="redirect('/pages/index/index?tabId=1')" rightText="关闭">
		</uni-nav-bar>
		<hint-box v-if="type=='union'" content="为了您的账户安全，请填写您的真实信息"></hint-box>
		
		<view class="task-upload-body">
			<view class="tub-input" v-if="type=='task'">
				<ai-input titleWidth="180rpx" type="number" title="填写用户信息" @getInput="getPhone" placeholder="请输入对方手机号"></ai-input>
			</view>
			<view v-if="type=='union' && parent == 'no'">
				<view class="tub-input">
					<ai-input titleWidth="220rpx" title="填写用户姓名" @getInput="getName" placeholder="请输入真实姓名"></ai-input>
				</view>
				<view class="tub-input">
					<ai-input titleWidth="220rpx" title="填写支付宝账号" @getInput="getAlipay" placeholder="请输入支付宝账号"></ai-input>
				</view>
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
		<uni-popup ref="popupTask">
			<ai-popup-dialog :message='message' btname="继续提交" @confirm="redirect('/pages/task/taskUpload?type=task&id=' + taskId + '&parent=' + parent)"
			 :cancelShow="false">
				<block slot="button">
					<view @click="navToback(1)" style="width: 165px; height: 40px; text-align: center; margin: 15px auto 0; font-size: 15px; border: 1px solid rgba(255,165,112,1); border-radius: 23px; color: #FFA570; line-height: 40px;">
						完成
					</view>
				</block>
			</ai-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupUnion">
			<ai-popup-dialog :message='message' btname="完成" @confirm="navToback(1)" :cancelShow="false">
			</ai-popup-dialog>
		</uni-popup>
		<ai-popup-message ref="aiPopupMessage"></ai-popup-message>
	</view>
</template>

<script>
	import aiInput from "@/components/ai-input.vue"
	import hintBox from '@/components/hint-box'
	export default {
		components: {
			aiInput,
			hintBox
		},
		data() {
			return {
				parent: '',
				taskId: 0,
				repeat: 0,
				phone: "",
				name: "",
				alipay: "",
				type: "task",
				message: [{
					title: "已提交审核",
					content: "我们会在2-3个工作日完成审核，请您耐心等待"
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
				if(this.type == "task"){
					if (this.phone.length !== 11 || this.imgList.every(item => {
							return item.uploadPic == null
						})) {
						this.buttonbg = "ai-button-graybg"
					} else {
						this.buttonbg = "ai-button-redbg"
					}
				}
			},
			name(){
				if(this.type == "union" && this.parent== 'no'){
					if (this.name.length == 0 || this.alipay.length == 0 || this.imgList.every(item => {
							return item.uploadPic == null
						})) {
						this.buttonbg = "ai-button-graybg"
					} else {
						this.buttonbg = "ai-button-redbg"
					}
				}
			},
			alipay(){
				if(this.type == "union" && this.parent== 'no'){
					if (this.name.length == 0 || this.alipay.length == 0 || this.imgList.every(item => {
							return item.uploadPic == null
						})) {
						this.buttonbg = "ai-button-graybg"
					} else {
						this.buttonbg = "ai-button-redbg"
					}
				}
			}
		},
		onLoad(res) {
			this.type = res.type
			this.taskId = res.id
			this.parent = res.parent
			this.getTaskDetail(res.id)
		},
		methods: {
			navToBar(url) {
				this.$aiRouter.navTabBar(url)
			},
			getPhone(res){
				this.phone = res
			},
			getName(res){
				this.name = res
			},
			getAlipay(res){
				this.alipay = res
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
						if(_this.type == "task"){
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
						if(_this.type == "union"){
							if (_this.imgList.every(item => {
									return item.uploadPic == null
								})) {
								_this.buttonbg = "ai-button-graybg"
							} else {
								if (_this.name.length != 0 && _this.name.length != 0) {
									_this.buttonbg = "ai-button-redbg"
									_this.submitFlag = true
								} else {
									_this.buttonbg = "ai-button-graybg"
								}
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
					this.repeat = res.data.data.is_single
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
				if(this.type == "task"){
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
						mobile: this.phone,
						real_name: this.name,
						alipay: this.alipay
					}).then(res => {
						if (res.data.code == 0) {
							this.$refs.popupTask.open()
						} else {
							this.$aiGlobal.aiPopupMessage.apply(this, ['err', res.data.msg])
						}
					})
					return
				}
				if(this.type == "union"){
					if(this.parent == 'no'){
						if(this.name.length == 0){
							this.$aiGlobal.aiPopupMessage.apply(this, ['err', '请填写用户名'])
							return
						}
						if(this.alipay.length == 0){
							this.$aiGlobal.aiPopupMessage.apply(this, ['err', '请填写支付宝账号'])
							return
						}
						console.log(this.uploadImg)
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
							mobile: this.phone,
							real_name: this.name,
							alipay: this.alipay
						}).then(res => {
							if (res.data.code == 0) {
								if(this.repeat){
									this.$refs.popupUnion.open()
								}else{
									this.$refs.popupTask.open()
								}
							} else {
								this.$aiGlobal.aiPopupMessage.apply(this, ['err', res.data.msg])
							}
						})
						return
						
					}
					if(this.parent == 'yes'){
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
							mobile: this.phone,
							real_name: this.name,
							alipay: this.alipay
						}).then(res => {
							if (res.data.code == 0) {
								if(this.repeat){
									this.$refs.popupUnion.open()
								}else{
									this.$refs.popupTask.open()
								}
							} else {
								this.$aiGlobal.aiPopupMessage.apply(this, ['err', res.data.msg])
							}
						})
						return
					}
					
				}
				
			},
			navTo(url) {
				this.$aiRouter.navTo(url)
			},
			redirect(url) {
				this.$aiRouter.redirect(url)
			},
			navToback(delta) {
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
	.tub-input {
		height: 45px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		margin: 10px 0 0 0;
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
