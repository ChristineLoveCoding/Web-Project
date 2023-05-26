var express = require('express');
var router = express.Router();
const multer = require('multer');
const db = require("../helpers/database");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function(req, file, cb) {
    var fileExt = file.mimetype.split("/")[1];
    const suffix = Date.now() + "-" + Math.round(Math.random()*1e9);
    cb(null, `${file.fieldname}-${suffix}.${fileExt}`);
  },
})

const upload = multer({ storage: storage });

router.post("/:username/update_image", upload.single('profile_image'), function (req, res, next) {
  console.log(req.file);
  console.log(req.body);
  db.updateUser(req.params.username, null, req.file.path, function(error, user) {
    if (error) {
      res.render("error",  {message: `Update profile failed: ${error}`, error: error});
    } else {
      res.redirect("/profile.html");
    }
  });
});

router.post("/:username/update", function (req, res, next) {
  db.updateUser(req.params.username, req.body.aboutme, null, function(error, user) {
    if (error) {
      res.render("error",  {message: `Update profile failed: ${error}`, error: error});
    } else {
      res.redirect("/profile.html");
    }
  });
});

router.post("/login", function (req, res, next) {
  db.login(req.body.username, req.body.password, function(error, user) {
    if (error) {
      res.render("error",  {message: `Login failed: ${error}`, error: error});
    } else {
      req.session = {
        username: user.username,
      };
      res.redirect('/profile.html');
    }
  });
});

router.post("/logout", function (req, res, next) {
  console.log("user.signout()");
  req.session = null;
  res.render('login', { title: 'Login' }); 
});

router.post('/registration', function(req, res, next) {
  let username = req.body.username;
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
  db.register(req.body.username, req.body.email, req.body.password, '/public/default_profile_image.jpeg', function(error) {
    if (error) {
      res.render("error", {message: `Registeration failed: ${error}`, error: error});
    } else {
      req.session = {
        username: req.body.username,
      }
      res.redirect('/profile.html');
    }
  });
});

module.exports = router;
