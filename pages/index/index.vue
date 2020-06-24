<template>
	<view class="content" style="position: relative;">
		<!-- 发现 -->
		<view :style="{'display':selTabId == 0 ?'block':'none'}">
			<home-page ref="index"></home-page>
		</view>
		<!-- 赚金 -->
		<view :style="{'display':selTabId == 1 ?'block':'none'}">
			<task-page ref="task"></task-page>
		</view>
		<!-- 我的 -->
		<view :style="{'display':selTabId == 2 ?'block':'none'}" style="position: relative;">
			<user-page ref="user"></user-page>
		</view>
		<!-- is_lhp判断是否为刘海屏在main.js里，好像uniapp有一个css变量获取刘海屏的安全区域 -->
		<view class="tabBar" >
			<!-- 导航的中间圆圈 -->
			<view class="border_box" >
				<view class="tabBar_miden_border"></view>
			</view>
			<view class="tabBar_list" >
				<view v-for="(item) in tabList" :key="item.id" :class="{'tabBar_item':item.id!=2,'tabBar_item2':item.id==2}"
				 @tap="changeTabbar(item.id)">
					<image v-if="selTabId == item.id" :src="`/static/tabBar/${item.id+1}.png`"></image>
					<image v-else :src="`/static/tabBar/${item.id}.png`"></image>
					<view :class="{'tabBar_name':true,'nav_active':selTabId == item.id}">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import homePage from '@/components/ai-tabbar/home.vue'
	import taskPage from '@/components/ai-tabbar/task.vue'
	import userPage from '@/components/ai-tabbar/user.vue'
	export default {
		components: {
			homePage, //首页
			taskPage, //赚金
			userPage, //我的
		},
		data() {
			return {
				selTabId: 0, //控制显示那个组件
				tabList: [{'id': '0','name': '首页'}, {'id': '1','name': '赚金'}, {'id': '2','name': '我的'}],
			}
		},
		onLoad(res) {
			if(res.tabId){
				console.log(333)
				this.changeTabbar(res.tabId)
				return
			}
			let _this = this
			//this.is_lhp = this.$is_bang
			this.$nextTick(function() {
				//在组件挂在完成后调用方法，否则组件方法可能访问不到
				//初次加载第一个页面的请求数据
				if(this.selTabId == '0'){
					_this.$refs.index.pageShow()
				}else if(this.selTabId == '2'){
					_this.$refs.user.pageShow()
				}
			})
			//console.log("是否为刘海屏", this.is_lhp)
		},
		//滑动到底部时请求操作
		onReachBottom() {
			if (this.selTabId == 0) {
				this.$refs.index.getGuess(this.$refs.index.sortIndex)
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			uni.showToast({
				title: `个页面的刷新`
			})
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 2000)
			console.log('下拉刷新四个组件公用的下拉刷新方法,根据在哪个页面下拉执行哪个页面的刷新方方法即可')
			console.log('如果想要自定义刷新的话，插件市场就有一个   非常好用也非常容易入手')
		},
		methods: {
			// 切换tabbar
			changeTabbar(id) {
				let _this = this
				_this.selTabId = id
				if (_this.selTabId == '0') {
					_this.$nextTick(function(){
						_this.$refs.index.pageShow()
					})
				} else if (_this.selTabId == '1') {
					_this.$nextTick(function(){
						_this.$refs.task.pageShow()
					})
				} else if (_this.selTabId == '2') {
					_this.$nextTick(function(){
						_this.$refs.user.pageShow()
					})
				}
			}
			
		}
	}
</script>

<style lang="scss">
	.tabBar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;

		.tabBar_list {
			width: 86%;
			display: flex;
			justify-content: space-between;

			image {
				width: 48rpx;
				height: 48rpx;
				margin-bottom: 2rpx
			}

			.tabBar_item {
				width: 68rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20rpx;
				color: #969BA3;
			}

			.tabBar_item2 {
				width: 68rpx;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20rpx;
				color: #969BA3;
				margin-top: -20rpx;
				position: relative;
				z-index: 101;

				image {
					width: 68rpx;
					height: 68rpx;
				}
			}
		}
	}

	.border_box {
		// pointer-events: none; 事件穿透解决z-index层级问题
		width: 750rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0px;
		bottom: 50rpx;
		z-index: 100;
		pointer-events: none;
		.tabBar_miden_border {
			width: 100rpx;
			height: 50rpx;
			border-top: 2rpx solid #E5E5E5;
			border-radius: 50rpx 50rpx 0 0;
			/* 左上、右上、右下、左下 */
			background: #fff;
		}
	}

	.nav_active {
		color: #007AFF;
	}
</style>
