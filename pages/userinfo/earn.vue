<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="我的收益" right-icon="help" @clickRight="navTo('/pages/help/earnRule')"></uni-nav-bar>
		<view class="earn-page-body">
			<view class="earn-blance">
				<image class="earn-blance-bg" src="../../static/icon/bg-earn-01.png"></image>
				<view class="earn-blance-title">账户余额（元）： </view>
				<view class="earn-blance-num">{{balance}}</view>
			</view>
			<!--收益来源分类，卖货、赚金-->
			<view class="es-kind">
				<view class="es-kind-item" v-for="(item, index) in esKind" @click="selKind(item)" :key="index" :class="item.id == elKind ? 'es-sel-item' : '' ">
					<view>{{item.name}}</view>
					<view class="es-ki-underline es-sel-underline"></view>
				</view>
			</view>
			<view v-show="selEsKind == 'earn'">
				<!--本月预估收益内容-->
				<view class="earn-content">
					<view class="ec-one">
						<view class="ec-one-sum">{{monthEarn.commission || "0.00"}}</view>
						<view class="ec-one-text">本月预估收益（元）</view>
					</view>
					<view class="ec-two"></view>
					<view class="ec-thr">
						<!--
						<view class="ec-thr-sale">
							<view class="ec-ts-sum">34560.78</view>
							<view class="ec-ts-text">上月预估收益（元）</view>
						</view>
						-->
						<view class="ec-thr-oder" style="margin: 29px 0 0 0;">
							<view class="ec-ts-sum">{{lmonthEarn.commission || "0.00"}}</view>
							<view class="ec-ts-text">上月结算收益（元）</view>
						</view>
					</view>
				</view>
				<!--今日收益、昨日收益、近七日收益 菜单-->
				<view class="day-earn">
					<view class="de-item" v-for="(item, index) in dayMenu" @click="selMenu(item.id)" :class="item.id == elMenu ? 'de-sel-item' : '' "
					 :key="item.id">{{item.name}}</view>
				</view>
				<!--今日收益、昨日收益、近七日收益 内容-->
				<view class="earn-content">
					<view class="ec-one">
						<view class="ec-one-sum">{{dayEarn.commission || "0.00"}}</view>
						<view class="ec-one-text">预估收益（元）</view>
					</view>
					<view class="ec-two"></view>
					<view class="ec-thr">
						<view class="ec-thr-sale">
							<view class="ec-ts-sum">{{dayEarn.total_num || "0"}}</view>
							<view class="ec-ts-text">提交拉新数量</view>
						</view>
						<view class="ec-thr-oder">
							<view class="ec-ts-sum">{{dayEarn.com_num || "0"}}</view>
							<view class="ec-ts-text">过审拉新数量</view>
						</view>
					</view>
				</view>
				<view class="earn-detail" v-if="earnDetail">
					<view class="earn-detail-item" @click="navTo('/pages/userinfo/taskEarnDetail')">
						<ai-list-cell title="赚金结算明细"></ai-list-cell>
					</view>
				</view>
			</view>
			<view v-show="selEsKind == 'sale'">
				<!--本月预估收益内容-->
				<view class="earn-content">
					<view class="ec-one">
						<view class="ec-one-sum">0.00</view>
						<view class="ec-one-text">本月预估收益（元）</view>
					</view>
					<view class="ec-two"></view>
					<view class="ec-thr">
						<!--
						<view class="ec-thr-sale">
							<view class="ec-ts-sum">34560.78</view>
							<view class="ec-ts-text">上月预估收益（元）</view>
						</view>
						-->
						<view class="ec-thr-oder" style="margin: 29px 0 0 0;">
							<view class="ec-ts-sum">0.00</view>
							<view class="ec-ts-text">上月结算收益（元）</view>
						</view>
					</view>
				</view>
				<!--今日收益、昨日收益、近七日收益 菜单-->
				<view class="day-earn">
					<view class="de-item" v-for="(item, index) in dayMenu" @click="selMenu(item.id)" :class="item.id == elMenu ? 'de-sel-item' : '' "
					 :key="item.id">{{item.name}}</view>
				</view>
				<!--今日收益、昨日收益、近七日收益 内容-->
				<view class="earn-content">
					<view class="ec-one">
						<view class="ec-one-sum">0.00</view>
						<view class="ec-one-text">预估收益（元）</view>
					</view>
					<view class="ec-two"></view>
					<view class="ec-thr">
						<view class="ec-thr-sale">
							<view class="ec-ts-sum">0.00</view>
							<view class="ec-ts-text">销售额（元）</view>
						</view>
						<view class="ec-thr-oder">
							<view class="ec-ts-sum">0</view>
							<view class="ec-ts-text">订单数（个）</view>
						</view>
					</view>
				</view>
				<view class="earn-detail">
					<view class="earn-detail-item" @click="navTo('/pages/userinfo/saleEarnDetail')">
						<ai-list-cell title="卖货结算明细"></ai-list-cell>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import aiListCell from '@/components/ai-list-cell'
	export default {
		components: {
			aiListCell,
		},
		data() {
			return {
				balance: 0,
				esKind: [{
					id: "0",
					name: "赚金",
					tags: "earn"
				}, {
					id: "1",
					name: "卖货",
					tags: "sale"
				}],
				elKind: "0",
				dayMenu: [{
					id: "0",
					name: "今日"
				}, {
					id: "1",
					name: "昨日"
				}, {
					id: "2",
					name: "近七日"
				}],
				elMenu: "0",
				selEsKind: "earn",
				taskEarn: {},
				monthEarn: {},
				lmonthEarn: {},
				dayEarn: {},
				earnDetail: true
			}
		},
		onLoad() {
			this.getBalance()
			this.getTaskEarn()
		},
		methods: {
			selKind(item) {
				this.elKind = item.id
				this.selEsKind = item.tags
				this.elMenu = 0
				if(item.tags == "earn"){
					this.getTaskEarn()
					return
				}
				if(item.tags == "sale"){
					return
				}
			},
			selMenu(id) {
				this.elMenu = id
				if(this.selEsKind == "earn"){
					if(id == 0){this.dayEarn = this.taskEarn.today || {}}
					if(id == 1){this.dayEarn = this.taskEarn.yestoday || {}}
					if(id == 2){this.dayEarn = this.taskEarn.week || {}}
				}
				if(this.selEsKind == "sale"){
					if(id == 0){this.dayEarn = this.taskEarn.today || {}}
					if(id == 1){this.dayEarn = this.taskEarn.yestoday || {}}
					if(id == 2){this.dayEarn = this.taskEarn.week || {}}
				}
			},
			getBalance(){
				this.$api.getUserCenter().then(res => {
					this.balance = res.data.data.balance
				})
			},
			getTaskEarn(){
				if(this.$store.state.userInfo.level == "3" || this.$store.state.userInfo.level == "4" || this.$store.state.userInfo.level == "8"){
					this.$api.postTaskEarn({
						user_id: this.$store.state.userInfo.id
					}).then(res => {
						this.monthEarn = res.data.data.month
						this.lmonthEarn = res.data.data.lmonth
						this.dayEarn = res.data.data.today
						this.taskEarn = res.data.data
						this.earnDetail = true
					})
				}else{
					this.monthEarn = 0.00
					this.lmonthEarn = 0.00
					this.dayEarn = 0
					this.taskEarn = 0
					this.earnDetail = false
				}
				
			},
			navTo(url) {
				this.$aiRouter.navTo(url)
			}
		}
	}
