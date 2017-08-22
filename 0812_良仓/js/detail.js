//搜索跳转页
$(function () {
    var str=location.search.substr(1);
    // console.log(str)


    var valueJson={};
    var value=str.match(/\w+=(\w+)/g);
    for(var i=0;i<value.length;i++){
        var temp=value[i].split("=");
        valueJson[temp[0]]=temp[1];
    }
    // console.log(value)
    console.log(valueJson.cat_id);

    // str.replace(/&*\w+=(\w+)/g,function (match,$1,index,str) {
    //     value.push($1);
    //     return $1;
    // });

    $("h1").html("您当前的商品类别id为："+valueJson.goods_id);
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_goods.php?goods_id="+valueJson.goods_id,
        "type":"GET",
        "success":function (json) {
            var data=json.data[0];
            $("p.dir").html(function(){
                return $(this).html()+data.goods_name;
            });
            if(data){
                localStorage.setItem("now-goods",data.goods_id);
                localStorage.setItem("cart_"+data.goods_id,data.goods_number);
                $(".result").html("");
                $(".result").append($('<img src="'+data.goods_thumb+'"/><p>'+data.goods_name+'</p><p>'
                    +data.goods_desc+'</p>' +'</p><p>价格：'+data.price+'元</p>'
                    +'</p><p>当前库存：'+data.goods_number+'</p>'));
            }else{
                $(".result").append($("<p>本次搜索无效，请重新输入</p>").css("color","red"));
            }
        }
    });

    //搜索栏
    $("input:button").click(function () {
        if($(".searchid").val()===""){
            $("p.dir").html("");
            $(".result").html("");
            $(".result").append($("<p>本次搜索没有输入值，请输入</p>").css("color","red"));
            return;
        }
        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_goods.php?goods_id="+$("input:text").val(),
            "type":"GET",
            "success":function (json) {
                var data=json.data[0];
                if(data){
                    localStorage.setItem("now-goods",data.goods_id);
                    localStorage.setItem("cart_"+data.goods_id,data.goods_number);
                    $("p.dir").html(function(){
                        return "良仓 > 女士 > "+data.goods_name;
                    });
                    $(".result").html("");
                    $(".result").append($('<img src="'+data.goods_thumb+'"/><p>'+data.goods_name+'</p><p>'
                        +data.goods_desc+'</p>' +'</p><p>价格：'+data.price+'元</p>'
                        +'</p><p>当前库存：'+data.goods_number+'</p>'));
                }else{
                    $(".result").html("");
                    $(".result").append($("<p>本次搜索无效，请重新输入</p>").css("color","red"));
                }
            }
        });



    });

    //
    $('.addit').click(function () {
        if(!localStorage.getItem("token")){
            alert("您还未登录请在跳转的页面进行登录操作！");
            location.href="login.html#callback="+location.href;
        }else{
            var num=localStorage.getItem("goods_number");
            num=num?num+1:1;
            $.ajax({
                "type":"POST",
                "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem('token'),
                "data":{
                    "goods_id":localStorage.getItem("now-goods"),
                    "goods_number":num,
                },
                "dataType":"json",
                "success":function (response) {
                    console.log(response);
                }
            })
        }
    })
});