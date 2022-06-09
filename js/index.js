var userName = document.getElementById("name")
var email = document.getElementById("email")
var password = document.getElementById("password")
var webSiteBtn = document.getElementById("signUpBtn") //web site have just one button because of error
var alertError = document.getElementById("alertError")
var alertEmail = document.getElementById("alertEmail")
var alertSuccess = document.getElementById("alertSuccess")
var signUpArray = [];
var loginArray = [];
if (localStorage.getItem("userInfo") != null) {
    signUpArray = JSON.parse(localStorage.getItem("userInfo"))
}

if (localStorage.getItem("loginInfo") != null) {
    loginArray = JSON.parse(localStorage.getItem("loginInfo"))
}


webSiteBtn.addEventListener("click", function (e) {
    //when i use the button in signUp page
    if (e.target.innerText == "Sign Up") {
        signUp()
    }
    //when i use the button in login page
    else if (e.target.innerText == "Login") {
        login()
    }
    //when i use the button in logout page
    else if (e.target.innerText == "Logout") {
        localStorage.removeItem("loginInfo");
    }
})
//for signUp page
function signUp() {
    if (InputsRequire() == true && validEmail() == true &&
        validInput(/^[A-Za-z]\w{2,9}$/, userName) &&
        validInput(/^[A-Za-z]\w{2,9}@[A-za-z]{3,7}\.[A-Za-z]{2,3}$/, email) &&
        validInput(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, password)
    ) {
        var SignUpUserInformation = {
            userName: userName.value,
            userEmail: email.value,
            userPassword: password.value
        }
        signUpArray.push(SignUpUserInformation);
        localStorage.setItem("userInfo", JSON.stringify(signUpArray));
        alertSuccess.style.display = "block";
    }
    else {
        alertSuccess.style.display = "none";
    }
}
function InputsRequire() {
    if (userName.value == "" || email.value == "" || password.value == "") {
        alertError.style.display = "block";
        return false
    }
    else {
        alertError.style.display = "none";
        return true
    }
}
function validEmail() {
    var testInputEmail = true;
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].userEmail.toLowerCase() == email.value.toLowerCase()) {
            testInputEmail = false;
            alertEmail.style.display = "block";
            email.style.borderColor = "#ff0000ad";
        }
        else {
            alertEmail.style.display = "none";
            testInputEmail = true;
        }
    }
    return testInputEmail;
}

//for login page
function login() {
    var emailInput = email.value.toLowerCase();
    var passInput = password.value.toLowerCase();
    var test = true;
    if (emailInput != "" && passInput != "") {
        if (localStorage.getItem("userInfo") == null) {
            document.getElementById("alertError").style.display = "none"
            document.getElementById("incorrectError").style.display = "block"
            email.style.borderColor = "#ff0000ad";
            password.style.borderColor = "#ff0000ad";
        }
        else {
            for (var i = 0; i < signUpArray.length; i++) {
                if (signUpArray[i].userEmail.toLowerCase() == emailInput &&
                    signUpArray[i].userPassword.toLowerCase() == passInput) {
                    loginArray.push(signUpArray[i].userName);
                    localStorage.setItem("loginInfo", JSON.stringify(loginArray));
                    // signUpBtn.setAttribute("href", "home.html")
                    window.location.href = "home.html"
                    return 0;
                }
                else {
                    test = false;
                }
            }
            if (test == false) {
                document.getElementById("alertError").style.display = "none";
                document.getElementById("incorrectError").style.display = "block";
                email.style.borderColor = "#ff0000ad";
                password.style.borderColor = "#ff0000ad";
            }
        }
    }
    else {
        document.getElementById("alertError").style.display = "block"
        document.getElementById("incorrectError").style.display = "none"
    }
}

//to make sure user is login
if (window.location.href === "file:///C:/Users/media/Desktop/fullStack/frontend/javascript/assignments/smart-login/home.html") {

    if (loginArray == "") {
        location.href = "index.html";
    }
    else {
        document.getElementById("welcome").innerHTML = "welcome " + loginArray
    }
}

//check validation for all inputs
function validInput(regex, inputValue) {
    if (regex.test(inputValue.value)) {
        inputValue.style.borderColor = "green";
        return true;
    }
    else {
        inputValue.style.borderColor = "#ff0000ad"; //red
        return false;
    }
}

var inputs = document.querySelectorAll("input")

for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", function (e) {
        if (e.target.getAttribute("id") == "name") {
            validInput(/^[A-Za-z]\w{2,9}$/, userName);
        }
        else if (e.target.getAttribute("id") == "email") {
            validInput(/^[A-Za-z]\w{2,9}@[A-za-z]{3,7}\.[A-Za-z]{2,3}$/, email)
        }
        else if (e.target.getAttribute("id") == "password") {
            validInput(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, password)
        }


    })
}