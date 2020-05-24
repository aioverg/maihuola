import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		systemType: 1, //0-PC;1-Android;3-IOS
		usertoken: null,
		hasLogin: true,
		userInfo: {
			userId: null,
			tel: null,
			taobao: null,
			wechat: null,
			alipay: null,
			WXAvatarUrl: null,
			userUrl: null
		},
		appInfo: {
			appType: null,
			update: false,
			require: false,
			appUrl: null,
			appVersion: null
		}
	},
	mutations: {
		login(state, data) {
			state.hasLogin = true;
			state.usertoken = data.access_token
			state.userInfo.userId = data.client.id
			state.userInfo.tel = data.client.mobile
			state.userInfo.taobao = data.client.taobao || null
			state.userInfo.wechat = data.client.wechat || null
			state.userInfo.alipay = data.client.alipay || null
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',
			    data: data
			})
			console.log("store",state)
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
                key: 'userInfo'
            })
		},
		setTaoBao(state, status){
			state.userInfo.taobao = status
		},
		setAppInfo(state, data){
			if(data.appType == "android"){
				state.systemType = 1
			}
			if(data.appType == "ios"){
				state.systemType = 2
			}
			if(data.update){
				state.appInfo.appType = data.appType
				state.appInfo.update = data.update
				state.appInfo.appUrl = data.appUrl
				state.appInfo.appVersion = data.appVersion
			}
			console.log(state.appInfo)
		},
		setWeChat(state, data){
			state.userInfo.wechat = true
			state.userInfo.WXAvatarUrl = data
		},
		clearWeChat(state){
			state.userInfo.wechat = null
			state.userInfo.WXAvatarUrl = null
		}
	},
	actions: {
	
	}
})

export default store
