const path = ""
const aiRouter = {}
//防抖函数
const throttle = function (fn, obj, interval){
	let run = true
	if(!run){return}
	run = false
	setTimeout(() => {
		fn(obj)
		run = true
	}, interval)
}

//判断网络状态跳转非tabBar页面，navigatorFlag用于解决手机端点击多次多次跳转的问题
aiRouter.navTo = function(url){
	console.log(url)
	if(this.navigatorFlag){ return }
	console.log(6666, url)
	this.navigatorFlag = true
	uni.getNetworkType({
		success: function(res){
			if(res.networkType == "none"/* || res.networkType == "unknown"*/){
				uni.navigateTo({
					url: path + '/pages/error/408'
				})
			}else{
				uni.navigateTo({
					url: path + url
				})
			}
		}
	})
	setTimeout(() => {
		this.navigatorFlag = false
	}, 200)
}

//判断网络状态跳转到tabBar页面，navigatorFlag用于解决手机端点击多次多次跳转的问题
aiRouter.navTabBar = function(url){
	if(this.navigatorFlag){ return }
	this.navigatorFlag = true
	uni.getNetworkType({
		success: function(res){
			if(res.networkType == "none" /*|| res.networkType == "unknown"*/){
				uni.navigateTo({
					url: path + '/pages/error/408'
				})
			}else{
				uni.switchTab({
					url: path + url
				})
			}
		}
	})
	setTimeout(() => {
		this.navigatorFlag = false
	}, 200)
}

//关闭当前页面跳转到指定页面
aiRouter.redirect = function(url){
	if(this.navigatorFlag){ return }
	this.navigatorFlag = true
	uni.getNetworkType({
		success: function(res){
			if(res.networkType == "none" /*|| res.networkType == "unknown"*/){
				uni.redirectTo({
					url: path + '/pages/error/408'
				})
			}else{
				uni.redirectTo({
					url: path + url
				})
			}
		}
	})
	setTimeout(() => {
		this.navigatorFlag = false
	}, 200)
}

//关闭当前页面返回上一级或多级页面
aiRouter.navToBack = function(delta){
	if(this.navigatorFlag){ return }
	this.navigatorFlag = true
	uni.getNetworkType({
		success: function(res){
			if(res.networkType == "none" /*|| res.networkType == "unknown"*/){
				uni.redirectTo({
					url: path + '/pages/error/408'
				})
			}else{
				uni.navigateBack({
				    delta: delta
				})
			}
		}
	})
	setTimeout(() => {
		this.navigatorFlag = false
	}, 200)
}

export default aiRouter