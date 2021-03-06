const api = {}
const basePath = ""
//const baseUrl = "http://api.taobaoke.test.aixiaotu.com.cn/api/v1."
const baseUrl = "http://api.taobaoke.aixiaotu.com.cn/api/v1."
/*const token = uni.getStorage({
    key: 'token',
    success: function (res) {
        console.log("tokenscuess",res);
    },
	fai: function (res) {
		console.log("tokenfail", res)
	}
});*/
const request = function(obj){
	let authentication = null
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
	if(uni.getStorageSync("token")){
		let token = uni.getStorageSync("token").token
		let userId = uni.getStorageSync("token").id
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
//文件上传
const upload = function(obj){
	let authentication = null
	if(uni.getStorageSync("token")){
		let token = uni.getStorageSync("token").token
		let userId = uni.getStorageSync("token").id
		let authen = new Buffer(userId + ':' + token)
		authentication = authen.toString('base64')
	}
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			...obj,
			url: baseUrl + obj.url,
			name: obj.name,
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

//微信登录
api.loginWechat = (data) => {
	return request({
		url: "user/loginbywechat",
		method: "POST",
		data: data
	})
}
//获取首页商品分类
api.getGuessSort = () => { 
	return request({
	    url: "itemcategory/treelist",
	    method: "GET",
	})
}
//获取轮播图
api.getCarousel = (data) => {
	return request({
		url: "special/listbycode",
		method: "GET",
		data: data
	})
}
//获取轮播图中商品集合列表
api.getCarouselList = (data) => {
	return request({
		url: "item/specialgoods",
		method: "GET",
		data: data
	})
}

//搜索 + 获取分类商品
api.getSearchGuess = (data) => {
	return request({
		url: "item",
		method: "GET",
		data: data
	})
}

//获取商品详情
api.getGuessDetail = (data) => {
	return request({
		url: "item/goodsinfo",
		method: "GET",
		data: data
	})
}
//获取商品收藏列表
api.postGoodsCollectData = (data) => {
	return request({
		url: "item/myCollect",
		method: "POST",
		data: data
	})
}
//商品收藏
api.postGoodsCollect = (data) => {
	return request({
		url: "item/collect",
		method: "POST",
		data: data
	})
}
//商品取消收藏
api.postGoodsUnCollect = (data) => {
	return request({
		url: "item/unCollect",
		method: "POST",
		data: data
	})
}
//获取淘口令
api.getTKL = (data) => {
	return request({
		url: "item/gettpwd",
		method: "GET",
		data: {
			goods_id: data
		}
	})
}
//获取用户授权信息
api.getAuthInfo = (data) => {
	return request({
		url: "user/bindinfo",
		method: "GET",
		data: data
	})
}
//获取用户中心数据（余额等）
api.getUserCenter = () => {
	return request({
		url: "user/profile",
		method: "GET"
	})
}
//授权解绑
api.getAuthUnbind = (data) => {
	return request({
		url: "user/unbind",
		method: "POST",
		data: data
	})
}
//授权绑定
api.getAuthBind = (data) => {
	return request({
		url: "user/bind",
		method: "POST",
		data: data
	})
}
//发送手机验证码
api.getPhoneCode = (data) => {
	return request({
		url: "service/sendsms",
		method: "POST",
		data: data
	})
}
//验证手机验证码，并登录
api.getChecktPhoneCode = (data) => {
	return request({
		url: "user/loginbymobile",
		method: "POST",
		data: data
	})
}
//验证原手机号码
api.getChecktOldPhoneCode = (data) => {
	return request({
		url: "user/checkoldmobile",
		method: "GET",
		data: data
	})
}
//修改手机号
api.getAlertPhone = (data) => {
	return request({
		url: "user/changemobile",
		method: "POST",
		data: data
	})
}
//绑定淘宝
api.getTaoBaoSessionKey = (data) => {
	return request({
		url: "user/taobaobind",
		method: "POST",
		data: data
	})
}
//绑定支付宝
api.getAlipay = (data) => {
	return request({
		url: "user/alipaybind",
		method: "POST",
		data: data
	})
}
//申请提现
api.getWithdraw = (data) => {
	return request({
		url: 'cash/applycash',
		method: 'POST',
		data: data
	})
}
//提现记录
api.getWithdrawRecord = (data) => {
	return request({
		url: 'cash/list',
		method: 'GET',
		data: data
	})
}

//意见反馈
api.postFeedBack = (data) => {
	return request({
		url: "feedback/addfeedback",
		method: "POST",
		data: data
	})
}
//获取任务列表
api.postTaskList = (data) => {
	return request({
		url: "mission",
		method: "POST",
		data: data
	})
}
//获取任务详情
api.postTaskDetail = (data) => {
	return request({
		url: "mission/getById",
		method: "POST",
		data: data
	})
}
//任务审核记录接口
api.postTaskCheckHistory = (data) => {
	return request({
		url: "mission/getVerifyList",
		method: "POST",
		data: data
	})
}
//图片上传接口
api.postImg = (data) => {
	return upload({
		url: "common/upload",
		name: "image",
		filePath: data
	})
}
//任务提交接口
api.postTaskUpload = (data) => {
	return request({
		url: "mission/addMissionRecord",
		method: "POST",
		data: data
	})
}
//赚金收益接口
api.postTaskEarn = (data) => {
	return request({
		url: "earnings/myMissionCash",
		method: "POST",
		data: data
	})
}
//赚金结算明细
api.postTaskEarnDetail = (data) => {
	return request({
		url: "earnings/myCashDetial",
		method: "POST",
		data: data
	})
}
//绑定快手Id
api.postPlatId = (data) => {
	return request({
		url: "user/changeKuaishou",
		method: "POST",
		data: data
	})
}
export default api