/**
 * Created by 12465 on 2017/12/22.
 */

var channelArr = [];//产品通道
var prdouctArr = [];//产品

//共用地址

//var basUrl = "http://120.77.170.239:8082/";
// var basUrl = "http://120.77.170.239/test/background/";
var basUrl = "http://120.77.170.239/test/billingV3/background/";

//共用ajax
function basAjax(url, opt) {
    $.ajax({
        type: "get",
        dataType: "jsonp",
        url: url,
        data: opt,
        contentType:'text/html;charset=UTF-8',
        success: opt.jsonp
    });
}
var mCookie = $.AMUI.utils.cookie;
var infoStr = mCookie.get("userInfo");
var infoJson = $.parseJSON(infoStr);
$(function(){
    //页头
    console.log(infoJson);

    if(infoJson == '' || infoJson == 'undefined' || infoJson == null){

        var url = window.location.href;
        if(url.indexOf("login") < 0){
            goLogin();
        }
    }
    else{
        $(".userName").html(infoJson.account);
        $('.userNameMore').css({padding:"0 12px"});
    }

    //菜单
    //initMenu();

    //初始化请求数据条数
    //option.number = "10";

});

//退出登录
$('.exit').click(function(){
    console.log("exit");
    exit();
});

function exit(){
    mCookie.unset("userInfo",'/admin/html');
    window.location.href = "login.html";
}

//重新登录
function goLogin(num){
    console.log(num);
    if(num==333){
        notice("账号权限不足",0,1500);
    }
    else if(num==444){
        var box = $("<div class='exit-bg'><div class='exit-container'><div class='exit-info'>用户信息异常</div><a href='login.html' class='exit-btn'>重新登录</a></div></div>");
        $("body").append(box);
        $(box).fadeIn('fast');
    }

}

//function authBack(){
//
//}

function initMenu(){
    basAjax(basUrl+"userAdmin/menuBar",{jsonp:"menuBack",account:infoJson.account,token:infoJson.token});
}

function menuBack(data){
    console.log(data);
    if(data.status == 200){
        var da = data.data;
        for(var i = 0 ; i < da.length ; i ++){
            var parentMenu = da[i].parentCode;
            var chMenu = da[i].chCode;
            $(".parentMenu-"+da[i].parentCode).removeClass('parentMenuHide');
            if(chMenu != '' && chMenu != 'undefined' && chMenu != null){
                for(var j = 0 ; j < chMenu.length ; j ++){
                    $(".chMenu-"+chMenu[j]).removeClass('chMenuHide');
                }
            }
        }
        for( var k = $(".parentMenuHide").length ; k > -1  ; k -- ){
            $(".parentMenuHide").eq(k).remove();
        }
    }
}




//选择每页显示条数
function setPageSize(ob){
    option.pageNum = 1;
    option.number = $(ob).val();
    getData(option);
}


//提示框
function notice(msg,stuts,time){
    if(stuts == 1){
        stuts = 'primary';
    }
    else if(stuts == 0){
        stuts = 'danger';
    }

    var box = $("<div class='notice-bg'><div class='notice-container "+stuts+"'>"+msg+"</div></div>");

    $("body").append(box);
    $(box).fadeIn('fast');
    setTimeout(function(){$(box).fadeOut('fast')},time);
};

//加载动画

function loading(){
    $(".load-container").hide();
}


//分页
function setPage(data) {
    $("#go_page").val("");
    $("#current_page").html(option.pageNum);
    if(data.totalnum == 0){
        $("#current_page").html(0);
    }
    $("#total_page").html(Math.ceil(data.totalnum / option.number));
    $("#total_number").html(data.totalnum);
    var current_page = parseInt($("#current_page").html());
    var total_page = parseInt($("#total_page").html());
    if(current_page <= 1) {
        $("#prev,#firstPage").addClass("unClick");
    } else {
        $("#prev,#firstPage").removeClass("unClick");
    }
    if(total_page > current_page) {
        $("#next,#lastPage").removeClass("unClick");
    } else {
        $("#next,#lastPage").addClass("unClick");
    }
}

//首页
$("#firstPage").click(function() {
    if(!$(this).hasClass("unClick")) {
        option.pageNum = 1;
        getData(option);
    }
});
//上一页
$("#prev").click(function() {
    if(!$(this).hasClass("unClick")) {
        var pageNum = parseInt($("#current_page").text()) - 1;
        option.pageNum = pageNum;
        //console.log(option);
        getData(option);
    }
});

//下一页
$("#next").click(function() {
    if(!$(this).hasClass("unClick")) {
        var pageNum = parseInt($("#current_page").text()) + 1;
        option.pageNum = pageNum;
        getData(option);
    }
});
//尾页
$("#lastPage").click(function() {
    if(!$(this).hasClass("unClick")) {
        var pageNum = parseInt($("#total_page").html());
        option.pageNum = pageNum;
        getData(option);
    }
});

//跳转到指定页

$("#go_page").blur(function() {
    var go_page = parseInt($.trim($(this).val()));
    var total_page = parseInt($.trim($("#total_page").text()));
    if(go_page != "" && go_page > 0 && go_page < total_page + 1) {
        option.pageNum = go_page;
        getData(option);
    }
});


//刷新表格
function undo(){
    option = {
        jsonp:'listBack',
        pageNum:'1',
        number:'10',
        suggestStatus:"",
        account:infoJson.account,
        token:infoJson.token
    };
    getData(option);
    $('.pageSizeNum')[0].selectedIndex = 0;
    $(".pageSizeGroup").find("span").eq(1).html("10");
}

/*关闭弹窗表单*/

$(".off-btn").click(function(){
    $(".fixed-bg").hide();
    $(".info-input").val("");
});

function setNotice(obj,content,time){
    $('#'+obj).html(content).show();
    setTimeout(function(){
        $('#'+obj).hide();
    },time);
}













