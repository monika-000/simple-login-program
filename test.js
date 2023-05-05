
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
//Less secure option with Math.random()
function getRandomPassword(passwordType){
    let str="";
    let passLength =10;
    for(let i=0; i<passLength; i++){
        let randomPass = Math.floor(Math.random() * passwordType.length);
        str +=passwordType.substring(randomPass, randomPass + 1);
    }
    return str; 
}

//More secure ways with crypto.getRandomValue();
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
    //Create array consisting o numbers that represent ASCII values (numbers, letter, symbols)
    // for(let i = 34; i<126; i++){
    //     asciiNum.push(i);
    // }

    //asciiNum= Uint8Array.from(asciiNum);
    const randPasswordMix = new Uint8Array(256);
    //Generate cryptographically random values 
    crypto.getRandomValues(randPasswordMix)
   
    //Translate random values to UTF-16 symbols and return string 
   randPasswordMix.forEach(n => {
        debugger;
        if(33 < n && n < 126){
            if(str.length == 10){
                return str;
            }
            str += String.fromCharCode(n);
        } 

    });
    return str;
}