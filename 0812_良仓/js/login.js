$('#username,#password').focus(function () {
   $(this).css("box-shadow","none");
});

$('#login').click(function () {
    var username=$('#username').val();
    var password=$('#password').val();

    if(!username||!password){
        if(!username){
            $('#username').css("box-shadow","inset 0 0 0 2px red");
        }
        if(!password){
            $('#password').css("box-shadow","inset 0 0 0 2px red");
        }
        return;
    }

    $.ajax({
        "type": "POST",
        "url": "http://h6.duchengjiu.top/shop/api_user.php",
        "data":{
            "status":"login",
            "username": username,
            "password": password
        },
        "dataType":"json",
        "contentType":"application/x-www-form-urlencoded",
        "success":function (response) {
            var data=response.data;
            if(response.code===0){
                for(var prop in data){
                    if(data.hasOwnProperty(prop)){
                        localStorage.setItem(prop,data[prop]);
                    }
                }
                //如有hash值，则跳转到hash
                location.href=location.hash?location.hash.substr(10):"index.html";
            }else{
                $('.tip').html(response.message).css("color","red");
            }
        }
    });
});


// 登录页面检测是否已登录
// if(localStorage.getItem("token")){
//     $('body').html("用户："+localStorage.getItem("username")+"你好，你已经成功登录，3秒后将为你跳转到首页");
//     setTimeout(function () {
//         location.href="index.html";
//     },3000);
// }

