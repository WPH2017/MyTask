//1. 轮播图
var carousel=$('.carousel');
var imgbox=$('.imgbox');
var pick=$('.pick');
var lis=$('li',pick);
var lbtn=$(".left-arrow");
var rbtn=$(".right-arrow");
var img=$('img',imgbox);
var index=0;

imgbox.append(img.eq(0).clone());

var timer = setInterval(function () {
    index++;
    if(index>8){
        index=0;
    }
    move(index);
},1000);

carousel.mouseenter(function () {
    clearInterval(timer);
});
carousel.mouseleave(function () {
   timer=setInterval(function () {
       index++;
       if(index>9){
           index=0;
       }
       move(index);
   },1000);
});

lbtn.click(function () {
    if(imgbox.is(':animated')) return;
    index--;
    if(index<0){
        index=img.length;
    }
    move(index);
});
rbtn.click(function () {
    if(imgbox.is(':animated')) return;
    index++;
    if(index>img.length){
        index=0;
    }
    move(index);
});

lis.click(function () {
    index=$(this).index();
    move(index);
});

function move(i) {
    lis.eq(i).addClass("main").siblings().removeClass();
    if(i>8){
        imgbox.css({"left":-img.eq(0).position().left});
        return;
    }
    imgbox.animate({"left":-img.eq(i).position().left},500);
}


// 闭包形式传参
// setInterval(timer(index),1000);
//
// function timer(i) {
//     function setMove() {
//         i++;
//         move(i)
//     }
//     return setMove;
// }



//2. 搜索
var search=$('#search input');
var searchbox=$('.searchbox');
searchbox.mouseenter(function () {
    search.parent().animate({"right":0,"border-bottom-color":"#292f34"},300);
});
searchbox.mouseleave(function () {
    search.parent().animate({"right":-220,"border-bottom-color":"transparent"},300);
});

search.focus(function () {
    search.parent().css({
        "right":0,
        "border-bottom-color": "#292f34"
    });
});
search.blur(function () {
    search.parent().css({
        "right":-220,
        "border-bottom-color": "transparent"
    });
});


search.change(function (){
    var text=search.val();
   $.ajax({
      "type":"GET",
       "url":"http://h6.duchengjiu.top/shop/api_goods.php",
       "data":{
          "search_text":text,
       },
       "success":function(response){
          if(response.code===0){
              search.css("box-shadow","inset 0 0 0 2px green");
              alert(response.data.message+",开始跳转");
              location='detail.html?id='+response.data.goods_id+"&goods_id="+response.data.cat_id;
          }else{
              alert(response.data.message+",请重新输入~");
              search.css("box-shadow","inset 0 0 0 2px red");
          }
       }
   });
});

//3. 主体数据导入
$('.loading').css("display","block");
$.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_goods.php",
    "type":"GET",
    "success":function(json){
        $('.loading').css("display","none");
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