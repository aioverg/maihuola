<template>
	<view class="ai-group-member-card">
		<image style="width: 50px;" src="/static/img/icon-portrait-01.png" mode="widthFix"></image>
		<view class="agmc-two">
			<view class="agmc-two-name">MHL微信昵称</view>
			<view class="agmc-two-tag">金牌主播</view>
		</view>
		<view class="agmc-thr">
			<view class="agmc-thr-title-box">
				<text class="agmc-thr-title">直属用户：</text>
				<text class="agmc-thr-num">10</text>
			</view>
			<view class="agmc-thr-date">2020-04-09</view>
		</view>
		<view v-if="rightArrow" class="agmc-fou" @click="clickEvent()">
			<image style="width: 6px;" mode="widthFix" src="/static/icon/icon-right-arrow-01.png"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props: {
			rightArrow: {
				type: Boolean,
				default: true
			}
		},
		methods:{
			clickEvent(){
				this.$emit("clickEvent")
			}
		}
	}
</script>

<style lang="scss">
	.ai-group-member-card {
		height: 70px;
		padding: 10px;
		margin: 10px 0 0 0;
		border-radius: 8px;
		box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
		display: flex;
		align-items: center;
		.agmc-two {
			width: 300rpx;
			margin: 0 0 0 10px;
			font-size: 13px;
			padding: 5px 0;
			.agmc-two-name {
				height: 19px;
				line-height: 21px;
			}
			.agmc-two-tag {
				height: 19px;
				line-height: 21px;
			}
	
		}
		.agmc-thr {
			width: 200rpx;
			.agmc-thr-title-box {
				height: 24px;
				line-height: 20px;
				.agmc-thr-title {
					font-size: 13px;
				}
				.agmc-thr-num {
					font-size: 13px;
					color: #FF5350;
				}
			}
			.agmc-thr-date {
				font-size: 11px;
				color: #999999;
			}
		}
		.agmc-fou {
			width: 30rpx;
			padding: 10px 0 0 10rpx;
			height: 50px;
		}
	}
</style>
