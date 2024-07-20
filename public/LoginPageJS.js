//import { response } from "express";
let email = document.getElementById("inputrno");
let dob = document.getElementById("inputdob");
let bg = document.getElementById("inputbg");
let PersonId;
let Name;
let marks = document.getElementById("Marks");
function mailid(){
    let EMAIL = email.value;
    EMAIL = EMAIL + "@rajalakshmi.edu.in";
    let DOB = dob.value;
    let BG = bg.value;
    fetch("/",{method:"POST",headers: {'Content-Type':'application/json'},body: JSON.stringify({"Email":`${EMAIL}`,"Dob":`${DOB}`,"Bg":`${BG}`})})
    .then(response => {return response.json();})
    .then(data=>{
        PersonId = data['PersonId'];
        Name = data['FirstName'];
        if(!data["STALKER"]){
        window.alert("You are successfully logged in " + `${Name}`);}
        else{
        window.alert("You are successfully logged in STALKER !!");
        }
        //console.log(PersonId);
        localStorage.setItem("PersonID",PersonId);
        localStorage.setItem("Name",Name);
        window.location.href = `/details.html`;
    }).catch(error => {window.alert("STALKING panriya da BODY SODA");});
}



/*let gpa = document.createElement('button');
gpa.textContent = "GPA";
gpa.addEventListener("click",()=>{
    fetch(`/cgpa.html/:${PersonId}`).then(response => {return response.json();})
    .then(data => {
        marks.textContent = data["CGPA"];
    })
})
document.body.appendChild(gpa);*/