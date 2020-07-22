<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="关于我们" ></uni-nav-bar>
		<view class="about-body">
			<view class="help-box">
				<view class="hb-list" @click="navTo('/pages/about/agreement')">
					<ai-list-cell title="客户端软件许可与服务协议" dashed="dashed"></ai-list-cell>
				</view>
				<view class="hb-list" @click="navTo('/pages/about/privacy')">
					<ai-list-cell title="隐私政策"></ai-list-cell>
				</view>
			</view>
			<view class="ab-version" @click="updateApp">
				<ai-list-cell title="版本号" :message="updateMessage" :color="updateColor"></ai-list-cell>
			</view>
		</view>
		<uni-popup ref="popupAiDia" type="dialog">
			<ai-popup-update :updateBt="updateBt" :version="updateVersion" :content="updateContent" popupbg="/static/img/bg-update.png" type="dialog"
			 :cancel-show="true" @close="close" @confirm="confirm"></ai-popup-update>
		</uni-popup>
	</view>
</template>

<script>
	import aiListCell from '@/components/ai-list-cell'
	import aiPopupUpdate from '@/components/uni-popup/ai-popup-update.vue'
	// #ifdef APP-PLUS
	import {apkDownload} from '@/static/js/appUpdate.js'
	// #endif
	export default {
		components: {
			aiListCell,
			aiPopupUpdate
		},
		data() {
			return {
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				updateColor: "#cccccc",
				//更新弹窗按钮
				updateBt: "立即升级"
			}
		},
		computed: {
			updateMessage() {
				if (this.$store.state.appInfo.update) {
					this.updateColor = "#FF4100"
					return "更新"
				} else {
					this.updateColor = "#cccccc"
					return this.$store.state.appInfo.localVersion
				}
			},
			updateVersion() {
				return this.$store.state.appInfo.appVersion
			},
			updateContent() {
				return this.$store.state.appInfo.appNote
			},
			updataLink() {
				return this.$store.state.appInfo.appLink
			},
			updataType() {
				return this.$store.state.appInfo.require
			}
		},
		methods: {
			/*跳转统一接口*/
			navTo(url){
				this.$aiRouter.navTo(url)
			},
			updateApp() {
				if (this.$store.state.appInfo.update) {
					this.$refs.popupAiDia.open()
				}
			},
			confirm(done){
				apkDownload(this)
			},
			close(done){
				done()
			}
		}
	}
</script>

<style lang="scss">
	.about-body {
		width: 750rpx;
		padding: 10px 30rpx 0;
	}
	.help-box {
		width: 690rpx;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
		.hb-list {
			height: 45px;
			padding:  0 15px;
			font-size: 15px;
		}
	}
	
	.ab-version {
		width: 690rpx;
		height: 45px;
		padding: 0 30rpx;
		margin: 10px 0 0;
		box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
		border-radius: 8px;
	}
</style>
