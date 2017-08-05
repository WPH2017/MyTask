window.onload=function(){
    //1. 箭头转动
    var oArrow=document.getElementById("arrow");
    var oParArrow=oArrow.parentNode;
    
    oParArrow.onmouseover=function(){
        oArrow.style.transform="rotate(180deg)";
        oArrow.style.transition="all 0.5s";
    }
    oParArrow.onmouseout=function(){
        oArrow.style.transform="rotate(360deg)";
        oArrow.style.transition="all 0.5s";
    }

    //2. 轮播图
    var oCircleBox=document.getElementById("circle-box");
    var aImg=oCircleBox.getElementsByTagName("img");
    var oCircle=document.getElementById("circle");
    var aCircleLis=oCircle.getElementsByTagName("li");
    var index=0;
    var x=0;

    setTimeout(setInterval(change,1000), 1000);

    for(var i=0;i<aCircleLis.length;i++){
        aCircleLis[i].index=i;
        aCircleLis[i].onclick=function(){
             for(var j=0;j<aImg.length;j++){
                aCircleLis[j].style.backgroundColor="#999";
                }
            this.style.backgroundColor="#fff";
            x=0;
            for(var j=0;j<this.index;j++){
                x-=aImg[j].offsetWidth;
            }
            index=this.index;
            oCircleBox.style.left=x+"px";
        }
    }

    function change(){
        index++;
        if(index>4){
            index=0;
            x=aImg[0].offsetWidth;
        }
        x+=-aImg[index].offsetWidth;
        for(var i=0;i<aImg.length;i++){
            aCircleLis[i].style.backgroundColor="#999";
        }
        aCircleLis[index].style.backgroundColor="#fff";
        oCircleBox.style.left=x+"px";
    }
    
    //3. 两个tab切换
    var oD3=document.getElementsByClassName("detail3")[0];
    var oD4=document.getElementsByClassName("detail4")[0];

    //4. 挡住
    var oPicCancle=document.getElementById("tip-cancle");
    var oD3Btn=document.getElementsByClassName("btn")[0];
    
    oPicCancle.onclick=function(){
        // oD3Btn.style.top=
    }
}