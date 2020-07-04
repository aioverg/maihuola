<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="鍟嗗搧鍒楄〃"></uni-nav-bar>
		<view class="guess-list">
			<view class="guess-list-item" v-for="(item, index) in goodsList" :key="index" @click="navTo('/pages/detail/detail?goods_id=' + item.id)">
			    <ai-goods-card :data="item"></ai-goods-card>
			</view>
		</view>
		<uni-load-more status="noMore"></uni-load-more>
	</view>
</template>

<script>
	import aiGoodsCard from '@/components/ai-card/ai-goods-card.vue'
	export default {
		components: {
			aiGoodsCard
		},
		data() {
			return {
				goodsList: null,
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
			}
		},
		onLoad(res) {
			this.carouselList(res.goods_id);
		},
		methods: {
			carouselList(id){
				this.$api.getCarouselList({
					special_id: id
				}).then( res => {
					this.goodsList = res.data.data.goods
				})
			},
			navTo(obj){
				this.$aiRouter.navTo(obj)
			}
		}
	}

</script>

<style lang="scss">
	page {
		background-color: #F9F9F9;
	}
	.guess-list {
		width: 750rpx;
		.guess-list-item {
			width: 690rpx;
			margin: 13px auto 0;
		}
	}
</style>
