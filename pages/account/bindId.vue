<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" :leftText="tabBarTitle"></uni-nav-bar>
		<view class="alter-phone-body">
			<view class="phone-num">
				<ai-input inputWidth="390rpx" titleWidth="120rpx" :del="true" :title="inputTitle" @getInput="getId" :placeholder="placeHolder"></ai-input>
			</view>
			<view class="bt">
				<ai-button btname="确定" :buttonbg="aiButtonBg" @eventClick="alertPlatId"></ai-button>
			</view>
		</view>
		<ai-popup-message ref="aiPopupMessage"></ai-popup-message>
	</view>
</template>

<script>
	import aiInput from '@/components/ai-input';
	export default {
		components: {
			aiInput
		},
		data() {
			return {
				platId: null,
				aiButtonBg: "ai-button-graybg",
				inputTitle: "快手ID",
				tabBarTitle: "修改快手ID",
				placeHolder: "请输入新的快手ID"
			}
		},
		watch: {
			platId(){
				if(this.platId.length != 0){
					this.aiButtonBg = "ai-button-redbg"
				}else{
					this.aiButtonBg = "ai-button-graybg"
				}
			}
		},
		onLoad(res) {
			if(res.kind == "douyin"){
				if(res.type == "bind"){
					this.inputTitle = "抖音ID"
					this.tabBarTitle = "绑定抖音ID"
					this.placeHolder = "请输入抖音ID"
				}else{
					this.inputTitle = "抖音ID"
					this.tabBarTitle = "修改抖音ID"
					this.placeHolder = res.type
				}
			}
			if(res.kind == "ks"){
				if(res.type == "bind"){
					this.inputTitle = "快手ID"
					this.tabBarTitle = "绑定快手ID"
					this.placeHolder = "请输入快手ID"
				}else{
					this.inputTitle = "快手ID"
					this.tabBarTitle = "修改快手ID"
					this.placeHolder = res.type
				}
			}
			
		},
		methods: {
			getId(res) {
				this.platId = res
			},
			alertPlatId() {
				/*
				if (this.phone % 1 !== 0 || this.phone.length !== 11) {
					this.$aiGlobal.aiPopupMessage.apply(this, ['err', '手机号码错误'])
					return
				}
				if (this.code % 1 !== 0 || this.code.length !== 6) {
					this.$aiGlobal.aiPopupMessage.apply(this, ['err', '验证码错误'])
					return
				}
				this.$api.getAlertPhone({
					phone: this.phone,
					code: this.code
				}).then(res => {
					if (res.data.code == 500) {
						this.$aiGlobal.aiPopupMessage.apply(this, ['err', '手机号码已被注册'])
						return
					} else {
						this.$aiRouter.redirect('/pages/index/index?tabId=2')
						this.$aiGlobal.aiPopupMessage.apply(this, ['success', '修改成功'])
					}
				})
				*/
			}

		}
	}
</script>

<style lang="scss">
	.alter-phone-body {
		width: 750rpx;
		padding: 10px 30rpx 0;
	}

	.phone-num {
		width: 690rpx;
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
	}

	.code-num {
		width: 690rpx;
		margin: 10px 0 0 0;
		box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.06);
		border-radius: 8px;
	}

	.bt {
		position: fixed;
		bottom: 46px;
	}
</style>
