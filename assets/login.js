//variables
const userForm = document.querySelector(".user-form") 

//inputs
const usernameInput = document.getElementById("username-input")
const passwordInput = document.getElementById("password-input")

//btn
const returnHomeBtn = document.querySelector(".return-home-btn")

//local storage
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];


function checkUsernameInput(){
    let valid = false;
    const inputValue = usernameInput.value.trim()
    if(isEmpty(inputValue)){
        showErrorMessage(usernameInput, "Username cannot be empty");
    }else{
        showSuccessMessage(usernameInput)
        valid= true;
    }
    return valid;
}

function checkPasswordInput(){
    let valid = false;
    const inputValue = passwordInput.value.trim()
    if(isEmpty(inputValue)){
        showErrorMessage(passwordInput, "Password cannot be empty");
    }else if (!isPasswordValid(inputValue)){
        showErrorMessage(passwordInput, "The password must have a minimum of eight characters, at least one letter and one number");
    }else{
        showSuccessMessage(passwordInput)
        valid=true;
    }
    return valid;
}

function showSuccessMessage(input){
    const formField = input.parentElement;
    const msgText = formField.querySelector("small");
    msgText.textContent = "";
}

function showErrorMessage(input, msg){
    const formField = input.parentElement;
    const msgText = formField.querySelector("small");
    msgText.textContent = msg;
}

function isPasswordValid(inputValue){
    //Minimum eight characters, at least one letter and one number:
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    //Minimum eight characters, at least one letter, one number and one special character:
    //const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
    //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
    return regex.test(inputValue);
}

function isEmpty(inputValue){
    return inputValue=="";
}

function isAnExistingAccount(accountObj){
    return accounts.some(account => {
        return (account.username == accountObj.username && account.password == accountObj.password);
    })
}

function sendInfo(event){
    event.preventDefault();
    if (isFormValid()){
        const user = {
            username:usernameInput.value,
            password: passwordInput.value,
        }
        if(!isAnExistingAccount(user)){
            showErrorMessage(usernameInput,"The username or password is incorrect");
            showErrorMessage(passwordInput,"The username or password is incorrect");
            return;
        }
        userForm.reset();
        window.location.href = "./index.html";
        alert(`Welcome ${user.username}!`);
    }
}

function isFormValid(){
    const isFirstNameInputValid = checkUsernameInput();
    const isPasswordInputValid = checkPasswordInput();
    return isFirstNameInputValid&&isPasswordInputValid;
}

function login(){
    userForm.addEventListener("submit", sendInfo);
    returnHomeBtn.addEventListener("click", ()=>{window.location.href="./index.html"});
}

login()