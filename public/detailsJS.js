let PID = localStorage.getItem("PersonID");
let NAME = localStorage.getItem("Name");
let Name = document.createElement("h2");
let CGPADATA;
let SemDATA = [];
let InternDATA = [];
Name.textContent = "Student Name  -  " + `${NAME}`;
Name.style.textAlign = "center"
document.body.prepend(Name);

let CGPA = document.createElement("h3");
let container = document.getElementById("tables");
let Sem = document.createElement("table");
let Intern = document.createElement("table");
CGPA.textContent = "";
Sem.textContent ="";
Intern.textContent ="";
Sem.style.display = "none";
Intern.style.display = "none";
CGPA.style.display = "none";
fetcheverydetail();
function fetcheverydetail (){
    fetch("/details.html",{method:"POST",headers: {'Content-Type':'application/json'},body: JSON.stringify({"PersonId":`${PID}`,"type":"cgpa"})})
    .then(response => {return response.json();})
    .then(data => {CGPADATA = data["CGPA"]})
    .catch(error => {window.alert("Some technical error.. try again")});

    
    
    fetch("/details.html",{method:"POST",headers: {'Content-Type':'application/json'},body: JSON.stringify({"PersonId":`${PID}`,"type":"semres"})})
    .then(response => {return response.json();})
    .then(data => {
        data.forEach(element => {
            let arr = [element["Semester"],element["SubjCode"],element["Subject"],element["Grade"]];
            SemDATA.push(arr);
    });
    }).catch(error => {window.alert("Some technical error.. try again")});

    fetch("/details.html",{method:"POST",headers: {'Content-Type':'application/json'},body: JSON.stringify({"PersonId":`${PID}`,"type":"intres"})})
    .then(response => {return response.json();})
    .then(data => {
        data.forEach(element => {
            let typefind = element["EventTitle"].split("/")[2];
            if(typefind.startsWith("ASSIGNMENT")){
                let Tot = Number(element["U1"])+Number(element["U2"])+Number(element["U3"])+Number(element["U4"])+Number(element["U5"]);
                InternDATA.push([element["Semester"],element["SubjName"],"Assignment",Tot]);
            }
            else if(typefind.startsWith("Lab")){
                let Tot = Number(element["U5"]);
                InternDATA.push([element["Semester"],element["SubjName"],"Model Lab",Tot]);
            }
            else if(typefind.startsWith("CA TEST 1")){
                let Tot = Number(element["U1"])+Number(element["U2"]);
                InternDATA.push([element["Semester"],element["SubjName"],"CAT 1",Tot]);
            }
            else if(typefind.startsWith("CA TEST 3")){
                let Tot = Number(element["U4"])+Number(element["U5"]);
                InternDATA.push([element["Semester"],element["SubjName"],"CAT 3",Tot]);
            }
            else if(typefind.startsWith("CA TEST 2")){
                let Tot = Number(element["U3"]);
                InternDATA.push([element["Semester"],element["SubjName"],"CAT 2",Tot]);
            }
    });}).catch(error => {window.alert("Some technical error.. try again itho ithu tha" + `${error}`)});
}

Sem.style.border = '1';
Intern.style.border = '1';

document.body.appendChild(CGPA);
document.body.appendChild(Sem);
document.body.appendChild(Intern);

function cgpafetch(){
    
CGPA.textContent = "";
Sem.textContent ="";
Intern.textContent ="";
    Sem.style.display = "none";
    Intern.style.display = "none";
    CGPA.textContent = CGPADATA;
    CGPA.style.display = "block";
}

function semresultfetch(){
    
CGPA.textContent = "";
Sem.textContent ="";
Intern.textContent ="";
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Semester','Subject Code','Subject Name','Grade'];
    headers.forEach(headerText =>{
    const th =document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);});
    thead.appendChild(headerRow);
    Sem.appendChild(thead);

    const tbody = document.createElement('tbody');

    CGPA.style.display = "none";
    Intern.style.display = "none";
    Sem.style.display = "block";

    const reqsem = window.prompt("Enter the semester number");
    if(reqsem ===null || reqsem===''){return "" ; }

    SemDATA.forEach(rowData =>{
        if(rowData[0]===reqsem){
        const row = document.createElement("tr");
        rowData.forEach(cellData =>{
            const td = document.createElement("td");
            td.textContent = cellData;
            row.appendChild(td);
        });
        tbody.appendChild(row);}
    });
    Sem.appendChild(tbody);
    
}

function LogOut(){
    window.alert("Hasta la vista , Amigo ... ");
    localStorage.clear();
    window.location.href = '/';
}


function internalsfetch(){
    
CGPA.textContent = "";
Sem.textContent ="";
Intern.textContent ="";

        CGPA.style.display = "none";
    Sem.style.display = "none";

    const reqsem = window.prompt("Enter the semester number");
    if(reqsem === null || reqsem===''){return "";}
    let reqcat = window.prompt("Enter 1/2/3 for CAT , A for assignment , L for model lab");
    if(reqcat === null || reqcat===''){return "";}
    if(reqcat === "1"){reqcat = "CAT 1";}
    else if(reqcat === "A"){reqcat = "Assignment";}
    else if(reqcat === "L"){reqcat = "Model Lab";}
    else if(reqcat === "3"){reqcat = "CAT 3";}
    else if(reqcat === "2"){reqcat = "CAT 2";}
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    let headers = ['Semester','Subject Name','Exam','Marks'];
    headers.forEach(headerText =>{
    const th =document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);});
    thead.appendChild(headerRow);
    Intern.appendChild(thead);

    const tbody = document.createElement('tbody');

    for(let i=0;i<InternDATA.length;i++){
        if(reqsem === InternDATA[i][0] && reqcat === InternDATA[i][2]){
            const row = document.createElement("tr");
            InternDATA[i].forEach(cellData => {
                const td = document.createElement("td");
                td.textContent = cellData;
                row.appendChild(td);
            });
            tbody.appendChild(row);
        }

    }
    
    Intern.append(tbody);
    Intern.style.display="block";
}