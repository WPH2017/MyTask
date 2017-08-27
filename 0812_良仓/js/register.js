$(function () {
    //输入与验证样式设置
    $('#mobile').focus(function () {
        $(this).css("outline","none");
    });
    $('#createPass,#confirm').on({
        focus:function () {
            $(this).css("outline","none");
        },
        blur:function () {
            if($(this).val().length<6){
                $('.confirmTip').html("长度不对，请重新输入").css("color","red");
            }else{
                $('.confirmTip').html("");
            }
        }
    });
    $('#confirm').change(function () {
        if($('#createPass').val()!=$('#confirm').val()){
            $('.confirmTip').html("两次密码输入不一致，请重新输入").css("color","red");
            $('#createPass,#confirm').css("outline","red solid 1px");
        }
    });

    //验证手机号是否存在
    $('#mobile').change(function () {
        $.ajax({
            "type": "POST",
            "url": "http://h6.duchengjiu.top/shop/api_user.php",
            "data": {
                "status":"check",
                "username":$('#mobile').val(),
                "contentType":"application/x-www-form-urlencoded"
            },
            "dataType":"json",
            "success": function (response) {
                if(response.code===0){
                    $('.usernameTip').html(response.message).css("color","green");
                    $('#mobile').css("outline","green solid 2px");
                }else if(response.code===2001){
                    $('.usernameTip').html(response.message).css("color","red");
                    $('#mobile').css("outline","red solid 1px");
                }
            }
        });
    });

    //绑定注册按钮
    $('#register').click(function(){
        var username=$('#mobile').val();
        var password=$('#createPass').val();
        $.ajax({
            "type":"POST",
            "url":"http://h6.duchengjiu.top/shop/api_user.php",
            "data":{
                "status":"register",
                "username":username,
                "password":password,
                "contentType":"application/x-www-form-urlencoded"
            },
            "dataType":"json",
            "success":function(response){
                if(response.code===0){
                    $('.registerTip').html(response.message+",开始跳转~").css("color","green");
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
                                setTimeout(function () {
                                    alert('注册成功，点击两秒后自动跳转~')
                                    location.href="index.html";
                                },2000);
                                //如有hash值，则跳转到hash
                                // location.href=location.hash?location.hash.substr(10):"index.html";
                            }else{
                                $('.registerTip').html(response.message).css("color","red");
                            }
                        }
                    });

                }
            }
        });
    });
});














