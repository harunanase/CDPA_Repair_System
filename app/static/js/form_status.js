$(document).ready(function()
{
    //用來決定一開始radio 的預設值 (未測試)
    //前後端測試時刪除1;並移除 {{status}} 註解
    var form_status = 1;//{{status}} ;
    if(form_status == "開啟中"){
        $("#open").prop("checked", true);
    }else if(form_status == "處理中"){
        $("#processing").prop("checked", true);
    }else{
        $("#closed").prop("checked", true);
    }
    
    //當網管在回覆點選其他則顯示text box，否則隱藏
    $("#add_placeholder").change(function() {
        if($(this).val() == "other") {
            $("#reply_section").show();
        }
        else {
            $("#reply_section").hide();
        }
	});
    $("#reply_section").hide();
    //
});