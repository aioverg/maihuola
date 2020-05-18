<template>
	<view class="ai-popup-message" :class="show ? 'ai-popup-message-show' : 'ai-popup-message-hidden'">
		<text class="ai-popup-message-text">{{message}}</text>
	</view>
</template>

<script>
	export default {
		name: 'UniPopupMessage',
		props: {
			/**
			 * 消息文字
			 */
			message: {
				type: String,
				default: ''
			},
			/**
			 * 显示时间，设置为 0 则不会自动关闭
			 */
			duration: {
				type: Number,
				default: 1500
			}
		},

		data() {
			return {
				show: false
			}
		},
		methods: {
			open() {
				this.show = true
				clearTimeout(this.popuptimer)
				this.popuptimer = setTimeout(() => {
					this.close()
				}, this.duration)
			},
			close() {
				this.show = false
				clearTimeout(this.popuptimer)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.ai-popup-message {
		position: fixed;
		top: 50%;
		left: 30%;
		min-width: 140px;
		height: 40px;
		background:rgba(0,0,0,1);
		opacity:0.16;
		border-radius: 20px;
		text-align: center;
		line-height: 40px;
	}
	.ai-popup-message-text {
		font-size: 15px;
		color:rgba(255,255,255,1);
		padding: 0;
	}
	.ai-popup-message-show {
		z-index: 100;
	}
	.ai-popup-message-hidden {
		z-index: -100;
	}
</style>
