<template>
	<view>
		<ai-navbar title="帮助"></ai-navbar>
		<list-cell title="什么是淘口令" @eventClick="navTo('/pages/help/whatTKL')"></list-cell>
		<list-cell title="如何获取商品淘口令" @eventClick="navTo('/pages/help/acquireTKL')"></list-cell>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import aiNavbar from '@/components/ai-navbar';
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
