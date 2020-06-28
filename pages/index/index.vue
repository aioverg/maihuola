<template>
	<view class="content" style="position: relative;">
		<!-- 发现 -->
		<view :style="{'display':selTabId == 0 ?'block':'none'}">
			<home-page ref="home"></home-page>
		</view>
		<!-- 赚金 -->
		<view :style="{'display':selTabId == 1 ?'block':'none'}">
			<task-page ref="task"></task-page>
		</view>
		<!-- 我的 -->
		<view :style="{'display':selTabId == 2 ?'block':'none'}" style="position: relative;">
			<user-page ref="user"></user-page>
		</view>
		
		<!--底部导航栏-->
		<view class="tab-bar" >
				<view class="tab-bar-item" v-for="(item) in tabBarList" :key="item.id" @tap="changeTabbar(item.id)">
					<view class="tab-bar-img">
						<image class="tab-bar-one" v-if="selTabId == item.id" :src="`/static/tabBar/${item.id+1}.png`"></image>
						<image class="tab-bar-two" v-else :src="`/static/tabBar/${item.id}.png`"></image>
					</view>
					<view class="tab-bar-name" :class="selTabId == item.id ? 'tab-bar-sel-name' : 'tab-bar-name' ">{{item.name}}</view>
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
				tabBarList: [{'id': '0','name': '首页'}, {'id': '1','name': '赚金'}, {'id': '2','name': '我的'}],
			}
		},
		onLoad(res) {
			if(res.tabId){
				this.changeTabbar(res.tabId)
				return
			}
			let _this = this
			this.$nextTick(function() {
				//在组件挂在完成后调用方法，否则组件方法可能访问不到
				//初次加载第一个页面的请求数据
				if(this.selTabId == '0'){
					_this.$refs.home.pageOnload()
				}else if(this.selTabId == '2'){
					_this.$refs.user.pageOnload()
				}
			})
		},
		//滑动到底部时请求操作
		onReachBottom() {
			if (this.selTabId == 0) {
				this.$refs.home.getGuess(this.$refs.home.sortIndex)
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			if(this.selTabId == '0'){
				this.$refs.home.pageRefresh()
			}else if(this.selTabId == '1'){
				this.$refs.task.pageRefresh()
			}else if(this.selTabId == '2'){
				this.$refs.user.pageRefresh()
			}
		},
		methods: {
			// 切换tabbar菜单
			changeTabbar(id) {
				let _this = this
				_this.selTabId = id
				this.$nextTick(function(){
					if (_this.selTabId == '0') {
						_this.$refs.home.pageOnload()
					} else if (_this.selTabId == '1') {
						_this.$refs.task.pageOnload()
					} else if (_this.selTabId == '2') {
						_this.$refs.user.pageOnload()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/*底部tabbar*/
	.tab-bar {
		width: 100%;
		height: 50px;
		background: #fff;
		position: fixed;
		bottom: 0px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 110rpx;
		z-index: 9999;
		box-shadow: 0px -2px 17px 0px rgba(0,0,0,0.06);
	}
	.tab-bar-item {
		text-align: center;
		position: relative;
		height: 50px;
		padding: 1px 0 5px;
		.tab-bar-name {
			font-size: 10px;
			height: 14px;
			line-height: 14px;
		}
		.tab-bar-img {
			position: relative;
			height: 30px;
			width: 30px;
		}
	}
	.tab-bar-name {
		color: #333333;
	}
	.tab-bar-sel-name {
		color: #FF716E;
	}
	.tab-bar-one {
		position: absolute;
		width: 35px;
		height: 35px;
		left: -3px;
		top: -10px;
	}
	.tab-bar-two {
		width: 30px;
		height: 30px;
	}
</style>
