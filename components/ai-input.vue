<template>
	<view class="input-title">
		<view class="title">{{title}}</view>
		<view v-if="content" class="content">{{content}}</view>
		<view>
			<input v-if="placeholder" class="input" :placeholder="placeholder"/>
		</view>
		<view class="bt" v-if="bt" @click="aiCode">{{times}}{{btName}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btName: "获取验证码",
				await: "重新发送",
				times: null,
				timeRun: false
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
				
			}
		}
	}
</script>

<style lang="scss">
	.input-title {
		width: 690rpx;
		height: 90rpx;
		line-height: 90rpx;
		display: flex;
		background:rgba(255,255,255,1);
		border-radius:16rpx;
		margin: 0 auto;
		.title {
			margin: 0 30rpx;
			width: 160rpx;
			font-size:15px;
			color:rgba(51,51,51,1);
		}
		.content {
			font-size: 14px;
			color:rgba(153,153,153,1);
		}
		.input {
			display: inline-block;
			font-size: 14px;
		}
		.bt {
			font-size:14px;
			color:rgba(244,122,115,1);
			text-decoration: underline;
		}
		
	}
</style>
