# phone_web_share
手机网页分享

IOS和ANDROID系统下的UC浏览器、QQ浏览器、SOGOU浏览器可完成微信朋友圈、微信好友、新浪微博、QQ空间、QQ好友的分享，
CHROME可以实现新浪微博、QQ空间、QQ好友的分享，而微信朋友圈、微信好友将默认转至地址。
SAFARI可以实现与CHROME相同的功能。

使用jQuery框架，下面是使用方法。

share($, ".page_share", {
	url: "网址",
	title: "新闻标题",
	desc: "新闻简介",
	img: "新闻图片",
	form: "来源",
	newsid: "新闻ID",
});
