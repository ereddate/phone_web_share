var share = function($, selector, ops) {
	var ua = navigator.userAgent.toLowerCase(),
		device = {
			os: {
				version: 0,
				isiOS: ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("ios") > -1,
				isAndroid: ua.indexOf("android") > -1 || ua.indexOf("adr") > -1 || ua.indexOf("linux;") > -1
			},
			browser: {
				version: 0,
				isQQ: ua.indexOf("mqqbrowser/") > -1,
				isUC: ua.indexOf("ucbrowser/") > -1,
				isWechat: ua.indexOf("micromessenger") > -1,
				isSamsung: ua.indexOf("samsungbrowser/") > -1,
				isSogou: ua.indexOf("sogoumobilebrowser/") > -1,
				isPinganWifi: ua.indexOf("pawifi") > -1
			}
		},
		Base64 = {
			_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
			encode: function(a) {
				var b, c, d, e, f, g, h, i = "",
					j = 0;
				for (a = Base64._utf8_encode(a); j < a.length;) b = a.charCodeAt(j++), c = a.charCodeAt(j++), d = a.charCodeAt(j++), e = b >> 2, f = (3 & b) << 4 | c >> 4, g = (15 & c) << 2 | d >> 6, h = 63 & d, isNaN(c) ? g = h = 64 : isNaN(d) && (h = 64), i = i + this._keyStr.charAt(e) + this._keyStr.charAt(f) + this._keyStr.charAt(g) + this._keyStr.charAt(h);
				return i
			},
			decode: function(a) {
				var b, c, d, e, f, g, h, i = "",
					j = 0;
				for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); j < a.length;) e = this._keyStr.indexOf(a.charAt(j++)), f = this._keyStr.indexOf(a.charAt(j++)), g = this._keyStr.indexOf(a.charAt(j++)), h = this._keyStr.indexOf(a.charAt(j++)), b = e << 2 | f >> 4, c = (15 & f) << 4 | g >> 2, d = (3 & g) << 6 | h, i += String.fromCharCode(b), 64 != g && (i += String.fromCharCode(c)), 64 != h && (i += String.fromCharCode(d));
				return i = Base64._utf8_decode(i)
			},
			_utf8_encode: function(a) {
				a = a.replace(/\r\n/g, "\n");
				for (var b = "", c = 0; c < a.length; c++) {
					var d = a.charCodeAt(c);
					128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
				}
				return b
			},
			_utf8_decode: function(a) {
				for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length;) d = a.charCodeAt(c), 128 > d ? (b += String.fromCharCode(d), c++) : d > 191 && 224 > d ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((31 & d) << 6 | 63 & c2), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((15 & d) << 12 | (63 & c2) << 6 | 63 & c3), c += 3);
				return b
			}
		};
	var url = ops.url,
		title = ops.title,
		desc = ops.desc,
		img = ops.img,
		form = ops.form,
		id = ops.newsid,
		toStr = function(a, b) {
			var c, d, e;
			for (d in b) e = b[d], c = new RegExp("(" + d + "=)[^&]+", "i"), a.match(c) ? a = a.replace(c, "$1" + e) : a += -1 === a.indexOf("?") ? "?" + d + "=" + e : "&" + d + "=" + e;
			return a
		},
		appList = {
			sinaweibo: ["kSinaWeibo", "SinaWeibo", 11, "\u65B0\u6D6A\u5FAE\u535A"],
			wechatfriends: ["kWeixin", "WechatFriends", 1, "\u5FAE\u4FE1\u597D\u53CB"],
			wechattimeline: ["kWeixinFriend", "WechatTimeline", "8", "\u5FAE\u4FE1\u670B\u53CB\u5708"],
			qq: ["kQQ", "QQ", "4", "QQ\u597D\u53CB"],
			qzone: ["kQZone", "QZone", "3", "QQ\u7A7A\u95F4"]
		};

	function g(a) {
		var b = document.createElement("div");
		b.style.visibility = "hidden", b.innerHTML = '<iframe src="' + a + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(b), setTimeout(function() {
			b && b.parentNode && b.parentNode.removeChild(b)
		}, 5e3)
	}

	function celement(a, b) {
		var c = document.createElement("script"),
			d = document.getElementsByTagName("body")[0];
		c.setAttribute("src", a), c.onload = c.onreadystatechange = function() {
			this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (b && b(), c.onload = c.onreadystatechange = null, c.parentNode.removeChild(c))
		}, d.appendChild(c)
	}
	var appico = $(selector).find(".page_share_ico");
	appico.click(function(e) {
		e.preventDefault();
		var app = $(this).attr("data-app");
		switch (app) {
			case "wechattimeline":
			case "wechatfriends":
				if (device.browser.isUC) {
					device.os.isiOS && "undefined" != typeof ucbrowser ? (a = appList[app][0], ucbrowser.web_share(title, title, url, a, "", " @" + form + " ", "")) : "undefined" != typeof ucweb ? (a = appList[app][1], ucweb.startRequest("shell.page_share", [title, title + " @" + form + " ", url, a, "", "", ""])) : console.log("UCBrowser native share bypass.");
				} else if (device.browser.isQQ) {
					celement("http://jsapi.qq.com/get?api=app.share", function() {
						var o = {
							url: url,
							title: title,
							img_url: img,
							to_app: appList[app][2],
							cus_txt: title + " @hexun.com "
						};
						typeof browser != "undefined" && browser.app && browser.app.share ? browser.app.share(o) : typeof qb != "undefined" ? qb.share(o) : console.log("QQBrowser native share bypass.");
					});
				} else if (device.browser.isSogou) {
					var p = {
						shareTitle: title,
						shareContent: desc,
						shareImageUrl: img,
						shareUrl: url,
						shareSnapshotTab: "",
						shareType: null
					};
					"wechatfriends" == app || "wechattimeline" == app ? ("wechatfriends" == app ? p.shareType = 2 : "wechattimeline" == app && (p.shareType = 4), SogouMse && SogouMse.Utility && SogouMse.Utility.shareWithInfo ? SogouMse.Utility.shareWithInfo(p) : console.log("sogouBrowser native share error.")) : window.location.href = toStr("http://service.weibo.com/share/share.php?", {
						title: encodeURIComponent(title),
						url: encodeURIComponent(url),
						appkey: "",
						pic: img,
						ralateUid: "",
						count: "n",
						size: "middle"
					})
				} else {
					device.os.isiOS && device.os.version > 8 ? window.location.href = "mttbrowser://url=" + url : g("mttbrowser://url=" + url)
				}
				break;
			case "sinaweibo":
				window.location.href = toStr("http://service.weibo.com/share/share.php?", {
					title: encodeURIComponent(title),
					url: encodeURIComponent(url),
					appkey: "",
					pic: img,
					ralateUid: "",
					count: "n",
					size: "middle"
				});
				break;
			case "qzone":
				var d = Base64.encode(url),
					j = Base64.encode(img),
					f = Base64.encode(title),
					i = Base64.encode(desc),
					k = Base64.encode(form);
				var n = {
					android: "mqqapi://share/to_qzone?src_type=app&version=1&file_type=news&req_type=1",
					ios: "mqqapi://share/to_fri?file_type=news&src_type=app&version=1&generalpastboard=1&shareType=1&cflag=1&objectlocation=pasteboard&callback_type=scheme&callback_name=QQ41AF4B2A&"
				};
				device.os.isAndroid ? device.browser.isSamsung ? window.location.href = toStr(n.android, {
					url: d,
					previewimageUrl: j,
					title: f,
					description: i,
					thirdAppDisplayName: k
				}) : g(toStr(n.android, {
					url: d,
					image_url: j,
					title: f,
					description: i,
					app_name: k
				})) : window.location.href = toStr(n.ios, {
					url: d,
					previewimageUrl: j,
					title: f,
					description: i,
					thirdAppDisplayName: k
				});
				break;
			case "qq":
				window.location.href = toStr("mqqapi://share/to_fri?src_type=web&version=1&file_type=news", {
					share_id: "1101685683",
					title: Base64.encode(title),
					thirdAppDisplayName: Base64.encode("http://www.hexun.com"),
					url: Base64.encode(url)
				});
				break;
			default:
				break;
		}
	});
	return {

	}
};
/*
使用方法：
share($, ".page_share", {
	url: "网址",
	title: "新闻标题",
	desc: "新闻简介",
	img: "新闻图片",
	form: "http://www.hexun.com",
	newsid: "新闻ID",
});*/