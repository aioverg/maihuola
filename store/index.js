import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		systemType: 0, //0-PC;1-Android;3-IOS
		usertoken: null,
		hasLogin: false,
		userInfo: {
			userId: null,
			tel: null,
			taobao: null,
			weixin: null,
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
			state.userInfo.taobao = data.client.taobao
			state.userInfo.weixin = data.client.wechat
			state.userInfo.alipay = data.client.alipay
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
		setWXAvatarUrl(state, url){
			state.WXAvatarUrl = url
		},
		setWeiXin(state, openId){
			state.userInfo.weixin = openId
		},
		setTaoBao(state, userId){
			state.userInfo.taobao = userId
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
		}
	},
	actions: {
	
	}
})

export default store
