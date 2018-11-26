var express = require('express');
var ObjectId = require('mongodb').ObjectId
var fs = require('fs');
var jwt = require("jsonwebtoken");
var router = express.Router();
var moment=require('moment');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/blog";
 
var secretOrPrivateKey="itwen"; // 这是加密的key（密钥） 

/* 指定一条数据查询. */
router.get('/article/:articleId', function(req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");

  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.end();
      return;
    }else{
    var dbo = db.db("blog");
    var whereStr = {"_id":ObjectId(req.params.articleId)};  // 查询条件

    dbo.collection("article").find(whereStr).toArray(function(err, result) {
        if (err){
          res.end();
          return;
        }else if(result.length>0){
          res.end(JSON.stringify(result[0]));
          db.close();
      }
    });

  }
  });
});

//根据url遍历数据库,listId分页
router.get('/articlelist/:listId', function(req, res, next) {
    res.header("Content-Type", "application/json; charset=utf-8")
    res.header("Access-Control-Allow-Origin", "*");

    var whereStr={};
    if(req.query.cla){
        whereStr.class=req.query.cla
    }
    if(req.query.search){
        whereStr.title=new RegExp(req.query.search);
    }
    

    var sk;
    sk=(req.params.listId-1)*6;
    var resinfo={
      "status":"ok",
      "articleNum":0,
      "data":[]
    };
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        // var resObj;
        var dbo = db.db("blog");
        dbo.collection("article").find(whereStr).count(function(err,data){
          resinfo.articleNum=data; //获取数据条数
        });
        dbo.collection("article").find(whereStr).sort({_id:-1}).skip(sk).limit(6).toArray(function(err,results){
          // console.log(results);
          if(results.length>0){
              for(var i=0;i<results.length;i++){
                resinfo.data.push(results[i]);
              }
              res.end(JSON.stringify(resinfo));
          }
          else{
            resinfo.status="no";
            res.end(JSON.stringify(resinfo));
          }
        })
        db.close();
    });
});

//登录接口,post用户密码,返回token
router.post('/login', function (req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");

  //post过来的用户名和密码
  var reqname=req.body.username;
  var reqpwd=req.body.password;
  var whereStr={
    'username':reqname,
    'password':reqpwd
  }

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // var resObj;
    var resinfo={};
    var dbo = db.db("blog");
    dbo.collection("user").find(whereStr).toArray(function(err,result){
      if(result.length>0){ //如果数据查到，代表有数据
        
        var content ={user:reqname,pass:reqpwd}; // 要生成token的主题信息
        
        var token = jwt.sign(content, secretOrPrivateKey, {
                            expiresIn: 60*60*24  // 24小时过期
                        });
        // console.log("token ：" +token );

        resinfo.success="yes";
        resinfo.user=reqname;
        resinfo.token=token;
        
        
        res.end(JSON.stringify(resinfo));
      }else{
        res.end(JSON.stringify({'success':'no'}));
      }
    });
    db.close();
});

})

//验证接口?token=..
router.get('/ishow',function(req,res){
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");

  var reqtoken=req.query.token;
  jwt.verify(reqtoken, secretOrPrivateKey, function (err, decode) {
      if (err) {  //  时间失效的时候/ 伪造的token          
        res.end(JSON.stringify({'success':'no'}));
      } else {
          var resinfo={
            success:'yes',
            user:decode.user
          }
          res.end(JSON.stringify(resinfo));
      }
  })
});

//获取数据数量
router.get('/articlenum', function(req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");

  //用于添加条件
  var whereStr={};
  if(req.query.cla){
      whereStr={
        "class":req.query.cla
      }
  }else if(req.query.search){
      
  }

  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      // var resObj;
      var dbo = db.db("blog");
      dbo.collection("article").find(whereStr).count(function(err,data){
        res.end(data.toString()); //获取数据条数
      });
      db.close();
  });
});

//获取类别
router.get('/getclass',function(req,res,next){
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");

  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.end();
    }else{
    var dbo = db.db("blog");

    dbo.collection("class").find().toArray(function(err, results) {
        if (err){
          res.end();
        }else if(results.length>0){
          var resinfo={success:'yes',class:[]};
          for(var i=0;i<results.length;i++)
          {
            resinfo.class.push(results[i].class);
          }
          res.end(JSON.stringify(resinfo));
          db.close();
        }
      });

    }
  });
})

//post配置options
router.post('/settings', function (req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");

  //post过来的title，welcome，footer
  var reqtitle=req.body.title;
  var reqwelcom=req.body.welcome;
  var reqfooter=req.body.footer;
  var reqtoken=req.body.token;

  //判断有没有权限
  jwt.verify(reqtoken, secretOrPrivateKey, function (err, decode) {
      if (err) {  //  时间失效的时候/ 伪造的token          
        res.end(JSON.stringify({'success':'no'}));
        // return;
      } 
  })


  var updateStr={
    "title":reqtitle,
    "welcome":reqwelcom,
    "footer":reqfooter
  };
  
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      // var resObj;
      var dbo = db.db("blog");
      dbo.collection("options").update({ _id: ObjectId("5bf51e7937a8cb0b7cf59a44") }, {$set:updateStr}, function(err, result) {
          // console.log(result);
          if (err) {
            res.end(JSON.stringify({"success":"no"}))
          }else{
            res.end(JSON.stringify({"success":"yes"}))
          }
          db.close();
      });
      db.close();
  });

})

