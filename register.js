//variables
const userForm = document.querySelector(".user-form") 

//inputs
const usernameInput = document.getElementById("username-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

//local storage

let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

//funcion de local storage

function saveAccountsInLocalStorage(arrayOfAccounts){
    localStorage.setItem("accounts",JSON.stringify(arrayOfAccounts));
}

function checkUsernameInput(){
    let valid = false;
    const inputValue = usernameInput.value.trim();
    if(isEmpty(inputValue)){
        showErrorMessage(usernameInput, "Username cannot be empty");
    }else{
        showSuccessMessage(usernameInput);
        valid= true;
    }
    return valid;
}

function checkEmailInput(){
    let valid = false;
    const inputValue = emailInput.value.trim();
    if(isEmpty(inputValue)){
        showErrorMessage(emailInput, "Password cannot be empty");
    }else if (!isEmailValid(inputValue)){
        showErrorMessage(emailInput, "Looks like this is not a valid email");
    }else{
        showSuccessMessage(emailInput)
        valid=true;
    }
    return valid;
}

function checkPasswordInput(){
    let valid = false;
    const inputValue = passwordInput.value.trim();
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

function isEmailValid(inputValue){
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return regex.test(inputValue);
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
        let valid = false;
        if (account.username == accountObj.username){
            showErrorMessage(usernameInput,"The username entered already exists.")
            valid = true;
        }
        if(account.email == accountObj.email){
            showErrorMessage(emailInput,"The email entered is associated with another account.")
            valid = true;
        }
        return valid;
    })
}

function sendInfo(event){
    event.preventDefault();
    if (isFormValid()){
        const newAccount = {
            username:usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        }
        if(isAnExistingAccount(newAccount)){
            return;
        }
        const newAccounts = [...accounts, newAccount]
        saveAccountsInLocalStorage(newAccounts);
        alert("The account has been created successfully");
        userForm.reset();
        window.location.href = "./index.html"
    }
}

function isFormValid(){
    const isFirstNameInputValid = checkUsernameInput();
    const isPasswordInputValid = checkPasswordInput();
    const isEmailInputValid = checkEmailInput();
    return isFirstNameInputValid&&isPasswordInputValid&&isEmailInputValid;
}

function login(){
    userForm.addEventListener("submit", sendInfo)
}

login()