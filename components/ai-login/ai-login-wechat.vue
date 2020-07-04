<template>
	<view class="ai-login-wechat">
		<image class="alw-img" src="/static/img/maihuola-03.png" mode="widthFix"></image>
		
		<view class="alw-bt">
			<ai-button width="540" shadowWidth="492" @eventClick="login" btname="微信登录" iconSrc="/static/icon/icon-wx.png"></ai-button>
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
				    console.log("返回信息1",loginRes);
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
						  console.log("用户信息", infoRes)
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
		padding: 100px 30rpx 0;
		text-align: center;
		.alw-img {
			width: 560rpx;
			margin: 0 auto 140px;
		}
	}

	.note {
		position: absolute;
		left: 75rpx;
		bottom: 50px;
	}
</style>
