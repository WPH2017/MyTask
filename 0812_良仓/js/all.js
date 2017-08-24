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

//3. 数据初始化
var magazineClassList={};//用于生成类别名称和id的映射字典
//3.magzine类别字典生成
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

//3.2share链接导入
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

//4.1 检测登录状态，如登录了则设置退出登录的跳转
if(localStorage.getItem("token")){
    var loginbar=$('.login');
    loginbar.html("<a href='#'>"+ localStorage.getItem("username") +"</a>&nbsp;&nbsp;<a href='#' class='cancle'>退出登录</a>");
    $('.cancle').click(function(){
       localStorage.clear();
       loginbar.html("<a href=\"./mobilelogin.html\">登录 </a>&nbsp;&nbsp;<a href=\"register.html\">注册</a>");
       location.reload();
    });
}

//4.2 导入购物车信息
$.ajax({
    "type":"GET",
    "url":"http://h6.duchengjiu.top/shop/api_cart.php",
    "data":{
        "token":localStorage.getItem("token")
    },
    "success":function (response) {
        var json=response.data;
        var html='';
        if(response.code!==0){
            $('.card-cart').html('你的购物车暂时没有商品...');
            $('.card2').html('快去抢购良仓商品吧！');
            $('.card2').parent().attr('href','javascript:');
            return;
        }
        $('.card2').html('查看我的购物车');
        $('.card2').parent().attr('href','cart.html');
        for(var i=0;i<json.length;i++){
            data=json[i];
            html+=`
            <div class="card-cart-item" data-id="${data.goods_id}">
                <a href="detail.html?id=${data.goods_id}"><img src="${data.goods_thumb}" alt=""></a>
                <a href="detail.html?id=${data.goods_id}">${data.goods_name}</a><br>
                数量：${data.goods_number}件<span class="card-amount">￥${data.goods_number*data.goods_price}</span>
            </div>
        `;
        }
        $('.card-cart').append(html);
    }
});