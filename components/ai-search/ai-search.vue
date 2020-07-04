<template>
	<view class="ai-search">
		<image class="ai-search-icon" src="/static/icon/search-03.png"></image>
		<input class="ai-search-input" v-model="value" :placeholder="placeHolder" @confirm="confirm" />
		<image @click="delInput" class="ai-search-del" v-show="delIcon" src="/static/icon/err-01.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				delIcon: false,
				value: null,
				orderList: null,
			}
		},
		props: {
			placeHolder: {
				type: String,
				default: "输入提示内容"
			}
		},
		watch: {
			value: function() {
				if (this.value) {
					this.delIcon = true
				} else {
					this.delIcon = false
				}
			}
		},
		methods: {
			confirm() {
				this.$emit("confirm", this.value)
			},
			delInput() {
				this.value = null
			}
		}

	}
</script>

<style lang="scss">
	.ai-search {
		width: 100%;
		height: 45px;
		padding: 0 15px;
		background: #F5F5F5;
		border-radius: 23px;
		display: flex;
		align-items: center;

		.ai-search-icon {
			display: inline-block;
			width: 20px;
			height: 20px;
			margin: 0 17px 0 0;
		}

		.ai-search-input {
			flex-grow: 1;
			display: inline-block;
			height: 35px;
			margin: 0 17px 0 0;
		}

		.ai-search-del {
			display: inline-block;
			right: 0px;
			width: 15px;
			height: 15px;
		}
	}
</style>
