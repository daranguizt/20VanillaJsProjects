const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const email = document.getElementById("email");

//Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

//Turn input green
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(input.value.trim()).toLowerCase())){
        showError(input, "Email is not valid");
    }else{
        showSuccess(input);
    };
}

//Check required fields
function checkRequired(inputArray){
    inputArray.forEach(function(item){
        if(item.value === ""){
            const message = item && item.name[0].toUpperCase()
                + item.name.substring(1) + " is required";
            showError(item, message);
        }
    });
}

// Check input length
function checkInputLength(input, min, max){
    if(input.value.length < min && input.value != ""){
        showError(input, input.name[0].toUpperCase() + input.name.substring(1) + ` length should be more than ${min}`);
    }else if(input.value.length > max && input.value != ""){
        showError(input, input.name[0].toUpperCase() + input.name.substring(1) + ` length should be less than ${max}`);
    }else if(input.value != ""){
        showSuccess(input);
    }
}

function checkPasswordsMatch(input1, input2){
    if(input1.value === input2.value && input2.value != ""){
        showSuccess(input1);
        showSuccess(input2);
    }else if(input2.value != ""){
        showError(input2, "Passwords do not match");
    }
}

//Event Listeners
form.addEventListener("submit", function(e){
    e.preventDefault();
    
    checkRequired([username, email, password, password2]);
    checkPasswordsMatch(password, password2);
    checkInputLength(username, 4, 16);
    checkInputLength(password, 6, 16);  
    checkEmail(email);  
    
    
});