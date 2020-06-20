<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="意见反馈" ></uni-nav-bar>
		<view class="feedback-box">
			<view class="fb-area">
				<textarea v-model="content" placeholder="请留下您的意见..."></textarea>
			</view>
			<view class="feedback-bt">
				<ai-button @eventClick="feedBack" btname="提交"></ai-button>
			</view>
			<ai-popup-message ref="aiPopupMessage"></ai-popup-message>
		</view>
	</view>
</template>

<script>
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopUp
		},
		data() {
			return {
				content: null,
				navigateFlag: false
			}
		},
		methods: {
			feedBack(){
				this.content = this.content.trim()
				if(!this.content || this.content.length == 0){
					this.$refs.aiPopupMessage.open({
						type:'err',
						content:'内容不能为空',
						timeout:2000,
						isClick:false
					})
					return
				}
				this.$api.postFeedBack({
					content: this.content,
					status: 1,
					uid: this.$store.state.userInfo.id
				}).then( res => {
					if(res.data.code == 0){
						this.$refs.aiPopupMessage.open({
							type:'success',
							content:'提交成功',
							timeout:1500,
							isClick:false
						})
						setTimeout(() => {
							this.$aiRouter.navTabBar('pages/tabbar/user')
						},2000)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
    page {
		background: #FFFFFF;
	}
	.feedback-box {
		width: 750rpx;
		padding: 20rpx 30rpx 0;
		.fb-area {
			width: 690rpx;
			height: 350px;
			padding: 30rpx;
			box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
			border-radius: 8px;
		}
	}
	.feedback-bt {
		position: fixed;
		bottom: 45px;
	}
</style>
