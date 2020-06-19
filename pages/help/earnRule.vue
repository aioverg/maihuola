<template>
	<view>
		<uni-nav-bar fixed="true" left-width="150">
			<block slot="left">
				<image style="width: 10px; height: 17px; margin: 3px 10px 0 10px;" src="../../static/icon/left-arrow01.png"></image>
			    <view style="font-size: 20px; font-weight:bold;">规则说明</view>
			</block>
		</uni-nav-bar>
		<view class="rule-body">
			<view class="explain-item-box">
				<view class="item-title">
					<view class="long-string"></view>
					<view class="title-text">收益说明</view>
				</view>
				<view class="item-content">
					卖货啦所示或所提及的“消费佣金”、“预估佣金”均统一更改为“预估收益”。该收益系卖货啦之外的第三方就淘宝或天猫交易所设置和提供，非由卖货啦提供。除前述外，其他使用规范仍依照《卖货啦用户协议》及《运营商协议》的相关条款执行。本说明自发布之日起生效。
				</view>
			</view>
			<view class="explain-item-box">
				<view class="item-title">
					<view class="long-string"></view>
					<view class="title-text">关于收益</view>
				</view>
				<view class="item-content">
					<view>(1) 您或您的粉丝下单并确认收货后，您将获得收益；</view>
					<view>(2) 每月25日将结算上一个自然月确认收货的订单，未确认收货的订单将在下月25日结算，结算后的收益将自动计入您的余额中，您可以通过绑定支付宝随时申请提现，申请后收益将在48小时内到账；</view>
					<view>(3) 当出现取消订单、退货退款、或者因订单异常等情况时，将相应扣除收益，实际根据系统结算为准。</view>
				</view>
			</view>
			<view class="explain-item-box">
				<view class="item-title">
					<view class="long-string"></view>
					<view class="title-text">名词释义</view>
				</view>
				<view class="item-content">
					<view>1. 累计收益：累计结算的收益；</view>
					<view>2. 结算收入（上月收益）：上个月内确认收货的订单收益，每月25日结算后，将累计到余额中；</view>
					<view>3. 预估收入（本月收益）：本月内创建的所有订单预估收益；</view>
					<view>4. 预估收入（上月收益）：上月内创建的所有订单预估收益；</view>
					<view>5. 今日预估收入：今日所有订单预估收益；</view>
					<view>6. 今日失效收入：失效时间为今日的所有订单收益；</view>
					<view>7. 昨日预估收入：昨日所有订单预估收益；</view>
					<view>8. 昨日失效收入：失效时间为昨日的所有订单收益；</view>
					<view>9. 付款笔数：今天内所有付款的订单数量，包含有效订单和失效订单；</view>
					<view>10. 失效订单：取消付款、退货退款、申请维权或因订单异常，均为失效订单；</view>
					<view>11. 自然月：自然月是指每个月的1号到该月的最后一天。</view>
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
	.rule-body {
		width: 750rpx;
		padding: 0 15px 30px;
		.explain-item-box {
			margin: 10px 0 0;
			padding: 5px 0 20px 15px;
			border-radius: 8px;
			box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
			.item-title {
				height: 39px;
				border-bottom: 1px solid #E5E5E5;
				margin: 0 5px 0 0;
				display: flex;
				align-items: center;
				.long-string {
					width: 3px;
					height: 14px;
					border-radius: 35%;
					background-color: #FF716E;
				}
				.title-text {
					height: 19px;
					margin: 0 0 3px 3px;
					font-size: 16px;
					font-weight: bold;
				}
			}
			.item-content {
				margin: 10px 15px 0 0;
				line-height: 19px;
				font-size: 13px;
				color: #999999;
			}
		}
	}
</style>
