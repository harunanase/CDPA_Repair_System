// JavaScript Document
/***
    1.0		190121		by imgc	
	2.0		190127		修改規範 增加規範(學號原則
			190127		rename file 為 account.js
	2.1		190128		fix pattern bug
	2.2		190130		追加英文訊息
	2.3		190209		修改變數名稱
	require jquery.js & md5.js 請事先引用
	require sha256.min.js 請事先引用
***/

//----
//define
//----
const OurACCOUNT = {	//帳號限制
	MIN : 4,	//最小長度(字元
	MAX : 24,	//最大長度(字元
	PATTERN : /^[A-Z][0-9]+$/,	//規範
};

const OurMAIL = {	//郵件限制
	MIN : 0,	//最小長度(字元
	MAX : 128,	//最大長度(字元
	PATTERN : /^[0-9a-zA-Z\.]+@[0-9a-zA-Z\.]+$/,	//規範
};

const OurPASSWORD = {	// 密碼限制
	MIN : 4,	//最小長度(字元
	MAX : 24,	//最大長度(字元
	PATTERN :　/^[0-9a-zA-Z]+$/,	//規範
};

const OurINFO = {	//訊息文本
	EN : {	//英
		HINT : {//提示訊息
			waitForMail : "You may receive our verification letter in a few minutes."
		},
		ERR : {//錯誤訊息
			//不合法輸入
			accountLength : "the length of account should be " + OurACCOUNT.MIN + "~" + OurACCOUNT.MAX ,
			accountContain : "account should be a student ID ( first letter capitalized ). Example: B012345678",
			
			mailLength : "the length of mailbox address should be " + OurMAIL.MIN + "~" + OurMAIL.MAX ,
			mailContain : "mail address is incorrect. example: user@mail.com",
						
			passwordLength : "the length of password should be " + OurPASSWORD.MIN + "~" + OurPASSWORD.MAX ,
			passwordContain : "password only contain 0-9,a-z or A-Z ",
			passwordDoubleCheck : "password and verify must be same"
		}
	},
	ZH : {	//中
		HINT : {//提示訊息
			waitForMail : "已提交!! 您可能於數分鐘後收到我們的驗證信件"
		},
		ERR : {//錯誤訊息
			//不合法輸入
			accountLength : "帳號長度錯誤 " + OurACCOUNT.MIN + "~" + OurACCOUNT.MAX + "字",
			accountContain : "account should be a student ID ( first letter capitalized ). Example: B012345678",
			
			mailLength : "郵件長度錯誤 " + OurMAIL.MIN + "~" + OurMAIL.MAX + "字",
			mailContain : "mail address is incorrect. example: user@mail.com",
						
			passwordLength : "密碼長度錯誤 " + OurPASSWORD.MIN + "~" + OurPASSWORD.MAX + "字",
			passwordContain : "password only contain 0-9,a-z or A-Z ",
			passwordDoubleCheck : "password and verify must be same"
		}
	}
};

//----
//var
//----

var info = OurINFO.ZH;	//輸出提示之來源
var howToHash = {	//hash function control option
	method : {
		md5 : "md5",
		sha256 : "sha256"
	},
	cur : "sha256"
};

//----
//func
//----

function hash(x){
	//雜湊手段 +-保障密碼隱私
	switch(howToHash.cur){
		case howToHash.method.md5:
			return $.md5(x);
		case howToHash.method.sha256:
			return sha256(x);
		default:
			alert('err : function hash(x)');
			return x;
	}
}

function setFormLang(){//確認表格語系 
	var pattern = /lang=[^&#]*/i;
	var lang = pattern.exec(location.search);
	if (lang == "lang=en"){//判斷語言
		info = OurINFO.EN;
	}
	else{
		info = OurINFO.ZH;
	}
}

var CHECK = {//字串檢測
	message : "",	//暫存欲輸出之錯誤提示
	ACCOUNT : function(string){
		//帳號檢測
		this.message = "";
		if(string.length < OurACCOUNT.MIN || string.length > OurACCOUNT.MAX){
			this.message = info.ERR.accountLength;
			return false;
		}
		if(!OurACCOUNT.PATTERN.test(string)){
			this.message = info.ERR.accountContain;
			return false;
		}
		return true;
	},
	MAIL : function(string){
		//郵件檢測
		this.message = "";
		if(string.length < OurMAIL.MIN || string.length > OurMAIL.MAX){
			this.message = info.ERR.mailLength;
			return false;
		}
		if(!OurMAIL.PATTERN.test(string)){
			this.message = info.ERR.mailContain;
			return false;
		}
		return true;
	},
	PASSWORD : function(string){
		//密碼檢測
		this.message = "";
		if(string.length < OurPASSWORD.MIN || string.length > OurPASSWORD.MAX){
			this.message = info.ERR.passwordLength;
			return false;
		}
		if(!OurPASSWORD.PATTERN.test(string)){
			this.message = info.ERR.passwordContain;
			return false;
		}
		return true;
	}
};

function checkForm(opt, form){
	//確認表單輸入合法性
	switch(opt){
		case "login":
			return checkForm_login(form);
		break;
		case "register":
		case "forget":
			return checkForm_reg(form);
		default:
			alert("checkForm(): unexpect opt");
			return false;
	}
	
}

function submitForm(opt, form){
	switch(opt){
		case "login":
			if (checkForm_login(form)){// hash password
				form.elements.namedItem('password').value = hash(form.elements.namedItem('password').value);
				return true;
			}
			return false;
		break;
		case "register":
		case "forget":
			if (checkForm_reg(form)){// hash password & clear verify value
				form.elements.namedItem('password').value = hash(form.elements.namedItem('password').value);
				form.elements.namedItem('verify').value = "";
				//alert(info.hint.waitForMail);
				return true;
			}
			return false;
		default:
		alert("submitForm(): unexpect opt");
	}
	return false;
}

function checkForm_login(form){
	//check form for login page
	if(!CHECK.ACCOUNT(form.elements.namedItem('account').value)){
		//document.getElementById('info').innerHTML = CHECK.message;
		return false;
	}
	if(!CHECK.PASSWORD(form.elements.namedItem('password').value)){
		//document.getElementById('info').innerHTML = CHECK.message;
		return false;
	}
	document.getElementById('info').innerHTML = "&nbsp;";
	return true;
}

function checkForm_reg(form){
	//check form for register page
	if(!CHECK.ACCOUNT(form.elements.namedItem('account').value)){
		document.getElementById('info').innerHTML = CHECK.message;
		return false;
	}
	if(!CHECK.MAIL(form.elements.namedItem('mailbox').value)){
		document.getElementById('info').innerHTML = CHECK.message;
		return false;
	}
	if(!CHECK.PASSWORD(form.elements.namedItem('password').value)){
		document.getElementById('info').innerHTML = CHECK.message;
		return false;
	}
	if(form.elements.namedItem('password').value != form.elements.namedItem('verify').value){// double check
		document.getElementById('info').innerHTML = info.ERR.passwordDoubleCheck;
		return false;
	}
	document.getElementById('info').innerHTML = "&nbsp;";
	return true;
}


//-----
//run
//-----
setFormLang();

