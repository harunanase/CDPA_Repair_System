$(document).ready(function() {
	const TRANS = {
	  "zh": {
		"title": "若您的IP被人佔用，可依照下列步驟找出對方卡號",
		"cmd_win1": "按下快捷鍵 Win+R 開啟執行命令視窗 &gt; 鍵入[ cmd ] &gt; 鍵入[ nbtstat -A 您被佔用的IP ]",
		"cmd_win2": "如下圖所示(被佔用IP時會有兩張卡號，請不要抄到自己的)：",
		"ev_win1": "在開始圖示按滑鼠右鍵 &gt; 事件檢視器",
		"ev_win2": "事件檢視器 (本機) &gt; Windows 記錄 &gt; 系統",
		"ev_win3": "找「等級為錯誤」且「來源為Tcpip」的紀錄"
	  },
	  "en": {
		"title": "Retrieve the MAC address of the duplicate computer",
		"cmd_win1": "Press the Win + R keys on your keyboard. Then, type [ cmd ] and press Enter or click/tap OK.<br/>Execute the command: [ nbtstat -A IP Address ]",
		"cmd_win2": "If your computer is in the conflict state, you will see two mac addresses (One of them is yours).",
		"ev_win1": "Right-click the Start icon. Choose Event Viewer.",
		"ev_win2": "Event Viewer (Local) &gt; Windows Logs &gt; System",
		"ev_win3": "Find the Level is Error and Source is Tcpip."
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
