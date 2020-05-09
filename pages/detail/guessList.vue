<template>
	<view>
		<ai-navbar title="商品列表"></ai-navbar>
		<view class="guess-list">
			<view class="guess-list-item" v-for="(item, index) in goodsList" :key="index">
			    <ai-gusee-card :data="item"></ai-gusee-card>
			</view>
		</view>
	</view>
</template>

<script>
	import aiNavbar from '@/components/ai-navbar'
	import aiGuseeCard from '@/components/ai-guess-card'
	export default {
		components: {
			aiNavbar,
			aiGuseeCard
		},
		data() {
			return {
				goodsList: null
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			async loadData() {
				let goodsList = await this.$api.json('goodsListOne');
				this.goodsList = goodsList;
				console.log(666,this.goodsList)
			},
		}
	}

</script>

<style lang="scss">
	page {
		background-color: rgba(249,249,249,1);
	}
	.guess-list {
		width: 750rpx;
		.guess-list-item {
			width: 690rpx;
			margin: 26rpx auto 0;
		}
	}
</style>
