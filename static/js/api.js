const api = {}
const basePath = ""
const token = uni.getStorage({
    key: 'token',
    success: function (res) {
        console.log("tokenscuess",res);
    },
	fai: function (res) {
		console.log("tokenfail", res)
	}
});
const request = function(obj){
	uni.getNetworkType({
		success: function(res){
			if(res.networkType == "none" /*|| res.networkType == "unknown"*/ ){
				uni.navigateTo({
					url: basePath + '/pages/error/408'
				})
				return
			}
		}
	})
	
	const baseUrl = "http://api.taobaoke.test.aixiaotu.com.cn"
	let authentication = null
	if(uni.getStorageSync("userInfo")){
		let token = uni.getStorageSync("userInfo").access_token
		let userId = uni.getStorageSync("userInfo").client.id
		let authen = new Buffer(userId + ':' + token);
		authentication = authen.toString('base64');
	}
	return new Promise((resolve, reject) => {
		uni.request({
			...obj,
			url: baseUrl + obj.url,
			method: obj.method,
			header: {authentication: authentication}, //用户token
			success: (res) => {
				resolve(res)
			},
			fail: (res) => {
				reject(res)
			}
		})
	})
}

//获取首页商品分类
api.getGuessSort = () => { 
	return request({
	    url: "/api/v1.itemcategory/treelist",
	    method: "GET",
	})
}
//获取轮播图
api.getCarousel = (data) => {
	return request({
		url: "/api/v1.special/listbycode",
		method: "GET",
		data: data
	})
}
//获取轮播图中商品集合列表
api.getCarouselList = (data) => {
	return request({
		url: "/api/v1.item/specialgoods",
		method: "GET",
		data: data
	})
}

//搜索 + 获取分类商品
api.getSearchGuess = (data) => {
	return request({
		url: "/api/v1.item",
		method: "GET",
		data: data
	})
}

//获取商品详情
api.getGuessDetail = (goods_id) => {
	return request({
		url: "/api/v1.item/goodsinfo",
		method: "GET",
		data: {
			goods_id: goods_id
		}
	})
}
//获取淘口令
api.getTKL = (data) => {
	return request({
		url: "/api/v1.item/gettpwd",
		method: "GET",
		data: {
			goods_id: data
		}
	})
}
//获取用户授权信息
api.getAuthInfo = (data) => {
	return request({
		url: "/api/v1.user/bindinfo",
		method: "GET",
		data: data
	})
}
//获取用户中心数据（余额等）
api.getUserCenter = () => {
	return request({
		url: "/api/v1.user/profile",
		method: "GET"
	})
}
//授权解绑
api.getAuthUnbind = (data) => {
	return request({
		url: "/api/v1.user/unbind",
		method: "POST",
		data: data
	})
}
//授权绑定
api.getAuthBind = (data) => {
	return request({
		url: "/api/v1.user/bind",
		method: "POST",
		data: data
	})
}
//发送手机验证码
api.getPhoneCode = (data) => {
	return request({
		url: "/api/v1.service/sendsms",
		method: "POST",
		data: data
	})
}
//验证手机验证码，并登录
api.getChecktPhoneCode = (data) => {
	return request({
		url: "/api/v1.user/loginbymobile",
		method: "POST",
		data: data
	})
}
//验证原手机号码
api.getChecktOldPhoneCode = (data) => {
	return request({
		url: "/api/v1.user/checkoldmobile",
		method: "GET",
		data: data
	})
}
//修改手机号
api.getAlertPhone = (data) => {
	return request({
		url: "/api/v1.user/changemobile",
		method: "POST",
		data: data
	})
}
//绑定淘宝
api.getTaoBaoSessionKey = (data) => {
	return request({
		url: "/api/v1.user/taobaobind",
		method: "POST",
		data: data
	})
}
//绑定支付宝
api.getAlipay = (data) => {
	return request({
		url: "/api/v1.user/alipaybind",
		method: "POST",
		data: data
	})
}
//申请提现
api.getWithdraw = (data) => {
	return request({
		url: '/api/v1.cash/applycash',
		method: 'POST',
		data: data
	})
}
//提现记录
api.getWithdrawRecord = (data) => {
	return request({
		url: '/api/v1.cash/list',
		method: 'GET',
		data: data
	})
}

//意见反馈
api.postFeedBack = (data) => {
	return request({
		url: "/api/v1.feedback/addfeedback",
		method: "POST",
		data: data
	})
}


export default api