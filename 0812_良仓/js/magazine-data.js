$(function () {
    //初始化部分
    //magazine导航链接导入
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
    //初始化结束

    //截获跳转时的url
    var str=location.search.substr(1);
    var catId=str.split('=');
    // console.log(catId[1]);
    //magazine数据搜索载入
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_goods.php",
        "type":"GET",
        "data":{
            "cat_id":catId[1]
        },
        "dataType":"json",
        "success":function (json) {
            $(json.data).each(function () {
                var dictionary={
                    "detailurl":"detail.html?cat_id="+catId[1]+"&goods_id="+$(this)[0].goods_id,
                    "imgsrc":$(this)[0].goods_thumb,
                    "par":$(this)[0].goods_name,
                    "linkback":"magazine.html?cat_id="+$(this)[0].cat_id,
                    "class":magazineClassList[$(this)[0].cat_id]
                };
                var tempHtml=$("#magStr").html().replace(/<%([a-zA-Z]+)%>/g,function (match,$1,index,str) {
                    return dictionary[$1];
                });
                $(".content").append(tempHtml);
            });
        }
    });
});