// 获取options的内容
router.get('/getoptions',function(req,res,next){
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");


  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.end();
    }else{
    var dbo = db.db("blog");

    dbo.collection("options").find().toArray(function(err, results) {
        if (err){
          res.end();
        }else if(results.length>0){
          res.end(JSON.stringify(results[0]));
        }
        db.close();
      });

    }
  });
})

//post文章加token验证
router.post('/postarticle', function (req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");

  //post过来的文章数据
  var reqtitle=req.body.title;
  var reqclass=req.body.class;
  var reqlabel=req.body.label;
  var reqcontent=req.body.content;
  var requser=req.body.user;
  //post的token
  var reqtoken=req.body.token;
  var requser;
  var reqdate=moment().format('YYYY年MM月DD日');

  //判断有没有权限
  jwt.verify(reqtoken, secretOrPrivateKey, function (err, decode) {
      if (err) {  //  时间失效的时候/ 伪造的token          
        res.end(JSON.stringify({'success':'no'}));
        // return;
      } else{//成功
        requser=decode.user;
      }
  })


  var insertStr={
    "title":reqtitle,
    "class":reqclass,
    "label":reqlabel,
    "user":requser,
    "createDate":reqdate,
    "content":reqcontent
  };

  console.log(insertStr);
  
  
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      // var resObj;
      var dbo = db.db("blog");
      dbo.collection("article").insertOne(insertStr, function(err, result) {
        if (err) {
          res.end(JSON.stringify({'success':'no'}));
        }else{
          res.end(JSON.stringify({'success':'yes'}));
        }
        db.close();
      });
  });
  // res.end(JSON.stringify({'success':'yes'}));
})

//删除文章
router.post('/delarticle',function(req,res,next){
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");

  var reqid=req.body.id;
  var reqtoken=req.body.token;

  jwt.verify(reqtoken, secretOrPrivateKey, function (err, decode) {
      if (err) {  //  时间失效的时候/ 伪造的token        
        console.log('这里token验证失败');
        res.end(JSON.stringify({'success':'no'}));
        // return;
      } else{//成功
        
      }
  })

  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("blog");
      var whereStr = {"_id":ObjectId(reqid)};  // 查询条件
      dbo.collection("article").deleteOne(whereStr, function(err, obj) {
          if (err) {res.end(JSON.stringify({'success':'no'}))};
          res.end(JSON.stringify({'success':'yes'}));
          db.close();
      });
  });
  console.log('结束');
})

//修改文章
router.post('/changearticle', function (req, res, next) {
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");

  //post过来的文章数据
  var reqid=req.body.id;
  var reqtitle=req.body.title;
  var reqclass=req.body.class;
  var reqlabel=req.body.label;
  var reqcontent=req.body.content;
  //post的token
  var reqtoken=req.body.token;

  //判断有没有权限
  jwt.verify(reqtoken, secretOrPrivateKey, function (err, decode) {
      if (err) {  //  时间失效的时候/ 伪造的token          
        res.end(JSON.stringify({'success':'no'}));
        // return;
      } else{//成功
      }
  })

  var updateStr={
    "title":reqtitle,
    "class":reqclass,
    "label":reqlabel,
    "content":reqcontent
  };
  
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // var resObj;
    var dbo = db.db("blog");
    dbo.collection("article").update({ "_id": ObjectId(reqid) }, {$set:updateStr}, function(err, result) {
        if (err) {
          res.end(JSON.stringify({"success":"no"}))
        }else{
          res.end(JSON.stringify({"success":"yes"}))
        }
        db.close();
    });
    db.close();
});
})

//设置用户
router.post('/setuser',function(req,res,next){
  res.header("Content-Type", "application/json; charset=utf-8")
  res.header("Access-Control-Allow-Origin", "*");

  var requser=req.body.user;
  var reqpass=req.body.pass;
  var reqtoken=req.body.token;

  //判断有没有权限
  jwt.verify(reqtoken, secretOrPrivateKey, function (err, decode) {
      if (err) {  //  时间失效的时候/ 伪造的token          
        res.end(JSON.stringify({'success':'no'}));
        // return;
      } else{//成功
        
      }
  })

  var updateStr={
    "username":requser,
    "password":reqpass,
  };
  
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      // var resObj;
      var dbo = db.db("blog");
      dbo.collection("user").update({ _id: ObjectId("5bf3fa9037a8cb0b7cf59a3f") }, {$set:updateStr}, function(err, result) {
          // console.log(result);
          if (err) {
            res.end(JSON.stringify({"success":"no"}))
          }else{
            res.end(JSON.stringify({"success":"yes"}))
          }
          db.close();
      });
      db.close();
  });

})
module.exports = router;


