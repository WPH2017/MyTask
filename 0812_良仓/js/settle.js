//获取用户的收货地址信息
$(function () {
    var html="";
    $.ajax({
        "type":"GET",
        "url":"http://h6.duchengjiu.top/shop/api_useraddress.php",
        "data":{
            "token":localStorage.getItem("token")
        },
        "success":function (response) {
            var html="";
            var data=response.data;
            for(var i=0;i<data.length;i++){
                var json=data[i];
                //列表第一个默认选中
                if(i==0){
                    html+=`
                    <ul class="every-had" data-id="${json.address_id}">
                            <input type="radio" name="choose" checked>
                            <li>收货人姓名：${json.address_name}</li>
                            <li>收货地址：${json.province} ${json.city} ${json.address}</li>
                            <li>手机：${json.mobile}</li>
                            <img src="./img/minus.png" alt="" class="add-minus">
                    </ul>
                `;
                    continue;
                }
                html+=`
                    <ul class="every-had" data-id="${json.address_id}">
                            <input type="radio" name="choose">
                            <li>收货人姓名：${json.address_name}</li>
                            <li>收货地址：${json.province} ${json.city} ${json.address}</li>
                            <li>手机：${json.mobile}</li>
                            <img src="./img/minus.png" alt="" class="add-minus">
                    </ul>
                `;
            }
            $('.address').append(html);

            //删除按钮删除地址
            $('.add-minus').click(function () {
                if(!confirm("是否要删除本条地址")) return;
                var aim=$(this);
                $.ajax({
                    "type":"GET",
                    "url":"http://h6.duchengjiu.top/shop/api_useraddress.php",
                    "data":{
                        "token":localStorage.getItem("token"),
                        "status":"delete",
                        "address_id":$(this).parent().attr("data-id")
                    },
                    "success":function () {
                        aim.parent().remove();
                    }
                });

            });

            //订单加载
            $.ajax({
                "type":"GET",
                "url":"http://h6.duchengjiu.top/shop/api_cart.php",
                "data":{
                    "token":localStorage.getItem("token")
                },
                "success":function (response) {
                    var html="";
                    for(var i=0;i<response.data.length;i++){
                        var data=response.data[i];
                        html+=`
                    <ul class="cart-item" data-id="">
                        <img src="${data.goods_thumb}" alt="">
                        <li><a href="detail.html?id=${data.goods_id}">${data.goods_name}</a></li>
                        <li>x${data.goods_number}</li>
                        <li>￥${data.goods_number*data.goods_price}</li>
                    </ul>
                `;
                    }
                    $('.goodsform').append(html);

                    //设置订单总价
                    $('.sum-number').html(localStorage.getItem("summary")).css({
                        fontSize:20,
                        color:"#2751d7",
                        fontWeight:"bold"
                    });

                    //绑定结算
                    $('.order-confirm').click(function () {
                        var address_id;
                        $('.every-had').each(function () {
                            console.log(1)
                            console.log($(this).find('input:radio'))
                            if($(this).find('input:radio').is(':checked')){
                                address_id=$(this).attr('data-id');
                            }
                        });
                        if(!address_id) return alert("还未选择收货地址，请选择！");
                        if(!confirm("确定提交本订单吗？")) return;
                        $.ajax({
                            'type':'POST',
                            'url':'http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.getItem("token")+'&status=add',
                            'data':{
                                'address_id':address_id,
                                'total_prices':1*(localStorage.getItem('summary').match(/\w+/))
                            },
                            'success':function (response) {
                                alert(response.message+',点击后两秒跳转到订单详情页');
                                localStorage.setItem("summary","￥0.00");
                                setInterval(function () {
                                    location.href="order.html";
                                },2000);
                            }
                        })
                    });
                }
            })
        }
    });

});


