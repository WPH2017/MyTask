window.onload=function(){
    //1. 箭头转动
    var oArrow=document.getElementById("arrow");
    var oParArrow=document.getElementById("arrow-big"); 
    
    var oParArrow1=oArrow.parentNode;//这个会直接找到外层a标签，跳过li
    console.log(oParArrow1);
    
    oParArrow.onmouseover=function(){
        oArrow.style.transform="rotate(180deg)";
        oArrow.style.transition="all 0.3s";
    }
    oParArrow.onmouseout=function(){
        oArrow.style.transform="rotate(0deg)";
        oArrow.style.transition="all 0.3s";
    }

    //2. 轮播图
    var oCircleBox=document.getElementById("circle-box");
    var aImg=oCircleBox.getElementsByTagName("a");
    console.log(aImg);
    var oCircle=document.getElementById("circle");
    var aCircleLis=oCircle.getElementsByTagName("li");
    var index=0;
    var x=0;

    setInterval(change,3000);

    for(var i=0;i<aCircleLis.length;i++){
        aCircleLis[i].index=i;
        aCircleLis[i].onclick=function(){
             for(var j=0;j<aImg.length;j++){
                aCircleLis[j].style.backgroundColor="#999";
                }
            this.style.backgroundColor="#fff";
            x=0;
            x=-aImg[this.index].offsetLeft;
            index=this.index;
            oCircleBox.style.left=x+"px";
        }
    }

    function change(){
        index++;
        if(index>4){
            index=0;
            x=-aImg[0].offsetLeft;
        }
        x=-aImg[index].offsetLeft;
        for(var i=0;i<aImg.length;i++){
            aCircleLis[i].style.backgroundColor="#999";
        }
        aCircleLis[index].style.backgroundColor="#fff";
        oCircleBox.style.left=x+"px";
    }
    
    //3. 两个tab切换
    var oD3=document.getElementsByClassName("detail3")[0];
    var oD4=document.getElementsByClassName("detail4")[0];
    var oPick1=oD3.getElementsByClassName("pick")[0];
    var oPick2=oD4.getElementsByClassName("pick")[0];
    var aDiv1=oPick1.getElementsByClassName("tab");
    var aDiv2=oPick2.getElementsByClassName("tab");
    var aContent1=oD3.getElementsByClassName("content");
    var aContent2=oD4.getElementsByClassName("content");

    for(var i=0;i<3;i++){
        aDiv1[i].index=i;
        aDiv1[i].onclick=function(){
            for(var j=0;j<3;j++){
                aDiv1[j].className="tab";
                aContent1[j].className="content";
            }
            this.className="tab toggle";
            aContent1[this.index].className="content main";
        }

        aDiv2[i].index=i;
        aDiv2[i].onclick=function(){
            for(var j=0;j<3;j++){
                aDiv2[j].className="tab";
                aContent2[j].className="content";
            }
            this.className="tab toggle";
            aContent2[this.index].className="content main";
        }
    }


    //4. 挡住
    var aPicCancle=document.getElementsByClassName("tip-cancle");
    var aD3Btn=oD3.getElementsByClassName("btn");
    
    for(var i=0;i<aPicCancle.length;i++){
        aPicCancle[i].onclick=function(){
        for(var i=0;i<aD3Btn.length;i++){
            aD3Btn[i].style.top= 74+"px";
        }
        }
    }
    
}