<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="我的团队">
			<block slot="right">
				<view style="width: 150rpx; padding: 0 10px 0 0; text-align: right;">
				    <image @click="navTo('/pages/search/orderSearch')" src="/static/icon/search-02.png" style="width: 20px; margin: 0 10px 0 0;" mode="widthFix"></image>
				</view>
			</block>
		</uni-nav-bar>
		<view class="group-body">
			<view class="gb-member">
				<image style="width: 3px;" src="/static/icon/cylinder-01.png" mode="widthFix"></image>
				<view class="gb-title">团队成员（24人）</view>
			</view>
			<view class="gb-member-item">
				<image style="width: 50px;" src="/static/img/icon-portrait-01.png" mode="widthFix"></image>
				<view class="gb-member-two">
					<view class="gb-member-two-name">MHL微信昵称</view>
					<view class="gb-member-two-tag">金牌主播</view>
				</view>
				<view class="gb-member-thr">
					<view class="gb-member-thr-num">
						<text class="gb-mt-title">直属用户：</text>
						<text class="gb-mt-num">10</text>
					</view>
					<view class="gb-mt-date">2020-04-09</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.group-body {
		width: 750rpx;
		padding: 10px 30rpx 0;
	}
	.gb-member {
		display: flex;
		align-items: center;
		.gb-title {
			margin: 0 0 0 5px;
			font-size: 16px;
			font-weight: bold;
		}
	}
	.gb-member-item {
		height: 70px;
		padding: 10px;
		margin: 10px 0 0 0;
		border-radius: 8px;
		box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
		display: flex;
		align-items: center;
		.gb-member-two {
			width: 330rpx;
			margin: 0 0 0 10px;
			font-size: 13px;
			padding: 5px 0;
			.gb-member-two-name {
				height: 19px;
				line-height: 21px;
			}
			.gb-member-two-tag {
				height: 19px;
				line-height: 21px;
			}

		}
		.gb-member-thr {
			.gb-member-thr-num {
				height: 24px;
				line-height: 20px;
			}
			.gb-mt-title {
				font-size: 13px;
			}
			.gb-mt-num {
				font-size: 13px;
				color: #FF5350;
			}
			.gb-mt-date {
				font-size: 11px;
				color: #999999;
			}
		}
	}
</style>
