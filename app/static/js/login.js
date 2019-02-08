// JavaScript Document
/***
	原帳號密碼及form check 轉移至 account.js
	此js為搭配login.html 之使用
    1.0		190127		by imgc	
	1.1		190201		修改id 及 function化 描述注入 local化部分變數
	require jquery.js
***/
const DESCRIPTION = {
	EN : '<p>\
			Please read the <a id="link_troubleCheck" href="" target="_blank">self-checking method</a> before you apply for fix request. You need to register for the first login. The account is used to help students confirm their request.   CDPA usually work from 19:00 to 21:00 on working day. Depending on the availability of our staff, it may take one to two weeks.\
        	</p>\
		',
	ZH : '<p>\
        	報修前請先詳閱<a id="link_troubleCheck" href="" target="_blank">自我檢查方法</a>確定報修前需進行登入，首次登入需進行註冊，帳號用於協助同學確認報修單處理狀況及更新報修單，CDPA跑單時間通常為平常日19:00~21:00，視當周CDPA服務同學的工作而定，報修後可能須等待一至兩周。\
        	</p>\
		',
	ERR : 'lang is unexpected '
}

function loginPageSet(){
	var url = location.href;
	var pattern = /lang=[^&#]*/i;
	var arr = url.split('?');
	var ref = arr[0];
	var lang = null;
	if(arr.length > 1){
		lang = pattern.exec(arr[1]);
	}
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
	
	$("#link_register").attr("href", ref + "?action=Register&" + lang);
	$("#link_forget").attr("href", ref + "?action=Forget&" + lang);
	$("#link_troubleCheck").attr("href", ref + "?action=Tutorial&type=Eazy&" + lang);
}

//-----
//run
//-----
loginPageSet();

