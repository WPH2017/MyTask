$(function () {
    //1. 轮播图
    var carouselIt=function () {
        var carousel=$('.carousel');
        var imgbox=$('.imgbox');
        var pick=$('.pick');
        var lis=$('li',pick);
        var lbtn=$(".left-arrow");
        var rbtn=$(".right-arrow");
        var img=$('img',imgbox);
        var imgIndex=0;//当前图片下标

        imgbox.append(img.eq(0).clone());
        img=$('img',imgbox);

        var timer = setInterval(function () {
            imgIndex++;
            if(imgIndex>8){
                imgIndex=1;
            }
            move(imgIndex);
        },3000);

        //移入停止，移出开始
        carousel.mouseenter(function () {
            clearInterval(timer);
        });
        carousel.mouseleave(function () {
            timer=setInterval(function () {
                imgIndex++;
                if(imgIndex>8){
                    imgIndex=1;
                }
                move(imgIndex);
            },3000);
        });

        //绑定按钮
        lbtn.click(function () {
            if(imgbox.is(':animated')) return;
            imgIndex--;
            if(imgIndex<0){
                imgIndex=-1;
                imgIndex=move(imgIndex);
                return;
            }
            move(imgIndex);
        });
        rbtn.click(function () {
            if(imgbox.is(':animated')) return;
            imgIndex++;
            if(imgIndex>8){
                imgIndex=1;
            }
            move(imgIndex);
        });

        //绑定轮播指示按钮
        lis.click(function () {
            imgIndex=$(this).index();
            if(imgbox==0){}
            move(imgIndex);
        });

        //轮播业务
        function move(i) {
            if(i==-1){
                imgbox.animate({"left":-img.eq(8).position().left},0);
                imgbox.animate({"left":-img.eq(7).position().left},500);
                lis.eq(7).addClass("main").siblings().removeClass();
                return 7;
            }
            if(i==8){
                imgbox.animate({"left":-img.eq(i).position().left},500);
                imgbox.animate({"left":-img.eq(0).position().left},0);
                lis.eq(0).addClass("main").siblings().removeClass();
                return;
            }
            lis.eq(i).addClass("main").siblings().removeClass();
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
    };
    carouselIt();

//3. 主体数据导入
    $('.loading').css("display","block");
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=21",
        "type":"GET",
        "success":function(json){
            // console.log(json)
            $('.loading').css("display","none");
            var html="";
            // setTimeout(function(){
            //写入数据
            var oContainer=document.getElementsByClassName("container")[0];
            for(var i=0;i<json.data.length;i++){
                var html="<a href='detail.html?cat_id="+json.data[i].cat_id+"&goods_id="+json.data[i].goods_id+"'><img src="+json.data[i].goods_thumb+" alt=''><div class='detail'><p class='price'>"+json.data[i].price+"</p><p class='name'>"+json.data[i].goods_name+"</p><p class='intro'>"+json.data[i].goods_desc+"</p></div></a><div class='lable'><a href='javascript:void(0)'><img src='' alt=''><span>EON</span></a><div class='heart'><a href='javascript:void(0)'><span class='num'>1200</span></a><img src='./img/heart.png' alt=''></div></div>";
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
});