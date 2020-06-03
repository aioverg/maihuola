//获得是否需要更新版本
export function getServerNo(_this) {
	//获得手机版本
	let phoneSystem = uni.getSystemInfoSync().platform;
	if(phoneSystem == "android"){
		plus.runtime.getProperty(plus.runtime.appid,function(inf){
			uni.request({
				url: _this.$basePath + "version/info",
				method: "GET",
				data: {
					client_type: 2,
					app_type: 1,
				}
			}).then(res => {
				if(inf.version !== res[1].data.server_version){
					res[1].data.update = true
					res[1].data.local_version = inf.version
					_this.$store.commit('setAppInfo', res[1].data)
				}else{
					_this.$store.commit('setAppInfo', inf.version)
				}
			})
		});
	}else{
		return
	}
}
//下载更新包
export function apkDownload(url){
	console.log("开始")
	plus.downloader.createDownload( url, {}, function ( d, status ) {
	    if ( status == 200 ) { // 下载成功  
	        var path = d.filename;  
	        console.log("正在下载",d.filename)
			plus.runtime.install(path)
	    } else {//下载失败  
	        console.log("下载失败")
	    }
	}).start()
	console.log("结束")
}
