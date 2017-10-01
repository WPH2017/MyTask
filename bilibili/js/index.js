var MongoClient=require('mongodb').MongoClient;
var db_connect_str='mongodb://localhost:27017/bilibili';

MongoClient.connect(db_connect_str,function (err,db) {
    if(!err){
        console.log('连接成功');
        db.close();
        console.log('关闭连接');
    }
});