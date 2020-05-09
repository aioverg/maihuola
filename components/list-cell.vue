<template>
	<view class="content">
		
		<view class="mix-list-cell" hover-class="cell-hover"  :hover-stay-time="50">
			<text
				v-if="icon"
				class="cell-icon yticon"
				:style="[{
					color: iconColor,
				}]"
				:class="icon"
			></text>
			<text class="cell-tit clamp">{{title}}</text>
			<text v-if="tips" class="cell-tip">{{tips}}</text>
			<text class="cell-more yticon"
				:class="typeList[navigateType]"
			></text>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				typeList: {
					left: 'icon-zuo',
					right: 'icon-you',
					up: 'icon-shang',
					down: 'icon-xia'
				},
			}
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '标题'
			},
			tips: {
				type: String,
				default: ''
			},
			navigateType: {
				type: String,
				default: 'right'
			},
			hoverClass: {
				type: String,
				default: 'cell-hover'
			},
			iconColor: {
				type: String,
				default: '#333'
			}
		}
	}
</script>

<style lang='scss'>

	.mix-list-cell{
		display:flex;
		align-items:baseline;
		padding: 20rpx 0;
		line-height:60rpx;
		position:relative;
		&.cell-hover{
			background:#ffffff;
		}
		.cell-icon{
			align-self:center;
			width:56upx;
			max-height:60rpx;
			font-size:38rpx;
		}
		.cell-more{
			margin: 0 0 0 20rpx;
			align-self: center;
			font-size:30rpx;
		}
		.cell-tit{
			flex: 1;
			font-size: 30rpx;
			font-weight: 400;
			color: rgba(51,51,51,1);
			margin-right: 10rpx;
		}
		.cell-tip{
			font-size: 26rpx;
			font-weight:400;
			color:rgba(204,204,204,1);
		}
	}
</style>
