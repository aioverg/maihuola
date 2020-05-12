<template>
	<view>
		<ai-navbar
		    title="商品列表"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="guess-list">
			<view class="guess-list-item" v-for="(item, index) in goodsList" :key="index" @click="navTo('/pages/detail/detail')">
			    <ai-gusee-card :data="item"></ai-gusee-card>
			</view>
		</view>
	</view>
</template>

<script>
	import aiGuseeCard from '@/components/ai-guess-card'
	export default {
		components: {
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
				let goodsList = await this.$deleteApi.json('goodsListOne');
				this.goodsList = goodsList;
			},
			navTo(obj){
				this.$global.navTo(obj)
			}
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
