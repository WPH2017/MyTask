$(function () {
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_goods.php",
        "type":"GET",
        "success":function(json){
            var html="";
            // setTimeout(function(){

            var oContainer=document.getElementsByClassName("container")[0];
            for(var i=0;i<json.data.length;i++){
                var html="<a href='javascript:void(0)'><img src="+json.data[i].goods_thumb+" alt=''><div class='detail'><p class='price'>"+json.data[i].price+"</p><p class='name'>"+json.data[i].goods_name+"</p><p class='intro'>"+json.data[i].goods_desc+"</p></div></a><div class='lable'><a href='javascript:void(0)'><img src='' alt=''><span>EON</span></a><div class='heart'><a href='javascript:void(0)'><span class='num'>1200</span></a><img src='./img/heart.png' alt=''></div></div>";
                var temp=document.createElement("div");
                temp.className="goodbox";
                temp.innerHTML=html;
                oContainer.appendChild(temp);
            }
            //3. 点星星变红，加数字
            var aHeart=document.getElementsByClassName("heart");
            for(var i=0;i<aHeart.length;i++){

                aHeart[i].onclick=function(){
                    var oNum=this.getElementsByClassName("num")[0];
                    var oImg=this.getElementsByTagName("img")[0];
                    oNum.innerHTML=parseInt(oNum.innerHTML)+1;
                    oImg.src="./img/heart_red.png";
                }
            }
            // },1000);
        }
    });


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
});