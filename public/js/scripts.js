window.onload = function () {
    console.log('Loaded site')

}

// 新注册用户的确认密码需要相同
var in_pwd1 = document.getElementById("Inputpassword1")
var in_pwd2 = document.getElementById("Inputpassword2")
var checkpwdinfo = document.getElementById("checkpwdinfo")
var btn_newaccountsubmit = document.getElementById("newaccountsubmit")
function checkpwd(){
    // 保证密码有输入
    if (in_pwd1.value != ""){
        if (in_pwd1.value == in_pwd2.value){
            // 激活按钮
            btn_newaccountsubmit.removeAttribute("disabled")
            checkpwdinfo.style.display="none";
        }
        else {
            // 撤销按钮
            btn_newaccountsubmit.setAttribute("disabled","disabled")
            checkpwdinfo.style.display="";
        }
    }
}

// // 替换login的姓名，先取得账号，再写入
// var logname = document.getElementById("logname")
// var logtu = document.getElementById("logus")
// var homelogout = document.getElementById("homelogout")
// var logstatus= document.getElementById("logstatus")
// var logtype = document.getElementById("logtype") 
// var manaforadmin = document.getElementById("manaforadmin")
// console.log("logname", logname)
// if (logname.value){
// logtu.innerHTML= `  ${logname.value}`
// logstatus.style.display="none";
// homelogout.style.display=""
// }
// //display空集是显示 none是不显示
// else {
//     logstatus.style.display="";
//     homelogout.style.display="none"
// }
// if(logtype.value == "admin"){
//     manaforadmin.style.display="";
// }
// else{manaforadmin.style.display="none"}



// 角色列表筛选
function shai(){
    var fuxuan = document.getElementsByName("fuxuan")
    var sectiondisplay = document.querySelectorAll("[name=displaychar]")
    // console.log("fuxuan",fuxuan)
    // var fuxuanfilter = new Array()
    for(var i= 0;i<sectiondisplay.length;i++){
        for(var j= 0;j<fuxuan.length;j++){
            console.log(sectiondisplay[i].id)
            console.log(fuxuan[j].value)
            if (sectiondisplay[i].id == fuxuan[j].value){
                if (fuxuan[j].checked){
                    sectiondisplay[i].style.display="";
                    break
                }
            }
            else {sectiondisplay[i].style.display="none"}
        }       
    }
}



// 新注册用户确认类型
// var acr = document.querySelectorAll("[name=newactr]")
// var newchecktype = document.querySelector("[name=newchecktype]")
// console.log(acr)
// function ckactype() {
//     for (var i = 0; i < acr.length; i++){
//         if (acr[i].checked){
//             console.log(acr[i].value)
//             newchecktype.setAttribute("value",`${acr[i].value}`)
//         }
//     }
// }

