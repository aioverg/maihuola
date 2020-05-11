const path = ""

//防抖函数
const throttle = function (fn, obj){
	let run = true
	if(!run){return}
	run = false
	setTimeout(() => {
		fn(obj)
		run = true
	}, 300)
}

//判断网络状态，进行跳转非tabBar页面
const navTo4 = function (obj) {
	uni.getNetworkType({
	    success: function (res) { 
			if(res.networkType !== "none") {
				uni.navigateTo({
					url: path + obj
				})
			}else{
				uni.navigateTo({
					url: path + '/pages/error/408'
				})
			}
	    }
	})
}

global.navTo = function(obj){
	throttle(navTo4,obj)
}

//判断网络状态，进行跳转到tabBar页面
global.navTabBar = function (obj) {
	uni.getNetworkType({
	    success: function (res) { 
			if(res.networkType !== "none") {
				uni.switchTab({
					url: path + obj
				})
			}else{
				uni.navigateTo({
					url: path + '/pages/error/408'
				})
			}
	    }
	})
}


export default global