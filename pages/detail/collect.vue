<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="藏品"></uni-nav-bar>
		<view class="collect-body">
			<uni-swipe-action class="collect-guess-box">
				<uni-swipe-action-item class="collect-guess-item" v-for="(item,index) in collectList" :options="options" :key="item.id" @change="swipeChange"
				 @click="swipeClick(index)">
				    <view @click="goodsDetail(item.item_id)">
						<ai-goods-collect-card :data="item"></ai-goods-collect-card>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
			<uni-popup ref="popupDialog" type="dialog">
			    <uni-popup-dialog type="err" title="删除商品" content="确定将该商品从品库中删除吗？"  @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
			<view v-if="false" style="position: fixed; width: 690rpx; top: 30%;">
				<ai-no-content describe="这里好冷清，赶紧去收藏宝贝吧！"></ai-no-content>
			</view>
			<uni-load-more v-if="!listPlaceHolder" :status="uniLoadMoreStatus"></uni-load-more>
			<view v-if="listPlaceHolder" style="position: fixed; top: 30%; width: 690rpx;">
				<ai-no-content describe="哎呀！暂时还没有记录哦！"></ai-no-content>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import aiGoodsCollectCard from '@/components/ai-card/ai-goods-collect-card.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem,
			aiGoodsCollectCard,
			uniPopupDialog,
		},
		data() {
			return {
				delIndex: 0,
				page: 1,
				lastPage: 1,
				options: [
					{
					    text: '删除',
						style: {
							backgroundColor: '#FF716E'
						}
					}
				],
				collectList: [],
				//下拉加载提示类型
				listPlaceHolder: true,
				uniLoadMoreStatus: "more",
			}
		},
		onLoad() {
			this.getCollectList()
		},
		onReachBottom() {
			this.getCollectList()
		},
		methods: {
			getCollectList(){
				if(this.page > this.lastPage){
					this.uniLoadMoreStatus = "noMore"
					return
				}
				
				this.$api.postGoodsCollectData({
					user_id: this.$store.state.userInfo.id,
					page: this.page
				}).then(res => {
					if(res.data.data.total == 0){
						this.listPlaceHolder = true
						return
					}else{
						this.listPlaceHolder = false
					}
					this.page += 1
					this.lastPage = res.data.data.last_page
					if(this.page > this.lastPage){
						this.uniLoadMoreStatus = "noMore"
					}else{
						this.uniLoadMoreStatus = "more"
					}
					for(let item of res.data.data.data){
						this.collectList.push(item)
					}
				})
			},
			goodsDetail(id){
				this.$aiRouter.navTo("/pages/detail/detail?goods_id=" + id)
			},
			swipeChange(e) {
				//console.log('返回：', e);
			},
			swipeClick(index) {
				this.delIndex = index
				this.$refs.popupDialog.open()
			},
			confirm(done){
				this.$api.postGoodsUnCollect({
					user_id: this.$store.state.userInfo.id,
					item_id: this.collectList[this.delIndex].item_id
				}).then(res => {
					this.collectList.splice(this.delIndex, 1)
				})
				done()
			},
			close(done){
				done()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	.collect-body {
		width: 750rpx;
		padding: 10px 30rpx 30px;
	}
	.collect-guess-box {
		width: 690rpx;
		.collect-guess-item {
			margin: 10px 0;
			box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
			border-radius: 8px;
		}
	}
</style>
