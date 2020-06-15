
/**
 * App端 手绘 tabbar 可以实现凸起按钮
 * version:1.0.2
 */
export default class TabBarView{
	constructor(){
		//tabbar 配置
		this.configs = {
			background:'#fff', //背景
			height: 50 , //高度
			fontSize: 15, //字体大小
			iconWidth: 24, //图片大小
			borderStyle:'#F5F5F5', //bordercolor
			color:'#000000', //字体颜色
			selectedColor:'#038AFF',
			midIconWidth:60 //中间凸起按钮大小
		}
		
		//白名单 不需要配置
		this.whiteList = [];
		
		//tabbar 列表 midButton:true 可实现凸起 想凸几个凸几个
		this.tabBarList = [
			{
				icon:'/static/logo.png',
				selectIcon:'/static/1.png',
				name:'首页',
				path:'/pages/index/index'
			},
			{
				icon:'/static/logo.png',
				selectIcon:'/static/1.png',
				name:'购物车',
				path:'/pages/index/shop-cart',
				midButton:true
			},
			{
				icon:'/static/logo.png',
				selectIcon:'/static/1.png',
				name:'我的',
				path:'/pages/index/user'
			}
		]
		
		//tabbarItem宽度
		this.tabbarItemWidth = Math.floor( 100 / this.tabBarList.length );
	}
	
	//开局初始化tabbar
	init(){
		this.whiteList = [];
		//创建tabbar盒子
		const tabBarBox = new plus.nativeObj.View('tabBarBox', {
			position:'dock',
			dock:'bottom',
			bottom:'0px',
			left:'0px',
			width:'100%',
			height: this.configs.height + 'px',
			backgroundColor:this.configs.background
		},[
			{
				tag:'rect',
				id:'taBarBoxRect',
				rectStyles:{
					color:this.configs.borderStyle
				},
				position:{
					top:'0px',
					left:'0px',
					width:"100%",
					height:'1px'
				}
			}
		]);
		
		//显示tabbar 盒子
		tabBarBox.show();
		
		//创建tabbar item
		for(let i = 0; i < this.tabBarList.length; i++){
			const tabItem = this.tabBarList[i];
			this.whiteList.push(tabItem.path);
			const tabbarItem = new plus.nativeObj.View('tabBarItem' + i,this.setTabBarStyle(tabItem.midButton,i),this.drawTabBar(false,tabItem));
			//添加tabbarItem 事件 根据自己需求 默认调转页面
			tabbarItem.addEventListener("click", function(e) {
				uni.switchTab({
					url:tabItem.path
				})
			}, false);
		}
	}
	
	//监听tabbar
	$watch(){
		setTimeout(()=>{
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const path = '/'+ page.route;
			const tabBarBox = plus.nativeObj.View.getViewById('tabBarBox');
			for(let i = 0; i < this.tabBarList.length; i++){
				const tabItem = this.tabBarList[i];
				const tabBarItem = plus.nativeObj.View.getViewById('tabBarItem' + i);
				tabBarItem.draw(this.drawTabBar(tabItem.path === path,tabItem))
				if(this.whiteList.indexOf(path) != -1){
					tabBarItem.show();
				}else{
					tabBarItem.hide();
				}
			}
			if(this.whiteList.indexOf(path) != -1){
				tabBarBox.show();
			}else{
				tabBarBox.hide();
			}
		},0)
	}
	
	//设置 tabbar 风格
	setTabBarStyle(midButton,i){
		return {
			position:'dock',
			bottom:'0px',
			left:this.tabbarItemWidth * i + '%',
			dock:'bottom',
			width: this.tabbarItemWidth + '%' ,
			height: midButton ? this.configs.height + (this.configs.midIconWidth / 2) + 'px' : this.configs.height - 1 + 'px'
		}
	}
	
	//画 tabbar 样式
	drawTabBar(select,tabItem){
		return	[
					{
						tag:'img',
						id:'tabItemIcon',
						src:select ? tabItem.selectIcon : tabItem.icon,
						position:{
							top:tabItem.midButton ? '0px' : '4px',
							left:'auto',
							width:tabItem.midButton ? this.configs.midIconWidth : this.configs.iconWidth,
							height:tabItem.midButton ? this.configs.midIconWidth : this.configs.iconWidth,
						}
					},
					{
						tag:'font',
						id:'tabItemFont',
						text: tabItem.name,
						textStyles:{
							size:'10px',
							color:select ? this.configs.selectedColor : this.configs.color,
						},
						position:{
							bottom:'5px',
							left:'auto',
							width:'100%',
							height:'12px' 
						}
					}
				]
	}
}
