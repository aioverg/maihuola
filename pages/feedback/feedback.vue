<template>
	<view>
		<ai-navbar
		    title="意见反馈"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="feedback-box">
			<textarea class="feedback-area" v-model="content" placeholder="请留下你的意见..."></textarea>
		</view>
		<view class="feedback-bt">
			<ai-button @eventClick="feedBack" btname="提交"></ai-button>
		</view>
		<ai-popup-message ref="aiPopupMessage" :message="popupMessage" type="success"></ai-popup-message>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button.vue'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	import aiPopupMessage from '@/components/uni-popup/ai-popup-message.vue'
	export default {
		components: {
			aiButton,
			uniPopUp,
			aiPopupMessage
		},
		data() {
			return {
				content: null,
				popupMessage: null
			}
		},
		methods: {
			feedBack(){
				if(!this.content){
					this.popupMessage = "内容不能为空"
					this.$refs.aiPopupMessage.open()
					return
				}
				this.$api.postFeedBack({
					content: this.content,
					status: 1,
					uid: 5555
				}).then( res => {
					if(res.data.code == 0){
						this.popupMessage = "提交成功"
						this.$refs.aiPopupMessage.open()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
    page {
		background:rgba(255,255,255,1);
	}
	.feedback-box {
		width: 750rpx;
		padding: 30rpx 50rpx;
		.feedback-area {
			width: 650rpx;
			height: 910rpx;
		}
	}
	.feedback-bt {
		margin: 84rpx 0 0 0;
	}
</style>
