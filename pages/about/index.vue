<template>
	<view>
		<ai-navbar title="关于我们"></ai-navbar>
		<list-cell title="客户端软件许可与服务协议" @eventClick="navTo('/pages/about/agreement')"></list-cell>
		<list-cell title="隐私政策" @eventClick="navTo('/pages/about/privacy')"></list-cell>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import aiNavbar from '@/components/ai-navbar.vue'
	export default {
		components: {
			listCell,
			aiNavbar
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
