<template>
	<view class="ai-navbar">
		<view :class="{ 'ai-navbar--fixed': fixed, 'ai-navbar--shadow': shadow, 'ai-navbar--border': border }" :style="{ 'background-color': backgroundColor }"
		 class="ai-navbar__content">
			<uni-status-bar v-if="statusBar" />
			<view :style="{ color: color,backgroundColor: backgroundColor }" class="ai-navbar__header ai-navbar__content_view">
				<view @tap="onClickLeft" :style="{width: leftWidth + 'px'}" class="ai-navbar__header-btns ai-navbar__header-btns-left ai-navbar__content_view">
					<view class="ai-navbar__content_view" v-if="leftIcon.length">
						<uni-icons :color="color" :type="leftIcon" size="24" />
					</view>
					<view :class="{ 'ai-navbar-btn-icon-left': !leftIcon.length }" class="ai-navbar-btn-text ai-navbar__content_view"
					 v-if="leftText.length">
						<text :style="{ color: color, fontSize: '14px' }">{{ leftText }}</text>
					</view>
					<slot name="left" />
				</view>
				<view class="ai-navbar__header-container ai-navbar__content_view">
					<view class="ai-navbar__header-container-inner ai-navbar__content_view" v-if="title.length">
						<text class="ai-nav-bar-text" :style="{color: color }">{{ title }}</text>
					</view>
					<!-- 标题插槽 -->
					<slot />
				</view>
				<view :class="title.length ? 'ai-navbar__header-btns-right' : ''" @tap="onClickRight" class="ai-navbar__header-btns ai-navbar__content_view">
					<view class="ai-navbar__content_view" v-if="rightIcon.length">
						<uni-icons :color="color" :type="rightIcon" size="24" />
					</view>
					<!-- 优先显示图标 -->
					<view class="ai-navbar-btn-text ai-navbar__content_view" v-if="rightText.length && !rightIcon.length">
						<text class="ai-nav-bar-right-text">{{ rightText }}</text>
					</view>
					<slot name="right" />
				</view>
			</view>
		</view>
		<view class="ai-navbar__placeholder" v-if="fixed">
			<uni-status-bar v-if="statusBar" />
			<view class="ai-navbar__placeholder-view" />
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "../uni-status-bar/uni-status-bar.vue";
	import uniIcons from "../uni-icons/uni-icons.vue";

	export default {
		name: "UniNavBar",
		components: {
			uniStatusBar,
			uniIcons
		},
		props: {
			title: {
				type: String,
				default: ""
			},
			leftText: {
				type: String,
				default: ""
			},
			leftWidth: {
				type: String,
				default: "75"
			},
			rightText: {
				type: String,
				default: ""
			},
			leftIcon: {
				type: String,
				default: ""
			},
			rightIcon: {
				type: String,
				default: ""
			},
			fixed: {
				type: [Boolean, String],
				default: false
			},
			color: {
				type: String,
				default: "#000000"
			},
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			statusBar: {
				type: [Boolean, String],
				default: false
			},
			shadow: {
				type: [String, Boolean],
				default: false
			},
			border: {
				type: [String, Boolean],
				default: true
			}
		},
        mounted() {
          if(uni.report && this.title !== '') {
              uni.report('title', this.title)
          }
        },
		methods: {
			onClickLeft() {
				this.$emit("clickLeft");
			},
			onClickRight() {
				this.$emit("clickRight");
			}
		}
	};
</script>

<style lang="scss" scoped>
	$nav-height: 80px;
	.ai-nav-bar-text {
		/* #ifdef APP-PLUS */
		font-size: 34rpx;
		/* #endif */
		/* #ifndef APP-PLUS */
		font-size: $uni-font-size-lg;
		/* #endif */
	}
	.ai-nav-bar-right-text {
		font-size: $uni-font-size-base;
	}

	.ai-navbar {
		width: 750rpx;
	}

	.ai-navbar__content {
		position: relative;
		width: 750rpx;
		background-color: $uni-bg-color;
		overflow: hidden;
	}

	.ai-navbar__content_view {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		flex-direction: row;
		// background-color: #FFFFFF;
	}

	.ai-navbar__header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		width: 750rpx;
		height: $nav-height;
		line-height: $nav-height;
		padding: 30px 0 0 0;
		font-size: 16px;
		// background-color: #ffffff;
	}

	.ai-navbar__header-btns {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-wrap: nowrap;
		width: 120rpx;
		padding: 0 6px;
		justify-content: center;
		align-items: center;
	}

	.ai-navbar__header-btns-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 150rpx;
		justify-content: flex-start;
	}

	.ai-navbar__header-btns-right {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 150rpx;
		padding-right: 30rpx;
		justify-content: flex-end;
	}

	.ai-navbar__header-container {
		flex: 1;
	}

	.ai-navbar__header-container-inner {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		align-items: center;
		justify-content: center;
		font-size: $uni-font-size-base;
	}


	.ai-navbar__placeholder-view {
		height: $nav-height;
	}

	.ai-navbar--fixed {
		position: fixed;
		z-index: 998;
	}

	.ai-navbar--shadow {
		/* #ifndef APP-NVUE */
		box-shadow: 0 1px 6px #ccc;
		/* #endif */
	}

	.ai-navbar--border {
		border-bottom-color: $uni-border-color;
	}
</style>
