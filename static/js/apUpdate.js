//获得是否需要更新版本
export function getServerNo(_this) {
	let appInfo = {}
	//获得手机版本
	appInfo.appType = uni.getSystemInfoSync().platform;
	if(appInfo.appType == "android"){
		plus.runtime.getProperty(plus.runtime.appid,function(inf){
			uni.request({
				url: "http://api.taobaoke.test.aixiaotu.com.cn/api/v1.version/info",
				method: "GET",
				data: {
					client_type: 1,
					app_type: 1,
				}
			}).then(res => {
				if(inf.version !== res[1].data.server_version){
					appInfo.update = true
					appInfo.appUrl = res[1].data.app_link
					appInfo.appVersion = res[1].data.server_version
					_this.$store.commit('setAppInfo', appInfo)
					console.log(_this.$store.state)
				}
			})
		});
	}else{
		return
	}
}
//下载更新包
export const apkDownload = function(){
	plus.nativeUI.showWaiting("下载wgt文件..."); 
	plus.downloader.createDownload(apkUrl, {filename: "_doc/update/"}, function(d, status){
		if(status == 200){
			console.log("下载成功："+d.filename)
			installWgt(d.filename);//安装wgt包
		}else{
			console.log("下载wgt失败！");  
			plus.nativeUI.alert("下载wgt失败！");  
		}
		plus.nativeUI.closeWaiting();
	}).start()
}

//// 更新应用资源  
function apkUndate(path){  
    plus.nativeUI.showWaiting("安装wgt文件...");  
    plus.runtime.install(path,{},function(){  
        plus.nativeUI.closeWaiting();  
    console.log("安装wgt文件成功！");  
    plus.nativeUI.alert("应用资源更新完成！",function(){  
        plus.runtime.restart();  
    });  
},function(e){  
    plus.nativeUI.closeWaiting();  
    console.log("安装wgt文件失败["+e.code+"]："+e.message);  
    plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);  
});  
}
