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

Vue.component('ai-navbar', aiNavbar)
Vue.component('ai-popup-message', aiPopupMessage)
Vue.component('uni-load-more', uniLoadMore)


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


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()