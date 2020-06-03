//输入框组件
<template>
	<view class="ai-input-box">
		<view class="ai-input-title">{{title}}</view>
		<view v-if="content" class="ai-input-content">{{content}}</view>
		<input class="ai-input-input" v-if="placeholder" :type="type" v-model="inputValue" @input="getInput" @confirm="getInput" :placeholder="placeholder"/>
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
			type: {
				type: String,
				default: "text",
			},
			content: {
				//type: String,
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
				this.times = 60
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
		height: 45px;
		line-height: 45px;
		display: flex;
		align-items: center;
		background: #ffffff;
		border-radius: 8px;
		margin: 0 auto;
		.ai-input-title {
			margin: 0 15px;
			width: 160rpx;
			font-size:15px;
			color: #333333;
		}
		.ai-input-content {
			width: 250rpx;
			font-size: 14px;
			color: #999999;
		}
		.ai-input-input {
			border: none;
			width: 250rpx;
			display: inline-block;
			font-size: 14px;
			margin: 0 10px 0 0;
			outline: none,
		}
		.ai-input-bt {
			display: inline-block;
			width: 100px;
			font-size:14px;
			color: #f47a73;
			text-decoration: underline;
		}
		
	}
</style>
