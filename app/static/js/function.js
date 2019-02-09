var urlParams = [];		// URL parameters
var userStats = 0;		// 0: logout, 1: login
var language = "zh";	// zh(default) | en
const ACTION = {
	None : -1,
	Repair : 0,
	RepairStatus : 1,
	BannedList : 2,
	Tutorial : 3,
	Login : 4,		//登入
	Register : 5,	//註冊
	Forget : 6,		//忘記密碼
	Home : 7,		//登入成功後首頁
	Logout : 8,
	ModifyRepair : 9,
	Constructing : 10
};
var action = ACTION.None;	// 0: Repair, 1: RepairStatus, 2: BannedList, 3: Tutorial, ...參照ACTION

const TYPE = {
	None : -1,
	Eazy : 0,
	QueryMACAddress : 1,
	QueryIPConflict : 2
};
var type = TYPE.None;		// 0: Eazy, 1: QueryMACAddress, 2: QueryIPConflict

// dictionary
//var trans = {};

/*
 * show "sign in" or "sign out"
 */
function loginOut_ShowText(userStats) {
	switch(userStats) {
		case 0:	// stats: logout
			$("#login a").attr("href", "?action=Login&lang=" + language);
			$("#login a").text(trans[language]["LOGIN"]);
			break;
		case 1:	// stats: login
			$("#login a").attr("href", "?action=Logout&lang=" + language);
			$("#login a").text(trans[language]["LOGOUT"]);
			break;
	}
}

/*
 * translate the content
 */
function translate(trans, lang) {
	var transLang = "";
	if(lang == "zh") {
		transLang = "en";
	}
	else {
		transLang = "zh";
	}
	$(document).ready(function() {
		$("#lang a").attr("href", "?lang=" + transLang);
		$("#lang a").text(trans[transLang]["LANG"]);
		loginOut_ShowText(userStats);
		$("#repair a").attr("href", "?action=Repair&lang=" + lang);
		$("#repair a").text(trans[lang]["REQUEST"]);
		$("#repairstatus a").attr("href", "?action=RepairStatus&lang=" + lang);
		$("#repairstatus a").text(trans[lang]["PROGRESS"]);
		$("#bannedlist a").attr("href", "?action=BannedList&lang=" + lang);
		$("#bannedlist a").text(trans[lang]["BLOCKLIST"]);
		$("#tutorial a").attr("href", "#");
		$("#tutorial a").text(trans[lang]["TUTORIAL"]);
		$("#eazy").attr("href", "?action=Tutorial&type=Eazy&lang=" + lang);
		$("#eazy").text(trans[lang]["TROUBLE"]);
		$("#lookupIP").attr({href:"http://www.cdpa.nsysu.edu.tw/lookUpIP.php", target:"_blank"});
		$("#lookupIP").text(trans[lang]["IPDIST"]);
		$("#queryMAC").attr("href", "?action=Tutorial&type=QueryMACAddress&lang=" + lang);
		$("#queryMAC").text(trans[lang]["MACADDR"]);
		$("#queryIPConflict").attr("href", "?action=Tutorial&type=QueryIPConflict&lang=" + lang);
		$("#queryIPConflict").text(trans[lang]["CONFLICT"]);
		$("#home a").attr("href", "?lang=" + lang);
		$("#home a").text(trans[lang]["HOME"]);
		$("#content1 p").text(trans[lang]["NOTICE1"]);
		$("#content2 p").text(trans[lang]["NOTICE2"]);
		$("#content3 p").text(trans[lang]["NOTICE3"]);
	});
}

/*
 * get URL parameters
 */
function getQueryParam(is_authenticated) {
	var url = location.search;
	var query, getParams, paramsVal;
	
	userStats = is_authenticated
	
	if(url.indexOf("?") != -1) {
		query = url.split("?")[1];
		getParams = query.split("&");
		for(i = 0; i < getParams.length; ++i) {
			paramsVal = getParams[i].split("=");
			urlParams.push(paramsVal[0]);
			urlParams[paramsVal[0]] = paramsVal[1];
			// setting flags
			if(paramsVal[0] == "lang") {
				if(paramsVal[1] == "zh") {
					language = "zh";
				}
				else {
					language = "en";
				}
			}
			else if(paramsVal[0] == "action") {
				switch(paramsVal[1]){
					case "Repair":
						action = ACTION.Repair;
						break;
					case "RepairStatus":
						action = ACTION.RepairStatus;
						break;
					case "BannedList":
						action = ACTION.BannedList;
						break;
					case "Tutorial":
						action = ACTION.Tutorial;
						break;
					case "Login":
						action = ACTION.Login;
						break;
					case "Register":
						action = ACTION.Register;
						break;
					case "Forget":
						action = ACTION.Forget;
						break;
					case "Home":
						action = ACTION.Home;
						break;
					case "Logout":
						action = ACTION.Logout;
						break;
					case "ModifyRepair":
						action = ACTION.ModifyRepair;
						break;
					case "Constructing":
						action = ACTION.Constructing;
						break;
				}
			}
			else if(paramsVal[0] == "type") {
				if(paramsVal[1] == "Eazy") {
					type = TYPE.Eazy;
				}
				else if(paramsVal[1] == "QueryMACAddress") {
					type = TYPE.QueryMACAddress;
				}
				else if(paramsVal[1] == "QueryIPConflict") {
					type = TYPE.QueryIPConflict;
				}
			}
		}
		// page loading
		switch(action) {
			case ACTION.Repair:
				$(document).ready(function() {
					$("#content").load("form.html");
				});
				break;
			case ACTION.RepairStatus:
				$(document).ready(function() {
					$("#content").load("form_status.html");
				});
				break;
			case ACTION.BannedList:
				$(document).ready(function() {
					$("#content").load("banned.html");
				});
				break;
			case ACTION.Tutorial:
				switch(type) {
					case TYPE.Eazy:
						if(language == "zh") {
							$(document).ready(function() {
								$("#content").load("trouble_shooting.html");
							});
						}
						else {
							$(document).ready(function() {
								$("#content").load("en_trouble_shooting.html");
							});
						}
						break;
					case TYPE.QueryMACAddress:
						$(document).ready(function() {
							$("#content").load("queryMAC.html");
						});
						break;
					case TYPE.QueryIPConflict:
						$(document).ready(function() {
							$("#content").load("queryIPConflict.html");
						});
						break;
				}
				break;
			case ACTION.Login:
				$(document).ready(function() {
					$("#content").load("login.html");
				});
				break;
			case ACTION.Register:
				$(document).ready(function() {
					$("#content").load("register.html");
				});
				break;
			case ACTION.Forget:
				$(document).ready(function() {
					$("#content").load("forget.html");
				});
				break;
			case ACTION.Home:
				$(document).ready(function() {
					$("#content").load("home.html");
				});
				break;
			case ACTION.Logout:
				$(document).ready(function() {
					$("#content").load("logout.html");
				});
				break;
			case ACTION.ModifyRepair:
				$(document).ready(function() {
					$("#content").load("modify_form.html");
				});
				break;
			case ACTION.Constructing:
				$(document).ready(function() {
					$("#content").load("under_construction.html");
				});
				break;
		}
	}
	return language;
}

function goTop_Check() {
	/* 按下GoTop按鈕時的事件 */
	$('#goTop a').click(function() {
		// 返回到最頂
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});
	
	/* 偵測卷軸滑動時，往下滑超過200px就讓GoTop按鈕出現 */
	$(window).scroll(function() {
		if($(this).scrollTop() > 200) {
			$('#goTop a').fadeIn();
		}
		else {
			$('#goTop a').fadeOut();
		}
	});
}


