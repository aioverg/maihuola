<template>
	<view>
		<ai-navbar
		    title="绑定支付宝授权"
			:fixed="true"
			backgroundImg="/static/img/bg-01.png"
			height="88rpx"
			color="#FFFFFF"
			leftArrow="true"
		/>
	<view class="icon-card">
		<image class="box-bg" src="/static/img/ai-tb-bg.png"></image>
		<view class="icon-box">
			<view class="icon-box-item">
				<view class="icon">
					<image class="img" src="/static/img/ai-taobao.png"></image>
				</view>
				<view class="icon-title">手机淘宝</view>
			</view>
			<view class="icon-box-item">
			    <view class="icon">
					<image class="img" src="/static/img/ai-maihuo.png"></image>
				</view>
				<view class="icon-title">卖货啦</view>
			</view>
		</view>
		<view class="icon-box-describe">
			<view class="icon-box-describe-one">同意将淘宝账户的以下信息授权给</view>
			<view class="icon-box-describe-one">卖货啦官方app</view>
			<view class="icon-box-describe-two"><view class="dot"></view>使用你的公开信息（昵称、头像等）</view>
		</view>
	</view>
	<view class="bt">
		<ai-button btname="确认授权" @eventClick="bindTB"></ai-button>
	</view>
	</view>
</template>

<script>
	import aiButton from '@/components/ai-button.vue'
	const Alibcsdk = uni.requireNativePlugin('UZK-Alibcsdk');
	export default {
		components: {
			aiButton
		},
		data() {
			return {
				goodsId: null,
				navigateFlag: false //解决快速点击跳转，页面跳转多次问题
			}
		},
		onLoad(obj){
			this.goodsId = obj.goods_id
		},
		methods: {
			bindTB(){
				const _this = this
				Alibcsdk.init( result => {
					if(result.status){
						console.log("初始化成功")
					}else{
						console.log("初始化失败")
					}
					console.log(JSON.stringify(result))
				})
				Alibcsdk.login( result => {
					if(result.status){
						console.log("淘宝授权")
						_this.$store.commit('setTaoBao', result.status)
						_this.$global.navTo('/pages/detail/detail?goods_id=' + _this.goodsId + "&auth=true")
					}else{
						_this.$global.navTo('/pages/detail/detail?goods_id=' + _this.goodsId + "&auth=false")
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background:rgba(249,249,249,1);
	}
	.icon-card {
		width: 690rpx;
		height: 462px;
		margin: 10px auto 0;
		background:rgba(255,255,255,1);
		position: relative;
		.box-bg {
			width: 100%;
			height: 198px;
			position: absolute;
		}
		.icon-box {
			width: 490rpx;
			margin: 0 auto;
			height: 198px;
			display: flex;
			justify-content: space-between;
			.icon-box-item {
				position: relative;
				margin: 50px 0 0 0;
				z-index: 1;
				width: 76px;
				height: 76px;
				display: inline-block;
				.icon {
					position: relative;
					width: 76px;
					height: 76px;
					background:rgba(255,255,255,1);
					box-shadow:0px 0px 30px 0px rgba(205,59,51,0.5);
					opacity:0.9;
					filter:blur(0px);
					border-radius: 76px;
					.img {
						position: relative;
						width: 70px;
						height: 70px;
						top: 3px;
						left: 3px;
					}
				}
				.icon-title {
					font-size: 13px;
					width: 76px;
					margin: 6px 0 0;
					text-align: center;
					color:rgba(255,255,255,1);
				}
			}
		}
		.icon-box-describe {
			margin: 15px 0 0 25px;
			.icon-box-describe-one {
				font-size:16px;
				color:rgba(51,51,51,1);
			}
			.icon-box-describe-two {
				margin: 15px 0 0;
				font-size:14px;
				color:rgba(153,153,153,1);
				.dot {
					width: 3px;
					height: 3px;
					background:rgba(153,153,153,1);
					display: inline-block;
					margin: 4px 10px 4px 0;
				}
			}
		}
	}
	.bt {
		position: relative;
		top: 40px;
	}
</style>
