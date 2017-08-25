$(function () {
    //截获跳转时单搜索url
    var str = location.search.substr(1);
    var catId = str.split('=');

    //magazine数据跳转
    // $.ajax({
    //     "url":"http://h6.duchengjiu.top/shop/api_goods.php",
    //     "type":"GET",
    //     "data":{
    //         "cat_id":catId[1]
    //     },
    //     "dataType":"json",
    //     "success":function (json) {
    //         $(json.data).each(function () {
    //             var dictionary={
    //                 "detailurl":"detail.html?cat_id="+catId[1]+"&goods_id="+$(this)[0].goods_id,
    //                 "imgsrc":$(this)[0].goods_thumb,
    //                 "par":$(this)[0].goods_name,
    //                 "linkback":"magazine.html?cat_id="+$(this)[0].cat_id,
    //                 "class":magazineClassList[$(this)[0].cat_id]
    //             };
    //
    //             var tempHtml=$("#magStr").html().replace(/<%([a-zA-Z]+)%>/g,function (match,$1,index,str) {
    //                 return dictionary[$1];
    //             });
    //             $(".mag-box").append(function(){
    //                 return tempHtml;
    //             });
    //         });
    //     }
    // });

    //初始化
    pageChange(1);
    //绑定跳转业务
    function pageChange(page) {
        $.ajax({
            "type": "GET",
            "url": "http://h6.duchengjiu.top/shop/api_goods.php?cat_id="+catId[1]+"page=" + page + "&pagesize=20",
            "success": function (response) {
                $('.mag-box').html('');
                $(response.data).each(function () {
                    var dictionary = {
                        "detailurl": "detail.html?cat_id=" + catId[1] + "&goods_id=" + $(this)[0].goods_id,
                        "imgsrc": $(this)[0].goods_thumb,
                        "par": $(this)[0].goods_name,
                        "linkback": "magazine.html?cat_id=" + $(this)[0].cat_id,
                        "class": magazineClassList[$(this)[0].cat_id]
                    };

                    var tempHtml = $("#magStr").html().replace(/<%([a-zA-Z]+)%>/g, function (match, $1, index, str) {
                        return dictionary[$1];
                    });
                    $(".mag-box").append(function () {
                        return tempHtml;
                    });
                });
                if (page > response.page.page_count) return alert('到达商品列表底部');
                //改变按钮的html来模拟按钮滚动
                $('.pager a').each(function (index) {
                    if(page>=5){
                        $(this).html(page+index-4);
                    }else{
                        $(this).html(index+1);
                    }
                });
                localStorage.setItem('page_number', page);
            }
        });
    }

    $('#pager-head').click(function () {
       pageChange(1);
    });
    $('#pageup').click(function () {
        var temp = 1 * localStorage.getItem("page_number");
        temp--;
        pageChange(temp);
    });

    $('#pagedown').click(function () {
        var temp = 1 * localStorage.getItem("page_number");
        temp++;
        if (temp < 0) {
            temp = 0;
        }
        pageChange(temp);
    });

    $('.pager a').click(function () {
        pageChange(1 * $(this).html());
    });

    $('#pager-confirm').click(function () {
        pageChange(1 * $('.pager input').val());
    });
});