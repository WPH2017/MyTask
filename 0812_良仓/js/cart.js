$(function () {
    //载入购物车
    $.ajax({
        "type":"GET",
        "url":"http://h6.duchengjiu.top/shop/api_cart.php",
        "data":{
            "token":localStorage.getItem("token")
        },
        "success":function (response) {
            if(response.data.length>0){
                //循环加载模板字面量
                for(var i=0;i<response.data.length;i++){
                    var obj=response.data[i];
                    var html=`<tr class="item">
                            <td>
                                <input type="checkbox" checked="checked">
                                <img src="${obj.goods_thumb}" alt="">
                            </td>
                            <td><a href="">${obj.goods_name}</a>
                            </td>
                            <td>
                                <button class="numless">- </button>
                                <span class="goodsnum">${obj.goods_number}</span>
                                <button class="nummore"> +</button>
                            </td>
                            <td class="goodsprice">
                                ${obj.goods_price}
                            </td>
                            <td class="goodsamount">
                                ${obj.goods_price*obj.goods_number}
                            </td>
                            <td>
                                <a href="javascript:void(0)" class="cart-delete">删除</a>
                            </td>
                        </tr>`;
                    //加载前先计算总价
                    var sum=$('.number','.summary');
                    var temp=0;
                    $('.goodsamount').each(function () {
                        temp+=1*$(this).html();
                    });
                    sum.html("￥"+temp);

                    $('.cart-table').html($('.cart-table').html()+html);
                }
                //绑定全选按钮事件
                $('.cart-table th input:checkbox').change(function () {
                    var other=$('.cart-table .item input');
                    var bool=$('.cart-table th input:checkbox').is(':checked');
                    console.log(bool);
                    if(bool){
                        other.each(function () {
                            $(this).attr('checked','checked');
                        });
                    }else{
                        other.each(function () {
                            $(this).attr('checked','');
                        });
                    }

                });

                //绑定商品数量增减事件
                $('.numless').each(function (index) {
                    $(this).click(function () {
                        var oNum=$('.goodsnum').eq(index);
                        var temp=1*oNum.html()-1;
                        if(temp<0){
                            temp=0;
                        }
                        if(temp>10){
                            temp=10;
                        }
                        oNum.html(temp);
                        $('.goodsamount').eq(index).html(temp*$('.goodsprice').eq(index).html());
                    });
                });
                $('.nummore').each(function (index) {
                    $(this).click(function () {
                        var oNum=$('.goodsnum').eq(index);
                        var temp=1*oNum.html()+1;
                        if(temp<0){
                            temp=0;
                        }
                        if(temp>10){
                            temp=10;
                        }
                        oNum.html(temp);
                        $('.goodsamount').eq(index).html(temp*$('.goodsprice').eq(index).html());
                    })
                })
            }

            //计算总价
            //用到了自定义绑定事件，每当小计改变就给总价赋值
            $('.goodsamount').bind('DOMNodeInserted',function () {
                var sum=$('.number','.summary');
                var temp=0;
                $('.goodsamount').each(function () {
                    if($(this).parent().find('input:checkbox').is(':checked')){
                        temp+=1*$(this).html();
                    }
                });
                sum.html("￥"+temp);
            });

            //删除当前所在的父元素
            $('.cart-delete').each(function(){
                $(this).click(function () {
                    if(!confirm("确定要删除当前商品吗？")) return;
                    //删除不彻底
                    $(this).parent().parent().remove();
                //    暂时不修改购物车
                })
            })

            // function updateSummary(array) {
            //     var sum=$('.number','.summary');
            //     var temp=0;
            //     for(var i=0;i<array.length;i++){
            //         if(array[i]){
            //             temp+=$('.goodsamount').eq(i).html()*$('.goodsprice').eq(i).html();
            //         }
            //     }
            //     sum.html("￥"+temp);
            // }
        }
    });

});