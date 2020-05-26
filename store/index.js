import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		systemType: 1, //0-PC;1-Android;3-IOS
		hasLogin: false,
		userInfo: {
			id: null,
			token: null,
			tel: null,
			realName: null,
		},
		authInfo: {
			taobao: null,
			wechat: null,
			alipay: null,
			wechatName: null,
			WXAvatarUrl: null,
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
		setUserInfo(state, data){
			state.hasLogin = true;
			state.userInfo.id = data.client.id
			state.userInfo.token = data.access_token
			state.userInfo.tel = data.client.mobile
			state.userInfo.realName = data.client.real_name || null
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',
			    data: data
			})
			console.log("设置用户信息",state)
		},
		setAuthInfo(state, data){
			state.authInfo.taobao = data.client.taobao || null
			state.authInfo.wechat = data.client.wechat || null
			state.authInfo.alipay = data.client.alipay || null
			console.log("设置授权信息",state)
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo.id = null
			state.userInfo.token = null
			state.userInfo.tel = null
			state.userInfo.realName = null
			state.authInfo.taobao = null
			state.authInfo.wechat = null
			state.authInfo.alipay = null
			uni.removeStorage({
                key: 'userInfo'
            })
		},
		setTaoBao(state, status){
			state.authInfo.taobao = status
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
			state.authInfo.wechat = true
			state.userInfo.WXAvatarUrl = data
			uni.setStorage({//缓存用户登陆状态
			    key: 'WXAvatarUrl',
			    data: data
			})
			
		},
		clearWeChat(state){
			state.authInfo.wechat = null
			state.userInfo.WXAvatarUrl = null
			uni.removeStorage({
			    key: 'WXAvatarUrl'
			})
		}
	},
	actions: {
	
	}
})

export default store
