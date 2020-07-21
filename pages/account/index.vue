<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="账户安全"></uni-nav-bar>
	    <view class="account-box">
		    <view class="box-item-phone" @click="navTo('/pages/account/checkPhone')">
			    <ai-list-cell title="手机号码" :color="telColor" :message="tel"></ai-list-cell>
		    </view>
		    <view class="box-sofeitem">
			    <view class="box-item" @click="bindWx()">
				    <ai-list-cell title="微信绑定" :color="wechatColor" :message="wechat" dashed="dashed"></ai-list-cell>
			    </view>
			    <view class="box-item" @click="bindTB()">
				    <ai-list-cell title="淘宝授权" :color="taobaoColor" :message="taobao" dashed="dashed"></ai-list-cell>
			    </view>
			    <view class="box-item" @click="bindAlipay()">
				    <ai-list-cell title="支付宝账户" :color="alipayColor" :message="alipay"></ai-list-cell>
			    </view>
		    </view>
			<view class="box-sofeitem">
			    <view class="box-item" @click="bindKs()">
				    <ai-list-cell title="快手ID" :color="douyinColor" :message="ks" dashed="dashed"></ai-list-cell>
			    </view>
			    <view class="box-item" @click="bindDouyin()">
				    <ai-list-cell title="抖音ID" :color="ksColor" :message="douyin"></ai-list-cell>
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
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	const Alibcsdk = uni.requireNativePlugin('UZK-Alibcsdk');
	export default {
		components: {
			aiListCell,
			uniPopupDialog,
			uniPopupMessage
		},
		data() {
			return {
				tel: null,
				telColor: "#CCCCCC",
				wechat: null,
				wechatColor: "#FF1968",
				taobao: null,
				taobaoColor: "#FF1968",
				alipay: null,
				alipayColor: "#FF1968",
				douyin: "",
				douyinColor: "#FF1968",
				ks: "",
				ksColor: "#FF1968",
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
		onShow(){
			this.getBindInfo()
		},
		methods: {
			getBindInfo(){
				this.$api.getUserCenter().then(res => {
					this.tel = res.data.data.mobile
					if(res.data.data.wechat){
						this.wechat = "已绑定"
						this.wechatColor = "#CCCCCC"
					}else{
						this.wechat = "未绑定"
						this.wechatColor = "#FF1968"
					}
					if(res.data.data.taobao){
						this.taobao = "已授权"
						this.taobaoColor = "#CCCCCC"
					}else{
						this.taobao = "未授权"
						this.taobaoColor = "#FF1968"
					}
					if(res.data.data.douyin_id){
						this.douyin = res.data.data.douyin_id
						this.douyinColor = "#CCCCCC"
					}else{
						this.douyin = "未绑定"
						this.douyinColor = "#FF1968"
					}
					if(res.data.data.kuaishou_id){
						this.ks = res.data.data.kuaishou_id
						this.ksColor = "#CCCCCC"
					}else{
						this.ks = "未绑定"
						this.ksColor = "#FF1968"
					}
					if(res.data.data.alipay){
						this.$api.getAuthInfo({
							code: "alipay"
						}).then(res => {
							this.alipay = res.data.data.account
							this.alipayColor = "#CCCCCC"
						})
					}else{
						this.alipay = "未填写"
						this.alipayColor = "#FF1968"
					}
				})
			},
			bindWx(){
				const _this = this
				if(this.wechat = "未绑定"){
					uni.login({
					    provider: 'weixin',
					    success: function (loginRes) {
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
					_this.$store.commit("setTaoBao", 0)
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
			bindDouyin(){
				if(this.douyin == "未绑定"){
					this.$aiRouter.navTo("/pages/account/bindId?kind=douyin&type=bind")
				}else{
					
					this.$aiRouter.navTo("/pages/account/bindId?kind=douyin&type=alert&id=" + this.douyin)
				}
			},
			bindKs(){
				if(this.ks == "未绑定"){
					this.$aiRouter.navTo("/pages/account/bindId?kind=ks&type=bind")
				}else{
					this.$aiRouter.navTo("/pages/account/bindId?kind=ks&type=alert&id=" + this.ks)
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
							_this.taobao == "未授权"
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

	.account-box {
		width: 750rpx;
		padding: 0 30rpx;
	}
	.box-item-phone {
		height: 45px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		margin: 10px 0;
		padding: 0 15px;
	}
	.box-sofeitem {
		padding: 0 15px;
		margin: 0 0 10px;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		.box-item {
		    height: 45px;
		}
	}
	

</style>
