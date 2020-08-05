<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="我的收益" right-icon="help" @clickRight="navTo('/pages/help/earnRule')"></uni-nav-bar>
		<view class="earn-page-body">
			<view class="earn-blance">
				<image class="earn-blance-bg" src="/static/icon/bg-earn-01.png" mode="widthFix"></image>
				<view>
					<view class="earn-blance-num">99999</view>
					<view class="earn-blance-title">总收益（元）</view>
				</view>
				<view>
					<view class="earn-blance-num">{{balance}}</view>
					<view class="earn-blance-title">账户余额（元）</view>
				</view>
			</view>
			<!--收益来源分类，卖货、赚金-->
			<view class="es-kind">
				<view class="es-kind-item" v-for="(item, index) in esKind" @click="selKind(item)" :key="index" :class="item.id == elKind ? 'es-sel-item' : '' ">
					<view>{{item.name}}</view>
					<image v-show="item.id == elKind" src="/static/icon/across-ling-01.png" style="width: 20px; position: absolute; bottom: 4px;" mode="widthFix"></image>
				</view>
			</view>
			<view>
				<!--本月预估收益内容-->
				<view class="earn-month">
					<view class="ec-one">
						<view class="ec-sum">{{monthEarn.commission || "0.00"}}</view>
						<view class="ec-text">本月结算收益（元）</view>
					</view>
					<view class="ec-two"></view>
					<view class="ec-thr">
						<view class="ec-sum">{{lmonthEarn.commission || "0.00"}}</view>
						<view class="ec-text">上月预估收益（元）</view>
					</view>
				</view>
				<!--今日收益、昨日收益、近七日收益-->
				<view class="earn-day">
					<view class="earn-day-menu">
						<view class="earn-day-menu-item" v-for="(item, index) in dayMenu" @click="selMenu(item.id)" :class="item.id == elMenu ? 'de-sel-item' : '' "
						 :key="item.id">{{item.name}}
						</view>
					</view>
					<view class="earn-day-content">
					<view class="edc-item">
						<view class="edc-item-sum">{{dayEarn.commission || "0.00"}}</view>
						<view class="edc-item-text">{{dayItemOne}}</view>
					</view>
					<view class="edc-item">
						<view class="edc-item-sum">{{dayEarn.total_num || "0"}}</view>
						<view class="edc-item-text">{{dayItemTwo}}</view>
					</view>
					<view class="edc-item">
						<view class="edc-item-sum">{{dayEarn.com_num || "0"}}</view>
						<view class="edc-item-text">{{dayItemThr}}</view>
					</view>
					</view>
				</view>
				<view class="earn-detail" v-if="earnDetail">
					<view class="earn-detail-item" @click="navTo('/pages/userinfo/taskEarnDetail')">
						<ai-list-cell title="赚金结算明细"></ai-list-cell>
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
					name: "今日",
					pic: '/static/icon/across-ling-01.png'
				}, {
					id: "1",
					name: "昨日",
					pic: '/static/icon/across-ling-01.png'
				}, {
					id: "2",
					name: "近七日",
					pic: '/static/icon/across-ling-01.png'
				}],
				dayItemOne: "预估收益（元）",
				dayItemTwo: "提交数量（个）",
				dayItemThr: "过审数量（个）",
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
					this.dayItemOne = "销售额（元）"
					this.dayItemTwo = "预估收益（元）"
					this.dayItemThr = "订单数（个）"
					this.getTaskEarn()
					return
				}
				if(item.tags == "sale"){
					this.dayItemOne = "预估收益（元）"
					this.dayItemTwo = "提交数量（个）"
					this.dayItemThr = "过审数量（个）"
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
		height: 100px;
		position: relative;
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.earn-blance-bg {
			position: absolute;
			width: 750rpx;
			left: -30rpx;
			height: 99px;
		}
		
		.earn-blance-title {
			position: relative;
			font-size: 13px;
			color: rgba(255, 255, 255, 0.8);
		}

		.earn-blance-num {
			position: relative;
			font-weight: bold;
			font-size: 23px;
			color: rgba(255, 255, 255, 0.9);
		}
	}

	/*收益分类，卖货，赚金*/
	.es-kind {
		display: flex;
		margin: 15px 0 10px 0;
		align-items: baseline;

		.es-kind-item {
			margin: 0 10px;
			height: 34px;
			position: relative;
			font-size: 15px;
		}

		.es-sel-item {
			font-size: 20px;
			font-weight: bold;
			color: #FF5350;
		}
	}

	/*月收益*/
	.earn-month {
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
		display: flex;
		height: 88px;
		padding: 20px 0 18px 50rpx;
		
		.ec-one {
			width: 270rpx;
			margin: 5px 0 0 0;
		}
		
		.ec-two {
			width: 67rpx;
			border-left: 1px solid #E5E5E5;
			height: 50px;
		}
		
		.ec-thr {
			margin: 5px 0 0 0;
		}
		
		.ec-sum {
			font-size: 18px;
			font-weight: bold;
			color: #FFA570;
		}
		
		.ec-text {
			font-size: 12px;
			color: #666666;
		}
		
	}
	
	/*日收益*/
	.earn-day {
		height: 138px;
		border-radius: 8px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		background: #FFFFFF;
		padding: 15px 15px 25px;
		margin: 10px 0 0 0;
		.earn-day-menu {
			display: flex;
			padding: 0 0 10px;
			font-size: 15px;
			border-bottom: 1px dashed #E5E5E5;
			.earn-day-menu-item {
				margin: 0 60rpx 0 0;
			}
			.de-sel-item {
				font-weight: bold;
				color: #FF5350;
			}
		}
		.earn-day-content {
			padding: 25px 5px 0 10px;
			display: flex;
			justify-content: space-between;
			.edc-item-sum {
				font-size: 18px;
				color: #FFA570;
				font-weight: bold;
			}
			.edc-item-text {
				font-size: 12px;
				color: #666666;
			}
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
