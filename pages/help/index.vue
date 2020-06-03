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
						title: "推广码是什么",
						url: "/pages/help/help?id="
					},
					{
						id: "getTKL",
						title: "如何获取推广码",
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
				],
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
			}
		},
		methods: {
			navTo(url){
				this.$aiRouter.navTo(url)
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F9F9F9;
	}
	.help-list {
		width: 690rpx;
		height: 45px;
		margin: 10px auto 0;
		background: #FFFFFF;
		padding: 0 15px;
		border-radius: 8px;
	}
	
</style>
