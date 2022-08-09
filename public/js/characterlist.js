// var foradmin = document.querySelectorAll("[name=onlyforadmin]")
// var logtype = document.getElementById("logtype")
// console.log(logtype.value)
// //登录了
// if(logtype.value=="admin"){
//     for(var i=0;i<foradmin.length;i++){
//         foradmin[i].style.display=""
//     }    
// }
// else {    
//     for(var i=0;i<foradmin.length;i++){
//     foradmin[i].style.display="none"
// }}


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