
var express=require('express');
var app =express();
var mysql = require('mysql');
const bodyParser = require('body-parser');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'userdb'
});
connection.connect();






//设置跨域访问
app.all('*', (req, res, next)=>{
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");

   next();
})

app.use(bodyParser.json())
let login = true;
app.listen(8080,()=>console.log('服务启动'));


app.all('*',(req,res,next)=>{
    if(!login) return res.json('未登录');
    next()
})
app.post('/user',(req,res)=>{
    return res.json({query:req.query,json:req.body})
})


connection.query('select * from t_user',(err,results,fields)=>{
    if(err){
        console.log(err);
    }else{
        console.log(results)
    }
})
 var delSql = 'delete from t_user where user_no = ?';
var delParams = ['0004805'];

connection.query(delSql,delParams,(err,results)=>{
    if(err){
        console.log(err);
    }else{
        console.log(results)
    }
})

// var updateSql = 'UPDATE t_user set user_name= ? where user_no = ?';
// var updateParams = ['张三四','0004804'];

// connection.query(updateSql,updateParams,(err,results)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(results)
//     }
// })

// var insertIntoSql = 'INSERT INTO t_user (user_no,user_name,sex) VALUES(?,?,?)';
// var insertIntoParams = ['0004805','张三五',1];

// connection.query(insertIntoSql,insertIntoParams,(err,results)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(results)
//     }
// })