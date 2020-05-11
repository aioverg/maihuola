/*模拟数据*/

/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: 'Leo yo',
		portrait: 'http://img.61ef.cn/news/201409/28/2014092805595807.jpg'
	},
	msg: '提示'
}
/* 首页轮播图 */
const carouselList = [
	{
		src: "/static/temp/banner1.jpg",
		background: "rgb(203, 87, 60)",
	},
	{
		src: "/static/temp/banner2.jpg",
		background: "rgb(205, 215, 218)",
	},
	{
		src: "/static/temp/banner3.jpg",
		background: "rgb(183, 73, 69)",
	}
]
/* 商品列表 */
const goodsListOne = [{
		image: "/static/temp/guess01.jpg",
		title: "短袖t恤女夏装2019新款韩版宽松",
		zbprice: 129,
		scprice: 139,
		ratio: "30%",
		earnings: 38.7,
	},
	{
		image: "/static/temp/guess02.jpg",
		title: "吊坠",
		zbprice: 129,
		scprice: 139,
		ratio: "30%",
		earnings: 38.7,
	},
	{
		image: "/static/temp/guess03.jpg",
		title: "巧谷2019春夏季新品新款女装",
		zbprice: 129,
		scprice: 139,
		ratio: "30%",
		earnings: 38.7,
	},
]
const goodsListTwo = [
    {
		image: "/static/temp/guess04.jpg",
		title: "亚麻衬衫女夏季2019新款民国风复古女装盘扣绣花文艺棉麻中袖上衣民国风复古女装盘扣绣花文艺棉麻中袖上衣",
		zbprice: 129,
		scprice: 139,
		ratio: "30%",
		earnings: 38.7,
	}, {
		image: "/static/temp/guess05.jpg",
		title: "学生潮韩版春夏短",
		zbprice: 129,
		scprice: 139,
		ratio: "30%",
		earnings: 38.7,
	}, {
		image: "/static/temp/guess06.jpg",
		title: "诗絮2019韩国春装新品简约条纹修身显瘦小吊带加开衫两件套上衣女",
		zbprice: 129,
		scprice: 139,
		ratio: "30%",
		earnings: 38.7,
	},
]

//详情展示页面
const detailData = {
	image: "/static/temp/guess06.jpg",
	advantage: "商品卖点",
	zbscript: "直播脚本",
	zbprice: 129,
	scprice: 139,
	ratio: "30%",
	earnings: 38.7,
}

export default {
	carouselList,
	detailData,
	userInfo,
	goodsListOne,
	goodsListTwo,
}
