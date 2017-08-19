$(function () {
    //截获跳转时单搜索url
    var str=location.search.substr(1);
    var catId=str.split('=');

    //magazine数据跳转
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
                $(".content").append(function(){
                    return tempHtml;
                });
            });
        }
    });
});