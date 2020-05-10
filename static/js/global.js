const path = ""
const navTo = function (obj) {
	uni.getNetworkType({ //判断网络状态，进行跳转
	    success: function (res) { 
	        console.log(333,res.networkType);
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

const navTabBar = function (obj) {
	uni.getNetworkType({ //判断网络状态，进行跳转
	    success: function (res) { 
	        console.log(333,res.networkType);
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

export default {
	navTo,
	navTabBar
}