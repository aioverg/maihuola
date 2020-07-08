<template>
	<view class="uni-navbar">
		<view :class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }" :style="{ 'background-color': backgroundColor }"
		 class="uni-navbar__content">
		    <!--uni-status-bar组件-->
			<uni-status-bar v-if="statusBar" />
			<!--背景图片-->
			<view style="position: absolute;">
			    <image v-if="backgroundImg" style="width: 750rpx; height: 80px;" :src="backgroundImg"></image>
			</view>
			<view :style="{ color: color,backgroundColor: backgroundColor }" class="uni-navbar__header uni-navbar__content_view">
				<view class="uni-navbar__header-btns uni-navbar__header-btns-left uni-navbar__content_view">
					<view @tap="onClickLeft" class="uni-navbar__content_view" v-if="leftIcon.length" style="margin: 2px 5px 0 0;">
						<uni-icons :color="color" :type="leftIcon" size="24" />
					</view>
					<view class="uni-navbar__content_view" v-if="leftText.length">
						<text :style="{ color: color, fontSize: '20px', fontWeight: 'bold' }">{{ leftText }}</text>
					</view>
					<slot name="left" />
				</view>
				<view class="uni-navbar__content_view">
					<view class="uni-navbar__header-container-inner uni-navbar__content_view" v-if="title.length">
						<text class="uni-nav-bar-text" :style="{color: color }">{{ title }}</text>
					</view>
					<!-- 标题插槽 -->
					<slot />
				</view>
				<view :class="title.length ? 'uni-navbar__header-btns-right' : ''" @tap="onClickRight" class="uni-navbar__header-btns uni-navbar__content_view">
					<view class="uni-navbar__content_view" v-if="rightIcon.length">
						<uni-icons style="margin: 0 0 0 20px;" :color="color" :type="rightIcon" size="24" />
					</view>
					<!-- 优先显示图标 -->
					<view class="uni-navbar__content_view" v-if="rightText.length && !rightIcon.length">
						<text class="uni-nav-bar-right-text">{{ rightText }}</text>
					</view>
					<slot name="right" />
				</view>
			</view>
		</view>
		<view class="uni-navbar__placeholder" v-if="fixed">
			<uni-status-bar v-if="statusBar" />
			<view class="uni-navbar__placeholder-view" />
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
			//背景图片
			backgroundImg: {
				type: String,
				default: ""
			},
			//背景颜色
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			//uni-status-bar组件
			statusBar: {
				type: [Boolean, String],
				default: false
			},
			//底部阴影
			shadow: {
				type: [String, Boolean],
				default: false
			},
			//边框颜色
			border: {
				type: [String, Boolean],
				default: true
			},
			leftClickTag: {
				type: String,
				default: "back"
			}
		},
        mounted() {
          if(uni.report && this.title !== '') {
              uni.report('title', this.title)
          }
        },
		methods: {
			onClickLeft() {
				if(this.leftClickTag == "back"){
					uni.navigateBack()
				}else{
					//this.$aiRouter.navTo(this.leftClickTag)
					this.$aiRouter.redirect(this.leftClickTag)
				}
			},
			onClickRight() {
				this.$emit("clickRight");
			}
		}
	};
</script>

<style lang="scss" scoped>
	$nav-height: 80px;
	.uni-nav-bar-text {
		/* #ifdef APP-PLUS */
		font-size: 34rpx;
		/* #endif */
		/* #ifndef APP-PLUS */
		font-size: $uni-font-size-lg;
		/* #endif */
	}
	.uni-nav-bar-right-text {
		font-size: 15px;
	}

	.uni-navbar {
		width: 750rpx;
	}

	.uni-navbar__content {
		position: relative;
		width: 750rpx;
		background-color: $uni-bg-color;
		overflow: hidden;
	}

	.uni-navbar__content_view {
		display: flex;
		align-items: center;
		flex-direction: row;
		// background-color: #FFFFFF;
	}

	.uni-navbar__header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: $nav-height;
		//line-height: $nav-height;
		padding: 30px 30rpx 0 22rpx;
		font-size: 16px;
		// background-color: #ffffff;
	}

	.uni-navbar__header-btns {
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
	}

	.uni-navbar__header-btns-left {
		display: flex;
		justify-content: flex-start;
	}

	.uni-navbar__header-btns-right {
		display: flex;
		padding-right: 30rpx;
		justify-content: flex-end;
	}

	.uni-navbar__header-container-inner {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		font-size: $uni-font-size-base;
	}


	.uni-navbar__placeholder-view {
		height: $nav-height;
	}

	.uni-navbar--fixed {
		position: fixed;
		z-index: 998;
	}

	.uni-navbar--shadow {
		box-shadow: 0 1px 6px #ccc;
	}

	.uni-navbar--border {
		border-bottom-color: $uni-border-color;
	}
</style>
