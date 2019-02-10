// JavaScript Document
/***
	此js為搭配forget.html 之使用
    1.0		190129		by imgc	
	1.1		190201		修改id 及 function化 描述注入 local化部分變數
	2.1		190209		修改變數名稱
	require jquery.js
***/
const OurDESCRIPTION = {
	EN : '\
		<p>Re-registering your new password. The account and email address you use should be the same as the original one.</p>\
	',
	ZH : '\
		<p>此處將協助您重新註冊新密碼，您所使用的帳號與信箱應與原始帳號相同</p>\
	',
	ERR : 'lang is unexpected'
}

function forgetPageSet(){
	var pra = location.search;
	var pattern = /lang=[^&#]*/i;
	var lang = pattern.exec(pra);
	if(lang == null){
		lang = "lang=zh";
	}
	
	if(lang == "lang=zh"){
		document.getElementById('description').innerHTML = OurDESCRIPTION.ZH;
	}
	else if (lang == "lang=en"){
		document.getElementById('description').innerHTML = OurDESCRIPTION.EN;
	}
	else{
		document.getElementById('description').innerHTML = OurDESCRIPTION.ERR + lang;
	}
}

//-----
//run
//-----
forgetPageSet();
