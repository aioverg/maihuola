<template>
	<view class="ai-login-wechat">
		<image class="alw-img" src="/static/icon/maihuola-01.png" mode="widthFix"></image>
		<view class="alw-bt">
			<ai-button width="540" shadowWidth="492" @eventClick="login" btname="微信登录" iconSrc="/static/icon/icon-wx.png"></ai-button>
		</view>
		<view class="alw-other">
			<text class="alw-other-one">或</text>
			<image class="alw-other-two" @click="navTo('/pages/login/loginPhone')" src="/static/icon/phone-01.png" mode="widthFix"></image>
			<text class="alw-other-thr" @click="navTo('/pages/login/loginPhone')">手机登录</text>
		</view>
		<view class="note">
			<ai-login-hint></ai-login-hint>
		</view>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button/ai-button.vue'
	import aiLoginHint from '@/components/ai-login-hint.vue'
	export default {
		components: {
			aiButton,
			aiLoginHint,
		},
		data() {
			return {
				navigateFlag: false ,//解决快速点击跳转，页面跳转多次问题
				pageId: null,
				pageParms: null,
			}
		},
		onLoad(res) {
			this.pageId = res.page_id
			this.pageParms = res.page_prams
		},
		methods: {
			navTo(obj){
				this.$aiRouter.navTo(obj)
			},
			login(){
				console.log("微信登录")
				const _this = this
				uni.login({
				  provider: 'weixin',
				  fail: function(res){console.log("微信登录失败", res)},
				  success: function (loginRes) {
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
						  console.log("用户信息", infoRes)
						  //_this.$api.getGuessSort().then(res => {console.log(7777, res)})
						  
						  _this.$api.loginWechat({
							  terminal: 1,
							  unionid: infoRes.userInfo.unionId,
							  openId: infoRes.userInfo.openId,
							  nickname: infoRes.userInfo.nickName,
							  avatarUrl:infoRes.userInfo.avatarUrl
						  }).then(res => {
							  console.log(微信登录返回, res)
						  })
						/*
						uni.setStorage({
							key: "WXAvatarUrl",
							data: infoRes.userInfo.avatarUrl,
							success: function(){
								_this.$store.commit('setWeChat',infoRes.userInfo.avatarUrl)
							}
						})*/
						//_this.$aiRouter.navTo('/pages/login/loginPhone?'+_this.pageParmKey+'='+_this.pageParmValue)
						//console.log("返回信息2",infoRes)
				        //console.log('用户昵称为：' + infoRes.userInfo.nickName);
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
		background: #FFFFFF;
	}
	.ai-login-wechat {
		width: 750rpx;
		padding: 77px 30rpx 0;
		text-align: center;
	}
	.alw-img {
		width: 224px;
		margin: 0 auto 180px;
	}
	.alw-other {
		margin: 27px 0 0 0;
		display: flex;
		align-items: center;
		justify-content: center;
		.alw-other-one {
			font-size: 13px;
			color: #CCCCCC;
		}
		.alw-other-two {
			width: 35px;
			margin: 0 5px 0 10px;
		}
		.alw-other-thr {
			font-size: 13px;
			color: #FFA570;
		}
		
	}
	.note {
		position: absolute;
		left: 75rpx;
		bottom: 50px;
	}
</style>
