$(function () {
    $.ajax({
        'type':'GET',
        'url':'http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.getItem("token"),
        'data':{
        },
        'success':function (response) {
            console.log(response);
            var data=response.data;
            if(data.length>0){
                for(var i=0;i<data.length;i++){
                    var html=`<div class="order-item">
                            <h3>订单编号：${data[i].order_id}</h3>
                    `;
                    for(var j=0;j<data[i].goods_list.length;j++){
                        var obj=data[i].goods_list[j];
                        html+=`
                            <ul class="cart-item" data-id="">
                                <img src="${obj.goods_thumb}" alt="">
                                <li><a href="detail.html?id=${obj.goods_id}">${obj.goods_name}</a></li>
                                <li>数量：${obj.goods_number}件</li>
                                <li>￥${obj.goods_number*obj.goods_price}</li>
                            </ul>
                        `;
                    }
                    html+=`
                            <p>收货人:</p>
                            <p>收货地址:${data[i].province}${data[i].city}${data[i].address}</p>
                            <p>手机号：${data[i].mobile}</p>
                            <h3>订单总价：￥${data[i].total_prices}</h3>
                        </div>
                    `;
                    $('.order-table').append(html);
                }
                // for()
            }


        }
    })
});