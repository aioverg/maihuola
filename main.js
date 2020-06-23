import Vue from 'vue'
import store from './store'
import App from './App'


//将引入全局函数
import aiRouter from './static/js/airouter.js'//路由
import aiGlobal from './static/js/aiglobal.js'//函数封装
import api from './static/js/api.js'//接口


//引入弹窗组件
import aiPopupMessage from './components/uni-popup/ai-popup-message.vue'
//引入navBar组件
import aiNavbar from "@/components/ai-navbar"
//引入下拉加载提示组件
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
//引入tabbar
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
//引入图标
import uniIcons from "@/components/uni-icons/uni-icons.vue"
//引入遮罩层
import uniPopUp from '@/components/uni-popup/uni-popup.vue'
//引入弹窗
import aiPopupDialog from '@/components/ai-popup/ai-popup-dialog.vue'
//引入无内容组件
import aiNoContent from '@/components/ai-none/ai-no-content.vue'
//引入按钮
import aiButton from '@/components/ai-button/ai-button.vue'

Vue.component('ai-navbar', aiNavbar)
Vue.component('ai-popup-message', aiPopupMessage)
Vue.component('uni-load-more', uniLoadMore)
Vue.component('uni-nav-bar', uniNavBar)
Vue.component('uni-icons', uniIcons)
Vue.component('uni-popup', uniPopUp)
Vue.component('ai-popup-dialog', aiPopupDialog)
Vue.component('ai-no-content', aiNoContent)


const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}


Vue.config.productionTip = false
//Vue.prototype.$fire = new Vue();

//将全局函数绑定到Vue的原型$aiRouter上
//Vue.prototype.$basePath = "http://api.taobaoke.aixiaotu.com.cn/api/v1.";
Vue.prototype.$basePath = "http://api.taobaoke.test.aixiaotu.com.cn/api/v1.";

Vue.prototype.$store = store;
Vue.prototype.$aiRouter = aiRouter
Vue.prototype.$aiGlobal = aiGlobal
Vue.prototype.$api = api


uni.getSystemInfo({
	success: function (res) {
		let modelmes = res.model;
		console.log("手机型号-------",res.model);
		if(modelmes.indexOf('iPhone X')>=0||modelmes.indexOf('iPhone XR')>=0||modelmes.indexOf('iPhone XS')>=0||modelmes.indexOf('iPhone 12')>=0||modelmes.indexOf('iPhone 11')>=0||modelmes.indexOf('iPhone11')>=0||modelmes.indexOf('iPhone12')>=0||modelmes.indexOf('iPhoneXR')>=0||modelmes.indexOf('iPhoneX')>=0){
			Vue.prototype.$is_bang = true
		}else{
			Vue.prototype.$is_bang = false
		}
	}
});

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()