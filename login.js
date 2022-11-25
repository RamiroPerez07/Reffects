//variables
const userForm = document.querySelector(".user-form") 

//inputs
const usernameInput = document.getElementById("username-input")
const passwordInput = document.getElementById("password-input")

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
    }else if (isPasswordValid(inputValue)){
        showErrorMessage(passwordInput, "Looks like this is not a valid password");
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
    const regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return regex.test(inputValue);
}

function isEmpty(inputValue){
    return inputValue=="";
}

function sendInfo(event){
    event.preventDefault();
    if (isFormValid()){
        window.location.href = "./index.html"
    }
}

function isFormValid(){
    const isFirstNameInputValid = checkUsernameInput();
    const isPasswordInputValid = checkPasswordInput();
    return isFirstNameInputValid&&isPasswordInputValid;
}

function login(){
    userForm.addEventListener("submit", sendInfo)
}

login()