var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', username: req.session.username });
});

router.get('/login.html', function(req, res, next) {
  res.render('login', { title: 'Login', username: req.session.username }); 
});

router.get('/postvideo.html', function(req, res, next) {
  res.render('postvideo', { title: 'Postvideo', username: req.session.username });
});

router.get('/index.html', function(req, res, next) {
  res.render('index', { title: 'Home', username: req.session.username });
});

router.get('/viewpost.html', function(req, res, next) {
  res.render('viewpost', { title: 'Viewpost', username: req.session.username });
});

router.get('/profile.html', function(req, res, next) {
  res.render("profile", { title: "Profile", username: req.session.username, email: req.session.email});
});

router.get('/registration.html', function(req, res, next) {
  res.render('registration', { title: 'Registration', username: req.session.username });
});





module.exports = router;
