var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registration', function(req, res, next) {
  let body = req.body;
  console.log(body);

  let username = body.username;
  if (!username.match(/^[a-zA-Z]/g)) {
    res.status(400).send("username must start with a letter");
    return;
  } else if (username.length < 3) {
    res.status(400).send("username must be 3 or more alphanumeric characters");
    return;
  }
  let email = req.body.email;
  if(!email.match(/^.+@.+$/g)){
    res.status(400).send("please enter a valid email address ! ");
    return;
  }

  let password = req.body.password;
  if (!password.match(/[/*\-+!@#$^&~[\]]/g)) {
    res.status(400).send("Password must contain / * - + ! @ # $ ^ & ~ [ ]");
    return;
  } else if(!password.match(/[0-9]/g)){
    res.status(400).send("Password must contain a number !");
    return;
  }else if (password.length < 8) {
    res.status(400).send("Password must be more than 8 characters !");
    return;
  }else if(!password.match(/[A-Z]/g)){
    res.status(400).send(" Password must contain a capital (uppercase) letter !");
    return;
  }

  let confirm_password = req.body.confirm_password;
  if(confirm_password !== password){
    res.status(400).send("The password doesn't match !");
    return;
  }
  res.send('hello');
});

module.exports = router;
