import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		systemType: 1, //0-PC;1-IOS;2-Android
		//tabId: 0,
		hasLogin: false,
		token: null,
		userInfo: {
			id: null,
			level: null,
			token: null,
			tel: null,
			realName: null,
			taobao: null,
			wechat: null,
			alipay: null,
			wechatName: null,
			WXAvatarUrl: null,
			kuaishou: "",
			douyin: ""
		},
		appInfo: {
			localVersion: null,
			appType: null,
			update: false,
			require: false,
			appLink: null,
			appVersion: null,
			appNote: null,
		}
	},
	mutations: {
		login(state, data){
			state.hasLogin = true;
		},
		setToken(state, data){
			state.token = data.token
			uni.setStorageSync('token', data)
		},
		setTabId(state, data){
			state.tabId = data
		},
		setUserInfo(state, data){
			state.hasLogin = true;
			state.userInfo.id = data.client.id
			state.userInfo.token = data.access_token
			state.userInfo.level = data.client.level
			state.userInfo.tel = data.client.mobile
			state.userInfo.realName = data.client.real_name || null
			state.userInfo.taobao = data.client.taobao || null
			state.userInfo.wechat = data.client.wechat || null
			state.userInfo.alipay = data.client.alipay || null
			state.userInfo.wechatName = null
			state.userInfo.WXAvatarUrl = null
			state.kuaishou = data.client.kuaishou_id || ""
			state.douyin = data.client.douyin_id || ""

			uni.setStorageSync('userInfo', data)
		},
		setUserInfoES(state, data){
			state.hasLogin = true;
			state.userInfo.id = data.id
			state.userInfo.level = data.level
			state.userInfo.tel = data.mobile
			state.userInfo.realName = data.real_name || null
			state.userInfo.taobao = data.taobao || null
			state.userInfo.wechat = data.wechat || null
			state.userInfo.alipay = data.alipay || null
			state.userInfo.wechatName = null
			state.userInfo.WXAvatarUrl = null
			state.kuaishou = data.kuaishou_id || ""
			state.douyin = data.douyin_id || ""
			
			uni.setStorageSync('userInfo', data)
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
			uni.removeStorage({
			    key: 'token'
			})
		},
		setTaoBao(state, status){
			state.userInfo.taobao = status
			uni.getStorage({
				key: 'userInfo',
				success: function(res){
					res.data.taobao = status
					uni.setStorageSync('userInfo', res.data)
				}
			})
		},
		setAlipay(state, status){
			state.userInfo.alipay = status
			uni.getStorage({
				key: 'userInfo',
				success: function(res){
					res.data.alipay = status
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
					res.data.wechat = 1
					res.data.WXAvatarUrl = data || null
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
			if(data.update){
				state.appInfo.appType = data.app_type
				state.appInfo.update = data.update
				state.appInfo.localVersion = data.local_version
				state.appInfo.require = data.is_required ? true : false
				state.appInfo.appLink = data.app_link
				state.appInfo.appVersion = data.server_version
				state.appInfo.appNote = data.update_note
			}else{
				state.appInfo.localVersion = data
			}
		}
	},
	actions: {
	
	}
})

export default store
