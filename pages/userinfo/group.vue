<template>
	<view>
		<uni-nav-bar fixed="true" leftIcon="arrowleft" leftText="我的团队" rightText="收益排行" @clickRight="navTo('/pages/userinfo/groupEarnRank')">
		</uni-nav-bar>
		<view class="group-body">
			<view class="group-search">
				<ai-search @confirm="confirm" placeHolder="请输入手机号查询"></ai-search>
			</view>
			<view class="gb-member">
				<image style="width: 3px;" src="/static/icon/cylinder-01.png" mode="widthFix"></image>
				<view class="gb-title">团队成员（24人）</view>
			</view>
			<ai-group-member-card @clickEvent="groupOther"></ai-group-member-card>
		</view>
	</view>
</template>

<script>
	import aiSearch from "@/components/ai-search/ai-search.vue"
	import aiGroupMemberCard from "@/components/ai-card/ai-group-member-card.vue"
	export default {
		components: {
			aiSearch,
			aiGroupMemberCard
		},
		data() {
			return {
				
			}
		},
		methods: {
			confirm(){
				console.log(999999)
			},
			navTo(url){
				this.$aiRouter.navTo(url)
			},
			groupOther(){
				this.$aiRouter.navTo("/pages/userinfo/groupOther")
			}
		}
	}
</script>

<style lang="scss">
	.group-body {
		width: 750rpx;
		padding: 10px 30rpx 0;
	}
	.group-search {
		margin: 0 0 25px;
	}
	.gb-member {
		display: flex;
		align-items: center;
		.gb-title {
			margin: 0 0 0 5px;
			font-size: 16px;
			font-weight: bold;
		}
	}
</style>
