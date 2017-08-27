$(function () {
    //
    var str=location.search.substr(1);
    var text=decodeURIComponent(str.match(/wrd=(\S+)/)[1]);

    //发起搜索请求
    $.ajax({
        "type":"GET",
        "url":"http://h6.duchengjiu.top/shop/api_goods.php",
        "data":{
            "search_text":text,
        },
        "success":function(response){
            console.log(response);
            $('p.dir').html("<a href='index.html'>良仓</a> > 搜索结果："+text);
            if(response.code===0){
                $('p.result-main').html('为你搜到与“'+text+'”相关的良品 '+response.page.count+' 件');
                var className=JSON.parse(localStorage.getItem('magazineClassList'));
                var html='';
                var data=response.data;
                for(var i=0;i<data.length;i++){
                    var json=data[i];
                    html+=`
                        <div class="result-box">
                            <a href="detail.html?cat_id=${json.cat_id}&goods_id=${json.goods_id}"><img src="${json.goods_thumb}" alt=""></a>
                            <p><nobr>${json.goods_name}</nobr></p>
                            <a href="">${className[json.cat_id]}</a>
                        </div>
                    `;
                }
                $('.result-container').html('');
                $('.result-container').append(html);
            }else if(response.code===1){
                $('.result-container').html('未搜索到与“ '+text+' ”相关的商品').css({
                    'font-size':20,
                    'color':'#aaa',
                    'text-align':'center',
                    'height':100
                });
            }
        }
    });
});