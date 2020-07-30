<template>
	<view class="ai-popup-dialog">
		<image class="ai-popup-bg" :src="popupbg"></image>
		<view class="ai-popup-dialog-content-box">
			<view v-if="iconSrc" class="ai-popup-logo">
				<image class="ai-popup-logo-icon" mode="widthFix" :src="iconSrc"></image>
			</view>
			<view v-if="message" class="ai-popup-message-box" v-for="(item, index) of message" :key="index">
				<view class="ai-popup-title">{{item.title}}</view>
				<view class="ai-popup-content">{{item.content}}</view>
			</view>
			<slot name="message"></slot>
			<view class="ai-popup-ok-button-fox" @click="onOk">
				<text class="ai-popup-ok">{{btname}}</text>
			</view>
			<slot name="button"></slot>
		</view>
		<view class="ai-popup-cancel" v-if="cancelShow" @click="close">
			<image class="ai-popup-cancel-icon" mode="widthFix" src="/static/icon/icon-err-02.png"></image>
		</view>
	</view>
</template>

<script>
	/**
	 * PopUp 弹出层-对话框样式
	 * @description 弹出层-对话框样式
	 * @property {String} value input 模式下的默认值
	 * @property {String} placeholder input 模式下输入提示
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * 	@value base 基础对话框
	 * @property {String} content 对话框内容
	 * @property {Boolean} beforeClose 是否拦截取消事件
	 * @event {Function} confirm 点击确认按钮触发
	 * @event {Function} close 点击取消按钮触发
	 */

	export default {
		name: "uniPopupDialog",
		props: {
			popupbg: {
				type: String,
				default: "/static/icon/popup-bg01.png"
			},
			message: {
				type: Array,
				default: function(){
					return []
				}
			},
			value: {
				type: [String, Number],
				default: ''
			},
			iconSrc: {
				type: String,
				default: null
			},
			btname: {
				type: String,
				default: '确定'
			},
			/**
			 * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
			 */
			beforeClose: {
				type: Boolean,
				default: false
			},
			//是否显示取消按钮
			cancelShow: {
				type: Boolean,
				default: true
			}
		},
		inject: ['popup'],
		created() {
			// 对话框遮罩不可点击
			this.popup.mkclick = false
		},
		mounted() {
			this.focus = true
		},
		methods: {
			onOk() {
				this.$emit('confirm', () => {
					this.popup.close()
				})
			},
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
		position: relative;
		width: 275px;
		min-height: 200px;
		border-radius: 15px;
		position: relative;
	}
	.ai-popup-bg {
		width: 275px;
		height: 100%;
		position: absolute;
	}
	.ai-popup-dialog-content-box {
		padding: 40px 25px 45px 30px;
		position: relative;
		z-index: 10;
	}
	.ai-popup-logo {
		text-align: center;
		margin: 0 0 25px;
	}
	.ai-popup-logo-icon {
		width: 94px;
	}
	.ai-popup-message-box {
		margin: 0 0 15px;
	}
	.ai-popup-title {
		font-size: 17px;
		font-weight: 700;
		margin: 0 0 5px;
	}
	.ai-popup-content {
		font-size: 14px;
		color: #6e6e6e;
	}
	.ai-popup-ok-button-fox {
		width: 165px;
		height: 40px;
		margin: 32px auto 0;
		background: #FF5350;
		border-radius: 22px;
		text-align: center;
		line-height: 40px;
		font-size: 15px;
		color: #FFFFFF;
		opacity: 0.95;
	}
	.ai-popup-cancel {
		text-align: center;
		position: absolute;
		bottom: -40px;
		left: 45%;
	}
	.ai-popup-cancel-icon {
		width: 25px;
	}
</style>

