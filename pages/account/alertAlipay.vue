<template>
	<view>
		<ai-navbar
		    title="修改支付宝绑定"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="phone-num">
			<ai-input title="真实姓名" placeholder="请输入真实姓名" @getInput="getUserName" ></ai-input>
		</view>
		<view class="code-num">
			<ai-input title="支付宝账户" placeholder="请输入支付宝账户" @getInput="getAlipayAccount"></ai-input>
		</view>
		<view class="bt">
		    <ai-button btname="确定" @eventClick="alertAlipay"></ai-button>
		</view>
	</view>
</template>

<script>
	import aiInput from '@/components/ai-input';
	import aiButton from '@/components/ai-button';
	export default {
		components: {
			aiInput,
			aiButton
		},
		data() {
			return {
				
			}
		},
		methods: {
			getAlipayAccount(value){
				this.alipayAccount = value.replace(/\s*/g,"")
				console.log("支付宝账户：",this.alipayAccount)
			},
			getUserName(value){
				this.userName = value.replace(/\s*/g,"")
				console.log("真是姓名：",this.userName)
			},
			alertAlipay(){
				//发送给数据库的接口
				if(this.alipayAccount.length == 0){
					uni.showToast({
						title: "请输入正确的支付宝账户",
					});
					return
				}
				if(this.userName.length == 0){
					uni.showToast({
						title: "请输入正确的用户名",
					});
					return
				}
				console.log("接收：",this.alipayAccount,this.userName)
			}
		}
	}
</script>

<style lang="scss">
	page {
		height:1334rpx;
		width:750rpx;
		background:rgba(249,249,249,1);
	}
	.phone-num {
		margin: 30rpx 0;
	}
	.bt {
		position: relative;
		top: 734rpx;
	}

</style>
