<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="提现"></uni-nav-bar>
		<hint-box content="每周一00:00～周四23:59可申请提现，次日到账"></hint-box>
		<view class="tx-box">
			<view class="tx-account">
				<text class="title">支付宝账户</text>
				<text class="phone">{{account}}</text>
			</view>
			<view class="tx-input">
				<view class="title">提现金额</view>
				<view class="input-box">
					<text class="icon">¥</text>
					<input placeholder="请输入提现金额" type="number" v-model="sum" class="input" />
					<text class="note" v-show = "inputHint">（不小于10元）</text>
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
				<text v-show="!txHint && sum">*提现将扣除3%手续费，金额以实际到账为准</text>
				<text v-show="txHint">*提现金额不能超过余额</text>
			</view>
			<ai-button btname="提交" :buttonbg="aiButtonBg" @eventClick="withdraw" ></ai-button>
		</view>
		<ai-popup-message ref="aiPopupMessage" :isdistance="true"></ai-popup-message>
		<uni-popup ref="popup">
			<ai-popup-dialog :message="dialogMessage" btname="我知道了" @confirm="close" :cancelShow="false"></ai-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button/ai-button.vue'
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
				run: true,
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				dialogMessage: [{
					title: "温馨提醒",
					content: "今日提现次数已达上线，请勿重复提现。"
				}]
			}
		},
		watch:{
			sum: function(){
				if(this.sum){
					this.aiButtonBg ="ai-button-redbg"
				}else{
					this.aiButtonBg ="ai-button-graybg"
				}
				if(this.sum >= 10){
					this.inputHint = false
				}else{
					this.inputHint = true
				}
				if(this.sum > Number(this.total)){
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
				this.name = res.data.data.real_name
				this.account = res.data.data.account
			})
		},
		methods: {
			close(done){
				done()
			},
			aiPopupMessage(type, content){
				if(!this.run){
					return
				}
				this.run = false
				this.$refs.aiPopupMessage.open({
					type: type,
					content: content,
					timeout:1500,
					isClick:false
				})
				setTimeout(() => {
					this.run = true
				}, 2000)
			},
			allWithdraw(){
				this.sum = Number(this.total)
			},
			withdraw(){
				let nowDay = new Date().getDay()
				if(nowDay<1 || nowDay>4){
					this.aiPopupMessage('err', '不在提现时间内')
					return
				}
				if(!this.sum){
					return
				}
				if(this.sum && this.sum < 10){
					this.aiPopupMessage('err', '不能小于10元')
					return
				}
				if(this.sum > this.total){
					this.aiPopupMessage('err', '不能大于总金额')
					return
				}
				if(this.sum > 5000){
					this.aiPopupMessage('err', '每次不能大于5000元')
					return
				}
				this.$api.getWithdraw({
					uid: this.$store.state.userInfo.id,
					cash_num: this.sum,
					type: 1,
					account: this.account,
					real_name: this.name,
				}).then(res => {
					if(res.data.code == 0){
						this.$refs.aiPopupMessage.open({
							type:'success',
							content:'提交成功',
							timeout:1500,
							isClick:false
						})
						setTimeout(() => {
							this.$aiRouter.navTo('/pages/index/index?tabId=2')
						},2000)
						return
					}
					if(res.data.code == 201){
						this.$refs.popup.open()
						return
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
	.tx-box {
		width: 690rpx;
		height:208px;
		background: #FFFFFF;
		box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
		margin: 7px auto 0;
		border-radius:16px;
		.tx-account {
			margin: 0 0 0 15px;
			padding: 15px 0 15px 0;
			border-bottom: 1px dashed #E5E5E5;
			.title {
				font-size: 16px;
			}
			.phone {
				display: inline-block;
				font-size:14px;
				color: #666666;
				margin: 0 15px;
			}
		}
		.tx-input {
			margin: 10px 0 0 15px;
			.title {
				font-size:16px;
			}
			.input-box {
				height: 72px;
				display: flex;
				align-items: baseline;
				padding: 15px 0 0 0;
				border-bottom: 1px dashed #E5E5E5;
				.icon {
					display: inline-block;
					height: 42px;
					width: 37rpx;
					font-weight:500;
					font-size:30px;
				}
				.input {
					display: inline-block;
					margin: 0 0 0 10px;
					height: 28px;
					width: 285rpx;
					font-size: 30px;
				}
				.input-placeholder {
					font-size: 20px;
				}
				.note {
					display: inline-block;
					font-size:13px;
					position: relative;
					bottom: 4px;
					color: #CCCCCC;
				}
			}
			.tx-upper {
				display: inline-block;
				margin: 15px 0;
				font-size:14px;
			}
			.tx-upperbt {
				display: inline-block;
				margin: 15px 0 15px 25px;
				font-size: 14px;
				color: #FCAA7A;
			}
		}
	}
	.tx-history {
		margin: 15px 16px 0 0;
		font-size: 14px;
		text-align: right;
		text-decoration: underline;
		color: #999999;
	}
	.tx-bt {
		position: fixed;
		left: 30rpx;
		bottom: 45px;
		.tx-hint {
			font-size: 12px;
			height: 12px;
			color: #EA3A6A;
			text-align: center;
			margin: 0 0 10px;
		}
	}


</style>
