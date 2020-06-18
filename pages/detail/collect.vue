<template>
	<view>
		<uni-nav-bar fixed="true" left-width="150">
			<block slot="left">
				<image style="width: 10px; height: 17px; margin: 3px 10px 0 10px;" src="../../static/icon/left-arrow01.png"></image>
				<view style="font-size: 20px; font-weight:bold;">藏品</view>
			</block>
		</uni-nav-bar>
		
		<uni-swipe-action class="collect-guess-box">
			<uni-swipe-action-item class="collect-guess-item" v-for="(item,index) in collectList" :options="options" :key="item.id" @change="swipeChange"
			 @click="swipeClick(index)">
				<ai-gusee-card :data="item"></ai-gusee-card>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import aiGuseeCard from '@/components/ai-guess-card.vue'
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem,
			aiGuseeCard
		},
		data() {
			return {
				options: [
					{
					    text: '删除',
						style: {
							backgroundColor: '#FF716E'
						}
					}
				],
				collectList: [
					        {
					            "id": 3394,
					            "category_id": 13,
					            "item_url": "http://item.taobao.com/item.htm?id=619114439833",
					            "click_url": "https://s.click.taobao.com/t?e=m%3D2%26s%3DXQZAIXrc2lFw4vFB6t2Z2ueEDrYVVa64juWlisr3dOdyINtkUhsv0BbJBHc3o%2FSWp5WoWYLOuMhd60bal0d6fluMKyARBT5%2F%2FBVGoT3bu1JOWVWyRDCyNCnMXl5ShjefUyNpxLfgKr0jWpzpm6nEC2LIv53a4Smh1XSA32cb2WH7qszUSx7EBeYCFRFGkLZmIYULNg46oBA%3D&union_lens=lensId%3AOPT%401590730170%400b0151da_197c_1725ee82235_8cf3%4001",
					            "tpw": "0",
					            "num_iid": 619114439833,
					            "title": "可挂式衣柜防潮剂 除湿袋房间除湿剂衣橱吸湿袋防霉防潮拍1发4",
					            "pic": "https://img.alicdn.com/i1/62624758/O1CN01po5tHa1l1D58XGr8P_!!62624758.jpg",
					            "price": 14.98,
					            "promotion_price": 4.98,
					            "commission_rate": 4,
					            "commission": "0.00",
					            "num": 0,
					            "volume": 0,
					            "sell_point": "测试专用",
					            "shop_id": 0,
					            "seller_uid": 0,
					            "status": 1,
					            "sort": 100,
					            "dateline": 1590732846,
					            "remark": "",
					            "script": null,
					            "label": 0,
					            "category_tag": "",
					            "live_script": "",
					            "tag": "主推",
					            "is_recommend": 1
					        },
					        {
					            "id": 3392,
					            "category_id": 8,
					            "item_url": "11",
					            "click_url": "12",
					            "tpw": "0",
					            "num_iid": 1,
					            "title": "1232",
					            "pic": "http://taobaoke.test.aixiaotu.com.cn/Uploads/Picture/2020-05-28/5ecf62717f899.jpg",
					            "price": 111,
					            "promotion_price": 11,
					            "commission_rate": 11,
					            "commission": "0.00",
					            "num": 0,
					            "volume": 0,
					            "sell_point": "11",
					            "shop_id": 0,
					            "seller_uid": 0,
					            "status": 1,
					            "sort": 100,
					            "dateline": 1590716998,
					            "remark": "11",
					            "script": null,
					            "label": 0,
					            "category_tag": "",
					            "live_script": "11",
					            "tag": "主推",
					            "is_recommend": 0
					        },
					        {
					            "id": 3386,
					            "category_id": 6,
					            "item_url": "12",
					            "click_url": "212",
					            "tpw": "0",
					            "num_iid": 21,
					            "title": "12",
					            "pic": "http://taobaoke.test.aixiaotu.com.cn/Uploads/Picture/2020-05-28/5ecf62717f899.jpg",
					            "price": 21,
					            "promotion_price": 12,
					            "commission_rate": 12,
					            "commission": "0.00",
					            "num": 0,
					            "volume": 0,
					            "sell_point": "12",
					            "shop_id": 0,
					            "seller_uid": 0,
					            "status": 1,
					            "sort": 100,
					            "dateline": 1590649532,
					            "remark": "12",
					            "script": null,
					            "label": 0,
					            "category_tag": "",
					            "live_script": "2",
					            "tag": "主推",
					            "is_recommend": 1
					        }
				]
			}
		},
		methods: {
			swipeChange(e) {
				console.log('返回：', e);
			},
			swipeClick(index) {
				uni.showModal({
					title: '删除商品',
					content: '确定将该商品从品库中删除吗？',
					success: (res) => {
						if (res.confirm) {
							this.collectList.splice(index, 1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
	.collect-guess-box {
		width: 690rpx;
		margin: 0 auto;
		.collect-guess-item {
			margin: 10px 0;
			box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.06);
			border-radius: 8px;
		}
	}
</style>
