<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	// #ifdef APP-PLUS
	import {getServerNo} from "@/static/js/appUpdate.js";
	// #endif
	import {
		mapMutations
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['login'])
		},
		onLaunch: function() {
			const _this = this
			/*
			// #ifdef APP-PLUS
			getServerNo(this)
			// #endif
			*/
			uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
					_this.$store.commit("setUserInfo", res.data)
			    }
			})
			uni.getStorage({
				key: 'launchFlag',
				fail: function() {
					uni.reLaunch({
						url: "/pages/start/index"
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang='scss'>
	/*
	全局公共样式和字体图标
	.icon-shang:before {
		content: "\e624";
	}
	*/





	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	
	/*input元素占位文字颜色*/
	.input-placeholder {
		color: #CCCCCC;
	}
</style>
