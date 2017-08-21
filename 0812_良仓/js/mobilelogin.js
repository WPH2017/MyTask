var oMobile=document.getElementById("mobile");
var oCode=document.getElementById("code");
var oGet=document.getElementById("get");

code.onblur=function(){  
    $.ajax({
        "type":"GET",
        "url":"./php/check.php?code="+code.value,
        "success":function(response){
            if(response==="y"){
                alert("验证成功");
            }
        },
        "content":"1", 
    });
}