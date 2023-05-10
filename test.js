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



    async function readFile(u, p){  
        [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const contents = await file.text();
        let lines = contents.split("\n"); 
        let obj = {};
        let loginPath = path +"/login.html"
        for (const i of lines) {  
            let items = i.split(" "); 
            for (let i=0; i<items.length; i++){
                items[i] = items[i].trim();
            } 
            obj = {userField: items[0], passField: items[1]};   
            details.push(obj); 
            if(path == loginPath){
                if(u === obj.userField && p === obj.passField){
                    //alert("Welcome " + obj.userField);
                    sessionStorage.setItem("memberName", (obj.userField));
                    window.location.assign(path + "/memberHome.html");
                    return; 
                }
            }
        } 
        if(path = loginPath){
            return alert("Incorect username or password");
        } 
    }