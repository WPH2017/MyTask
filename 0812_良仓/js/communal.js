$(function(){
    //1. 回到顶部
    var backTopIt=function () {
        $("#backBtn").click(function () {
            $('body').animate({scrollTop:0},300);
        });
    };
    backTopIt();

    //2. 吸顶效果
    var ceilingIt=function () {
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
    };
    ceilingIt();

    //3. 搜索
    var searchIt=function () {
        var search=$('#search input');
        var searchbox=$('.searchbox');

        //移入移出显隐逻辑
        var showORhide= function () {
            function show(color="#ddd") {
                search.parent().stop(true);
                search.parent().css({"border-bottom-color":color}).animate({"right":0},300);
            }
            function hide() {
                search.parent().stop(true);
                search.parent().css({"border-bottom-color":"transparent"}).animate({"right":-220},300);
            }
            searchbox.mouseleave(function () {
                if(search.is(':focus')){
                    return;
                };
                hide();
            });
            searchbox.mouseenter(function () {
                show();
            });
            search.focus(function (event) {
                show("#292f34");
                // event.preventDefault();

            });
            search.blur(function () {
                hide();
            });
            search.keypress(function (event) {
                if(event.keyCode==13){
                    var text=search.val();
                    if(!text) return;
                    search.trigger("searchTextInput");
                };
                // search.keypress(null);
            });
        };
        showORhide();

        search.bind("searchTextInput",function (){
            var text=search.val();
            $.ajax({
                "type":"GET",
                "url":"http://h6.duchengjiu.top/shop/api_goods.php",
                "data":{
                    "search_text":text,
                },
                "success":function(response){
                    console.log(response);
                    if(response.code===0){
                        search.css("box-shadow","inset 0 0 0 2px green");
                        alert(response.message+",开始跳转");
                        // location='detail.html?id='+response.data.goods_id+"&goods_id="+response.data.cat_id;
                    }else{
                        alert(response.message+",请重新输入~");
                        search.css("box-shadow","inset 0 0 1x 1px red");
                    }
                }
            });
        });
    };
    searchIt();

//4. 数据初始化
    var dataInit=function () {
//4.1 magazine类别导航链接导入
        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_cat.php",
            "type":"GET",
            "success":function (json) {
                $(json.data).each(function () {
                    var name=$(this)[0].cat_name;
                    var tid=$(this)[0].cat_id;
                    $("#magazine .subbox").append('<a href="magazine.html?cat_id='+tid +'">'+name+'</a>');
                });
            }
        });
//4.2 share类别导航链接导入
        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_cat.php",
            "type":"GET",
            "success":function (json) {
                $(json.data).each(function () {
                    var name=$(this)[0].cat_name;
                    var tid=$(this)[0].cat_id;
                    $("#share .subbox").append('<a href="share.html?cat_id='+tid +'">'+name+'</a>');
                });
            }
        });
    };
    dataInit();


//5.1 检测登录状态，如登录了则设置退出登录的跳转
    var loginIt=function () {
        if(localStorage.getItem("token")){
            var loginbar=$('.login');
            loginbar.html("<a href='javascript:'>"+ localStorage.getItem("username") +"</a>&nbsp;&nbsp;<a href='javascript:' class='cancle'>退出登录</a>");
            $('.cancle').click(function(){
                localStorage.clear();
                loginbar.html("<a href=\"./mobilelogin.html\">登录 </a>&nbsp;&nbsp;<a href=\"register.html\">注册</a>");
                location.reload();
            });
        }
    };
    loginIt();

//5.2 导入购物车信息
    var cartCheckIt=function () {
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
                    $('.card2').parent().attr('href','index.html');
                    return;
                }
                $('.card2').html('查看我的购物车');
                $('.card2').parent().attr('href','cart.html');
                $('.cart-list>a').html(function(){
                    return '<em>'+json.length+'</em> '+$(this).html();
                });
                $('.cart-list>a em').css({'color':'blue','font-size':'16px','font-style':'normal'});
                for(var i=0;i<json.length;i++){
                    //! 此处应该加入购物车显示数量的限制
                    data=json[i];
                    html+=`
            <div class="card-cart-item" data-id="${data.goods_id}">
                <a href="detail.html?cat_id=${data.cat_id}&goods_id=${data.goods_id}"><img src="${data.goods_thumb}" alt=""></a>
                <p><a href="detail.html?cat_id=${data.cat_id}&goods_id=${data.goods_id}">${data.goods_name}</a></p>
                数量：${data.goods_number}件<span class="card-amount">￥${data.goods_number*data.goods_price}</span>
            </div>
        `;
                }
                $('.card-cart').append(html);
            }
        });
    };
    cartCheckIt();

    function appendStrItem(parent,string) {

    }
});