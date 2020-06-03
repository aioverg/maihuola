<template>
	<view>
		<ai-navbar
		    title="鍟嗗搧鍒楄〃"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
		<view class="guess-list">
			<view class="guess-list-item" v-for="(item, index) in goodsList" :key="index" @click="navTo('/pages/detail/detail?goods_id=' + item.id)">
			    <ai-gusee-card :data="item"></ai-gusee-card>
			</view>
		</view>
		<uni-load-more status="noMore"></uni-load-more>
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