//点击添加按钮，加入模板
$('.add-plus').click(function () {
    var html=`
        <div class="new-every">
                <span>收货人姓名</span><input type="text" class="add-name"><br>
                <span>省/市</span><select name="" id="province"></select>  <select name="" id="city"></select><br>
                <span>详细地址</span><input type="text" class="add-address"><br>
                <span>手机号码</span><input type="text" class="add-phonenumber"><br>
                <button class="save-address">保存地址</button>
                <div class="new-cancle">x</div>
        </div>
    `;
    $('.address').append(html);
    // 省市数据对象数组
    var data= [{name:"省/地区",cities:["市/区"]},
        { name: "北京", cities: ["西城", "东城", "崇文", "宣武", "朝阳", "海淀", "丰台", "石景山", "门头沟", "房山", "通州", "顺义", "大兴", "昌平", "平谷", "怀柔", "密云", "延庆"] },
        { name: "天津", cities: ["青羊", "河东", "河西", "南开", "河北", "红桥", "塘沽", "汉沽", "大港", "东丽", "西青", "北辰", "津南", "武清", "宝坻", "静海", "宁河", "蓟县", "开发区"] },
        { name: "河北", cities: ["石家庄", "秦皇岛", "廊坊", "保定", "邯郸", "唐山", "邢台", "衡水", "张家口", "承德", "沧州", "衡水"] },
        { name: "山西", cities: ["太原", "大同", "长治", "晋中", "阳泉", "朔州", "运城", "临汾"] },
        { name: "内蒙古", cities: ["呼和浩特", "赤峰", "通辽", "锡林郭勒", "兴安"] },
        { name: "辽宁", cities: ["大连", "沈阳", "鞍山", "抚顺", "营口", "锦州", "丹东", "朝阳", "辽阳", "阜新", "铁岭", "盘锦", "本溪", "葫芦岛"] },
        { name: "吉林", cities: ["长春", "吉林", "四平", "辽源", "通化", "延吉", "白城", "辽源", "松原", "临江", "珲春"] },
        { name: "黑龙江", cities: ["哈尔滨", "齐齐哈尔", "大庆", "牡丹江", "鹤岗", "佳木斯", "绥化"] },
        { name: "上海", cities: ["浦东", "杨浦", "徐汇", "静安", "卢湾", "黄浦", "普陀", "闸北", "虹口", "长宁", "宝山", "闵行", "嘉定", "金山", "松江", "青浦", "崇明", "奉贤", "南汇"] },
        { name: "江苏", cities: ["南京", "苏州", "无锡", "常州", "扬州", "徐州", "南通", "镇江", "泰州", "淮安", "连云港", "宿迁", "盐城", "淮阴", "沐阳", "张家港"] },
        { name: "浙江", cities: ["杭州", "金华", "宁波", "温州", "嘉兴", "绍兴", "丽水", "湖州", "台州", "舟山", "衢州"] },
        { name: "安徽", cities: ["合肥", "马鞍山", "蚌埠", "黄山", "芜湖", "淮南", "铜陵", "阜阳", "宣城", "安庆"] },
        { name: "福建", cities: ["福州", "厦门", "泉州", "漳州", "南平", "龙岩", "莆田", "三明", "宁德"] },
        { name: "江西", cities: ["南昌", "景德镇", "上饶", "萍乡", "九江", "吉安", "宜春", "鹰潭", "新余", "赣州"] },
        { name: "山东", cities: ["青岛", "济南", "淄博", "烟台", "泰安", "临沂", "日照", "德州", "威海", "东营", "荷泽", "济宁", "潍坊", "枣庄", "聊城"] },
        { name: "河南", cities: ["郑州", "洛阳", "开封", "平顶山", "濮阳", "安阳", "许昌", "南阳", "信阳", "周口", "新乡", "焦作", "三门峡", "商丘"] },
        { name: "湖北", cities: ["武汉", "襄樊", "孝感", "十堰", "荆州", "黄石", "宜昌", "黄冈", "恩施", "鄂州", "江汉", "随枣", "荆沙", "咸宁"] },
        { name: "湖南", cities: ["长沙", "湘潭", "岳阳", "株洲", "怀化", "永州", "益阳", "张家界", "常德", "衡阳", "湘西", "邵阳", "娄底", "郴州"] },
        { name: "广东", cities: ["广州", "深圳", "东莞", "佛山", "珠海", "汕头", "韶关", "江门", "梅州", "揭阳", "中山", "河源", "惠州", "茂名", "湛江", "阳江", "潮州", "云浮", "汕尾", "潮阳", "肇庆", "顺德", "清远"] },
        { name: "广西", cities: ["南宁", "桂林", "柳州", "梧州", "来宾", "贵港", "玉林", "贺州"] },
        { name: "海南", cities: ["海口", "三亚"] },
        { name: "重庆", cities: ["渝中", "大渡口", "江北", "沙坪坝", "九龙坡", "南岸", "北碚", "万盛", "双桥", "渝北", "巴南", "万州", "涪陵", "黔江", "长寿"] },
        { name: "四川", cities: ["成都", "达州", "南充", "乐山", "绵阳", "德阳", "内江", "遂宁", "宜宾", "巴中", "自贡", "康定", "攀枝花"] },
        { name: "贵州", cities: ["贵阳", "遵义", "安顺", "黔西南", "都匀"] },
        { name: "云南", cities: ["昆明", "丽江", "昭通", "玉溪", "临沧", "文山", "红河", "楚雄", "大理"] },
        { name: "西藏", cities: ["拉萨", "林芝", "日喀则", "昌都"] },
        { name: "陕西", cities: ["西安", "咸阳", "延安", "汉中", "榆林", "商南", "略阳", "宜君", "麟游", "白河"] },
        { name: "甘肃", cities: ["兰州", "金昌", "天水", "武威", "张掖", "平凉", "酒泉"] },
        { name: "青海", cities: ["黄南", "海南", "西宁", "海东", "海西", "海北", "果洛", "玉树"] },
        { name: "宁夏", cities: ["银川", "吴忠"] },
        { name: "新疆", cities: ["乌鲁木齐", "哈密", "喀什", "巴音郭楞", "昌吉", "伊犁", "阿勒泰", "克拉玛依", "博尔塔拉"] },
        { name: "香港", cities: ["中西区", "湾仔区", "东区", "南区", "九龙-油尖旺区", "九龙-深水埗区", "九龙-九龙城区", "九龙-黄大仙区", "九龙-观塘区", "新界-北区", "新界-大埔区", "新界-沙田区", "新界-西贡区", "新界-荃湾区", "新界-屯门区", "新界-元朗区", "新界-葵青区", "新界-离岛区"] },
        { name: "澳门", cities: ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路氹城"]}
    ];
//载入select的option
//初始载入省市
    $('#province').append(function () {
        $('#province').html("");
        var html="";
        for(var i=0;i<data.length;i++){
            html+="<option>"+data[i].name+"</option>";
        }
        return html;
    });
    $('#city').append(function () {
        $('#city').html("");
        var html="";
        for(var i=0;i<data.length;i++){
            if($('#province').val()===data[i].name){
                for(var j=0;j<data[i].cities.length;j++){
                    html+="<option>"+data[i].cities[j]+"</option>";
                }
            }
        }
        return html;
    });
//根据省改变市数据
    $('#province').change(function () {
        $('#city').append(function () {
            $('#city').html("");
            var html="";
            for(var i=0;i<data.length;i++){
                if($('#province').val()===data[i].name){
                    for(var j=0;j<data[i].cities.length;j++){
                        html+="<option>"+data[i].cities[j]+"</option>";
                    }
                }
            }
            return html;
        });
    });

    //点击保存，新增到后台,并刷新页面
    $('.save-address').click(function () {

        //还没有做异常处理
        var data={
            "address_name":$('.add-name').val(),
            "province":$('#province').val(),
            "city":$('#city').val(),
            "address":$('.add-address').val(),
            "mobile":$('.add-phonenumber').val()
        };
        $.ajax({
            'type':'POST',
            'url':'http://h6.duchengjiu.top/shop/api_useraddress.php?token='+localStorage.getItem('token')+'&status=add',
            'data':data,
            'success':function (response) {
                alert(response.message);
                // location=location;
                // location="settle.html";
                // history.back();暂时不行
                // history.go();
                location.reload();
            }
        });
    });

    //点击删除，移除当前模板
    $('.new-cancle').click(function () {
        $(this).parent().remove();
    });
});

