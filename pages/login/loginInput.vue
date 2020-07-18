<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="完善信息"></uni-nav-bar>
		<hint-box :content="hintContent"></hint-box>
		<view class="alter-phone-body">
			<view class="phone-num">
				<ai-input inputWidth="430rpx" titleWidth="120rpx" :del="true" title="快手ID" @getInput="getKs" placeholder="请输入ID（必填）"
				 :mark="true"></ai-input>
			</view>
			<view class="phone-num">
				<ai-input inputWidth="430rpx" titleWidth="120rpx" :del="true" title="抖音ID" @getInput="getDouyin" placeholder="请输入ID（选填）"></ai-input>
			</view>
			<view class="bt">
				<ai-button btname="确定" :buttonbg="aiButtonBg" @eventClick="bindId()"></ai-button>
			</view>
		</view>
		<!-- <ai-popup-message ref="aiPopupMessage"></ai-popup-message> -->
	</view>
</template>

<script>
	import hintBox from '@/components/hint-box'
	import aiInput from '@/components/ai-input'
	export default {
		components: {
			hintBox,
			aiInput
		},
		data() {
			return {
				hintContent: "请务必填写正确的快手/抖音ID",
				douyin: "",
				ks: "",
				aiButtonBg: "ai-button-graybg",
				jumpUrl: ''
			}
		},
		watch: {
			ks() {
				if (this.ks.length != 0) {
					this.aiButtonBg = "ai-button-redbg"
				} else {
					this.aiButtonBg = "ai-button-graybg"
				}
			}
		},
		onLoad(res) {
			this.jumpUrl = res.jumpUrl
		},
		methods: {
			getDouyin(res) {
				this.douyin = res
			},
			getKs(res) {
				this.ks = res
			},
			bindId() {
				if (this.jumpUrl == "back") { //当入口页面不是主页面时跳回
					this.$api.getUserCenter().then(res => {
						this.$store.commit("setUserInfoES", res.data.data)
						this.$aiRouter.navToBack(3)
					})
				} else { //当入口页是主页面时关闭所有页面重新跳转
					this.$api.getUserCenter().then(res => {
						this.$store.commit("setUserInfoES", res.data.data)
						this.$aiRouter.launch(this.jumpUrl)
					})
				}


				// if(this.ks.length == 0){
				// 	return
				// }
				// this.$api.postPlatId({
				// 	kuaishou_id: this.ks,
				// 	douyin_id: this.douyin
				// }).then(res => {
				// 	console.log(res)
				// })
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
		margin: 0 0 10px 0;
	}

	.bt {
		position: fixed;
		bottom: 46px;
	}
</style>
