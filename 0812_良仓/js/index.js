//1. 轮播图
var oImgBox=document.getElementsByClassName("imgbox")[0];
var left=0;
var delta=-1000;
var index=0;
var oPick=document.getElementsByClassName("pick")[0];
var aLis=oPick.getElementsByTagName("li");

for(var i=0;i<aLis.length;i++){
    aLis[i].index=i;
    aLis[i].onclick=function(){
        for(var j=0;j<aLis.length;j++){
            aLis[j].className="";
        }
        left=this.index*-1000;
        this.className="main";
        oImgBox.style.left=left+"px";
    }
}

setInterval(function(){
    index++;
    left+=index*-1000;
    if(left<=-8000){
        left=0;
    }
    if(index>7){
        index=0;
    }
    for(var j=0;j<aLis.length;j++){
        aLis[j].className="";
    }
    aLis[index].className="main";
    oImgBox.style.left=left+"px";
},2000);
