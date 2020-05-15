import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		usertoken: null,
		hasLogin: false,
		userInfo: {
			taobao: false
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
		}
	},
	actions: {
	
	}
})

export default store
