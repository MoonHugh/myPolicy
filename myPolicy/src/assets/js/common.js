/**
 * Created by Administrator on 2017/8/24.
 */
import Vue from 'vue'

let ajaxPath = {
	// 全部接口请求地址前缀
	devProductUrl: "/wxweb/my/policy/",
	devProductUrl2: "/wxweb/my/claim/",

	//设置cookie
	setCookie (c_name,value,expiredays) {
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	},

	//获取cookie
	getCookie (c_name) {
		if (document.cookie.length>0) {
			let c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1) {
				c_start=c_start + c_name.length+1
				let c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
			}
		}
		return ""
	},

	//判断对象是否为空
	isEmptyObject(e) {
		var t;
		for (t in e)
			return true;
		return false;
	},

	bus : new Vue(),
};

export { ajaxPath };

