//variables
const userForm = document.querySelector("#contact-form") 

//inputs
const nameInput = document.getElementById("name-input")
const emailInput = document.getElementById("email-input")
const textInput = document.getElementById("contact-text-input")



function checkNameInput(){
    let valid = false;
    const inputValue = nameInput.value.trim()
    if(isEmpty(inputValue)){
        showErrorMessage(nameInput, "Name cannot be empty");
    }else{
        showSuccessMessage(nameInput)
        valid= true;
    }
    return valid;
}

function checkEmailInput(){
  let valid = false;
  const inputValue = emailInput.value.trim();
  if(isEmpty(inputValue)){
      showErrorMessage(emailInput, "Email cannot be empty");
  }else if (!isEmailValid(inputValue)){
      showErrorMessage(emailInput, "Looks like this is not a valid email");
  }else{
      showSuccessMessage(emailInput)
      valid=true;
  }
  return valid;
}


function checkTextInput(){
  let valid = false;
  const inputValue = textInput.value.trim();
  if(isEmpty(inputValue)){
    showErrorMessage(textInput, "Message cannot be empty");
  }else{
    showSuccessMessage(textInput)
    valid= true;
  }
  return valid;
}

function isEmailValid(inputValue){
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return regex.test(inputValue);
}


function showSuccessMessage(input){
    const formField = input.parentElement;
    if(input.classList.contains("inputError")){input.classList.remove("inputError")};
    const msgText = formField.querySelector("small");
    msgText.textContent = "";
}

function showErrorMessage(input, msg){
    const formField = input.parentElement;
    input.classList.add("inputError");
    const msgText = formField.querySelector("small");
    msgText.textContent = msg;
    setTimeout(()=>{
        input.classList.remove("inputError")
        msgText.textContent = ""
    },3000)
}

function isEmpty(inputValue){
    return inputValue=="";
}


function sendInfo(event){
    event.preventDefault();
    if (isFormValid()){
        userForm.reset();
        alert("Thanks for contact us. We will reply to you as soon as possible!")
    }
}

function isFormValid(){
    const isNameInputValid = checkNameInput();
    const isEmailInputValid = checkEmailInput();
    const isTextInputValid = checkTextInput();
    return isNameInputValid&&isEmailInputValid&&isTextInputValid;
}

function contact(){
    userForm.addEventListener("submit", sendInfo);
}

contact()