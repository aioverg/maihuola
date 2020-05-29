<template>
	<view>
		<ai-navbar
		    title="提现"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<hint-box content="每月25号可提现上个月内确认收货的订单收益"></hint-box>
		<view class="tx-box">
			<view class="tx-account">
				<text class="title">到账支付宝</text>
				<text class="name">{{name}}</text>
				<text class="phone">{{account}}</text>
			</view>
			<view class="tx-input">
				<view class="title">提现金额</view>
				<view class="input-box">
					<text class="icon">¥</text>
					<input placeholder="请输入提现金额" type="number" v-model="sum" class="input" />
					<text class="note" v-if="inputHint">（不小于1元）</text>
				</view>
				<view class="tx-upper">可提现金额 ¥{{total}}</view>
				<view class="tx-upperbt" @click="allWithdraw">全部提现</view>
			</view>
		</view>
		<view class="tx-history" @click="navTo('/pages/withdraw/record')">
			提现记录
		</view>
		<view class="tx-bt">
			<view class="tx-hint" >
				<text v-if="txHint">*提现金额不能超过余额</text>
			</view>
			<ai-button btname="提交" :buttonbg="aiButtonBg" @eventClick="withdraw" ></ai-button>
		</view>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button.vue'
	import hintBox from '@/components/hint-box'
	export default {
		components: {
			aiButton,
			hintBox
		},
		data() {
			return {
				name: null,
				account: null,
				sum: null,
				total: null,
				txHint: false,
				inputHint: true,
				aiButtonBg: "ai-button-graybg",
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
			}
		},
		watch:{
			sum: function(){
				if(this.sum){
					this.aiButtonBg ="ai-button-redbg"
				}else{
					this.aiButtonBg ="ai-button-graybg"
				}
				if(this.sum > this.total){
					this.txHint = true
				}else{
					this.txHint = false
				}
			}
		},
		onLoad(res) {
			this.total = res.total
			this.$api.getAuthInfo({
				code: "alipay"
			}).then(res => {
				console.log(1111,res)
				for(let item of res.data.data){
					if(item.type == 1){
						this.name = (item.nickname).slice(0,1)+'**'
						this.account = item.title
						break
					}
				}
			})
		},
		methods: {
			allWithdraw(){
				this.sum = Number(this.total)
			},
			withdraw(){
				if(!this.sum){
					return
				}
				if(0< this.sum && this.sum < 1){
					this.$refs.aiPopupMessage.open({
						type:'err',
						content:'不能小于1元',
						timeout:2000,
						isClick:false
					})
					return
				}
				if(Number(this.sum) > this.total){
					this.$refs.aiPopupMessage.open({
						type:'err',
						content:'不能大于总金额',
						timeout:2000,
						isClick:false
					})
					return
				}
				this.$api.getWithdraw({
					uid: this.$store.state.userInfo.id,
					cash_num: this.sum,
					type: 1,
					account: this.account,
					real_name: this.name,
				}).then(res => {
					console.log(res)
					if(res.data.code == 0){
						this.$refs.aiPopupMessage.open({
							type:'success',
							content:'提交成功',
							timeout:1500,
							isClick:false
						})
						setTimeout(() => {
							this.$aiRouter.navTabBar('/pages/user/user')
						},2000)
					}
				})
			},
			navTo(obj){
				this.$aiRouter.navTo(obj)
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background:rgba(249,249,249,1);
	}
	.tx-box {
		width: 690rpx;
		height:208px;
		background:rgba(255,255,255,1);
		margin: 7px auto 0;
		border-radius:16px;
		.tx-account {
			margin: 0 0 0 15px;
			padding: 15px 0 15px 0;
			border-bottom: 1px dashed rgba(229,229,229,1);
			.title {
				font-size: 16px;
				color: rgba(51,51,51,1);
			}
			.name {
				display: inline-block;
				font-size:14px;
				color:rgba(102,102,102,1);
				margin: 0 15px 0 25px;
			}
			.phone {
				font-size:14px;
				color:rgba(102,102,102,1);
			}
		}
		.tx-input {
			margin: 10px 0 0 15px;
			.title {
				font-size:16px;
				color:rgba(51,51,51,1);
			}
			.input-box {
				height: 72px;
				display: flex;
				align-items: baseline;
				padding: 15px 0 0 0;
				border-bottom: 1px dashed rgba(229,229,229,1);
				.icon {
					display: inline-block;
					height: 42px;
					width: 37rpx;
					font-weight:500;
					color:rgba(51,51,51,1);
					font-size:30px;
				}
				.input {
					display: inline-block;
					margin: 0 0 0 10px;
					height: 28px;
					width: 285rpx;
					font-size:20px;
				}
				.note {
					display: inline-block;
					font-size:13px;
					color:rgba(204,204,204,1);
				}
			}
			.tx-upper {
				display: inline-block;
				margin: 15px 0;
				font-size:14px;
				color:rgba(51,51,51,1);
			}
			.tx-upperbt {
				display: inline-block;
				margin: 15px 0 15px 25px;
				width: 114rpx;
				height: 20px;
				font-size: 14px;
				color:rgba(252,170,122,1);
			}
		}
	}
	.tx-history {
		margin: 15px 16px 0 303px;
		font-size:14px;
		text-decoration: underline;
		color:rgba(153,153,153,1);
	}
	.tx-bt {
		margin: 220px 0 0 0;
		.tx-hint {
			font-size: 12px;
			height: 12px;
			color:rgba(234,58,106,1);
			text-align: center;
			margin: 0 0 10px;
		}
	}


</style>
