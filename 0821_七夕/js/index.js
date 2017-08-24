var oLogo=document.getElementsByClassName('logo')[0];
setInterval(function () {
    oLogo.style.animation="logo-1 4s infinite alternate";
},3000);


var oBtn=document.getElementById('btn');
var oBox=document.getElementsByClassName('box')[0];

oBtn.onclick=function () {
    var html=`
        <img src="./img/qi.png" alt="" class="qi">
    <img src="./img/xi.png" alt="" class="xi">
    <img src="./img/qixishadow.png" alt="" class="qixishadow">
    <img src="./img/people.png" class="people"></img>
    <img src="./img/star.png" alt="" class="star">
    <img src="./img/heart1.png" alt="" class="heart1">
    <img src="./img/heart2.png" alt="" class="heart2">
    <img src="./img/belt1.png" alt="" class="belt1">
    <img src="./img/belt2.png" alt="" class="belt2">
    <img src="./img/belt3.png" alt="" class="belt3">
    <img src="./img/text.png" alt="" class="text">
    <img src="./img/text-shadow.png" alt="" class="textshadow">
    <img src="./img/bulid-shadow.png" class="bulidshadow"></img>
    `;
    var temp=document.createElement('div');
    temp.innerHTML=html;
    oBox.appendChild(temp);


    //改变btn
    this.className="change";
    var sBtn=document.getElementsByClassName('btn')[0];
    sBtn.className="btn change";
    var oA=this.getElementsByTagName('a')[0];
    setTimeout(function () {
        oA.href='http://www.ucai.cn';
    },6000);

    //改变bk
    var oBk=document.getElementsByClassName("bk")[0];
    oBk.className="bk bkchange";
    //改变框
    var oEnvelop=document.getElementsByClassName("envelop")[0];
    console.log(oEnvelop)
    oEnvelop.className="envelop enchange";
    var oWord=document.getElementsByClassName("word")[0];
    oWord.className="word wochange";

    //改变箭头
    var oArrow=document.getElementsByClassName('arrow')[0];
    oArrow.className='arrow change';

    this.onclick=null;
};