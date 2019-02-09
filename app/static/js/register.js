// JavaScript Document
/***
	此js為搭配register.html 之使用
    1.0		190129		by imgc	
	1.1		190201		修改id 及 function化 描述注入 local化部分變數
	2.1		190209		修改變數名稱
	require jquery.js
***/
const OurDESCRIPTION = {
	EN : '\
		<p>Please use the student number to be account.</p>\
    	<p>The mailbox is used to verify the account and may be used to receive our notice in the future.</p>\
	',
	ZH : '\
		<p>帳號請使用學號，以減少您忘記帳號風險及協助我們跑單時尋找報修同學</p>\
    	<p>註冊信箱為驗證帳號之使用，並可能用於接收我們的維護通知。</p>\
	',
	ERR : 'lang is unexpected'
}

function registerPageSet(){
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
registerPageSet();


