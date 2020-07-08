<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="搜索"></uni-nav-bar>
		<view class="head">
			<ai-search @confirm="confirm" placeHolder="请输入订单号"></ai-search>
			<view style="width: 690rpx; position: fixed; top: 35%;">
				<ai-no-content v-if="!orderList" describe="哎呀！没有找到相关订单哦！"></ai-no-content>
			</view>
		</view>
	</view>
</template>

<script>
	import aiSearch from "@/components/ai-search/ai-search.vue"
	export default {
		components: {
			aiSearch
		},
		data() {
			return {
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				orderList: null,
			}
		},
		methods: {
			confirm(res){
				let inputValue = res.replace(/(^\s*)|(\s*$)/g, "")
				if(inputValue.length == 0){return}
			}
		}
	}
</script>

<style lang="scss">
	.head {
		width: 750rpx;
		padding: 10px 30rpx 30px;
	}
</style>
