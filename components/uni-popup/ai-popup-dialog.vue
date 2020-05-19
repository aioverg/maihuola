<template>
	<view class="ai-popup-dialog">
		<image mode="widthFix" class="ai-popup-bg" src="/static/img/bg-popup01.png"></image>
		<view class="ai-popup-dialog-content-box">
			<view class="ai-popup-cancel" @click="close">
				<image class="ai-popup-cancel-icon" mode="widthFix" src="/static/img/icon-cancel.png"></image>
			</view>
			<view class="ai-popup-logo">
				<image class="ai-popup-logo-icon" mode="widthFix" :src="src"></image>
			</view>
			<view class="ai-popup-title">
				<text class="ai-popup-title-text" :class="['ai-popup__'+dialogType]">{{title}}</text>
			</view>
			<view class="ai-popup-content">
				<text class="ai-popup-content-text" v-if="mode === 'base'">{{content}}</text>
				<input v-else class="ai-popup-input" v-model="val" type="text" :placeholder="placeholder" :focus="focus" >
			</view>
			<view class="ai-popup-ok-button-fox ai-border-left" @click="onOk">
				<text class="ai-popup-ok">确定</text>
			</view>
			<!--
			<view class="ai-popup-button-group">
				<view class="ai-popup-button" @click="close">
					<text class="ai-popup-button-text">取消</text>
				</view>
				<view class="ai-popup-button ai-border-left" @click="onOk">
					<text class="ai-popup-button-text ai-button-color">确定</text>
				</view>
			</view>
			-->
		</view>
	</view>
</template>

<script>
	/**
	 * PopUp 弹出层-对话框样式
	 * @description 弹出层-对话框样式
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} value input 模式下的默认值
	 * @property {String} placeholder input 模式下输入提示
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} mode = [base|input] 模式、
	 * 	@value base 基础对话框
	 * 	@value input 可输入对话框
	 * @property {String} content 对话框内容
	 * @property {Boolean} beforeClose 是否拦截取消事件
	 * @event {Function} confirm 点击确认按钮触发
	 * @event {Function} close 点击取消按钮触发
	 */

	export default {
		name: "uniPopupDialog",
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: '请输入内容'
			},
			src: {
				type: String,
				default: '/static/img/ai-taobao.png'
			},
			/**
			 * 对话框主题 success/warning/info/error	  默认 success
			 */
			type: {
				type: String,
				default: 'error'
			},
			/**
			 * 对话框模式 base/input
			 */
			mode: {
				type: String,
				default: 'base'
			},
			/**
			 * 对话框标题
			 */
			title: {
				type: String,
				default: '提示'
			},
			/**
			 * 对话框内容
			 */
			content: {
				type: String,
				default: ''
			},
			/**
			 * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
			 */
			beforeClose: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: ""
			}
		},
		inject: ['popup'],
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val
			}
		},
		created() {
			// 对话框遮罩不可点击
			this.popup.mkclick = false
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value
			} else {
				this.dialogType = this.type
			}
		},
		mounted() {
			this.focus = true
		},
		methods: {
			/**
			 * 点击确认按钮
			 */
			onOk() {
				this.$emit('confirm', () => {
					this.popup.close()
					if (this.mode === 'input') this.val = this.value
				}, this.mode === 'input' ? this.val : '')
			},
			/**
			 * 点击取消按钮
			 */
			close() {
				if (this.beforeClose) {
					this.$emit('close', () => {
						this.popup.close()
					})
					return
				}
				this.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ai-popup-dialog {
		width: 550rpx;
		height: 628rpx;
		border-radius: 15px;
		position: relative;
	}
	.ai-popup-bg {
		width: 550rpx;
		position: absolute;
	}
	.ai-popup-dialog-content-box {
		position: relative;
		z-index: 10;
	}
	.ai-popup-cancel {
		text-align: right;
	}
	.ai-popup-cancel-icon {
		width: 50rpx;
		margin: 10rpx 10rpx 0 0;
	}
	.ai-popup-logo {
		text-align: center;
	}
	.ai-popup-logo-icon {
		width: 188rpx;
	}
	.ai-popup-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 30rpx;
		padding-bottom: 5px;
	}
	.ai-popup-title-text {
		font-size: 17px;
		font-weight: 500;
	}
	.ai-popup-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 0 60rpx 0;
	}
	.ai-popup-content-text {
		font-size: 14px;
		color: #6e6e6e;
	}
	.ai-popup-ok-button-fox {
		width: 330rpx;
		height: 80rpx;
		margin: 0 auto;
		background: rgba(244,122,115,1);
		border-radius: 45rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 15px;
		color: rgba(255,255,255,1);
	}
	
	


	

	

	

	.ai-popup-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.ai-popup-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.ai-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}

	.ai-popup-button-text {
		font-size: 14px;
	}

	.ai-popup-input {
		flex: 1;
		font-size: 14px;
	}

	.ai-popup__success {
		color: $uni-color-success;
	}

	.ai-popup__warn {
		color: $uni-color-warning;
	}

	.ai-popup__error {
		color: $uni-color-error;
	}

	.ai-popup__info {
		color: #909399;
	}
</style>
