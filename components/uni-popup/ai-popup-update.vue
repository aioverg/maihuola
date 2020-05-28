<template>
	<view class="ai-popup-dialog">
		<image mode="widthFix" class="ai-popup-bg" :src="popupbg"></image>
		<view class="ai-popup-dialog-content-box">
			<view class="ai-popup-title">
				<view class="ai-popup-title-one">发现新版本</view>
				<view class="ai-popup-title-two">{{version}}</view>
			</view>
			<view class="ai-popup-content">
				<view class="ai-popup-content-item">
					{{content}}
				</view>
			</view>
			<view class="ai-popup-progress">
				<view v-if="progress">
					下载进度：
					<text>444</text>
				</view>
			</view>
			<view class="ai-popup-ok-button-fox" @click="onOk">
				<text class="ai-popup-ok">立即升级</text>
			</view>
			<view class="ai-popup-cancel" v-if="cancelShow" @click="close">
				<image class="ai-popup-cancel-icon" mode="widthFix" src="/static/img/icon-cancel.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uniPopupDialog",
		props: {
			popupbg: {
				type: String,
				default: "/static/img/bg-popup01.png"
			},
			version: {
				type: String,
				default: null,
			},
			content: {
				type: String,
				default: null,
			},
			
			
			////////////
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: '请输入内容'
			},
			progress: {
				type: Boolean,
				default: false
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
		width: 275px;
		height: 314px;
		border-radius: 15px;
		position: relative;
	}
	.ai-popup-bg {
		width: 275px;
		position: absolute;
	}
	.ai-popup-dialog-content-box {
		position: relative;
		padding: 20px 25px 0;
		z-index: 10;
	}
	.ai-popup-title {
		height: 100px;
	}
	.ai-popup-title-one {
		font-size: 20px;
		font-weight: 600;
		color:rgba(255,255,255,1);
	}
	.ai-popup-title-two {
		font-size: 13px;
		color: rgba(255,255,255,1);
	}
	.ai-popup-content {
		height: 60px;
		overflow-y: hidden;
	}
	.ai-popup-content-item {
		font-size: 12px;
		height: 15px;
		line-height: 15px;
		color: rgba(102,102,102,1);
		margin: 0 0 5px 0;
	}
	.ai-popup-progress {
		margin: 10px 0 0 0;
		height: 15px;
		font-size: 12px;
		text-align: center;
		color: rgba(102,102,102,1);
	}
	.ai-popup-ok-button-fox {
		width: 165px;
		height: 40px;
		margin: 20px auto 0;
		background: rgba(244,122,115,1);
		border-radius: 22px;
		text-align: center;
		line-height: 40px;
		font-size: 15px;
		color: rgba(255,255,255,1);
	}
	.ai-popup-cancel {
		text-align: center;
		position: relative;
		top: 55px;
	}
	.ai-popup-cancel-icon {
		width: 25px;
	}
</style>

