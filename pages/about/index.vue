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
		<list-cell title="客户端软件许可与服务协议" @eventClick="navTo('/pages/about/agreement')"></list-cell>
		<list-cell title="隐私政策" @eventClick="navTo('/pages/about/privacy')"></list-cell>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell'
	export default {
		components: {
			listCell
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

<style>

</style>
