<template>
	<view class="ai-popup-dialog">
		<image mode="widthFix" class="ai-popup-bg" src="/static/img/bg-update.png"></image>
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
			<view class="ai-popup-progress" v-show="prgShow">
				下载进度：<text>{{prg}}%</text>
			</view>
			<view class="ai-popup-ok-button-fox" @click="onOk">
				<text class="ai-popup-ok">{{updateBt}}</text>
			</view>
			<view class="ai-popup-cancel" v-if="cancelShow" @click="close">
				<image class="ai-popup-cancel-icon" mode="widthFix" src="/static/icon/icon-err-02.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uniPopupDialog",
		props: {
			version: {
				type: String,
				default: null,
			},
			content: {
				type: String,
				default: null,
			},
			updateBt: {
				type: String,
				default: "立即升级"
			},
			prgShow:{
				type: Boolean,
				default: false
			},
			prg: {//下载进度
				type: Number,
				default: 0
			},
			//是否显示取消按钮
			cancelShow: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {}
		},
		inject: ['popup'],
		created() {
			// 对话框遮罩不可点击
			this.popup.mkclick = false
		},
		methods: {
			/**
			 * 点击确认按钮
			 */
			onOk() {
				this.$emit('confirm')
			},
			/**
			 * 点击取消按钮
			 */
			close() {
				this.$emit('close', () => {
					this.popup.close()
				})
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
		color: rgba(255, 255, 255, 1);
	}
	.ai-popup-title-two {
		font-size: 13px;
		color: rgba(255, 255, 255, 1);
	}
	.ai-popup-content {
		min-height: 105px;
		overflow-y: hidden;
	}
	.ai-popup-content-item {
		font-size: 12px;
		height: 15px;
		line-height: 15px;
		color: rgba(102, 102, 102, 1);
		margin: 0 0 5px 0;
	}
	.ai-popup-progress {
		position: absolute;
		height: 15px;
		font-size: 12px;
		text-align: center;
		bottom: 90px;
		width: 225px;
		color: rgba(102, 102, 102, 1);
	}
	.ai-popup-ok-button-fox {
		width: 165px;
		height: 40px;
		margin: 10px auto 10px;
		background: rgba(244, 122, 115, 1);
		border-radius: 22px;
		text-align: center;
		line-height: 40px;
		font-size: 15px;
		color: rgba(255, 255, 255, 1);
	}
	.ai-popup-cancel {
		text-align: center;
		position: relative;
		top: 35px;
	}
	.ai-popup-cancel-icon {
		width: 25px;
	}
</style>