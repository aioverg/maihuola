<template>
	<view class="ai-input-box">
		<view class="ai-input-title">{{title}}</view>
		<view v-if="content" class="ai-input-content">{{content}}</view>
		<input v-if="placeholder" v-model="inputValue" class="ai-input-input" @blur="getInput" @confirm="getInput" :placeholder="placeholder"/>
		<view class="ai-input-bt" v-if="bt" @click="aiCode">{{times}}{{btName}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btName: "获取验证码",
				times: null,
				timeRun: false,
				inputValue: null
			};
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: null
			},
			placeholder: {
				type: String,
				default: null
			},
			bt: {
				type: String,
				default: null
			},
			time: {
				type: String,
				default: null
			},
			tiemTitle: {
				type: String,
				default: null
			},
		},
		methods: {
			aiCode(){
				if(this.timeRun){return}
				this.$emit('postCode');
				this.timeRun = true
				this.times = 5
				this.btName = "s重新发送"
				let timer = setInterval(()=>{
					if(this.times == 1){
						clearInterval(timer)
						this.timeRun = false
						this.times = null
						this.btName = "获取验证码"
						return
					}
					this.times -= 1
				},1000)
			},
			getInput(){
				this.$emit('getInput', this.inputValue);
			}
		}
	}
</script>

<style lang="scss">
	.ai-input-box {
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
		display: flex;
		align-items: center;
		background:rgba(255,255,255,1);
		border-radius:16rpx;
		margin: 0 auto;
		.ai-input-title {
			margin: 0 30rpx;
			width: 160rpx;
			font-size:15px;
			color:rgba(51,51,51,1);
		}
		.ai-input-content {
			font-size: 14px;
			color:rgba(153,153,153,1);
		}
		.ai-input-input {
			display: inline-block;
			font-size: 14px;
		}
		.ai-input-bt {
			display: inline-block;
			font-size:14px;
			color:rgba(244,122,115,1);
			text-decoration: underline;
			width: 150rpx;
		}
		
	}
</style>
