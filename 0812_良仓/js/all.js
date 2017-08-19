//1. 回到顶部
$("#backBtn").click(function () {
    $('body').animate({scrollTop:0},300);
});

//2. 吸顶效果
var temp=$('.header-box');
var beforeScrollTop=0;
var delta=-1;
$(window).scroll(function () {
    //是否在需要吸顶范围
    var afterScrollTop = $(window).scrollTop();
    if($(window).scrollTop()<140){
        $("#backBtn").css("opacity",0);
        return ;
    }else{
        $("#backBtn").css("opacity",1);
    }
    //是否保持同一方向滚动
    if(delta*(afterScrollTop - beforeScrollTop)>0)
        return beforeScrollTop=afterScrollTop;

    //如果不同，开始计算新的方向，并做出反应
    delta = afterScrollTop - beforeScrollTop;
    if(delta>=0){
        temp.stop(true);
        temp.animate({top:-57},300);
    }else{
        temp.stop(true);
        temp.animate({top:0},300);
    }

});

//3. 数据初始化部分
var magazineClassList={};//用于生成类别名称和id的映射字典

$.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_cat.php",
    "type":"GET",
    "success":function (json) {
        $(json.data).each(function () {
            var name=$(this)[0].cat_name;
            var tid=$(this)[0].cat_id;
            $(".subbox",$("#magazine")).append(function(){
                return '<a href="magazine.html?cat_id='+tid+'">'+name+'</a>';
            });
            //将类别名称存入类别id中
            magazineClassList[$(this)[0].cat_id]=$(this)[0].cat_name;
        });
    }
});

//share链接导入
$.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_cat.php",
    "type":"GET",
    "success":function (json) {
        $(json.data).each(function () {
            var name=$(this)[0].cat_name;
            var tid=$(this)[0].cat_id;
            $(".subbox",$("#share")).append(function(){
                return '<a href="share.html?cat_id='+tid +'">'+name+'</a>';
            });
        });
    }
});

//magazine类别导航链接导入
$.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_cat.php",
    "type":"GET",
    "success":function (json) {
        $(json.data).each(function () {
            var name=$(this)[0].cat_name;
            var tid=$(this)[0].cat_id;
            $(".nav",$(".content")).append('<li><a href="magazine.html?cat_id='+tid+'">'+name+'</a></li>');
        });
    }
});