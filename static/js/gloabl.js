const path = ""
const navTo = function (obj) {
	console.log(666666,obj)
	uni.navigateTo({
		url: path + obj
	})
}

export {
	navTo
}