//替换login的姓名，先取得账号，再写入
var logname = document.getElementById("logname")
var logtu = document.getElementById("logus")
var homelogout = document.getElementById("homelogout")
var logstatus= document.getElementById("logstatus")
var logtype = document.getElementById("logtype") 
var manaforadmin = document.getElementById("manaforadmin")
console.log("logname", logname.value)
console.log("logtype", logtype)
if (logname.value){
logtu.innerHTML= `  ${logname.value}`
logstatus.style.display="none";
homelogout.style.display=""
}
//display空集是显示 none是不显示
else {
    logstatus.style.display="";
    homelogout.style.display="none"
}
if(logtype.value == "admin"){
    manaforadmin.style.display="";
}
else{manaforadmin.style.display="none"}