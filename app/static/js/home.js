// JavaScript Document
/***
	此js為搭配home.html 之使用
    1.0		190129		by imgc	
	require jquery.js
***/
const DESCRIPTION = {
	EN : '\
		<p>If you have any questions about the fix request,please contact the CDPA fb fan page</p>\
		<p>Our work time is from 19:00 to 21:00 on working days, and depending on availability of our network administrators</p>\
		<p>If you have been waited for weeks ,and never get any contact. Please inform us on our fan page first</p>\
	',
	ZH : '\
		<p>如報修上有任何問題請聯絡CDPA粉絲專頁</p>\
		<p>跑單時間常為平日晚上19:00~21:00,依網管同學空閒時間而定</p>\
		<p>若有報修數周卻未見跑單人員之情況,煩請先行聯絡粉絲專頁告知</p>\
	',
	ERR : 'lang is unexpected'
}

var pra = location.search;
var pattern = /lang=[^&#]*/i;
var lang = pattern.exec(pra);
if(lang == null){
	lang = "lang=zh";
}

if(lang == "lang=zh"){
	document.getElementById('description').innerHTML = DESCRIPTION.ZH;
}
else if (lang == "lang=en"){
	document.getElementById('description').innerHTML = DESCRIPTION.EN;
}
else{
	document.getElementById('description').innerHTML = DESCRIPTION.ERR + lang;
}


