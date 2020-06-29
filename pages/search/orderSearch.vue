<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="搜索"></uni-nav-bar>
		<view class="head">
			<view class="input-box">
				<image class="input-box-icon" src="/static/icon/search-03.png"></image>
				<input class="input-box-input" v-model="inputValue" placeholder="请输入订单号" @confirm="getOrder(inputValue)" />
				<view class="ib-cancel-box">
					<image @click="delInput" class="ib-cancel" :style="{visibility: errHidden}" src="/static/icon/err-01.png"></image>
				</view>
			</view>
		</view>
		<view style="margin: 91px 0 0 0">
			<ai-null v-if="!orderList" explain="哎呀！没有找到相关订单哦！"></ai-null>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navigateFlag: false, //解决快速点击跳转，页面跳转多次问题
				errHidden: "hidden",
				inputValue: null,
				orderList: null,
			}
		},
		watch: {
			inputValue: function(){
				if(this.inputValue){
					this.errHidden = "visible"
				}else{
					this.errHidden = "hidden"
				}
			}
		},
		methods: {
			getOrder(obj){
				this.inputValue = obj.replace(/(^\s*)|(\s*$)/g, "")
				if(this.inputValue.length == 0){return}
				console.log("请求数据")
			},
			delInput(){
				this.inputValue = null
			}
		}
	}
</script>

<style lang="scss">
	.head {
		margin: 10px 15px 25px;
		display: flex;
		.input-box {
			width:690rpx;
			height: 45px;
			padding: 0 15px;
			background: #F5F5F5;
			border-radius: 23px;
			display: flex;
			align-items: center;
			.input-box-icon {
				display: inline-block;
				width: 20px;
				height: 20px;
				margin: 0 17px 0 0;
			}
			.input-box-input {
				display: inline-block;
				height: 35px;
			}
			.ib-cancel-box {
				flex-grow: 1;
				text-align: right;
				.ib-cancel {
					display: inline-block;
					right: 0px;
					width: 15px;
					height: 15px;
				}
			}
		}
		.input-bt {
			display: inline-block;
			width: 60px;
			height: 35px;
			background: #FFFFFF;
			box-shadow:0 0 13px 0 rgba(153,153,153,0.24);
			border-radius:17px;
			font-size: 15px;
			color: #333333;
			text-align: center;
			line-height: 35px;
		}
	}
</style>
