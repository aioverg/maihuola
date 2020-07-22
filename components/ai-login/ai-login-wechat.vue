<template>
	<view class="ai-login-wechat">
		<image class="alw-img" src="/static/icon/maihuola-01.png" mode="widthFix"></image>
		<view class="alw-bt">
			<ai-button width="540" shadowWidth="492" @eventClick="login" btname="微信登录" iconSrc="/static/icon/icon-wx.png"></ai-button>
		</view>
		<view class="alw-other">
			<text class="alw-other-one">或</text>
			<image class="alw-other-two" @click="navTo('/pages/login/loginPhone')" src="/static/icon/phone-01.png" mode="widthFix"></image>
			<text class="alw-other-thr" @click="navTo('/pages/login/loginPhone?jumpUrl=' + jumpUrl)">手机登录</text>
		</view>
		<view class="note" :style="{bottom: noteBottom}">
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
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				pageId: null,
				pageParms: null,
			}
		},
		props: {
			jumpUrl: {
				type: String,
				default: ""
			},
			noteBottom: {
				type: String,
				default: "50px"
			}
		},
		methods: {
			navTo(obj) {
				this.$aiRouter.navTo(obj)
			},
			login() {
				const _this = this
				uni.login({
					provider: 'weixin',
					fail: function(res) {
						console.log("微信登录失败", res)
					},
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								//console.log("用户信息", infoRes)
								_this.$api.loginWechat({
									terminal: 1,
									unionid: infoRes.userInfo.unionId,
									openid: infoRes.userInfo.openId,
									nickname: infoRes.userInfo.nickName,
									avatarUrl: infoRes.userInfo.avatarUrl
								}).then(res => {
									if (res.data.msg == 202) {
										//微信公众号没有微信记录，跳转手机登录
										_this.$aiRouter.navTo("/pages/login/loginPhone?unionid=" + infoRes.userInfo.unionId + "&openid=" + infoRes.userInfo.openId + "&nickname=" + infoRes.userInfo.nickName + "&avatarUrl=" + infoRes.userInfo.avatarUrl + "&jumpUrl=" + _this.jumpUrl)
										return
									}
									if(res.data.msg == "success") {
										_this.$store.commit("setToken", {token: res.data.data.access_token, id: res.data.data.client.id})
										//微信公众有记录，查看是否绑定手机
										if(res.data.data.client.mobile == ""){
											if(res.data.data.client.kuaishou_id == ""){
												_this.$aiRouter.navTo("/pages/account/bindPhone?type=bind&btname=next&jumpUrl=" + _this.jumpUrl)
											}else{
												_this.$aiRouter.navTo("/pages/account/bindPhone?type=bind&btname=''&jumpUrl=" + _this.jumpUrl)
											}
											return
										}
										//微信公众号有记录，查看是否绑定快手Id
										if(res.data.data.client.kuaishou_id == ""){
											_this.$aiRouter.navTo("/pages/login/loginInput?jumpUrl=" + _this.jumpUrl)
											return
										}
										_this.$store.commit("setUserInfoES", res.data.data.client)
										if(_this.jumpUrl == "back"){//当入口页面不是主页面时跳回
											_this.$aiRouter.navToBack(1)
										}else{//当入口页是主页面时关闭所有页面重新跳转
											_this.$aiRouter.launch(_this.jumpUrl)
										}
									}
								})
							}
						})
					}
				})
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
		position: fixed;
		left: 75rpx;
	}
</style>
