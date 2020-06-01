const aiGlobal = {}
let run = true
aiGlobal.aiPopupMessage = function(type, content){
	if(!run){
		return
	}
	run = false
	this.$refs.aiPopupMessage.open({
	type: type,
		content: content,
		timeout:1500,
		isClick:false
	})
	setTimeout(() => {
		run = true
		}, 2000)
	}
			
export default aiGlobal