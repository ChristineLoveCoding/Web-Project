var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'home', name:" Christine " });
});

router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'login', name:" Christine " });
});

router.get('/postvideo.html', function(req, res, next) {
  res.render('postvideo', { title: 'postvideo', name:" Christine " });
});

router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'home', name:" Christine " });
});

router.get('/viewpost.html', function(req, res, next) {
  res.render('viewpost', { title: 'viewpost', name:" Christine " });
});

router.get('/profile.html', function(req, res, next) {
  res.render("profile", { title: "profile", username: "TODO username", email: "TODO email"});
});

router.get('/registration.html', function(req, res, next) {
  res.render('registration', { title: 'registration', name:" Christine " });
});





module.exports = router;
