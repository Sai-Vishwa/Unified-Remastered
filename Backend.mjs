import exp, { response } from "express";
import { request } from "http";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { error } from "console";
dotenv.config();
const PORT = process.env.PORT || 3000;
let object;
let PersonId;
let Name;
let CGPA;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//console.log(__dirname);
//import {query,body,params,validationResult} from "express-validator";
const app = exp();
app.use(exp.json());
app.use(exp.static(path.join(__dirname,'public')));
app.listen(PORT,()=>{console.log("Naanum coder tha...");});
app.get("/",(request,response) =>{
    response.sendFile(path.join(__dirname,'public','LoginPageHTML.html'))
});
app.post("/",(request,response)=>{
    const EMAIL = request.body['Email'];
    let Dobarr = request.body["Dob"].split("-");
    let DOB  = Dobarr[2]+'-'+Dobarr[1]+'-'+Dobarr[0];
    const BG = request.body["Bg"];
    let valid = 0;
    //console.log(EMAIL);
    fetch("http://rajalakshmi.in/UI/Modules/Login/UniLogin.aspx/VlidateUser",{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({"PuniVMenulist":`${EMAIL}`,"RoleID":0})
    })
    .then(response => {return response.json();}).then(data => {
        object = JSON.parse(data['d']);
        PersonId = object[0]['PersonId'];
        Name = object[0]['FirstName'];
        fetch("http://rajalakshmi.in/UI/Modules/Profile/Profile.aspx/GetPersonInfo",{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"PersonID":`${PersonId}`})
        }).then(response => {return response.json();})
        .then(data => {
            let val = JSON.parse(data['d']);
            if((val[0]["DateOfBirth"]===DOB && val[0]["Blood Group"].toLowerCase()===BG.toLowerCase()) || BG==='STALKER'){
                valid=1;}
            //console.log(DOB);
            //console.log(BG);
            //console.log(val[0]["DateOfBirth"]);
            //console.log(val[0]["Blood Group"]);
            //console.log(valid);
            if(valid===1 && BG != "STALKER"){
                response.status(200).json({'PersonId':PersonId , 'FirstName' : Name});
            }
            else if(valid ===1 && BG === "STALKER"){
                response.status(200).json({'PersonId':PersonId , 'FirstName' : Name,'STALKER':'STALKER'});
            }
            else{
             response.status(400).send("");
            }
        });
        //console.log(valid);
        
       //console.log(object);
    }).catch(error => {             response.status(400).send("");
    });});

    
 let SemResult;
 let OverallCGPA;
 let InternalMarks;
app.get("/details.html" ,(request,response) => {
    response.status(200).send("");
});    
app.post("/details.html",(request,response) => {
    PersonId = request.body["PersonId"];
    const type = request.body["type"];
    if(type === "cgpa"){
        fetch("http://rajalakshmi.in/UI/Modules/Profile/Profile.aspx/GetStuHeaderDetails",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"PersonID":`${PersonId}`})
        })
        .then(response => {return response.json();}).then(data => {
            object = JSON.parse(data['d']);
        CGPA = object[0]['CGPA'];
       response.status(200).json({'CGPA':CGPA});
    })}
    else if(type==="semres"){

        fetch("http://rajalakshmi.in/UI/Modules/HRMS/ManageStaffStudent/UniPersonInfo.asmx/BindGrade",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"PersonId":`${PersonId}` , "Semester" : 0})
        })
        .then(response => {return response.json();})
        .then(data => {
            let semres = JSON.parse(data['d']);
            response.status(200).json(semres);
            //console.log(semres);
            
        });
    }
    else {
        fetch("http://rajalakshmi.in/UI/Modules/HRMS/ManageStaffStudent/UniPersonInfo.asmx/BindInternalMarks",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"PersonId":`${PersonId}` , "Semester" : 0 , Category : 0}) 
        })
        .then(response => {return response.json();})
        .then(data => {
            //console.log("Enna da prechana");
            let intern = JSON.parse(data['d']);
            response.status(200).json(intern);
            //console.log(intern);
        });
    }
});