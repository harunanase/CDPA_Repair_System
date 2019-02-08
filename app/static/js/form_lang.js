/*
	2019/1/31 chia-chih updated.
	A jQuery script to switch language.
*/
//use dictionary to switch language between english and chinese
var arrLang = {
    "en": {
        "DORM": "Dorm",
        "ROOMNO": "Room Number",
		"BEDNO": "Bed Number",
		"IP": "IP address",
		"MAC": "MAC address",
		"PROBLEM": "Please describe the problem in detail.", 
		"VILLAGE1": "Village 1",
		"VILLAGE2": "Village 2",
		"VILLAGE3": "Village 3",
		"VILLAGE4": "Village 4",
		"INTERNATIONAL": "International Dorm"
    },
    "zh": {
        "DORM": "宿舍棟別",
        "ROOMNO": "房號",
		"BEDNO": "床號",
		"IP": "IP 位址",
		"MAC": "MAC 位址",
		"PROBLEM": "問題描述", 
		"VILLAGE1": "武一",
		"VILLAGE2": "武二",
		"VILLAGE3": "武三",
		"VILLAGE4": "武四",
		"INTERNATIONAL": "國際村"
    }
};  

$(document).ready(function() {
	//parse url and retrieve the lang part
	var url = location.search;
	var pattern = /lang=.*/i;
	var lang = pattern.exec(url);

	// The default language is Traditional chinese.
	if(lang == "lang=en"){
		lang = "en";
	} else{
		lang = "zh";
	}

	//Translating
	$(".lang").each(function(){
		$(this).text(arrLang[lang][$(this).attr("key")]);
	});

});
  
