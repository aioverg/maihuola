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
			state.userInfo.taobao = data.client.taobao || null
			state.userInfo.wechat = data.client.wechat || null
			state.userInfo.alipay = data.client.alipay || null
			state.userInfo.wechatName = null,
			state.userInfo.WXAvatarUrl = null,
			
			uni.setStorageSync('userInfo', data)
			console.log("设置用户信息",state)
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo.id = null
			state.userInfo.token = null
			state.userInfo.tel = null
			state.userInfo.realName = null
			state.userInfo.taobao = null
			state.userInfo.wechat = null
			state.userInfo.alipay = null
			uni.removeStorage({
                key: 'userInfo'
            })
		},
		setTaoBao(state, status){
			state.userInfo.taobao = status
			uni.getStorage({
				key: 'userInfo',
				success: function(res){
					res.data.client.taobao = status
					uni.setStorageSync('userInfo', res.data)
				}
			})
		},
		setWeChat(state, data){
			state.userInfo.wechat = 1
			state.userInfo.WXAvatarUrl = data || null
			uni.getStorage({
				key: 'userInfo',
				success: function(res){
					res.data.client.wechat = 1
					res.data.client.WXAvatarUrl = data || null
					uni.setStorageSync('userInfo', res.data)
				}
			})
			
		},
		clearWeChat(state){
			state.userInfo.wechat = null
			state.userInfo.WXAvatarUrl = null
			uni.removeStorage({
			    key: 'WXAvatarUrl'
			})
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
