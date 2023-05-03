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
    btn[0].addEventListener("click", function(){
        let searchTxt= document.getElementById("opt").value;
        if(searchTxt == "Sign in" || searchTxt == "sign in"){
            window.location.assign(path + "/login.html");
        }
        else if(searchTxt == "Sign up" || searchTxt == "sign up"){
            window.location.assign(path + "/register.html");
        }
        else if(searchTxt == "View account details" || searchTxt == "view account details"){
            window.location.assign(path + "/view.html");
        }     
    }); 
    for(let i = 1; i<btn.length; i++){   
            btn[i].addEventListener("click", function(){
            if(i == 1){
                 window.location.assign(path + "/login.html");
            }
            else if(i == 2){
                window.location.assign(path + "/register.html");
            }
            else if(i == 3){
                window.location.assign(path + "/view.html");
            }
        }); 
    } 
}

//Logic for Login screen 
else if(pathTwo == "/login.html"){
    let btnLogin = document.getElementById("login");
    btnLogin.addEventListener("click", function(){
        let user = document.getElementById("txtUName").value;
        let passw = document.getElementById("password").value;
        readFile(user,passw);
    });
//Function to read from accounts.txt file. It take s two parameters: username and password form input elements
    async function readFile(e, p){  
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
            if(e === obj.userField && p === obj.passField){
                return alert("Welcome " + obj.userField);
           }
        } 
        return alert("Username or password incorect");
    }
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
            await setTimeout( function(){
                let url = window.location.pathname; 
                let lastIndex = url.lastIndexOf("/"); 
                let path = url.substring(0, lastIndex)  
                window.location.assign(path + "/home.html");
            }, 2000); 
        }
    });

//Function to get save new user details to accounts.txt file
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
}
//Logic for Generate screen
else if(pathTwo =="/generate.html"){
    let btn = document.getElementsByClassName("generate");
    for(let i =0; i<btn.length;i++){
        btn[i].addEventListener("click", function(){
            let password =""
            if(i==0){
                password = getRandomNumbers();
            }
            else if(i==1){
                password = getRandomLetter();
            }
            else if(i==2){
                password = getRandomSymbols();
            }
            document.getElementById("demo").innerHTML = password;
            sessionStorage.setItem("password", (password));
        });
     }
       let btnReg = document.getElementById("register")
        btnReg.addEventListener("click", function(){
        window.location.assign(path + "/register.html"); 
    });
//Function to get 10 random numbers. Returns string of random symbols
    function getRandomSymbols(){
        let str="";
        let symbols = "@!#$%^&*()_+><?";
        let passLength =10;
        for(let i=0; i<passLength; i++){
            let randomPass = Math.floor(Math.random() * symbols.length);
            str +=symbols.substring(randomPass, randomPass + 1);
        }
        return str; 
    }
//Function to get 10 random numbers. Returns string of random letters.
    function getRandomLetter(){
        let str="";
        let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passLength =10;
        for(let i=0; i<passLength; i++){
            let randomPass = Math.floor(Math.random() * characters.length);
            str +=characters.substring(randomPass, randomPass + 1);
        }
        return str;
    }
//Function to get 10 random numbers. Returns string of random numbers.
    function getRandomNumbers(){
        let str="";
        let numbers = "0123456789"
        let passLength =10;
        for(let i=0; i<passLength; i++){
            let randomPass = Math.floor(Math.random() * numbers.length);
            str += numbers.substring(randomPass, randomPass + 1);
        }
        return str;
    }   
}

// Logic for View screen
else if(pathTwo == "/view.html"){
    let btnShow = document.getElementById("show");
    btnShow.addEventListener("click", async function(){
        await readFile();
        createTable();
    });
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
}

 //Function to read from accounts.txt file
async function readFile(){ 
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();
    let lines = contents.split("\n"); 
    let obj = {};
    for (const i of lines) {  
        let items = i.split(" ");
            obj = {userField: items[0], passField: items[1]};
            details.push(obj);
        } 
    }

 