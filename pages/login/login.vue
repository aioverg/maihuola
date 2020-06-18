<template>
	<view>
		<uni-nav-bar fixed="true" left-width="150" right-icon="help" @clickRight="navMessage">
			<block slot="left">
				<image @click="navBarBack" style="width: 10px; height: 17px; margin: 3px 10px 0 10px;" src="../../static/icon/left-arrow01.png"></image>
			    <view style="font-size: 20px; font-weight:bold;">商品详情</view>
			</block>
		</uni-nav-bar>
		<view class="img-box">
			<image class="img" src="/static/img/icon-mhl-01.png"></image>
		</view>
		<view>
			<ai-button @eventClick="login" btname="微信登录" iconSrc="/static/icon/icon-wx.png"></ai-button>
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
		background: #FFFFFF;
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
	.note {
		position: absolute;
		left: 75rpx;
		bottom: 50px;
		//margin: 0 0 50px 0;
	}
</style>
