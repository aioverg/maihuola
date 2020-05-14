<template>
	<view>
		<ai-navbar
		    title="微信登录"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="img-box">
			<image class="img" src="/static/img/ai-maihuola1.png"></image>
		</view>
		<view @click="login()">
			<ai-button btname="微信登录" iconSrc="/static/icon/icon-wx.png"></ai-button>
		</view>
		<view class="to-phone" @click="navTo('/pages/login/loginPhone')">
			或手机快速登录
		</view>
		<view class="note">
			<ai-login-hint></ai-login-hint>
		</view>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button'
	import aiLoginHint from '@/components/ai-login-hint.vue'
	export default {
		components: {
			aiButton,
			aiLoginHint
		},
		data() {
			return {
				
			}
		},
		methods: {
			navTo(obj){
				this.$global.navTo(obj)
			},
			login(){
				console.log(3333333)
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log(loginRes.authResult);
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
				        console.log('用户昵称为：' + infoRes.userInfo.nickName);
				      }
				    });
				  }
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(255,255,255,1);
	}
	.img-box {
		width: 750rpx;
		text-align: center;
		.img {
			display: inline-block;
			width: 286rpx;
			height: 286rpx;
			margin: 177rpx auto;
		}
	}
	.to-phone {
		margin: 52rpx 0 203rpx 0;
		text-align: center;
		font-size: 13px;
		color:rgba(204,204,204,1);
		height:37px;
		text-decoration-line: underline;
	}
	.note {
		margin: 0 0 100rpx 0;
	}
</style>
