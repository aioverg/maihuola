const api = {}
const obj = {
	login: {
		url: "/api/public/v1/categories",
		method: "GET",
	},
	getTkl: {
		url: "/api/public/v1/categories",
		method: "GET"
	}
}

const request = function(obj){
	const baseUrl = "http://api.taobaoke.test.aixiaotu.com.cn"
	return new Promise((resolve, reject) => {
		uni.request({
			...obj,
			url: baseUrl + obj.url,
			method: obj.method,
			header: {token: "none"}, //用户token
			success: (res) => {
				console.log(res)
				resolve(res)
			},
			fail: (res) => {
				reject(res)
			}
		})
	})
}


api.login = function(data){//登录
	request(obj.login, data).then(res => {
		console.log("login",res)
		uni.setStorageSync("token", "aixiaotu")
	})
}
api.checkToken = function(token){//检验token是否过期
	return request(obj.login, token).then(res => {
		if(res.statusCode == 200){
			console.log("过期，重新登录111")//设置弹出弹出框
			return true
		}else{
			console.log("没有过期")
			return false
		}
	})
}

//获取首页商品分类
api.getGuessSort = () => { 
	return request({
	    url: "/api/v1.itemcategory/treelist",
	    method: "GET",
	})
}

//获取商品分类数据
api.getGuess = () => { 
	return request({
	    url: "/api/v1.item/searchlist",
	    method: "GET",
	})
}

//搜索
api.getSearchGuess = (data) => {
	return request({
		url: "/api/v1.item/searchlist",
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
api.getTkl = function(data){
	request(obj.getTkl, data).then(res => {
		console.log(9999,res)
	})
}

//意见反馈
api.postFeedBack = function(data){
	return request({
		url: "/api/v1.feedback/addfeedback",
		method: "POST",
		data: data
	})
}


export default api