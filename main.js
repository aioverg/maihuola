import Vue from 'vue'
import store from './store'
import App from './App'

import Json from './Json' //测试用数据

//将导航函数引入全局
import global from './static/js/global.js'

//引入弹窗组件
import aiPopupMessage from './components/uni-popup/ai-popup-message.vue'
//引入navBar组件
import aiNavbar from "@/components/ai-navbar"
//引入下拉加载提示组件
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"

//引入api
import api from './static/js/api.js'

Vue.component('ai-navbar', aiNavbar)
Vue.component('ai-popup-message', aiPopupMessage)
Vue.component('uni-load-more', uniLoadMore)


/*
Vue.directive('clickoutside', {
bind (el, binding, vnode) {
console.log("binding")
}
});
*/
/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
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
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$deleteApi = {msg, json};

//将全局函数绑定到Vue的原型$global上
Vue.prototype.$global = global
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()