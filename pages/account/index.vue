<template>
	<view>
		<ai-navbar
		    title="账户安全"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
	    <view class="account-box">
		    <view class="box-item-phone" @click="navTo('/pages/account/oldPhone')">
			    <ai-list-cell title="手机号码" :message="tel"></ai-list-cell>
		    </view>
		    <view class="box-sofeitem">
			    <view class="box-item" @click="bindWx()">
				    <ai-list-cell title="微信绑定" :message="wechat" dashed="dashed"></ai-list-cell>
			    </view>
			    <view class="box-item" @click="bindTB()">
				    <ai-list-cell title="淘宝授权" :message="taobao" dashed="dashed"></ai-list-cell>
			    </view>
			    <view class="box-item" @click="bindAlipay()">
				    <ai-list-cell title="支付宝账户" :message="alipay"></ai-list-cell>
			    </view>
		    </view>
			<uni-popup ref="popupDialog" type="dialog">
			    <uni-popup-dialog type="input" :title="popupDialogTitle" :content="popupDialogContent" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
			<uni-popup ref="popupMessage" type="message">
				<uni-popup-message type="success" :message="popupMessages" :duration="2000"></uni-popup-message>
			</uni-popup>
	    </view>
	</view>
</template>

<script>
	import aiListCell from '@/components/ai-list-cell'
	import uniPopUp from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	const Alibcsdk = uni.requireNativePlugin('UZK-Alibcsdk');
	export default {
		components: {
			aiListCell,
			uniPopUp,
			uniPopupDialog,
			uniPopupMessage
		},
		data() {
			return {
				tel: null,
				wechat: null,
				taobao: null,
				alipay: null,
				popupDialogTitle: null,
				popupDialogContent: null,
				popupMessages: null,
				clearBind: null,
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
				
			}
		},
		onLoad() {
			this.getBindInfo()
		},
		methods: {
			getBindInfo(){
				this.$api.getUserCenter().then(res => {
					console.log(res.data.data)
					this.tel = res.data.data.mobile
					this.wechat = res.data.data.wechat ? "已绑定" : "未绑定"
					this.taobao = res.data.data.taobao ? "已授权" : "未授权"
					if(res.data.data.alipay){
						this.$api.getAuthInfo({
							code: "alipay"
						}).then(res => {
							this.alipay = res.data.data.account
						})
					}else{
						this.alipay = "未填写"
					}
				})
			},
			bindWx(){
				const _this = this
				if(this.wechat = "未绑定"){
					uni.login({
					    provider: 'weixin',
					    success: function (loginRes) {
							console.log(9999)
							//_this.popupMessages = "绑定成功"
							//_this.$refs.popupMessage.open()
					        // 获取用户信息
					        uni.getUserInfo({
					            provider: 'weixin',
					            success: function (infoRes) {//保存用户头像
									uni.setStorage({
										key: "WXAvatarUrl",
										data: infoRes.userInfo.avatarUrl,
										success: function(){
											_this.$store.commit('setWeChat',infoRes.userInfo.avatarUrl)
										}
									})
					            }
					        })
					    },
						fail: function(){
							_this.popupMessage = true
							_this.popupDialog = false
							_this.popupMessages = "绑定失败"
							_this.$refs.popupMessage.open()
						}
					});
				}else{
					_this.popupDialogTitle = "解除绑定"
					_this.popupDialogContent = "确定要解除微信绑定吗？"
					_this.clearBind = "weixin"
					_this.$refs.popupDialog.open()
					//点击是向后台发送接触绑定，否什么也不做
				}
			},
			bindTB(){
				const _this = this
				if(_this.taobao == "已授权"){
					_this.popupDialogTitle = "解除绑定"
					_this.popupDialogContent = "确定要解除淘宝吗？"
					_this.clearBind = "taobao"
					_this.$refs.popupDialog.open()
				}else{
					this.$aiRouter.navTo('/pages/account/taobao?page_id=3')
				}
			},
			bindAlipay(){
				if(this.alipay == "未填写"){
					this.navTo('/pages/account/bindAlipay?navbartitle=绑定支付宝')
				}else{
					this.navTo('/pages/account/bindAlipay?navbartitle=修改绑定支付宝')
				}
			},
			close(done){
				done()
			},
			confirm(done){
				const _this = this
			    if(_this.clearBind == "weixin"){
					this.$store.commit('clearWeChat')
					this.$api.getAuthUnbind({
						code: "wechat"
					}).then(res => {
						if(res.data.code == 0){
							this.getBindInfo()
						}
						done()
					})
					return
				}
				if(_this.clearBind == "taobao"){
					_this.$api.getAuthUnbind({
						code: "taobao"
					}).then(res => {
						if(res.data.code == 0){
							this.getBindInfo()
						}
						done()
					})
					return
				}
			},
			navTo(url){
				uni.navigateTo({  
					url: url
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(249,249,249,1);
	}
	.account-box {
		width: 690rpx;
		margin: 0 auto;
	}
	.box-item-phone {
		width: 690rpx;
		height: 45px;
		background: rgba(255,255,255,1);
		border-radius: 8px;
		margin: 10px 0;
		padding: 0 15px;
	}
	.box-sofeitem {
		width: 690rpx;
		padding: 0 15px;
		background: rgba(255,255,255,1);
		border-radius: 8px;
		.box-item {
		    height: 45px;
		}
	}
	

</style>
