// var ObjectId = require('mongodb').ObjectId;
// var multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/img')},
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)}
// })
// const upload = multer({ dest: 'public/img',storage: storage}) 

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
var ObjectId = require('mongodb').ObjectId;
var express = require ('express');
var app = express();

var session = require('express-session');
const { render } = require('pug');
app.use(session({
    name:"bingproject",
    secret: 'comit project',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 300}
  }))

app.set('view engine', 'pug');



exports.gohome = function(req,res){
    res.render('home',{logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
}


exports.gocharacterlist = function(req,res){
  MongoClient.connect(url, function(err, client) {
      console.log("Connected successfully to server");
      const db = client.db('project');
      const collection = db.collection('characters');
      collection.find({}).toArray((error, doc) => {
          res.render("characterslist",{characters:doc,logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
          res.end()
      })
  })
}

exports.gocharacpost = function(req,res){
  var checknews = req.query.id
  if (checknews != "new"){
      var selectid= new ObjectId(req.query.id)
      var data = {"_id":selectid }
      MongoClient.connect(url, function(err, client) {
          console.log("Connected successfully to server");
          const db = client.db('project');
          const collection = db.collection('characters')
          collection.find(data).toArray((error, doc) => {
              res.render("characterpost",{characterpost:doc[0],logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
              res.end()
          })
      })
  }
  else{
      var newdoc = {
          "_id":"new",
          "name":"New Name",
          "team":"Team",
          "image":""
      }
      res.render("characterpost",{characterpost:newdoc,logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
      res.end()
  }
}

exports.characdelete=function(req,res){
    console.log(req.query)
    var selectid= new ObjectId(req.query.id)
    var data = {"_id":selectid }
    console.log(data)
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        const db = client.db('project');
        const collection = db.collection('characters')
        collection.deleteOne(data,(err, doc) => {
            client.close();
            res.redirect('/characterslist')
        })
    })
}


exports.login =function(req,res){res.render("denglu",{logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})}
exports.loginpost=function(req,res){
  console.log('user login')
  var data ={
      "account": req.body.account,
      "password": req.body.password,
      "type": req.body.actyp}
  MongoClient.connect(url, function(err, client) {
      console.log("Connected successfully to server");
      const db = client.db('project');
      const collection = db.collection('users');
      collection.find(data).toArray((error, doc) => {
          if(error){
              console.log('error happen')
              res.redirect('/denglu')
          }
          else{
              if (doc.length > 0){
                  console.log("data",data)
                  req.session.account = data.account
                  req.session.accounttype=doc[0].type
                  req.session.idaccount=doc[0]._id
                  res.render('home',{logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
                  res.end()
              }
              else{
                  res.send("account or password not correct")
                //   res.redirect('/denglu')
                  res.end()}
          }
          client.close()
      })
  })
}


exports.signlog = function(req,res){
    console.log('req.query.id',req.query.id)
    var checksign = req.query.id
    if (checksign !="new"){
        var selectid= new ObjectId(req.query.id)
        var data = {"_id":selectid }
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db('project');
            const collection = db.collection('users')
            collection.find(data).toArray((error, doc) => {
                console.log("doc[0])",doc[0])
                res.render("signlog",{signac:doc[0],logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
            })
        })
    }
    else {
        var newsig = {
            "_id":"new",
            "account":"New Account",
            "email":"New E-mail"
        }
        res.render("signlog",{signac:newsig,logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
    }
}

exports.signup=function(req,res){
    var checkid = req.body.signidtype
    console.log("user signin")
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        const db = client.db('project');
        const collection = db.collection('users');
        if (checkid == "new"){
            var doc = {
                "account": req.body.account,
                "email":req.body.email,
                "password": req.body.password,
                "type":req.body.newactr
            }
            collection.find({"account": doc.account}).toArray((error, document) => {
                if(document.length>0){
                    res.send("the account already exists")
                }})
            collection.insertOne(doc,(err,result)=>{
                if (req.session.accounttype =="admin"){
                    res.redirect('/adminteam')
                }
                else {
                    res.render('denglu',{logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
                }
                // client.close() 
                })
            }
        else{
            var selectid = new ObjectId(checkid)
            var olddata = {"_id":selectid }
            var newdata ={
                "account":req.body.account,
                "email":req.body.email,
                "password": req.body.password,
                "type":req.body.newactr
            }
            collection.replaceOne(olddata,newdata)
                //-client.close(); 不能关会报错
                res.redirect("/adminteam")
                res.end()
        }
    })
}

exports.logout = function(req,res){
  console.log("the user logout")
  req.session.destroy()
  res.redirect('/home')
}




exports.gonews = function(req,res){
    var accountname = req.session.account
    if (!accountname){
        res.redirect('/denglu')
    }
    else {
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db('project');
            const collection = db.collection('news')
            collection.find({}).toArray((error, doc) => {
                res.render("news",{newst:doc,logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
                res.end()
            })
        }) 
    }
}
exports.gonewspost = function(req,res){
  var checknews = req.query.id
  if (checknews != "new"){
      var selectid= new ObjectId(req.query.id)
      var data = {"_id":selectid }
      //-console.log("newpost",data)
      MongoClient.connect(url, function(err, client) {
          console.log("Connected successfully to server");
          const db = client.db('project');
          const collection = db.collection('news')
          collection.find(data).toArray((error, doc) => {
              //-console.log(doc)
              res.render("newspost",{newspostcon:doc[0],logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
              res.end()
          })
      })
  }
  else {
     var newdoc = {
         "_id":"new",
         "title":"New Title",
          "content":"New Content",
          "posttime":"",
          "editid":req.session.idaccount,
          }
      res.render("newspost",{newspostcon:newdoc,logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
      res.end()

  }
}
exports.newspost = function(req,res){  
  var checkid = req.body.idtype
  var t = new Date()
  var postdate = `${t.getFullYear()}/${t.getMonth()+1}/${t.getDate()}`
  MongoClient.connect(url, function(err, client) {
      console.log("Connected successfully to server");
      const db = client.db('project');
      const collection = db.collection('news')
      //-文章新发布
      if (checkid == "new"){
          var data ={
              "title":req.body.newsposttitle,
              "content":req.body.newspostcontent,
              "posttime": postdate,
              "editid":req.session.idaccount,
              "editidname":req.session.account}
          collection.insertOne(data,(err,result)=>{
              client.close();
              res.redirect("/news")
              res.end()
          })
      }
      //-修改
      else {
          var selectid = new ObjectId(checkid)
          console.log(selectid)
          var olddata = {"_id":selectid }
          var newdata ={
              "title":req.body.newsposttitle,
              "content":req.body.newspostcontent,
              "posttime": req.body.posttime,
              "editid":req.body.editid,
              "editidname":req.body.editidname
          }
          collection.replaceOne(olddata,newdata)
              //-client.close(); 不能关会报错
              res.redirect("/news")
              res.end()
  
      }
  }) 
}
exports.newsdelete = function(req,res){
    console.log(req.query)
    var selectid= new ObjectId(req.query.id)
    var data = {"_id":selectid }
    console.log(data)
    MongoClient.connect(url, function(err, client) {
        console.log("Connected successfully to server");
        const db = client.db('project');
        const collection = db.collection('news')
        collection.deleteOne(data,(err, doc) => {
            client.close();
            res.redirect('/news')
        })
    })
}
exports.newscontent = function(req,res){
    var accountname = req.session.account
    if (!accountname){
        res.redirect('/denglu')
    }
    else {
        console.log("get the news")
        var selectid= new ObjectId(req.query.id)
        var data = {"_id":selectid }
        console.log(data)
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db('project');
            const collection = db.collection('news')
            collection.find(data).toArray((error, doc) => {
                //-client.close();
                res.render('newscontent',{contentlist:doc[0],logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
                console.log(doc)
                res.end()
            })
        })
    }
}

exports.adminteam = function(req,res){
    var accountname = req.session.account
    var accounttype = req.session.accounttype
    if (!accountname){
        res.redirect('/denglu')
    }
    else {
        if (accounttype == "admin"){
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");
                const db = client.db('project');
                const collection = db.collection('users')
                var doc_admin= collection.find({}).toArray((error, doc) => {
                    client.close();
                    res.render('adminteam',{teams:doc,logusname:req.session.account,logtype:req.session.accounttype,idaccount:req.session.idaccount})
                })
            })
        }
        else {res.redirect('/denglu')}
    }
}

exports.userdelete = function(req,res){
    var accountname = req.session.account
    var accounttype = req.session.accounttype
    if (!accountname){
        res.redirect('/denglu')
    }
    else {
        if (accounttype == "admin"){
            var check_type = req.query.typeid
            console.log(req.query.typeid)
            var check_id = req.query.id
            var id = new ObjectId(check_id)
            MongoClient.connect(url, function(err, client) {
                console.log("Connected successfully to server");
                const db = client.db('project');
                const collection = db.collection('users')
                collection.deleteOne({"_id":id,"type":check_type},(err, doc) => {
                    client.close();
                    res.redirect('/adminteam')
                })
            })
        }
        else {res.redirect('/denglu')}
    }
}