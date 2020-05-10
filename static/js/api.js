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

const request = function(obj, data){
	const baseUrl = "https://api-hmugo-web.itheima.net"
	return new Promise((resolve, reject) => {
		uni.request({
			...obj,
			url: baseUrl + obj.url,
			method: obj.method,
			header: {token: "none"}, //用户token
			success: (res) => {
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
    if(!token){return}
	request(obj.login, token).then(res => {
		console.log(res)
		return new Promise((resolve, reject) => {
			if(res.statusCode == 200){
				console.log(this,"过期，重新登录")//设置弹出弹出框
				resolve("true")
			}else{
				console.log("没有过期")
				resolve("false")
			}
		})
	})
}
api.getTkl = function(data){//获取淘口令
	request(obj.getTkl, data).then(res => {
		console.log(9999,res)
	})
}

export default api