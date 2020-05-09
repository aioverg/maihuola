<template>
	<view>
		<swiper indicator-dots="true" autoplay="true" interval="5000" duration="1500" class="carousel" circular @change="swiperChange">
			<swiper-item v-for="(item, index) in data" :key="index" class="carousel-item" @click="navToSwiperPage">
				<image :src="item.src" class="bannar-image" />
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		mounted: function(){
			console.log(this)
		}
	}
</script>

<style>

</style>
