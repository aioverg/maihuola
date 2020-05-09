<template>
	<view class="ai-button" @click="eventClick">
		{{btname}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props: {
			btname: {
				type: String,
				default: null
			}
		},
		methods: {
			eventClick(){
				this.$emit('eventClick');
			}
		}
	}
</script>

<style lang="scss">
	.ai-button {
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		margin: 0 auto;
		background: linear-gradient(135deg,rgba(252,170,122,1) 0%,rgba(234,58,106,1) 100%);
		color:rgba(255,255,255,1);
		border-radius: 45rpx;
	}
</style>
