ic for Generate screen
else if(pathTwo =="/generate.html"){
    let btn = document.getElementsByClassName("generate");
    const mixed = "@!#$%^&*_+><?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const symbols = "@!#$%^&*_+><?";
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    for(let i =0; i<btn.length;i++){
        btn[i].addEventListener("click", function(){
            let password =""
            if(i==0){
                password = getRandomPassword(numbers);
            }
            else if(i==1){
                password = getRandomPassword(characters);
            }
            else if(i==2){
                password = getRandomPassword(symbols);
            }
            document.getElementById("demo").innerHTML = password;
            sessionStorage.setItem("password", (password));
        });
     }
       let btnReg = document.getElementById("register")
        btnReg.addEventListener("click", function(){
        window.location.assign(path + "/register.html"); 
    });
}

function getRandomPassword(passwordType){
    let str="";
    let passLength =10;
    for(let i=0; i<passLength; i++){
        let randomPass = Math.floor(Math.random() * passwordType.length);
        str +=passwordType.substring(randomPass, randomPass + 1);
    }
    return str; 
}

function getRandomNumbers(){
    let str="";
    const randNums = new Uint32Array(1);
    crypto.getRandomValues( randNums)
    randNums.forEach(n => {
        str += n;
    });
    return str;
}
function getRandomMixed(){
    let str="";
    let asciiNum = [];
    //Create array consisting o numbers hat represent ASCII values (numbers, lette, symbols)
    for(let i = 33; i<126; i++){
        asciiNum.push(i);
    }
    
    //const randNums = new Uint32Array(1);
   
    //Generate cryptographically random values 
    crypto.getRandomValues(asciiNum)
   
    //Translate random values to ASCIIsymbols and return string 
    //String.fromCharCode(65,66,67); // returns 'ABC'
    randNums.forEach(n => {
        str += n;
    });
    return str;
}
