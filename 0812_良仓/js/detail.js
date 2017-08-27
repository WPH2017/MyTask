//商品详情页
$(function () {
    //1. 获取当前url中的cat_id和goods_id
    var str=location.search.substr(1);
    var valueJson={};
    var valueArr=str.match(/\w+=(\w+)/g);
    for(var i=0;i<valueArr.length;i++){
        var temp=valueArr[i].split("=");
        //每一个键名存入json，每一个键值存入键中
        //结果格式：{cat_id:69,goods_id:256718}
        valueJson[temp[0]]=temp[1];
    }

    //数组处理的方法
    // str.replace(/&*\w+=(\w+)/g,function (match,$1,index,str) {
    //     value.push($1);
    //     return $1;
    // });

    //首先，查找商品详情
    //查到后查询购物车信息
    //查到购物信息后绑定添加事件
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_goods.php?goods_id="+valueJson.goods_id,
        "type":"GET",
        "success":function (response) {
            var data=response.data[0];
            //修改当前所在的目录
            $("p.dir").html(function(){
                var html="<a href='index.html'>良仓</a> > <a href='magazine.html?cat_id="+valueJson.cat_id+"'>"+JSON.parse(localStorage.getItem("magazineClassList"))[valueJson.cat_id]+"</a> > "+ data.goods_name;
                return html;
            });

            $(".result").html("");
            $(".result").append($('<img src="'+data.goods_thumb+'"/><p>'+data.goods_name+'</p><p>'
                +data.goods_desc+'</p>' +'</p><p>价格：'+data.price+'元</p>'
                +'</p><p>数量：</p>'));

            //保存当前处理的商品
            localStorage.setItem("now_goods",data.goods_id);

            //查到商品详情后，从购物车api中读取该商品的已选数量
            $.ajax({
                "type": "GET",
                "url": "http://h6.duchengjiu.top/shop/api_cart.php",
                "data": {
                    "token": localStorage.getItem("token")
                },
                "success":function (response) {
                    var data=response.data;
                    localStorage.setItem('goods_number',0);
                    for(var i=0;i<data.length;i++){
                        if(data[i]['goods_id']===localStorage.getItem('now_goods')){
                            localStorage.setItem('goods_number',data[i]['goods_number']);
                            break;
                        }
                    }

                    //查到购物车中该商品信息之后，再绑定添加到购物车
                    $('.addit').click(function () {
                        if(!localStorage.getItem("token")){
                            alert("您还未登录请在跳转的页面进行登录操作！");
                            location.href="login.html#callback="+location.href;
                            return;
                        }
                        //提交购物信息
                        var num=1*localStorage.getItem('goods_number')+1;
                        $.ajax({
                            "type":"POST",
                            "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem('token'),
                            "data":{
                                "goods_id":localStorage.getItem("now_goods"),
                                "number":num,
                            },
                            "success":function (response) {
                                localStorage.setItem('goods_number',num)
                            }
                        })
                    })
                }
            });
        }
    });
    //搜索栏
    // $("input:button").click(function () {
    //     if($(".searchid").val()===""){
    //         $("p.dir").html("");
    //         $(".result").html("");
    //         $(".result").append($("<p>本次搜索没有输入值，请输入</p>").css("color","red"));
    //         return;
    //     }
    //     $.ajax({
    //         "url":"http://h6.duchengjiu.top/shop/api_goods.php?goods_id="+$("input:text").val(),
    //         "type":"GET",
    //         "success":function (json) {
    //             var data=json.data[0];
    //             if(data){
    //                 localStorage.setItem("now-goods",data.goods_id);
    //                 localStorage.setItem("cart_"+data.goods_id,data.goods_number);
    //                 $("p.dir").html(function(){
    //                     return "良仓 > 女士 > "+data.goods_name;
    //                 });
    //                 $(".result").html("");
    //                 $(".result").append($('<img src="'+data.goods_thumb+'"/><p>'+data.goods_name+'</p><p>'
    //                     +data.goods_desc+'</p>' +'</p><p>价格：'+data.price+'元</p>'
    //                     +'</p><p>当前库存：'+data.goods_number+'</p>'));
    //             }else{
    //                 $(".result").html("");
    //                 $(".result").append($("<p>本次搜索无效，请重新输入</p>").css("color","red"));
    //             }
    //         }
    //     });
    //
    //
    //
    // });
});