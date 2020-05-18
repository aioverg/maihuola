import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		usertoken: null,
		hasLogin: false,
		userInfo: {
			tel: null,
			taobao: false,
			weixin: null,
			alipay: null,
			WXAvatarUrl: null,
			userUrl: null
		},
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = provider;
			/*state.userInfo = provider
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			})*/
			console.log(state);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'
            })
		},
		setWXAvatarUrl(state, url){
			state.WXAvatarUrl = url
		},
		setWeiXin(state, openId){
			state.userInfo.weixin = openId
		},
		setTaoBao(state, userId){
			state.userInfo.taobao = userId
		}
	},
	actions: {
	
	}
})

export default store
