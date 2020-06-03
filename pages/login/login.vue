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
			<image class="img" src="/static/img/icon-mhl-01.png"></image>
		</view>
		<view>
			<ai-button @eventClick="login" btname="微信登录" iconSrc="/static/icon/icon-wx.png"></ai-button>
		</view>
		<view class="to-phone" @click="navTo('/pages/login/loginPhone?'+'page_id='+pageId+'&'+'page_prams='+pageParms)">
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
				    //console.log("返回信息1",loginRes);
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
						uni.setStorage({
							key: "WXAvatarUrl",
							data: infoRes.userInfo.avatarUrl,
							success: function(){
								_this.$store.commit('setWeChat',infoRes.userInfo.avatarUrl)
							}
						})
						_this.$aiRouter.navTo('/pages/login/loginPhone?'+_this.pageParmKey+'='+_this.pageParmValue)
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
		background:rgba(255,255,255,0);
	}
	.img-box {
		width: 750rpx;
		text-align: center;
		height: 350px;
		.img {
			display: inline-block;
			width: 286rpx;
			height: 286rpx;
			margin: 88px auto;
		}
	}
	.to-phone {
		margin: 26px 0 0;
		text-align: center;
		font-size: 13px;
		color: #CCCCCC;
		text-decoration-line: underline;
	}
	.note {
		position: absolute;
		left: 75rpx;
		bottom: 50px;
		//margin: 0 0 50px 0;
	}
</style>
