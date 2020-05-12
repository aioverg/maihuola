<template>
	<view>
		<ai-navbar
		    title="关于我们"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="help-box">
			<view class="help-list" @click="navTo('/pages/about/agreement')">
				<ai-list-cell title="客户端软件许可与服务协议"></ai-list-cell>
			</view>
			<view class="help-list" @click="navTo('/pages/about/privacy')">
				<ai-list-cell title="隐私政策"></ai-list-cell>
			</view>
		</view>
		
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
				
			}
		},
		methods: {
			/*跳转统一接口*/
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
	.help-box {
		width: 750rpx;
		padding: 0 30rpx;
		.help-list {
			height: 90rpx;
			padding:  0 30rpx;
			margin: 0 auto;
			margin: 20rpx 0 0 0;
			background: rgba(255,255,255,1);
			border-radius: 16rpx;
			color: rgba(51,51,51,1);
			font-size: 15px;
		}
	}
	
</style>
