<template>
	<view>
		<ai-navbar
		    title="帮助"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="help-list" v-for="(item, index) in helpList" :key="item.id" @click="navTo(item.url+item.id)">
			<ai-list-cell :title="item.title"></ai-list-cell>
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
				helpList: [
					{
						id: "whatTKL",
						title: "淘口令是什么",
						url: "/pages/help/help?id="
					},
					{
						id: "getTKL",
						title: "如何获取淘口令",
						url: "/pages/help/help?id="
					},
					{
						id: "SEOProcess",
						title: "商品推广简要流程",
						url: "/pages/help/help?id="
					},
					{
						id: "withdraw",
						title: "如果上个月不提现，下个月可以一起提现吗",
						url: "/pages/help/help?id="
					}
				]
			}
		},
		methods: {
			navTo(url){
				this.$global.navTo(url)
			},
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(249,249,249,1);
	}
	.help-list {
		width: 690rpx;
		height: 90rpx;
		margin: 20rpx auto 0;
		background: rgba(255,255,255,1);
		padding: 0 30rpx;
		border-radius: 16rpx;
	}
	
</style>
