<template>
	<view class="help">
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="帮助" >
			<block slot="right">
				<image @click="headset()" src="/static/img/headset-01.png" style="width: 20px; margin: 0 5px 0 0;" mode="widthFix"></image>
			</block>
		</uni-nav-bar>
		<view class="help-list">
			<view class="hl-item" v-for="(item, index) in helpList" :key="item.id" @click="navTo(item.url+item.id)">
				<ai-list-cell :title="item.title" :dashed="item.dashed"></ai-list-cell>
			</view>
		</view>
		<uni-popup ref="popup">
			<ai-popup-dialog :message="dialogMessage" btname="我知道了" @confirm="close" :cancelShow="false"></ai-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import aiListCell from '@/components/ai-list-cell'
	export default {
		components: {
			aiListCell
		},
		data() {
			return {
				helpList: [
					{
						id: "whatTKL",
						title: "推广码是什么",
						url: "/pages/help/help?id=",
						dashed: "dashed"
					},
					{
						id: "getTKL",
						title: "如何获取推广码",
						url: "/pages/help/help?id=",
						dashed: "dashed"
					},
					{
						id: "SEOProcess",
						title: "商品推广简要流程",
						url: "/pages/help/help?id=",
						dashed: "dashed"
					},
					{
						id: "withdraw",
						title: "如果上个月不提现，下个月可以一起提现吗",
						url: "/pages/help/help?id=",
						dashed: null
					}
				],
				dialogMessage: [{
						title: "联系客服",
						content: "您好！请您联系微信客服：aixiaotu007，客服的工作时间是09:30～18:00，谢谢您的配合！"
				}],
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
			}
		},
		methods: {
			navTo(url){
				this.$aiRouter.navTo(url)
			},
			headset(){
				this.$refs.popup.open()
			},
			close(done){
				done()
			}
			
		}
	}
</script>

<style lang="scss">
	.help {
		width: 750rpx;
	}
	.help-list {
		width: 690rpx;
		margin: 10px 30rpx;
		padding: 0 30rpx;
		border-radius: 8px;
		box-shadow:0px 0px 50px 0px rgba(0,0,0,0.06);
	}
	.hl-item {
		font-size: 15px;
		height: 45px;
		
	}
	
</style>
