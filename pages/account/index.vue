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
				    <ai-list-cell title="微信绑定" :message="weixin" dashed="dashed"></ai-list-cell>
			    </view>
			    <view class="box-item" @click="bindTB()">
				    <ai-list-cell title="淘宝授权" :message="taobao" dashed="dashed"></ai-list-cell>
			    </view>
			    <view class="box-item" @click="bindAlipay()">
				    <ai-list-cell title="支付宝绑定" :message="alipay"></ai-list-cell>
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
				popupDialogTitle: null,
				popupDialogContent: null,
				popupMessages: null,
				clearBind: null,
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
				
			}
		},
		computed: {
			tel(){
				if(this.$store.state.userInfo.tel){
					return "已绑定"
				}else{
					return "未绑定"
				}
			},
			weixin(){
				if(this.$store.state.authInfo.wechat){
					return "已绑定"
				}else{
					return "未绑定"
				}
			},
			taobao(){
				if(this.$store.state.authInfo.taobao){
					return "已授权"
				}else{
					return "未授权"
				}
			},
			alipay(){
				if(this.$store.state.authInfo.alipay){
					return "已绑定"
				}else{
					return "未绑定"
				}
			}
		},
		methods: {
			bindWx(){
				const _this = this
				if(!_this.$store.state.authInfo.wechat){
					uni.login({
					    provider: 'weixin',
					    success: function (loginRes) {
							_this.popupMessages = "绑定成功"
							_this.$refs.popupMessage.open()
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
					        });
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
				if(_this.$store.state.authInfo.taobao){
					_this.popupDialogTitle = "解除绑定"
					_this.popupDialogContent = "确定要解除淘宝吗？"
					_this.clearBind = "taobao"
					_this.$refs.popupDialog.open()
					//点击是向后台发送接触绑定，否什么也不做
				}else{
					this.$global.navTo('/pages/account/taobao?page_id=3')
				}
			},
			bindAlipay(){
				if(!this.$store.state.authInfo.alipay){
					this.navTo('/pages/account/bindAlipay?navbartitle=绑定支付宝')
				}else{
					this.navTo('/pages/account/bindAlipay?navbartitle=修改绑定支付宝')
				}
			},
			close(done){
				done()
			},
			confirm(done){
			    if(this.clearBind == "weixin"){
					this.$store.commit('clearWeChat')
					done()
					return
				}
				if(this.clearBind == "taobao"){
					this.$store.commit('setTaoBao', null)
					done()
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