</script>

<style lang="scss">
	.earn-page-body {
		width: 750rpx;
		padding: 10px 30rpx 0;
	}

	/*账户余额*/
	.earn-blance {
		width: 690rpx;
		height: 49px;
		position: relative;
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
		display: flex;
		align-items: center;

		.earn-blance-bg {
			position: absolute;
			width: 750rpx;
			left: -30rpx;
			height: 99px;
		}

		.earn-blance-title {
			position: relative;
			display: inline-block;
			width: 100px;
			margin: 0 0 0 35rpx;
			font-size: 12px;
			color: rgba(255, 255, 255, 0.8);
		}

		.earn-blance-num {
			position: relative;
			display: inline-block;
			font-weight: 700;
			font-size: 26px;
			color: rgba(255, 255, 255, 0.9);
		}
	}

	/*收益分类，卖货，赚金*/
	.es-kind {
		display: flex;
		margin: 15px 0 0 0;
		align-items: baseline;

		.es-kind-item {
			margin: 0 10px;
			height: 34px;
			position: relative;
			font-size: 15px;
		}

		.es-ki-underline {
			width: 20px;
			height: 2px;
			border-radius: 10%;
			position: absolute;
			bottom: 0;
		}

		.es-sel-item {
			font-size: 20px;
			font-weight: bold;
			color: #FF716E;

			.es-sel-underline {
				background-color: #FF716E;
			}
		}
	}

	/*月收益*/
	.earn-content {
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
		display: flex;
		height: 130px;
		padding: 17px 0 15px 50rpx;

		.ec-one {
			margin: 29px 0 0 0;
			width: 270rpx;

			.ec-one-sum {
				font-size: 20px;
				font-weight: bold;
				color: #FF716E;
			}

			.ec-one-text {
				font-size: 12px;
				color: #666666;
			}
		}

		.ec-two {
			width: 67rpx;
			border-left: 1px solid #E5E5E5;
			height: 50px;
			margin: 25px 0 0 0;
		}

		.ec-thr-oder {
			margin: 10px 0 0 0;
		}

		.ec-ts-sum {
			font-size: 20px;
			font-weight: bold;
			color: #FFA570;
		}

		.ec-ts-text {
			font-size: 12px;
			color: #666666;
		}
	}

	/*日收益菜单*/
	.day-earn {
		display: flex;
		padding: 0 20rpx;
		margin: 25px 0 15px 0;
		justify-content: space-between;

		.de-item {
			width: 200rpx;
			height: 35px;
			line-height: 33px;
			border: 1px solid #FFA570;
			border-radius: 19px;
			text-align: center;
			color: #FFA570;
			font-size: 15px;
		}

		.de-sel-item {
			background-color: #FFA570;
			color: #FFFFFF;
		}
	}

	/*收益结算明细，提现记录*/
	.earn-detail {
		margin: 10px 0 60px 0;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;

		.earn-detail-item {
			font-size: 15px;
			height: 45px;
			padding: 0 15px;
		}
	}
</style>
