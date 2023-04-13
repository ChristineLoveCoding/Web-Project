const username = document.getElementById('username');
username.addEventListener("input", (event) => {
    function validate(t) {
        if (t.length == 0) {
            return 'username cannot be empty';
        }
        if (t.length < 3) {
            return 'enter a username that is 3 or more alphanumeric characters.';
        }
        if (!t.charAt(0).match(/[a-zA-Z]/)) {
            return 'enter a username that begins with a character ([a-zA-Z]) ';
        }
        return "";
    }
    username.setCustomValidity(validate(username.value));
});

const email = document.getElementById('email');
email.addEventListener("input", (event) => {
    function validate(t) {
        return "TODO";
    }
    email.setCustomValidity(validate(email.value));
});

// const password = document.getElementById('password');
// const form = document.getElementById('form');
// const test =document.getElementById("test");

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