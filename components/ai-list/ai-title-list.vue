<template>
	<view class="ai-title-list">
		
		<view class="atl-title">{{title}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: null
			}
		}
	}
</script>

<style lang="scss">
	.ai-title-list {
		display: flex;
		align-items: center;
		.atl-long {
			width: 3px;
			height: 13px;
			background-color: #FF716E;
			border-radius: 30%;
			margin: 0 5px 0 0;
		}
		.atl-title {
			font-size: 16px;
			font-weight:bold;
		}
	}
	
</style>
