$(document).ready(function() {
	const TRANS = {
	  "zh": {
		"WIN1": "按下快捷鍵 Win+R 開啟執行命令視窗，輸入[ cmd ]後按確定",
		"WIN2": "在跳出的視窗輸入指令[ ipconfig /all ]後按Enter鍵，其中實體位址(Physical Address)便是電腦MAC位址",
		"WIN3": "在視窗標題列位置按下[ 滑鼠右鍵 ] 選 [ 編輯 &gt; 標記 ]",
		"WIN4": "請用[ 滑鼠左鍵 ] 選取要複製的範圍(會反白)，結束時請按[ 滑鼠右鍵 ](標題列會提示您狀態)"
	  },
	  "en": {
		"WIN1": "Press the Win + R keys on your keyboard. Then, type [ cmd ] and press Enter or click/tap OK.",
		"WIN2": "Execute the command: [ ipconfig /all ].<br/>The first outlines the configuration of the IP protocol on the computer.<br/>After that, each networking device appears in sequence, offering a wealth of diagnostic information including the MAC address (Physical Address).",
		"WIN3": "Right-click the title bar &gt; Click Edit &gt; Click Mark",
		"WIN4": "Highlight what you want to copy and then right-click again to copy the text"
	  }
	}
	
	// parse url and retrieve the lang part
	var url = location.search;
	var pattern = /lang=.*/i;
	var lang = pattern.exec(url);

	// The default language is Traditional chinese.
	if(lang == "lang=en") {
		lang = "en";
	}
	else{
		lang = "zh";
	}

	// Translate
	$(".trans").each(function() {
		$(this).html(TRANS[lang][$(this).attr("id")]);
	});
});
