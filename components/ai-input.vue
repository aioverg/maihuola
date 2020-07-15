//输入框组件
<template>
	<view class="ai-input-box">
		<view :style= "{width: titleWidth}" class="ai-input-title">
		    <text>{{title}}</text>
			<text class="ai-input-title-mark" v-if="mark">*</text>
		</view>
		<view :style="{width: inputWidth}" v-if="content" class="ai-input-content">{{content}}</view>
		<input :style="{width: inputWidth}" class="ai-input-input" v-if="placeholder" :type="type" v-model="inputValue" @input="getInput" @confirm="getInput" :disabled="disabled" :placeholder="placeholder"/>
		<view class="ai-input-bt" :style="{color: btNameColor, textDecorationLine: btNameUnderline}" v-if="bt" @click="aiCode">{{times}}{{btName}}</view>
		<image class="ai-input-del" @click="delInput()" v-show="delShow" src="/static/icon/err-01.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btName: "获取验证码",
				times: null,
				timeRun: false,
				inputValue: null,
				btNameColor: "#f47a73",
				btNameUnderline: "underline",
				delShow: false
			};
		},
		props: {
			title: {
				type: String,
				default: ''
			},
			mark: {
				type: Boolean,
				default: false
			},
			titleWidth: {
				type: String,
				default: "160rpx"
			},
			type: {
				type: String,
				default: "text",
			},
			
			content: {
				//type: String,
				default: null
			},
			disabled: {
				type: Boolean,
				default: false
			},
			inputWidth: {
				type: String,
				default: "250rpx"
			},
			placeholder: {
				type: String,
				default: null
			},
			bt: {
				type: String,
				default: null
			},
			btWidth: {
				type: String,
				default: "200rpx"
			},
			time: {
				type: String,
				default: null
			},
			tiemTitle: {
				type: String,
				default: null
			},
			del: {
				type: Boolean,
				default: false
			}
		},
		watch:{
			inputValue(){
				if(this.del){
					if(this.inputValue == ""){
						this.inputValue.length == 0 ? this.delShow = false : this.delShow = true
					}else{
						this.inputValue != null ? this.delShow = true : this.delShow = false
					}
				}
			}
		},

		methods: {
			delInput(){
				this.inputValue = null
				this.delShow = ! this.delShow
			},
			aiCode(){
				if(this.timeRun){return}
				this.$emit('postCode');
				this.timeRun = true
				this.times = 60
				this.btName = "s重新发送"
				this.btNameColor = "#CCCCCC"
				this.btNameUnderline = "none"
				let timer = setInterval(()=>{
					if(this.times == 1){
						clearInterval(timer)
						this.timeRun = false
						this.times = null
						this.btName = "获取验证码"
						this.btNameColor = "#f47a73"
						this.btNameUnderline = "underline"
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
			font-size:15px;
			color: #333333;
			.ai-input-title-mark {
				display: inline-block;
				position: relative;
				top: -5px;
				left: 2px;
			}
		}
		.ai-input-content {
			font-size: 14px;
			color: #999999;
		}
		.ai-input-input {
			border: none;
			display: inline-block;
			font-size: 14px;
			margin: 0 10px 0 0;
			outline: none;
		}
		.ai-input-bt {
			display: inline-block;
			font-size:14px;
			//color: #f47a73;
			text-decoration: underline;
		}
		.ai-input-del {
			width: 16px;
			height: 16px;
		}
	}
</style>
