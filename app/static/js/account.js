// JavaScript Document
/***
    1.0		190121		by imgc	
	2.0		190127		修改規範 增加規範(學號原則
			190127		rename file 為 account.js
	2.1		190128		fix pattern bug
	2.2		190130		追加英文訊息
	require jquery.js & md5.js 請事先引用
***/

//----
//define
//----
const ACCOUNT = {	//帳號限制
	MIN : 4,	//最小長度(字元
	MAX : 24,	//最大長度(字元
	PATTERN : /^[A-Z][0-9]+$/,	//規範
};

const MAIL = {	//郵件限制
	MIN : 0,	//最小長度(字元
	MAX : 128,	//最大長度(字元
	PATTERN : /^[0-9a-zA-Z\.]+@[0-9a-zA-Z\.]+$/,	//規範
};

const PASSWORD = {	// 密碼限制
	MIN : 4,	//最小長度(字元
	MAX : 24,	//最大長度(字元
	PATTERN :　/^[0-9a-zA-Z]+$/,	//規範
};

const INFO = {	//訊息文本
	EN : {	//英
		HINT : {//提示訊息
			waitForMail : "You may receive our verification letter in a few minutes."
		},
		ERR : {//錯誤訊息
			//不合法輸入
			accountLength : "the length of account should be " + ACCOUNT.MIN + "~" + ACCOUNT.MAX ,
			accountContain : "account should be a student ID ( first letter capitalized ). Example: B012345678",
			
			mailLength : "the length of mailbox address should be " + MAIL.MIN + "~" + MAIL.MAX ,
			mailContain : "mail address is incorrect. example: user@mail.com",
						
			passwordLength : "the length of password should be " + PASSWORD.MIN + "~" + PASSWORD.MAX ,
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
			accountLength : "帳號長度錯誤 " + ACCOUNT.MIN + "~" + ACCOUNT.MAX + "字",
			accountContain : "account should be a student ID ( first letter capitalized ). Example: B012345678",
			
			mailLength : "郵件長度錯誤 " + MAIL.MIN + "~" + MAIL.MAX + "字",
			mailContain : "mail address is incorrect. example: user@mail.com",
						
			passwordLength : "密碼長度錯誤 " + PASSWORD.MIN + "~" + PASSWORD.MAX + "字",
			passwordContain : "password only contain 0-9,a-z or A-Z ",
			passwordDoubleCheck : "password and verify must be same"
		}
	}
};

//----
//var
//----

var info = INFO.ZH;	//輸出提示之來源

//----
//func
//----

function hash(x){
	//雜湊手段 +-保障密碼隱私
	return $.md5(x);
}

function setFormLang(){//確認表格語系 
	var pattern = /lang=[^&#]*/i;
	var lang = pattern.exec(location.search);
	if (lang == "lang=en"){//判斷語言
		info = INFO.EN;
	}
	else{
		info = INFO.ZH;
	}
}

var CHECK = {//字串檢測
	message : "",	//暫存欲輸出之錯誤提示
	ACCOUNT : function(string){
		//帳號檢測
		this.message = "";
		if(string.length < ACCOUNT.MIN || string.length > ACCOUNT.MAX){
			this.message = info.ERR.accountLength;
			return false;
		}
		if(!ACCOUNT.PATTERN.test(string)){
			this.message = info.ERR.accountContain;
			return false;
		}
		return true;
	},
	MAIL : function(string){
		//郵件檢測
		this.message = "";
		if(string.length < MAIL.MIN || string.length > MAIL.MAX){
			this.message = info.ERR.mailLength;
			return false;
		}
		if(!MAIL.PATTERN.test(string)){
			this.message = info.ERR.mailContain;
			return false;
		}
		return true;
	},
	PASSWORD : function(string){
		//密碼檢測
		this.message = "";
		if(string.length < PASSWORD.MIN || string.length > PASSWORD.MAX){
			this.message = info.ERR.passwordLength;
			return false;
		}
		if(!PASSWORD.PATTERN.test(string)){
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

