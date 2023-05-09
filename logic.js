/*@author       Monika Przybylska 
  @date         11 May 2022.
  @description  This is a simple login progam with multiple features: login, regitser, generate password, view account details. */
 
  let url = window.location.pathname; 
  let lastIndex = url.lastIndexOf("/"); 
  let pathTwo = url.substring(lastIndex, url.length);
  let path = url.substring(0,lastIndex);
  let details = [];

 //Logic for Home screen
 if( pathTwo == "/home.html"){
    let btn = document.getElementsByTagName("button"); 
    // btn[0].addEventListener("click", function(){
    //     let searchTxt= document.getElementById("searchValue").value;
    //     if(searchTxt == "Sign in" || searchTxt == "sign in"){
    //         window.location.assign(path + "/login.html");
    //     }
    //     else if(searchTxt == "Sign up" || searchTxt == "sign up"){
    //         window.location.assign(path + "/register.html");
    //     }
    //     else if(searchTxt == "View account details" || searchTxt == "view account details"){
    //         window.location.assign(path + "/view.html");
    //     }     
    // }); 
    for(let i = 0; i<btn.length; i++){   
            btn[i].addEventListener("click", function(){
            if(i == 0){
                 window.location.assign(path + "/login.html");
            }
            else if(i == 1){
                window.location.assign(path + "/register.html");
            }
            // else if(i == 3){
            //     window.location.assign(path + "/view.html");
            // }
        }); 
    } 
}
//Logic for Login screen 
else if(pathTwo == "/login.html"){
    let btnLogin = document.getElementById("loginPageBtn");
    btnLogin.addEventListener("click", function(){
        let user = document.getElementById("txtUName").value;
        let passw = document.getElementById("password").value;
        readFile(user,passw);
    });

}
//Logic for Register screen 
else if(pathTwo == "/register.html"){
    let btnGenerate = document.getElementById("genPass");
    let btnRegister = document.getElementById("register");
    let genPassword = sessionStorage.getItem("password");
    btnGenerate.addEventListener("click", function(){
        window.location.assign(path + "/generate.html");  
    });

    if(genPassword != null){   
      document.getElementById("password").value = genPassword;
    }
   
   
    btnRegister.addEventListener("click", async function(){ 
        if(isValid()){
           alert("Please fill in all the required fields");
        }
       else{
        
            await readFile();
            let text ="";
            let username = document.getElementById("txtUName").value;
            let password = document.getElementById("password").value;
            details.push({userField: username, passField: password});
            //details.filter(function (details) {return details != undefined;}); 
            for (const i of details) {
                    text += i.userField  + " " + i.passField +"\n"; 
                }
                   
            await saveFile(text);
            //Adds 2s delay before exiting the registration page
            await setTimeout( function(){
                let url = window.location.pathname; 
                let lastIndex = url.lastIndexOf("/"); 
                let path = url.substring(0, lastIndex)  
                window.location.assign(path + "/home.html");
            }, 2000); 
        }
    });
}
//Logic for Generate screen
else if(pathTwo =="/generate.html"){
    let generateBtn = document.getElementsByClassName("generate");
    let btnReg = document.getElementById("register");
    let password =""

    for(let i = 0; i < generateBtn.length; i++){
        generateBtn[i].addEventListener("click", function(){
            if(i == 0){
                password = getRandomNumbers();
            }
            else if(i == 1){
                password = getRandomMixed();
            }
            document.getElementById("generatedPassword").innerText = password;
            sessionStorage.setItem("password", (password));
        });
    } 

    btnReg.addEventListener("click", function(){
        window.location.assign(path + "/register.html"); 
    });
}
// Logic for Member screen
else if(pathTwo == "/memberHome.html"){
    let memberName = sessionStorage.getItem("memberName");
    document.getElementById("greeting").innerText = `Hello ${memberName}!`
    console.log(memberName)
    let btnShow = document.getElementById("show");
    btnShow.addEventListener("click", async function(){
        await readFile();
        createTable();
    });
}

//FUNCTIONS
//Function to read from accounts.txt file. It take s two parameters: username and password form input elements
async function readFile(u, p){  
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();
    let lines = contents.split("\n"); 
    let obj = {};
    for (const i of lines) {  
        let items = i.split(" "); 
        for (let i=0; i<items.length; i++){
            items[i] = items[i].trim();
        } 
        obj = {userField: items[0], passField: items[1]};   
        details.push(obj); 
        if(u === obj.userField && p === obj.passField){
            //alert("Welcome " + obj.userField);
            sessionStorage.setItem("memberName", (obj.userField));
            window.location.assign(path + "/memberHome.html");
            return; 
        }
    } 
    return alert("Username or password incorect");
}
//Function to save new user details to accounts.txt file
async function saveFile(data){
    let contents = new Blob([data.trim()], {type:"text/plain"});
    const handle = await window.showSaveFilePicker();
    const writable = await handle.createWritable();
    await writable.write(contents);
    await writable.close();
}
let input = document.getElementsByTagName("input");
function isValid(){
    let valid = false;
    for(let i=0; i<input.length; i++){ 
        if(input[i].value == ""){
            valid = true;
        }
    }
    return valid; 
}
/*Functon to generate random alphanumeric password (symbols, letters, numbers). Returns string of random characters, numbers and symbols.
More secure option as it uses crypto.getRandomValues() togenerate cryptologically strong random values*/
function getRandomMixed(){
    let str="";
    const randPasswordMix = new Uint8Array(256);

    //Generate cryptographically random values 
    crypto.getRandomValues(randPasswordMix)
   
    //Translate random values to UTF-16 symbols and return string 
    randPasswordMix.forEach(n => {
        if(33 < n && n < 126){
            if(str.length == 10){
                return str;
            }
            str += String.fromCharCode(n);
        } 

    });
    return str;
}
/*Functon to generate random numeric password. Returns string of random numbers.
More secure option as it uses crypto.getRandomValues() togenerate cryptologically strong random values*/
function getRandomNumbers(){
    let str="";
    const randNums = new Uint32Array(1);
    crypto.getRandomValues( randNums)
    randNums.forEach(n => {
        str += n;
    });
    return str;
}
/*Function to get generate random password. Returns string of either random characters, numbers, symbols or mix of all three
Less secure option as it uses Math.Random()*/
// function getRandomPassword(passwordType){
//     let str="";
//     let passLength =10;
//     for(let i=0; i<passLength; i++){
//         let randomPass = Math.floor(Math.random() * passwordType.length);
//         str +=passwordType.substring(randomPass, randomPass + 1);
//     }
//     return str; 
// }

//Function to create a HTML table elements and append it to the <table>
    async function createTable(){
        for (let i=0; i<details.length -1;i++) {
            const td1 = document.createElement("td");
            const node1 = document.createTextNode(details[i].userField)
            td1.appendChild(node1);
            const td2 = document.createElement("td");
            const node2 = document.createTextNode(details[i]. passField)
            td2.appendChild(node2);
            const tr =document.createElement("tr");
            tr.appendChild(td1);
            tr.appendChild(td2);
            const table = document.getElementById("tbl");
            table.appendChild(tr);
        }
    }
