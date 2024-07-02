let KEYS_RULES = {
    "a":"ai",
    "e":"enter",
    "i":"imes",
    "o":"ober",
    "u":"ufat"
}

let storageContainer = document.getElementById("result-container");


function messageFilter(message){
    if(message === ""){
       // console.log("Incorrect by no value");
        alert("El campo no puede ser nulo");
        return false;
    }

    if(typeof(message)!=="string"){
     //   console.log("Incorrect by incorrect type");
     alert("El campo debe ser una cadena de caracteres");
        return false;
    }

    const hasCorrectCharacters = /^[a-z.,¿!¡? ]+$/.test(message);
    if(hasCorrectCharacters == false){
        // console.log("Incorrect by incorrect characters");
        alert("El texto contiene caracteres no admitidos, solo se permiten minusculas y caracteres especiales de tipo ( , . ? ¿ ¡ ! )");
        return false;
    }

    return true;
}

const makeNodeResponse = (result) => {
    
    let resultContainerNode = document.getElementById("result-container");
    resultContainerNode.style.flexDirection = "column";
    resultContainerNode.style.justifyContent = "space-between";
    resultContainerNode.style.gap = "1rem";


    while (resultContainerNode.firstChild) {
        resultContainerNode.removeChild(resultContainerNode.firstChild);
    }

    //Text Encrypted container
    let responseMessageContainerNode = document.createElement("div");
    responseMessageContainerNode.setAttribute("class", "text-items-container");
    

    //Text Encrypted
    let responseMessageNode = document.createElement("p");
    responseMessageNode.setAttribute("id", "text-info");
    responseMessageNode.innerHTML= result;

    responseMessageContainerNode.appendChild(responseMessageNode);

    //Copy Button
    let CopyButtonNode = document.createElement("button");
    CopyButtonNode.setAttribute("class", "copy-button");
    CopyButtonNode.innerHTML = "Copiar";
    CopyButtonNode.setAttribute("onclick", "copyEncryptText()");

    resultContainerNode.appendChild(responseMessageContainerNode);
    resultContainerNode.appendChild(CopyButtonNode);
    

    return;

}

const copyEncryptText = () => {
    let text = document.getElementById('text-info').innerHTML;
    // console.log(text);
    navigator.clipboard.writeText(text);

    return;
}

const makeDefaultNodeResponse =  () => {

}

function encrypt(){
    let message = document.getElementById("message-text-area").value.trim();
    // console.log(message);
    // console.log(typeof(message));
    
    const passFilter = messageFilter(message)
    if(passFilter===false){
        return;
    } 

    
    let regex = new RegExp(Object.keys(KEYS_RULES).join('|'), 'g');

    let result = message.replace(regex, (match) => {
        return KEYS_RULES[match];
    });

    makeNodeResponse(result);
 

    

}



function decrypt(){

    let message = document.getElementById("message-text-area").value.trim();
    //console.log(message);
    //console.log(typeof(message));
    
    const passFilter = messageFilter(message)
    if(passFilter===false){
        return;
    } 

    let invertedKeyRules = Object.fromEntries(
        Object.entries(KEYS_RULES).map(([key, value]) => [value, key])
    );

    let regex = new RegExp(Object.keys(invertedKeyRules).join('|'), 'g');


    let result = message.replace(regex, (match) => {
        return invertedKeyRules[match];
    });

    makeNodeResponse(result);
 

}