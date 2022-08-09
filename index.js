var express = require ('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session')
var ObjectId = require('mongodb').ObjectId;
var maincl = require('./contr/maincl.js')
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img')},
    filename: function (req, file, cb) {
      cb(null, file.originalname)}
})
const upload = multer({ dest: 'public/img',storage: storage}) 

app.set('view engine', 'pug');

app.use (express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    name:"bingproject",
    secret: 'comit project',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 300}
  }))

var port = 3000;
app.listen(port,(err) => {
    if (err) {
      return console.log("something bad happened", err);
    }
    console.log(`server is listening on ${port}`);
  });


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';







//--------------------------------------------------------------------------------------------------
//- 注册页面
app.get ('/signlog',maincl.signlog)
app.post("/signup",maincl.signup)


//- 登录页面
app.get ('/denglu',maincl.login)
app.post('/home',maincl.loginpost)

//-登出账号
app.get("/logout",maincl.logout)

//-首页
app.get("/",maincl.gohome)
app.get ('/home',maincl.gohome)

//- 角色列表
app.get('/characterslist',maincl.gocharacterlist)
//-新角色发布与修改
app.get("/characterpost",maincl.gocharacpost)

app.post('/characterpost',upload.single('file'),(req,res)=>{
    var checkid = req.body.idtype
    var newcharaimage = ""
    if (!req.file){ 
        if (req.body.oldpic){
            newcharaimage= req.body.oldpic}}
    else{
        newcharaimage=req.file.filename
    }
    MongoClient.connect(url,function(err, client) {
        console.log("Connected successfully to server");
        const db = client.db('project');
        const collection = db.collection('characters');
        if (checkid == "new"){
            console.log("new character",req.file)
            //-判断图片有没有上传，如果没上传设为空值
            const data_newcharacter= {
                "name":req.body.charname,
                "image":newcharaimage,
                "team":req.body.charteam,
                "date": Date.now()
            } 
            collection.insertOne(data_newcharacter,(err,result)=>{
                if(err){
                    client.close()
                    console.log("error of post")
                    res.end()
                }
                else{
                    res.redirect('/characterslist')
                    res.end()
                }
            })
        }
        //-就是修改
        else{
            var selectid = new ObjectId(checkid)
            console.log(selectid)
            var olddata = {"_id":selectid }
            var newdata ={
                "name":req.body.charname,
                "image":newcharaimage,
                "team":req.body.charteam}
            collection.replaceOne(olddata,newdata)
                res.redirect("/characterslist")
                res.end()

        }
    })
})

//-角色删除
app.get('/characterdelete',maincl.characdelete)






//- 文章列表
app.get('/news',maincl.gonews)
//-新文章
app.get('/newspost',maincl.gonewspost)
app.post('/newspost',maincl.newspost)

//-获取文章内容
app.get('/newscontent/',maincl.newscontent)
//-文章删除
app.get('/newsdelete/',maincl.newsdelete)


//-管理员用户管理载入
app.get ('/adminteam',maincl.adminteam)
app.get ('/userdelete',maincl.userdelete)

















