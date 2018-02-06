var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
// var DB_CONN_STR = "mongodb://localhost:27017/device"

// 连接数据库
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("数据库已创建！");
  var dbase = db.db("mydb");

  // 创建集合
  dbase.createCollection('frist', function (err, res) {
    if (err) throw err;
    console.log("创建集合！")
    // db.close();
  })
})

// 数据库操作
//插入数据
// var inserData = function (db, callback) {
//   // 连接到表 site
//   var col = db.collection('site');
//   // 插入数据
//   var data = [{"deviceName": "lock"}, {"deviceName": "window"}];
//   col.insert(data, function (err, result) {
//     if (err) {
//       console.log('Error:' + err);
//       return;
//     }
//     callback(result)
//   })
// }
//
// MongoClient.connect(DB_CONN_STR, function (err, db) {
//   console.log("连接成功！");
//   inserData(db, function (result) {
//     console.log(result);
//     db.close();
//   })
// })


