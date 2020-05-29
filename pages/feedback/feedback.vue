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
			<textarea class="feedback-area" v-model="content" placeholder="请留下您的意见..."></textarea>
		</view>
		<view class="feedback-bt">
			<ai-button @eventClick="feedBack" btname="提交"></ai-button>
		</view>
		<ai-popup-message ref="aiPopupMessage"></ai-popup-message>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button.vue'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			aiButton,
			uniPopUp
		},
		data() {
			return {
				content: null
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
							this.$aiRouter.navTabBar('/pages/user/user')
						},2000)
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
		padding: 15px 25px;
		.feedback-area {
			width: 650rpx;
			height: 400px;
		}
	}
	.feedback-bt {
		margin: 42px 0 0 0;
	}
</style>
