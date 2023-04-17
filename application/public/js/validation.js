function configureMessageDisplay(inputId) {
    let input = document.getElementById(inputId);
    let message = document.getElementById(inputId + "_validation");
    input.onfocus = function () {
        message.style.display = "block";
    };
    input.onblur = function () {
        message.style.display = "none";
    }
}
configureMessageDisplay("username");
configureMessageDisplay("password");
configureMessageDisplay("confirm_password");

function setValidity(message, isValid) {
    if (isValid) {
        message.classList.remove("invalid");
        message.classList.add("valid");
    } else {
        message.classList.remove("valid");
        message.classList.add("invalid");
    }
    return isValid
}

var startWithLetter = document.getElementById("usr1");
var lengthThree = document.getElementById("usr2");
var username = document.getElementById("username");
username.oninput = function(){
    let msg = "";
    if (!setValidity(startWithLetter, username.value.match(/^[a-zA-Z]/g))) {
        msg = "username must start with a letter";
    }
    if (!setValidity(lengthThree, username.value.length >=3)) {
        msg = "username must be 3 or more alphanumeric characters";
    }
    username.setCustomValidity(msg);
}

// When the user starts to type something inside the password field
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var password = document.getElementById("password");
password.oninput = function () {
  // Validate lowercase letters
  let msg = "";
  if (!setValidity(letter, password.value.match(/[/*\-+!@#$^&~[\]]/g))) {
    msg = "Password must contain / * - + ! @ # $ ^ & ~ [ ]";
  }
  // Validate capital letters
  if (!setValidity(capital, password.value.match(/[A-Z]/g))) {
    msg = "Password must contain a capital (uppercase) letter !";
  }
  // Validate numbers
  if (!setValidity(number, password.value.match(/[0-9]/g))) {
    msg = "Password must contain a number !";
  }
  if (!setValidity(length, password.value.length >=8)) {
    msg = "Password must be more than 8 characters ! ";
  }
  password.setCustomValidity(msg);
};

var matchPassword = document.getElementById("match_p");
var confirm_p = document.getElementById("confirm_password");
confirm_p.oninput = function(){
    let  msg2 = "";
    if (!setValidity(matchPassword, confirm_p.value === password.value)) {
        msg2 = "The password doesn't match !";
    }
    
    confirm_p.setCustomValidity(msg2);
    
};

var submit = document.getElementById("submit");

submit.onclick= function(ev){
    ev.preventDefault();
    location.reload();
    alert("The form is submitted! You have registered sucessfully! ");
};


//Part 1
/*

 require the user to enter a username that begins with a character ([a-zA-Z]).
o require the user to enter a username that is 3 or more alphanumeric characters.
o require the user to enter a password that is 8 or more characters AND contains at least
1 upper case letter AND 1 number and 1 of the following special characters:
/ * - + ! @ # $ ^ & ~ [ ]
o require that the password and confirm password inputs are the same.
o require the user to enter an email that is valid.
▪ This one CAN BE done with the type attribute set to “email”
o require the user to select that they are 13+ years of age.
▪ This one CAN BE done with the HTML attribute “required”
o require the user to select TOS and Privacy rules.
▪ This one CAN BE done with the HTML attribute “required”

When implementing the above requirements think about what happens when these requirements are
not met. Some of these requirements can be verified as the user types and some can be verified when
the user clicks the submit button. These design choices I leave up to you. If the data is invalid the form
SHOULD NOT BE submitted. If the data is valid, simply let the page refresh or show a message saying the
form was submitted*/
