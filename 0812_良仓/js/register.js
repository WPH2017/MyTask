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

$('#register').click(function(){
    $.ajax({
        "type":"POST",
        "url":"http://h6.duchengjiu.top/shop/api_user.php",
        "data":{
            "status":"register",
            "username":$('#mobile').val(),
            "password":$('#createPass').val(),
            "contentType":"application/x-www-form-urlencoded"
        },
        "dataType":"json",
        "success":function(response){
            if(response.code===0){
                $('.registerTip').html(response.message+",开始跳转~").css("color","green");
                location="index.html";
            }
        }
    });
});

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
