//获得是否需要更新版本
export function getServerNo(_this) {
	//获得手机版本
	let phoneSystem = uni.getSystemInfoSync().platform;
	if (phoneSystem == "android") {
		plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			uni.request({
				url: _this.$basePath + "version/info",
				method: "GET",
				data: {
					client_type: 2,
					app_type: 1,
				}
			}).then(res => {
				if (inf.version != res[1].data.server_version) {
					res[1].data.update = true
					res[1].data.local_version = inf.version
					_this.$store.commit('setAppInfo', res[1].data)
					_this.updateType = false
					_this.$refs.popupAiDia.open()
				} else {
					_this.$store.commit('setAppInfo', inf.version)
				}
			})
		});
	} else {
		return
	}
}
//下载更新包
export function apkDownload(_this) {
	_this.updateBt = "正在下载"
	_this.prgShow = true
	let downUpdate = plus.downloader.createDownload(_this.updataLink, {}, function(d, status) {
		if (status == 200) {
			var path = d.filename;
			plus.runtime.install(path)
		} else {
			console.log("下载失败")
		}
	})
	downUpdate.start()
	downUpdate.addEventListener('statechanged', function(
		task,
		status
	) {
		switch (task.state) {
			case 1:
				break;
			case 2:
				break;
			case 3:
				_this.prg = Math.ceil(Number(task.downloadedSize) / Number(task.totalSize) * 100)
				break;
			case 4:
				_this.updateBt = "下载完成"
				break;
		}
		
	})
}
