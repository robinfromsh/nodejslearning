var foredit= document.querySelectorAll("[name=foredit]")
var idaccount = document.querySelector("#idaccount")
var logtype = document.getElementById("logtype")
var editid = document.querySelectorAll("[name=editid]")
console.log("logtyp.value  1111", logtype.value)
// console.log("console.log(idaccount.value)",idaccount)

for (var i = 0; i < foredit.length; i++){
    // console.log(typeof(editid[foredit.length-1].value))
    if (logtype.value == "user"){
        console.log("editid[i].value", editid[i].value)
        console.log("console.log(idaccount.value)",idaccount)
        if (editid[i].value != idaccount.value.toString()){
            foredit[i].setAttribute("disabled","disabled")
        }
    }
    else{foredit[i].removeAttribute("disabled")}
}
